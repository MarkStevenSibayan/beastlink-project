"use client"

import { useState } from "react"
import { useSharedData } from "@/context/shared-data-context"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, CheckCircle, CalendarIcon } from "lucide-react"
import { format, isToday, isTomorrow } from "date-fns"

export default function InterviewerDashboard() {
  const { interviews, updateInterview } = useSharedData()
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter interviews
  const upcomingInterviews = interviews.filter((i) => i.status === "scheduled")
  const completedInterviews = interviews.filter((i) => i.status === "completed")

  // Group interviews by date
  const todayInterviews = upcomingInterviews.filter((i) => isToday(i.date))
  const tomorrowInterviews = upcomingInterviews.filter((i) => isTomorrow(i.date))
  const laterInterviews = upcomingInterviews.filter((i) => !isToday(i.date) && !isTomorrow(i.date))

  // Mark interview as completed
  const markAsCompleted = (id: string) => {
    updateInterview(id, { status: "completed" })
  }

  return (
    <PageLayout title="Interviewer Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Interviews</p>
                <h3 className="text-2xl font-bold">{todayInterviews.length}</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tomorrow's Interviews</p>
                <h3 className="text-2xl font-bold">{tomorrowInterviews.length}</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <CalendarIcon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Interviews</p>
                <h3 className="text-2xl font-bold">{completedInterviews.length}</h3>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
            <TabsTrigger value="completed">Completed Interviews</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {todayInterviews.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold">Today</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {todayInterviews.map((interview) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      onComplete={() => markAsCompleted(interview.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {tomorrowInterviews.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold">Tomorrow</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tomorrowInterviews.map((interview) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      onComplete={() => markAsCompleted(interview.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {laterInterviews.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Upcoming</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {laterInterviews.map((interview) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      onComplete={() => markAsCompleted(interview.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {upcomingInterviews.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No upcoming interviews scheduled.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedInterviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completedInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} isCompleted />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No completed interviews yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Interview Schedule</CardTitle>
                <CardDescription>Your upcoming interview appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Time</th>
                        <th className="px-4 py-2 text-left font-medium">Applicant</th>
                        <th className="px-4 py-2 text-left font-medium">Course</th>
                        <th className="px-4 py-2 text-left font-medium">Location</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interviews.map((interview) => (
                        <tr key={interview.id} className="border-b">
                          <td className="px-4 py-3">{format(interview.date, "MMM d, yyyy")}</td>
                          <td className="px-4 py-3">{interview.time}</td>
                          <td className="px-4 py-3">{interview.applicantName}</td>
                          <td className="px-4 py-3">{interview.course}</td>
                          <td className="px-4 py-3">{interview.location}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                interview.status === "scheduled"
                                  ? "bg-blue-100 text-blue-700"
                                  : interview.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {interview.status === "scheduled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 bg-green-50 text-green-600 hover:bg-green-100"
                                onClick={() => markAsCompleted(interview.id)}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

function InterviewCard({
  interview,
  onComplete,
  isCompleted = false,
}: {
  interview: any
  onComplete?: () => void
  isCompleted?: boolean
}) {
  return (
    <Card className={isCompleted ? "bg-gray-50" : ""}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">{interview.applicantName}</h3>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              interview.status === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
            }`}
          >
            {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{format(interview.date, "MMMM d, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{interview.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{interview.course}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{interview.location}</span>
          </div>
        </div>

        {!isCompleted && onComplete && (
          <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700" onClick={onComplete}>
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
