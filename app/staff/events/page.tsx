"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

// Sample events data
const events = [
  { id: 1, title: "Admission Open House", date: new Date(2025, 2, 15), type: "admission" },
  { id: 2, title: "Computer Science Seminar", date: new Date(2025, 2, 18), type: "academic" },
  { id: 3, title: "Campus Tour", date: new Date(2025, 2, 20), type: "admission" },
  { id: 4, title: "IT Workshop", date: new Date(2025, 2, 22), type: "academic" },
  { id: 5, title: "Accounting Career Fair", date: new Date(2025, 2, 25), type: "career" },
  { id: 6, title: "Engineering Expo", date: new Date(2025, 2, 28), type: "academic" },
]

export default function StaffEventsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get events for selected date
  const selectedDateEvents = events.filter((event) => isSameDay(event.date, selectedDate))

  // Get events for the month
  const monthEvents = events.filter((event) => isSameMonth(event.date, currentMonth))

  return (
    <PageLayout title="Event Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">University Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Enter the details for the new event</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-2 gap-2">
              <CardTitle>Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[600px] md:min-w-0">
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2 text-sm font-medium">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-12 rounded-md p-1" />
                    ))}
                    {daysInMonth.map((day) => {
                      const dayEvents = events.filter((event) => isSameDay(event.date, day))
                      const isSelected = isSameDay(day, selectedDate)

                      return (
                        <div
                          key={day.toString()}
                          className={`h-12 rounded-md p-1 ${
                            isToday(day) ? "bg-blue-50" : ""
                          } ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <button className="flex h-full w-full flex-col items-center justify-center rounded-md hover:bg-muted">
                            <span className={`text-sm ${isToday(day) ? "font-bold" : ""}`}>{format(day, "d")}</span>
                            {dayEvents.length > 0 && (
                              <div className="mt-1 flex gap-0.5">
                                {dayEvents.length <= 2 ? (
                                  dayEvents.map((event) => (
                                    <div
                                      key={event.id}
                                      className={`h-1 w-1 rounded-full ${
                                        event.type === "admission"
                                          ? "bg-emerald-500"
                                          : event.type === "academic"
                                            ? "bg-blue-500"
                                            : "bg-amber-500"
                                      }`}
                                    />
                                  ))
                                ) : (
                                  <>
                                    <div className="h-1 w-1 rounded-full bg-emerald-500" />
                                    <span className="text-xs">+{dayEvents.length}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>
                {selectedDateEvents.length > 0
                  ? `Events on ${format(selectedDate, "MMMM d, yyyy")}`
                  : `No events on ${format(selectedDate, "MMMM d, yyyy")}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge
                          className={
                            event.type === "admission"
                              ? "bg-emerald-500"
                              : event.type === "academic"
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{format(event.date, "h:mm a")}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Edit className="h-3 w-3 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 bg-red-50 text-red-600 hover:bg-red-100">
                          <Trash className="h-3 w-3 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No events scheduled for this day. Select a different date to view events.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Event Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span>Admission Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span>Academic Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span>Career Events</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
