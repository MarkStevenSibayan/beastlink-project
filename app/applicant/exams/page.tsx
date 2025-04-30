import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock, FileText } from "lucide-react"

export default function ApplicantExamsPage() {
  return (
    <PageLayout title="Admission Examinations">
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            Past
          </TabsTrigger>
          <TabsTrigger value="results" className="flex-1">
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExamCard
              title="Admission Test: Computer Science"
              course="Computer Science"
              code="CS101"
              date="March 15, 2025"
              time="10:00 AM - 12:00 PM"
              location="Hall A, Main Building"
              type="Entrance"
            />

            <ExamCard
              title="Admission Test: Data Structures"
              course="Computer Science"
              code="CS202"
              date="March 18, 2025"
              time="2:00 PM - 4:00 PM"
              location="Hall B, Computer Science Building"
              type="Placement"
            />

            <ExamCard
              title="Admission Test: Network Security"
              course="Information Technology"
              code="IT305"
              date="March 20, 2025"
              time="9:00 AM - 11:00 AM"
              location="Lab 4, IT Building"
              type="Entrance"
            />

            <ExamCard
              title="Admission Test: Digital Electronics"
              course="Computer Engineering"
              code="CoE201"
              date="March 22, 2025"
              time="1:00 PM - 3:00 PM"
              location="Engineering Hall, Floor 2"
              type="Placement"
            />

            <ExamCard
              title="Admission Test: Financial Accounting"
              course="Accountancy"
              code="ACC101"
              date="March 25, 2025"
              time="10:00 AM - 12:00 PM"
              location="Business School, Room 305"
              type="Entrance"
            />

            <ExamCard
              title="Admission Test: Organizational Behavior"
              course="Human Management"
              code="HM202"
              date="March 28, 2025"
              time="2:00 PM - 4:00 PM"
              location="Management Building, Hall C"
              type="Placement"
            />
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExamCard
              title="Admission Test: Computer Architecture"
              course="Computer Engineering"
              code="CoE301"
              date="February 15, 2025"
              time="10:00 AM - 12:00 PM"
              location="Engineering Hall, Floor 2"
              type="Entrance"
              isPast
            />

            <ExamCard
              title="Admission Test: Database Management"
              course="Information Technology"
              code="IT202"
              date="February 18, 2025"
              time="2:00 PM - 4:00 PM"
              location="IT Building, Room 105"
              type="Entrance"
              isPast
            />

            <ExamCard
              title="Admission Test: Object-Oriented Programming"
              course="Computer Science"
              code="CS203"
              date="February 20, 2025"
              time="9:00 AM - 11:00 AM"
              location="Computer Science Building, Hall A"
              type="Entrance"
              isPast
            />

            <ExamCard
              title="Admission Test: Cost Accounting"
              course="Accountancy"
              code="ACC202"
              date="February 22, 2025"
              time="1:00 PM - 3:00 PM"
              location="Business School, Room 201"
              type="Entrance"
              isPast
            />

            <ExamCard
              title="Admission Test: Human Resource Management"
              course="Human Management"
              code="HM301"
              date="February 25, 2025"
              time="10:00 AM - 12:00 PM"
              location="Management Building, Hall B"
              type="Entrance"
              isPast
            />
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Computer Science Admission Exams</CardTitle>
                <CardDescription>Your performance in CS entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Programming (CS101)</div>
                      <div className="text-sm font-medium">85%</div>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Data Structures (CS202)</div>
                      <div className="text-sm font-medium">78%</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Object-Oriented Programming (CS203)</div>
                      <div className="text-sm font-medium">92%</div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Technology Admission Exams</CardTitle>
                <CardDescription>Your performance in IT entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Database Management (IT202)</div>
                      <div className="text-sm font-medium">88%</div>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Web Development (IT204)</div>
                      <div className="text-sm font-medium">95%</div>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Computer Engineering Admission Exams</CardTitle>
                <CardDescription>Your performance in CoE entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Computer Architecture (CoE301)</div>
                      <div className="text-sm font-medium">82%</div>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accountancy Admission Exams</CardTitle>
                <CardDescription>Your performance in ACC entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Admission Test: Cost Accounting (ACC202)</div>
                      <div className="text-sm font-medium">75%</div>
                    </div>
                    <Progress value={75} className="h-2" />
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
  isPast = false,
}: {
  title: string
  course: string
  code: string
  date: string
  time: string
  location: string
  type: "Entrance" | "Placement"
  isPast?: boolean
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
        </div>

        <div className="mt-4">
          {isPast ? (
            <Button variant="outline" className="w-full">
              View Results
            </Button>
          ) : (
            <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">Prepare for Exam</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
