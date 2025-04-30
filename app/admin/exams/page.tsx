import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Book, Users, CheckCircle } from "lucide-react"

export default function AdminExamsPage() {
  return (
    <PageLayout title="Exam Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">All Exams</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">Create New Exam</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Exams</p>
                <h3 className="text-2xl font-bold">24</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Active Subjects</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Book className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered Students</p>
                <h3 className="text-2xl font-bold">1,856</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                <h3 className="text-2xl font-bold">72.5%</h3>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Exam Title</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-left font-medium">Location</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Registrants</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Computer Science Entrance Exam</td>
                  <td className="px-4 py-3">March 25, 2025</td>
                  <td className="px-4 py-3">10:00 AM - 12:00 PM</td>
                  <td className="px-4 py-3">Main Hall A</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">245 / 300</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Registrants
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Information Technology Placement Test</td>
                  <td className="px-4 py-3">March 28, 2025</td>
                  <td className="px-4 py-3">1:00 PM - 3:00 PM</td>
                  <td className="px-4 py-3">IT Building, Room 204</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Placement</Badge>
                  </td>
                  <td className="px-4 py-3">112 / 150</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Registrants
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Accountancy Aptitude Test</td>
                  <td className="px-4 py-3">April 2, 2025</td>
                  <td className="px-4 py-3">9:00 AM - 11:00 AM</td>
                  <td className="px-4 py-3">Business School, Hall B</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">186 / 200</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Registrants
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Computer Engineering Technical Assessment</td>
                  <td className="px-4 py-3">April 5, 2025</td>
                  <td className="px-4 py-3">2:00 PM - 4:30 PM</td>
                  <td className="px-4 py-3">Engineering Building, Lab 305</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-emerald-500">Placement</Badge>
                  </td>
                  <td className="px-4 py-3">95 / 120</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Registrants
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Human Management Assessment</td>
                  <td className="px-4 py-3">April 10, 2025</td>
                  <td className="px-4 py-3">10:00 AM - 12:00 PM</td>
                  <td className="px-4 py-3">Management Building, Room 102</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">124 / 150</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Registrants
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
