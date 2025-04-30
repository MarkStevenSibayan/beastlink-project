"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

// Sample events data
const events = [
  { id: 1, title: "Admission Open House", date: new Date(2025, 2, 15), type: "admission" },
  { id: 2, title: "Computer Science Seminar", date: new Date(2025, 2, 18), type: "academic" },
  { id: 3, title: "Campus Tour", date: new Date(2025, 2, 20), type: "admission" },
  { id: 4, title: "IT Workshop", date: new Date(2025, 2, 22), type: "academic" },
  { id: 5, title: "Accounting Career Fair", date: new Date(2025, 2, 25), type: "career" },
  { id: 6, title: "Engineering Expo", date: new Date(2025, 2, 28), type: "academic" },
]

export default function ApplicantEventsPage() {
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
    <PageLayout title="Events Calendar">
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

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Upcoming Events</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {monthEvents.map((event) => (
                <Card key={event.id} className="flex flex-col h-full">
                  <CardContent className="p-4 flex-1">
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
                    <h4 className="mt-2 font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{format(event.date, "EEEE, MMMM d, yyyy")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
