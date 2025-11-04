"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BookingsTable } from "@/components/bookings-table"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuthStore } from "@/lib/store"

// Static bookings data
const BOOKINGS = [
  {
    id: "1",
    service: "Plumbing Repair",
    provider: "John Smith",
    date: "2025-02-15",
    time: "10:00 AM",
    location: "New York, NY",
    status: "upcoming" as const,
    price: 85,
  },
  {
    id: "2",
    service: "Piano Lessons",
    provider: "Mike Chen",
    date: "2025-02-10",
    time: "2:00 PM",
    location: "Brooklyn, NY",
    status: "completed" as const,
    price: 60,
  },
  {
    id: "3",
    service: "House Cleaning",
    provider: "Maria Rodriguez",
    date: "2025-02-08",
    time: "9:00 AM",
    location: "New York, NY",
    status: "completed" as const,
    price: 100,
  },
]

export default function BookingsPage() {
  const { user } = useAuthStore()

  if (!user) return null

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

          <BookingsTable bookings={BOOKINGS} />
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
