import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChairpersonStudentsPage() {
  return (
    <PageLayout title="Department Students">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Computer Science Department Students</h2>
        <div className="flex gap-2">
          <Input type="search" placeholder="Search students..." className="w-full sm:w-[300px]" />
          <Button className="bg-amber-600 hover:bg-amber-700">Export Data</Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">1,856</span>
              <span className="text-sm text-muted-foreground">Total Students</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">435</span>
              <span className="text-sm text-muted-foreground">First Year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">92%</span>
              <span className="text-sm text-muted-foreground">Retention Rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl font-bold">3.7</span>
              <span className="text-sm text-muted-foreground">Avg. GPA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Student Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="courses">Course Enrollment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>All students enrolled in Computer Science program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Name</th>
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Year</th>
                      <th className="px-4 py-2 text-left font-medium">Specialization</th>
                      <th className="px-4 py-2 text-left font-medium">GPA</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">John Smith</td>
                      <td className="px-4 py-3">2023CS1001</td>
                      <td className="px-4 py-3">2nd Year</td>
                      <td className="px-4 py-3">Software Engineering</td>
                      <td className="px-4 py-3">3.8</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500">Good Standing</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Sarah Johnson</td>
                      <td className="px-4 py-3">2023CS1002</td>
                      <td className="px-4 py-3">2nd Year</td>
                      <td className="px-4 py-3">AI & ML</td>
                      <td className="px-4 py-3">4.0</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-purple-500">Dean's List</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">David Lee</td>
                      <td className="px-4 py-3">2022CS1003</td>
                      <td className="px-4 py-3">3rd Year</td>
                      <td className="px-4 py-3">Cybersecurity</td>
                      <td className="px-4 py-3">3.2</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-yellow-500">Academic Probation</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Emily Wilson</td>
                      <td className="px-4 py-3">2021CS1004</td>
                      <td className="px-4 py-3">4th Year</td>
                      <td className="px-4 py-3">Data Science</td>
                      <td className="px-4 py-3">3.9</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500">Good Standing</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance Analysis</CardTitle>
              <CardDescription>Student performance metrics across different courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This tab would display visualizations of student performance data, including:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Grade distribution charts for different courses</li>
                <li>Student progression rates</li>
                <li>Comparative performance across specializations</li>
                <li>Trend analysis of academic performance</li>
              </ul>
              <p>
                Custom charts and visualizations would be implemented based on the department's specific requirements.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollment Statistics</CardTitle>
              <CardDescription>Current enrollment figures for department courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Course Code</th>
                      <th className="px-4 py-2 text-left font-medium">Course Name</th>
                      <th className="px-4 py-2 text-left font-medium">Instructor</th>
                      <th className="px-4 py-2 text-left font-medium">Enrollment</th>
                      <th className="px-4 py-2 text-left font-medium">Capacity</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">CS101</td>
                      <td className="px-4 py-3">Introduction to Programming</td>
                      <td className="px-4 py-3">Dr. James Wilson</td>
                      <td className="px-4 py-3">215</td>
                      <td className="px-4 py-3">250</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500">Open</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">CS201</td>
                      <td className="px-4 py-3">Data Structures</td>
                      <td className="px-4 py-3">Dr. Lisa Chen</td>
                      <td className="px-4 py-3">180</td>
                      <td className="px-4 py-3">180</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-red-500">Full</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">CS330</td>
                      <td className="px-4 py-3">Artificial Intelligence</td>
                      <td className="px-4 py-3">Dr. Michael Patel</td>
                      <td className="px-4 py-3">145</td>
                      <td className="px-4 py-3">160</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500">Open</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">CS450</td>
                      <td className="px-4 py-3">Machine Learning</td>
                      <td className="px-4 py-3">Dr. Emily Johnson</td>
                      <td className="px-4 py-3">75</td>
                      <td className="px-4 py-3">80</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-yellow-500">Almost Full</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
