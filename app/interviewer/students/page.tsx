"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { useSharedData } from "@/context/shared-data-context"
import { format } from "date-fns"

export default function InterviewerStudentsPage() {
  const { interviews } = useSharedData()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filteredInterviews, setFilteredInterviews] = useState(interviews)

  // Filter interviews based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query) {
      setFilteredInterviews(interviews)
    } else {
      const filtered = interviews.filter(
        (interview) =>
          interview.applicantName.toLowerCase().includes(query.toLowerCase()) ||
          interview.course.toLowerCase().includes(query.toLowerCase()) ||
          interview.location.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredInterviews(filtered)
    }
  }

  return (
    <PageLayout title="Interview Candidates">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Applicant Interviews</h2>
        <div className="flex gap-2">
          <SearchBar placeholder="Search candidates..." onSearch={handleSearch} className="w-full sm:w-[300px]" />
          <Button className="bg-rose-600 hover:bg-rose-700">Schedule Interview</Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="completed">Completed Interviews</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Records</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInterviews
              .filter((interview) => interview.status === "scheduled")
              .map((interview) => (
                <InterviewCard
                  key={interview.id}
                  name={interview.applicantName}
                  program={interview.course}
                  date={format(new Date(interview.date), "MMMM d, yyyy")}
                  time={interview.time}
                  location={interview.location}
                  status={interview.status === "scheduled" ? "Confirmed" : "Pending"}
                />
              ))}
            {filteredInterviews.filter((interview) => interview.status === "scheduled").length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">No upcoming interviews found</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Interviews</CardTitle>
              <CardDescription>Interview sessions conducted in the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Candidate</th>
                      <th className="px-4 py-2 text-left font-medium">Program</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-left font-medium">Score</th>
                      <th className="px-4 py-2 text-left font-medium">Recommendation</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">Robert Taylor</td>
                      <td className="px-4 py-3">Computer Science</td>
                      <td className="px-4 py-3">March 15, 2025</td>
                      <td className="px-4 py-3">8.5/10</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500">Recommend</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">
                          View Notes
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Lisa Wilson</td>
                      <td className="px-4 py-3">Information Technology</td>
                      <td className="px-4 py-3">March 17, 2025</td>
                      <td className="px-4 py-3">6.2/10</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-red-500">Do Not Recommend</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="outline">
                          View Notes
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Interview Feedback Summary</CardTitle>
              <CardDescription>Aggregated feedback insights from interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">General Statistics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Interviews Conducted</div>
                      <div className="text-2xl font-bold">32</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Recommended Candidates</div>
                      <div className="text-2xl font-bold">24</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Average Score</div>
                      <div className="text-2xl font-bold">7.8</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                      <div className="text-2xl font-bold">75%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Common Strengths Observed</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Strong problem-solving abilities</li>
                    <li>Effective communication skills</li>
                    <li>Solid programming fundamentals</li>
                    <li>Project experience relevant to field of study</li>
                    <li>Enthusiasm and motivation for the field</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Common Areas for Improvement</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Practical application knowledge</li>
                    <li>Understanding of advanced concepts</li>
                    <li>Code optimization and efficiency</li>
                    <li>Team collaboration experience</li>
                    <li>Awareness of current industry trends</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

function InterviewCard({
  name,
  program,
  date,
  time,
  location,
  status,
}: {
  name: string
  program: string
  date: string
  time: string
  location: string
  status: string
}) {
  // Determine badge color based on status
  const getBadgeColor = () => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500"
      case "Pending Confirmation":
        return "bg-yellow-500"
      case "Rescheduling Requested":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          <Badge className={getBadgeColor()}>{status}</Badge>
        </div>

        <div className="space-y-3">
          <div className="text-sm">{program}</div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="w-full bg-rose-600 hover:bg-rose-700">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}
