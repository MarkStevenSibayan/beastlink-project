import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash, Search } from "lucide-react"

export default function StaffExamsPage() {
  return (
    <PageLayout title="Exam Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Admission Examinations</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search exams..." className="pl-8 w-full sm:w-[200px]" />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Add Exam
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming Exams
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            Past Exams
          </TabsTrigger>
          <TabsTrigger value="results" className="flex-1">
            Results
          </TabsTrigger>
        </TabsList>

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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 bg-red-50 text-red-600 hover:bg-red-100">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 bg-red-50 text-red-600 hover:bg-red-100">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 bg-red-50 text-red-600 hover:bg-red-100">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="past">
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
                  <th className="px-4 py-2 text-left font-medium">Participants</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Computer Architecture</td>
                  <td className="px-4 py-3">Computer Engineering</td>
                  <td className="px-4 py-3">February 15, 2025</td>
                  <td className="px-4 py-3">10:00 AM - 12:00 PM</td>
                  <td className="px-4 py-3">Engineering Hall, Floor 2</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">124</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Database Management</td>
                  <td className="px-4 py-3">Information Technology</td>
                  <td className="px-4 py-3">February 18, 2025</td>
                  <td className="px-4 py-3">2:00 PM - 4:00 PM</td>
                  <td className="px-4 py-3">IT Building, Room 105</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">98</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Object-Oriented Programming</td>
                  <td className="px-4 py-3">Computer Science</td>
                  <td className="px-4 py-3">February 20, 2025</td>
                  <td className="px-4 py-3">9:00 AM - 11:00 AM</td>
                  <td className="px-4 py-3">Computer Science Building, Hall A</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-500">Entrance</Badge>
                  </td>
                  <td className="px-4 py-3">156</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Computer Science Admission Results</CardTitle>
                <CardDescription>Performance statistics for CS entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Admission Test: Programming (CS101)</h3>
                      <p className="text-sm text-muted-foreground">February 15, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Participants</div>
                      <div className="text-lg font-bold">156</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Pass Rate</div>
                      <div className="text-lg font-bold">78%</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Avg. Score</div>
                      <div className="text-lg font-bold">72/100</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Admission Test: Data Structures (CS202)</h3>
                      <p className="text-sm text-muted-foreground">February 18, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Participants</div>
                      <div className="text-lg font-bold">124</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Pass Rate</div>
                      <div className="text-lg font-bold">65%</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Avg. Score</div>
                      <div className="text-lg font-bold">68/100</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Technology Admission Results</CardTitle>
                <CardDescription>Performance statistics for IT entrance tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Admission Test: Database Management (IT202)</h3>
                      <p className="text-sm text-muted-foreground">February 18, 2025</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Participants</div>
                      <div className="text-lg font-bold">98</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Pass Rate</div>
                      <div className="text-lg font-bold">82%</div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="text-sm text-muted-foreground">Avg. Score</div>
                      <div className="text-lg font-bold">76/100</div>
                    </div>
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
