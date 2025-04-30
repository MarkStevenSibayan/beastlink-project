"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchBar } from "@/components/search-bar"
import { useSharedData } from "@/context/shared-data-context"

export default function StaffStudentsPage() {
  const { applicants } = useSharedData()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [filteredApplicants, setFilteredApplicants] = useState(applicants)

  // Filter applicants based on search query and active tab
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterApplicants(query, activeTab)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    filterApplicants(searchQuery, tab)
  }

  const filterApplicants = (query: string, tab: string) => {
    let filtered = applicants

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(query.toLowerCase()) ||
          applicant.course.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by tab
    if (tab === "active") {
      filtered = filtered.filter((applicant) => applicant.status === "approved")
    } else if (tab === "pending") {
      filtered = filtered.filter((applicant) => applicant.status === "pending")
    } else if (tab === "archived") {
      filtered = filtered.filter((applicant) => applicant.status === "rejected")
    }

    setFilteredApplicants(filtered)
  }

  return (
    <PageLayout title="Student Records">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Manage Student Records</h2>
        <div className="flex gap-2">
          <SearchBar placeholder="Search records..." onSearch={handleSearch} className="w-full sm:w-[300px]" />
          <Button className="bg-emerald-600 hover:bg-emerald-700">Process Applications</Button>
        </div>
      </div>

      <Tabs defaultValue="active" onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Students</TabsTrigger>
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="archived">Archived Records</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Student Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Student Name</th>
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Program</th>
                      <th className="px-4 py-2 text-left font-medium">Enrollment Date</th>
                      <th className="px-4 py-2 text-left font-medium">Documents Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants
                      .filter((a) => a.status === "approved")
                      .map((applicant) => (
                        <tr key={applicant.id} className="border-b">
                          <td className="px-4 py-3">{applicant.name}</td>
                          <td className="px-4 py-3">{applicant.id}</td>
                          <td className="px-4 py-3">{applicant.course}</td>
                          <td className="px-4 py-3">{applicant.applicationDate}</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-emerald-500">Complete</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Update
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {filteredApplicants.filter((a) => a.status === "approved").length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          No active students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Applicant Name</th>
                      <th className="px-4 py-2 text-left font-medium">Program</th>
                      <th className="px-4 py-2 text-left font-medium">Application Date</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants
                      .filter((a) => a.status === "pending")
                      .map((applicant) => (
                        <tr key={applicant.id} className="border-b">
                          <td className="px-4 py-3">{applicant.name}</td>
                          <td className="px-4 py-3">{applicant.course}</td>
                          <td className="px-4 py-3">{applicant.applicationDate}</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-blue-500">Under Review</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                              <Button size="sm" variant="outline" className="bg-emerald-50 text-emerald-600">
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="bg-red-50 text-red-600">
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {filteredApplicants.filter((a) => a.status === "pending").length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-center text-muted-foreground">
                          No pending applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Student Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Student Name</th>
                      <th className="px-4 py-2 text-left font-medium">ID</th>
                      <th className="px-4 py-2 text-left font-medium">Program</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Archive Date</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants
                      .filter((a) => a.status === "rejected")
                      .map((applicant) => (
                        <tr key={applicant.id} className="border-b">
                          <td className="px-4 py-3">{applicant.name}</td>
                          <td className="px-4 py-3">{applicant.id}</td>
                          <td className="px-4 py-3">{applicant.course}</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-red-500">Rejected</Badge>
                          </td>
                          <td className="px-4 py-3">{applicant.applicationDate}</td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    {filteredApplicants.filter((a) => a.status === "rejected").length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                          No archived records found
                        </td>
                      </tr>
                    )}
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
