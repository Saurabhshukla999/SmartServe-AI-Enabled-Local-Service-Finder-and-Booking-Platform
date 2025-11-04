"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { RatingStars } from "@/components/rating-stars"
import { BookingModal } from "@/components/booking-modal"
import { MapContainer } from "@/components/map-container"
import { MapPin, Clock, User, MessageCircle, Share2 } from "lucide-react"

// Mock service details
const SERVICE_DETAILS = {
  id: "1",
  title: "Professional Plumbing Repair",
  provider: "John Smith",
  rating: 4.8,
  reviews: 24,
  price: 85,
  location: "New York, NY",
  latitude: 40.7128,
  longitude: -74.006,
  duration: "1-2 hours",
  category: "Home Services",
  description:
    "Professional plumbing services with 15+ years of experience. I specialize in leak repairs, fixture installation, and emergency plumbing. Available 7 days a week.",
  image: "/plumbing-service-call.png",
  reviews_list: [
    {
      id: "1",
      author: "Emma Wilson",
      rating: 5,
      date: "2025-01-15",
      text: "Excellent work! Fixed the leak quickly and professionally.",
    },
    {
      id: "2",
      author: "Robert Brown",
      rating: 4.5,
      date: "2025-01-10",
      text: "Great service, fair pricing. Would book again.",
    },
  ],
}

export default function ServiceDetailsPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <NavBar isAuthenticated={false} />
      <main className="min-h-screen">
        <div className="container-max py-12">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Image */}
              <div className="bg-muted rounded-lg h-96 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-lg font-medium">{SERVICE_DETAILS.category}</div>
                  <div className="text-sm mt-2">Service Image</div>
                </div>
              </div>

              {/* Header Info */}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{SERVICE_DETAILS.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <RatingStars rating={SERVICE_DETAILS.rating} readonly />
                    <span className="ml-2 font-semibold text-foreground">{SERVICE_DETAILS.rating}</span>
                    <span className="text-muted-foreground ml-2">({SERVICE_DETAILS.reviews} reviews)</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={18} />
                    <span>{SERVICE_DETAILS.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span>{SERVICE_DETAILS.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User size={18} />
                    <span>{SERVICE_DETAILS.provider}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Service</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{SERVICE_DETAILS.description}</p>
              </div>

              {/* Provider Info */}
              <div className="bg-muted p-6 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{SERVICE_DETAILS.provider}</h3>
                    <p className="text-muted-foreground">Trusted provider</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                    <MessageCircle size={18} className="inline mr-2" />
                    Message
                  </button>
                  <button className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition">
                    <Share2 size={18} className="inline mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Service Location</h2>
                <MapContainer
                  location={SERVICE_DETAILS.location}
                  latitude={SERVICE_DETAILS.latitude}
                  longitude={SERVICE_DETAILS.longitude}
                />
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Reviews</h2>
                <div className="space-y-4">
                  {SERVICE_DETAILS.reviews_list.map((review) => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{review.author}</h4>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <RatingStars rating={review.rating} readonly size={14} />
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="border border-border rounded-lg p-6 sticky top-20">
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Price per session</p>
                  <p className="text-4xl font-bold text-primary mb-4">${SERVICE_DETAILS.price}</p>
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition mb-3"
                >
                  Book Now
                </button>
                <button className="w-full px-4 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition">
                  Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        serviceTitle={SERVICE_DETAILS.title}
        price={SERVICE_DETAILS.price}
        provider={SERVICE_DETAILS.provider}
      />
      <Footer />
    </>
  )
}
