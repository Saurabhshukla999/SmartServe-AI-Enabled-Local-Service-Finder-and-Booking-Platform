"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BookingsTable } from "@/components/bookings-table"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuthStore } from "@/lib/store"

interface Booking {
  id: number
  serviceTitle: string
  userName: string
  datetime: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  price: number
}

export default function BookingsPage() {
  const { user } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/bookings?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch bookings")
        }
        
        const data = await response.json()
        setBookings(data.data || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching bookings:", err)
        setError(err instanceof Error ? err.message : "Failed to load bookings. Please try again.")
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  if (!user) return null

  if (loading) {
    return (
      <ProtectedRoute requiredRole="user">
        <NavBar isAuthenticated={true} userRole={user.role} />
        <main className="min-h-screen">
          <div className="container-max py-12">
            <div className="text-center">
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          </div>
        </main>
        <Footer />
      </ProtectedRoute>
    )
  }

  const formattedBookings = bookings.map((booking) => {
    const datetime = new Date(booking.datetime)
    return {
      id: booking.id.toString(),
      service: booking.serviceTitle,
      provider: booking.userName,
      date: datetime.toLocaleDateString(),
      time: datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: "See service details",
      status: booking.status === "confirmed" || booking.status === "pending" ? "upcoming" as const : booking.status as "completed" | "cancelled",
      price: Number(booking.price),
    }
  })

  return (
    <ProtectedRoute requiredRole="user">
      <NavBar isAuthenticated={true} userRole={user.role} />
      <main className="min-h-screen">
        <div className="container-max py-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground mb-8">View and manage all your service bookings</p>

          <div className="flex gap-4 mb-8">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition">
              All Bookings
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition">
              Upcoming
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition">
              Completed
            </button>
          </div>

          {error ? (
            <div className="text-center py-12 border border-destructive bg-destructive/10 rounded-lg">
              <p className="text-destructive text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Retry
              </button>
            </div>
          ) : formattedBookings.length > 0 ? (
            <BookingsTable bookings={formattedBookings} />
          ) : (
            <div className="text-center py-12 border border-border rounded-lg">
              <p className="text-muted-foreground text-lg">No bookings yet. Browse services to make your first booking!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
