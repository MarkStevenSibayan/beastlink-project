"use client"

import { useState } from "react"
import { useSharedData } from "@/context/shared-data-context"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, GraduationCap, BookOpen, Edit, Plus, Trash, BookOpenCheck } from "lucide-react"

// This would normally come from an authentication system
// For demo purposes, we're hardcoding the chairperson's department
const CHAIRPERSON_DEPARTMENT = "Information Technology"

export default function ChairpersonDashboard() {
  const { applicants, courses, events, exams, updateCourse, updateEvent, updateExam, addCourse, addEvent, addExam } =
    useSharedData()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingCourse, setIsEditingCourse] = useState(false)
  const [isEditingEvent, setIsEditingEvent] = useState(false)
  const [isEditingExam, setIsEditingExam] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  // Filter data based on chairperson's department
  const departmentCourses = courses.filter((course) => course.title === CHAIRPERSON_DEPARTMENT)
  const departmentApplicants = applicants.filter((applicant) => applicant.course === CHAIRPERSON_DEPARTMENT)

  // Filter events and exams related to the department
  const departmentExams = exams.filter((exam) => exam.course === CHAIRPERSON_DEPARTMENT)
  const departmentEvents = events.filter(
    (event) =>
      // For events, we'll consider them department-related if they're academic events
      // or if they have the department name in the title
      event.type === "academic" && event.title.includes(CHAIRPERSON_DEPARTMENT),
  )

  // Calculate statistics
  const totalApplicants = departmentApplicants.length
  const passedApplicants = departmentApplicants.filter((a) => a.status === "approved").length
  const failedApplicants = departmentApplicants.filter((a) => a.status === "rejected").length
  const pendingApplicants = departmentApplicants.filter((a) => a.status === "pending").length

  // Calculate pass/fail rates
  const passFailData = [
    { name: "Passed", value: passedApplicants },
    { name: "Failed", value: failedApplicants },
    { name: "Pending", value: pendingApplicants },
  ]

  // Calculate applicants by exam score ranges (for IT department only)
  const examScoreRanges = [
    { name: "90-100", value: departmentApplicants.filter((a) => a.examScore && a.examScore >= 90).length },
    {
      name: "80-89",
      value: departmentApplicants.filter((a) => a.examScore && a.examScore >= 80 && a.examScore < 90).length,
    },
    {
      name: "70-79",
      value: departmentApplicants.filter((a) => a.examScore && a.examScore >= 70 && a.examScore < 80).length,
    },
    {
      name: "60-69",
      value: departmentApplicants.filter((a) => a.examScore && a.examScore >= 60 && a.examScore < 70).length,
    },
    { name: "Below 60", value: departmentApplicants.filter((a) => a.examScore && a.examScore < 60).length },
  ]

  return (
    <PageLayout title={`${CHAIRPERSON_DEPARTMENT} Department Dashboard`}>
      <div className="mb-6">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <BookOpenCheck className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800">Department View</h3>
                <p className="text-sm text-amber-700">
                  You are viewing data for the <span className="font-semibold">{CHAIRPERSON_DEPARTMENT}</span>{" "}
                  department only
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                <h3 className="text-2xl font-bold">{totalApplicants}</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passed Applicants</p>
                <h3 className="text-2xl font-bold">{passedApplicants}</h3>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed Applicants</p>
                <h3 className="text-2xl font-bold">{failedApplicants}</h3>
              </div>
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                <h3 className="text-2xl font-bold">{pendingApplicants}</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Distribution of {CHAIRPERSON_DEPARTMENT} application statuses</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <PieChart data={passFailData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exam Score Distribution</CardTitle>
                  <CardDescription>{CHAIRPERSON_DEPARTMENT} applicants by exam score ranges</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart data={examScoreRanges} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applicants">
            <Card>
              <CardHeader>
                <CardTitle>{CHAIRPERSON_DEPARTMENT} Applicants</CardTitle>
                <CardDescription>List of all applicants for {CHAIRPERSON_DEPARTMENT}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Name</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Exam Score</th>
                        <th className="px-4 py-2 text-left font-medium">Application Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentApplicants.map((applicant) => (
                        <tr key={applicant.id} className="border-b">
                          <td className="px-4 py-3">{applicant.name}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                applicant.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : applicant.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{applicant.examScore || "Not taken"}</td>
                          <td className="px-4 py-3">{applicant.applicationDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{CHAIRPERSON_DEPARTMENT} Exams</CardTitle>
                  <CardDescription>Schedule and manage {CHAIRPERSON_DEPARTMENT} admission exams</CardDescription>
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
                            <SelectItem value="Entrance">Entrance</SelectItem>
                            <SelectItem value="Placement">Placement</SelectItem>
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
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Title</th>
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Time</th>
                        <th className="px-4 py-2 text-left font-medium">Location</th>
                        <th className="px-4 py-2 text-left font-medium">Type</th>
                        <th className="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentExams.map((exam) => (
                        <tr key={exam.id} className="border-b">
                          <td className="px-4 py-3">{exam.title}</td>
                          <td className="px-4 py-3">{exam.date}</td>
                          <td className="px-4 py-3">{exam.time}</td>
                          <td className="px-4 py-3">{exam.location}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                exam.type === "Entrance"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {exam.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{CHAIRPERSON_DEPARTMENT} Events</CardTitle>
                  <CardDescription>Schedule and manage {CHAIRPERSON_DEPARTMENT} events</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="mr-2 h-4 w-4" /> Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>Enter the details for the new event</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input id="date" type="date" className="col-span-3" />
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
                            <SelectItem value="admission">Admission</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="career">Career</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        Save Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Title</th>
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                        <th className="px-4 py-2 text-left font-medium">Type</th>
                        <th className="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentEvents.map((event) => (
                        <tr key={event.id} className="border-b">
                          <td className="px-4 py-3">{event.title}</td>
                          <td className="px-4 py-3">{event.date.toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                event.type === "admission"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : event.type === "academic"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
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
