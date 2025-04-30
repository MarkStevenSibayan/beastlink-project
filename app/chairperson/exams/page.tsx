import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash, Search, Download } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChairpersonExamsPage() {
  return (
    <PageLayout title="Department Examinations">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Computer Science Department Exams</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search exams..." className="pl-8 w-full sm:w-[200px]" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="mr-2 h-4 w-4" /> Add Exam
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exam</DialogTitle>
                <DialogDescription>Enter the details for the new exam</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">
                    Course
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="coe">Computer Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input id="time" className="col-span-3" placeholder="e.g., 10:00 AM - 12:00 PM" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
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
                      <SelectItem value="entrance">Entrance</SelectItem>
                      <SelectItem value="placement">Placement</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Save Exam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <TabsTrigger value="analytics" className="flex-1">
            Analytics
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
                  <th className="px-4 py-2 text-left font-medium">Registrants</th>
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
                  <td className="px-4 py-3">245/300</td>
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
                    <Badge className="bg-amber-600">Placement</Badge>
                  </td>
                  <td className="px-4 py-3">112/150</td>
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
                  <td className="px-4 py-3">95/120</td>
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
                  <th className="px-4 py-2 text-left font-medium">Participants</th>
                  <th className="px-4 py-2 text-left font-medium">Pass Rate</th>
                  <th className="px-4 py-2 text-left font-medium">Avg. Score</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Computer Architecture</td>
                  <td className="px-4 py-3">Computer Engineering</td>
                  <td className="px-4 py-3">February 15, 2025</td>
                  <td className="px-4 py-3">124</td>
                  <td className="px-4 py-3">78%</td>
                  <td className="px-4 py-3">72/100</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Download className="h-4 w-4 mr-1" /> Results
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Database Management</td>
                  <td className="px-4 py-3">Information Technology</td>
                  <td className="px-4 py-3">February 18, 2025</td>
                  <td className="px-4 py-3">98</td>
                  <td className="px-4 py-3">82%</td>
                  <td className="px-4 py-3">76/100</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Download className="h-4 w-4 mr-1" /> Results
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">Admission Test: Object-Oriented Programming</td>
                  <td className="px-4 py-3">Computer Science</td>
                  <td className="px-4 py-3">February 20, 2025</td>
                  <td className="px-4 py-3">156</td>
                  <td className="px-4 py-3">65%</td>
                  <td className="px-4 py-3">68/100</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Download className="h-4 w-4 mr-1" /> Results
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exam Performance Trends</CardTitle>
                <CardDescription>Average scores across different exam types</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Performance chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass Rate by Course</CardTitle>
                <CardDescription>Comparison of pass rates across different courses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Pass rate chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Exam Statistics Summary</CardTitle>
                <CardDescription>Key metrics for department exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm text-muted-foreground">Total Exams</div>
                    <div className="text-2xl font-bold">24</div>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm text-muted-foreground">Total Participants</div>
                    <div className="text-2xl font-bold">1,856</div>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm text-muted-foreground">Average Pass Rate</div>
                    <div className="text-2xl font-bold">72.5%</div>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm text-muted-foreground">Average Score</div>
                    <div className="text-2xl font-bold">74/100</div>
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
