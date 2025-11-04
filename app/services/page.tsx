"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { FormInput } from "@/components/form-input"
import { Search, Filter } from "lucide-react"

// Static data
const SERVICES = [
  {
    id: "1",
    title: "Plumbing Repair",
    provider: "John Smith",
    rating: 4.8,
    reviews: 24,
    price: 85,
    location: "New York, NY",
    duration: "1-2 hours",
    category: "Home Services",
  },
  {
    id: "2",
    title: "Web Design",
    provider: "Sarah Johnson",
    rating: 5.0,
    reviews: 18,
    price: 120,
    location: "New York, NY",
    duration: "1 week",
    category: "Professional",
  },
  {
    id: "3",
    title: "Piano Lessons",
    provider: "Mike Chen",
    rating: 4.9,
    reviews: 32,
    price: 60,
    location: "Brooklyn, NY",
    duration: "1 hour",
    category: "Education",
  },
  {
    id: "4",
    title: "Personal Training",
    provider: "Emma Davis",
    rating: 4.7,
    reviews: 15,
    price: 75,
    location: "Manhattan, NY",
    duration: "1 hour",
    category: "Fitness",
  },
  {
    id: "5",
    title: "House Cleaning",
    provider: "Maria Rodriguez",
    rating: 4.9,
    reviews: 41,
    price: 100,
    location: "New York, NY",
    duration: "3 hours",
    category: "Home Services",
  },
  {
    id: "6",
    title: "Photography",
    provider: "Alex Taylor",
    rating: 5.0,
    reviews: 22,
    price: 200,
    location: "Queens, NY",
    duration: "2-3 hours",
    category: "Creative",
  },
]

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredServices, setFilteredServices] = useState(SERVICES)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    const filtered = SERVICES.filter(
      (service) =>
        service.title.toLowerCase().includes(value.toLowerCase()) ||
        service.provider.toLowerCase().includes(value.toLowerCase()) ||
        service.category.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredServices(filtered)
  }

  return (
    <>
      <NavBar isAuthenticated={false} />
      <main className="min-h-screen">
        <div className="container-max py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Browse Services</h1>
            <p className="text-lg text-muted-foreground">Find services from trusted providers in your network</p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <FormInput
                placeholder="Search services, providers..."
                icon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-border rounded-lg flex items-center justify-center gap-2 hover:bg-muted transition">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>

          {/* Results Info */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}
          </p>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No services found</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
