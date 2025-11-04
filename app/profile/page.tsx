"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuthStore } from "@/lib/store"
import { FormInput } from "@/components/form-input"
import { User, Mail, MapPin, Phone } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <ProtectedRoute>
      <NavBar isAuthenticated={true} userRole={user.role} />
      <main className="min-h-screen">
        <div className="container-max py-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-background border border-border rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground text-sm capitalize">{user.role}</p>
                <button className="mt-4 w-full px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition">
                  Change Photo
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-background border border-border rounded-lg p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput label="Full Name" defaultValue={user.name} icon={<User size={18} />} />
                    <FormInput label="Email Address" type="email" defaultValue={user.email} icon={<Mail size={18} />} />
                  </div>

                  <FormInput label="Location" icon={<MapPin size={18} />} />

                  <FormInput label="Phone Number" type="tel" defaultValue={user.phone} icon={<Phone size={18} />} />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">About</label>
                    <textarea
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground transition"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-4 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
