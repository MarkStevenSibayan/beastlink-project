"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, Users } from "lucide-react"
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
  { id: 1, title: "Admission Open House", date: new Date(2025, 2, 15), type: "admission", attending: true },
  { id: 2, title: "Computer Science Seminar", date: new Date(2025, 2, 18), type: "academic", attending: false },
  { id: 3, title: "Campus Tour", date: new Date(2025, 2, 20), type: "admission", attending: true },
  { id: 4, title: "IT Workshop", date: new Date(2025, 2, 22), type: "academic", attending: false },
  { id: 5, title: "Accounting Career Fair", date: new Date(2025, 2, 25), type: "career", attending: false },
  { id: 6, title: "Engineering Expo", date: new Date(2025, 2, 28), type: "academic", attending: true },
]

export default function InterviewerEventsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState<"all" | "attending">("all")

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

  // Get events for the month based on active tab
  const filteredEvents =
    activeTab === "attending"
      ? events.filter((event) => isSameMonth(event.date, currentMonth) && event.attending)
      : events.filter((event) => isSameMonth(event.date, currentMonth))

  return (
    <PageLayout title="University Events">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Upcoming Events</h2>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-rose-600 hover:bg-rose-700" : ""}
          >
            All Events
          </Button>
          <Button
            variant={activeTab === "attending" ? "default" : "outline"}
            onClick={() => setActiveTab("attending")}
            className={activeTab === "attending" ? "bg-rose-600 hover:bg-rose-700" : ""}
          >
            Attending
          </Button>
        </div>
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
                          } ${isSelected ? "ring-2 ring-rose-500" : ""}`}
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
            <h3 className="mb-4 text-lg font-semibold">
              {activeTab === "attending" ? "Events You're Attending" : "All Events"}
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="flex flex-col h-full">
                  <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-center">
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
                      {event.attending && <Badge className="bg-rose-500">Attending</Badge>}
                    </div>
                    <h4 className="mt-2 font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{format(event.date, "EEEE, MMMM d, yyyy")}</p>
                    <div className="mt-4">
                      <Button
                        className="w-full"
                        variant={event.attending ? "outline" : "default"}
                        onClick={() => {
                          // This would update the attending status in a real app
                        }}
                      >
                        {event.attending ? "Cancel Attendance" : "Attend Event"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No events found for the selected criteria.
                </div>
              )}
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
                      <div className="mt-3">
                        <Button
                          className="w-full"
                          variant={event.attending ? "outline" : "default"}
                          onClick={() => {
                            // This would update the attending status in a real app
                          }}
                        >
                          {event.attending ? "Cancel Attendance" : "Attend Event"}
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
              <CardTitle>Your Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-rose-100 p-2">
                    <CalendarIcon className="h-4 w-4 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Upcoming Events</div>
                    <div className="text-xl font-bold">6</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <Users className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Events Attending</div>
                    <div className="text-xl font-bold">3</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Hours Scheduled</div>
                    <div className="text-xl font-bold">12</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
