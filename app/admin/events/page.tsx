"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSharedData } from "@/context/shared-data-context"

export default function AdminEventsPage() {
  const { events } = useSharedData()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(events)

  // Form state
  const [eventTitle, setEventTitle] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventType, setEventType] = useState("")
  const [eventCapacity, setEventCapacity] = useState("")

  // Filter events based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredEvents(events)
    } else {
      const filtered = events.filter((event) => event.title.toLowerCase().includes(query.toLowerCase()))
      setFilteredEvents(filtered)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would add the event to the database
    console.log("New event:", { eventTitle, eventDate, eventTime, eventLocation, eventType, eventCapacity })

    // Reset form and close dialog
    setEventTitle("")
    setEventDate("")
    setEventTime("")
    setEventLocation("")
    setEventType("")
    setEventCapacity("")
    setIsDialogOpen(false)
  }

  return (
    <PageLayout title="Event Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">University Events</h2>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search events..."
            className="w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">Create New Event</Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Fill in the details to create a new university event.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select value={eventType} onValueChange={setEventType} required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admission">Admission</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="orientation">Orientation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={eventCapacity}
                      onChange={(e) => setEventCapacity(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Create Event
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <h3 className="text-2xl font-bold">45</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <CalendarDays className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Venues</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Participants</p>
                <h3 className="text-2xl font-bold">2,450</h3>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Title</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-left font-medium">Location</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Capacity</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Spring Admission Open House</td>
                  <td className="px-4 py-3">March 25, 2025</td>
                  <td className="px-4 py-3">10:00 AM - 2:00 PM</td>
                  <td className="px-4 py-3">Main Campus Auditorium</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Admission</Badge>
                  </td>
                  <td className="px-4 py-3">500 / 500</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">CS Department Seminar</td>
                  <td className="px-4 py-3">March 28, 2025</td>
                  <td className="px-4 py-3">3:00 PM - 5:00 PM</td>
                  <td className="px-4 py-3">CS Building, Room 305</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Academic</Badge>
                  </td>
                  <td className="px-4 py-3">85 / 120</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Tech Industry Career Fair</td>
                  <td className="px-4 py-3">April 2, 2025</td>
                  <td className="px-4 py-3">11:00 AM - 4:00 PM</td>
                  <td className="px-4 py-3">Student Center</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-amber-500">Career</Badge>
                  </td>
                  <td className="px-4 py-3">250 / 300</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Virtual Campus Tour</td>
                  <td className="px-4 py-3">April 5, 2025</td>
                  <td className="px-4 py-3">1:00 PM - 2:30 PM</td>
                  <td className="px-4 py-3">Online (Zoom)</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Admission</Badge>
                  </td>
                  <td className="px-4 py-3">175 / 200</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Freshmen Orientation</td>
                  <td className="px-4 py-3">April 10, 2025</td>
                  <td className="px-4 py-3">9:00 AM - 3:00 PM</td>
                  <td className="px-4 py-3">Various Locations</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-purple-500">Orientation</Badge>
                  </td>
                  <td className="px-4 py-3">350 / 400</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
