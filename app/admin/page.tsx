"use client"

import { useState } from "react"
import { useSharedData } from "@/context/shared-data-context"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { LineChart } from "@/components/line-chart"
import { Users, GraduationCap, BookOpen } from "lucide-react"

export default function AdminDashboard() {
  const { applicants, courses } = useSharedData()
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate statistics
  const totalApplicants = applicants.length
  const passedApplicants = applicants.filter((a) => a.status === "approved").length
  const failedApplicants = applicants.filter((a) => a.status === "rejected").length
  const pendingApplicants = applicants.filter((a) => a.status === "pending").length
  const totalCourses = courses.length

  // Calculate applicants by course
  const applicantsByCourse = courses.map((course) => {
    const count = applicants.filter((a) => a.course === course.title).length
    return { name: course.title, value: count }
  })

  // Calculate pass/fail rates
  const passFailData = [
    { name: "Passed", value: passedApplicants },
    { name: "Failed", value: failedApplicants },
    { name: "Pending", value: pendingApplicants },
  ]

  return (
    <PageLayout title="Admin Dashboard">
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
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <h3 className="text-2xl font-bold">{totalCourses}</h3>
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
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Distribution of application statuses</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <PieChart data={passFailData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Applicants by Course</CardTitle>
                  <CardDescription>Number of applicants per course</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <BarChart data={applicantsByCourse} />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>Monthly application submissions</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <LineChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applicants">
            <Card>
              <CardHeader>
                <CardTitle>Applicant List</CardTitle>
                <CardDescription>All applicants in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Name</th>
                        <th className="px-4 py-2 text-left font-medium">Course</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Exam Score</th>
                        <th className="px-4 py-2 text-left font-medium">Application Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map((applicant) => (
                        <tr key={applicant.id} className="border-b">
                          <td className="px-4 py-3">{applicant.name}</td>
                          <td className="px-4 py-3">{applicant.course}</td>
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
                          <td className="px-4 py-3">{applicant.examScore || "N/A"}</td>
                          <td className="px-4 py-3">{applicant.applicationDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Course List</CardTitle>
                <CardDescription>All available courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Code</th>
                        <th className="px-4 py-2 text-left font-medium">Title</th>
                        <th className="px-4 py-2 text-left font-medium">Category</th>
                        <th className="px-4 py-2 text-left font-medium">Specific Course</th>
                        <th className="px-4 py-2 text-left font-medium">Admission Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="px-4 py-3">{course.code}</td>
                          <td className="px-4 py-3">{course.title}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                              {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{course.specificCourse}</td>
                          <td className="px-4 py-3">{course.admissionDate}</td>
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
