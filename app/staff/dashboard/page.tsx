"use client"

import { useState } from "react"
import { useSharedData } from "@/context/shared-data-context"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { Button } from "@/components/ui/button"
import { Users, CheckCircle, XCircle, Clock } from "lucide-react"

export default function StaffDashboard() {
  const { applicants, courses, exams } = useSharedData()
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate statistics
  const totalApplicants = applicants.length
  const passedApplicants = applicants.filter((a) => a.status === "approved").length
  const failedApplicants = applicants.filter((a) => a.status === "rejected").length
  const pendingApplicants = applicants.filter((a) => a.status === "pending").length

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
    <PageLayout title="Staff Dashboard">
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
                <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                <h3 className="text-2xl font-bold">{pendingApplicants}</h3>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Applications</p>
                <h3 className="text-2xl font-bold">{passedApplicants}</h3>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected Applications</p>
                <h3 className="text-2xl font-bold">{failedApplicants}</h3>
              </div>
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <XCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
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
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Application Processing</CardTitle>
                <CardDescription>Review and process pending applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Name</th>
                        <th className="px-4 py-2 text-left font-medium">Course</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Application Date</th>
                        <th className="px-4 py-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants
                        .filter((a) => a.status === "pending")
                        .map((applicant) => (
                          <tr key={applicant.id} className="border-b">
                            <td className="px-4 py-3">{applicant.name}</td>
                            <td className="px-4 py-3">{applicant.course}</td>
                            <td className="px-4 py-3">
                              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                Pending
                              </span>
                            </td>
                            <td className="px-4 py-3">{applicant.applicationDate}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 bg-green-50 text-green-600 hover:bg-green-100"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 bg-red-50 text-red-600 hover:bg-red-100"
                                >
                                  Reject
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

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Schedule and manage admission exams</CardDescription>
              </CardHeader>
              <CardContent>
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
                      </tr>
                    </thead>
                    <tbody>
                      {exams.map((exam) => (
                        <tr key={exam.id} className="border-b">
                          <td className="px-4 py-3">{exam.title}</td>
                          <td className="px-4 py-3">{exam.course}</td>
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
