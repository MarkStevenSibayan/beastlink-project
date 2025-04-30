import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock, FileText, Users, CheckCircle, XCircle } from "lucide-react"

export default function InterviewerExamsPage() {
  return (
    <PageLayout title="Admission Examinations">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Exam Proctoring Schedule</h2>
        <Badge className="bg-rose-500">Technical Interviewer</Badge>
      </div>

      <Tabs defaultValue="assigned">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="assigned" className="flex-1">
            Assigned Exams
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming Exams
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            Past Exams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExamCard
              title="Admission Test: Computer Science"
              course="Computer Science"
              code="CS101"
              date="March 15, 2025"
              time="10:00 AM - 12:00 PM"
              location="Hall A, Main Building"
              type="Entrance"
              role="Lead Interviewer"
            />

            <ExamCard
              title="Admission Test: Data Structures"
              course="Computer Science"
              code="CS202"
              date="March 18, 2025"
              time="2:00 PM - 4:00 PM"
              location="Hall B, Computer Science Building"
              type="Placement"
              role="Technical Evaluator"
            />

            <ExamCard
              title="Admission Test: Network Security"
              course="Information Technology"
              code="IT305"
              date="March 20, 2025"
              time="9:00 AM - 11:00 AM"
              location="Lab 4, IT Building"
              type="Entrance"
              role="Assistant Interviewer"
            />
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Title</th>
                  <th className="px-4 py-2 text-left font-medium">Course</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-left font-medium">Location</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Computer Science</td>
                  <td className="px-4 py-3">Computer Science</td>
                  <td className="px-4 py-3">March 15, 2025</td>
                  <td className="px-4 py-3">10:00 AM - 12:00 PM</td>
                  <td className="px-4 py-3">Hall A, Main Building</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                      Volunteer
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Data Structures</td>
                  <td className="px-4 py-3">Computer Science</td>
                  <td className="px-4 py-3">March 18, 2025</td>
                  <td className="px-4 py-3">2:00 PM - 4:00 PM</td>
                  <td className="px-4 py-3">Hall B, Computer Science Building</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-600">Placement</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                      Volunteer
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Network Security</td>
                  <td className="px-4 py-3">Information Technology</td>
                  <td className="px-4 py-3">March 20, 2025</td>
                  <td className="px-4 py-3">9:00 AM - 11:00 AM</td>
                  <td className="px-4 py-3">Lab 4, IT Building</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                      Volunteer
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Past Exam Performance</CardTitle>
                <CardDescription>Your evaluation statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Computer Architecture (CoE301)</h3>
                        <p className="text-sm text-muted-foreground">February 15, 2025</p>
                      </div>
                      <Badge className="bg-blue-500">Lead Interviewer</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-sm font-medium">Candidates Evaluated</div>
                          <div className="text-sm font-medium">24</div>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-sm font-medium">Pass Rate</div>
                          <div className="text-sm font-medium">75%</div>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Database Management (IT202)</h3>
                        <p className="text-sm text-muted-foreground">February 18, 2025</p>
                      </div>
                      <Badge className="bg-emerald-500">Technical Evaluator</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-sm font-medium">Candidates Evaluated</div>
                          <div className="text-sm font-medium">18</div>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-sm font-medium">Pass Rate</div>
                          <div className="text-sm font-medium">83%</div>
                        </div>
                        <Progress value={83} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evaluation Summary</CardTitle>
                <CardDescription>Your overall performance as an interviewer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Total Exams</div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Candidates Evaluated</div>
                      <div className="text-2xl font-bold">156</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Average Pass Rate</div>
                      <div className="text-2xl font-bold">78%</div>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-sm text-muted-foreground">Feedback Score</div>
                      <div className="text-2xl font-bold">4.8/5</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 font-medium">Evaluation Strengths</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Technical knowledge assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Problem-solving evaluation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Candidate feedback quality</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-2">
                    <h3 className="mb-2 font-medium">Areas for Improvement</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-amber-500" />
                        <span>Time management during interviews</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-amber-500" />
                        <span>Documentation completeness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

function ExamCard({
  title,
  course,
  code,
  date,
  time,
  location,
  type,
  role,
}: {
  title: string
  course: string
  code: string
  date: string
  time: string
  location: string
  type: "Entrance" | "Placement"
  role: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <Badge className={type === "Entrance" ? "bg-blue-500" : "bg-emerald-600"}>{type} Exam</Badge>
            <h3 className="mt-2 text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {course} ({code})
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{time}</span>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Your Role: <span className="font-medium">{role}</span>
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full bg-rose-600 text-white hover:bg-rose-700">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}
