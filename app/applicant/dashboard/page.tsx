"use client"

import { useSharedData } from "@/context/shared-data-context"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { CourseDetailDialog } from "@/components/course-detail-dialog"
import { courseLogo } from "@/components/course-logos"
import { Calendar, Check } from "lucide-react"

// Helper function to format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function CourseCard({
  code,
  title,
  count,
  description,
  color,
  specificCourse,
  admissionDate,
  logo,
  onViewDetails,
}: {
  code: string
  title: string
  count: string
  description: string
  color: string
  specificCourse: string
  admissionDate: string
  logo?: string
  onViewDetails: () => void
}) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-md ${color} text-white`}>
          {logo ? <img src={logo || "/placeholder.svg"} alt={`${title} logo`} className="h-8 w-8" /> : code}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{count}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-blue-50 text-xs text-blue-600 hover:bg-blue-100"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          </div>
          <p className="mt-2 text-sm">{description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {specificCourse}
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              <Calendar className="mr-1 h-3 w-3" />
              {formatDate(admissionDate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Application Progress component with new UI design
function ApplicationProgress({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, name: "Application" },
    { id: 2, name: "Document" },
    { id: 3, name: "Exam" },
    { id: 4, name: "Interview" },
    { id: 5, name: "Decision" },
    { id: 6, name: "Enrollment" },
  ]

  return (
    <Card className="border border-purple-100">
      <CardContent className="p-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 h-0.5 w-full bg-gray-200">
            <div
              className="absolute top-0 left-0 h-0.5 bg-green-500 transition-all duration-500"
              style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    {isCompleted ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-5 w-5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-500 bg-white">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white"></div>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${isCompleted ? "text-green-600 font-medium" : isCurrent ? "text-green-600 font-medium" : "text-gray-500"}`}
                  >
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ApplicantDashboard() {
  const { courses, applicants } = useSharedData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["all"])
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Current application step (for demo purposes)
  // In a real app, this would come from the user's actual application data
  const currentApplicationStep = 3 // Example: Entrance Exam stage

  // Filter courses based on search term and selected filters
  useEffect(() => {
    let result = courses

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.code.toLowerCase().includes(term) ||
          course.specificCourse.toLowerCase().includes(term),
      )
    }

    // Apply category filters
    if (!selectedFilters.includes("all")) {
      result = result.filter((course) => selectedFilters.includes(course.category))
    }

    setFilteredCourses(result)
  }, [searchTerm, selectedFilters, courses])

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const handleViewCourseDetails = (course: any) => {
    setSelectedCourse({
      ...course,
      logo: courseLogo[course.code as keyof typeof courseLogo],
    })
    setIsDetailDialogOpen(true)
  }

  return (
    <PageLayout title="Applicant Dashboard">
      {/* Application Progress Bar */}
      <div className="mb-6">
        <ApplicationProgress currentStep={currentApplicationStep} />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-medium">Available Courses</h2>
        <div className="relative">
          <SearchBar placeholder="Search Courses" onSearch={handleSearch} className="w-full sm:w-[300px]" />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          variant={selectedFilters.includes("all") ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilters(["all"])}
        >
          All
        </Button>
        <Button
          variant={selectedFilters.includes("technology") ? "default" : "outline"}
          size="sm"
          onClick={() => {
            if (selectedFilters.includes("technology")) {
              setSelectedFilters(selectedFilters.filter((f) => f !== "technology"))
              if (selectedFilters.length === 1) setSelectedFilters(["all"])
            } else {
              setSelectedFilters(
                selectedFilters.includes("all")
                  ? ["technology"]
                  : [...selectedFilters.filter((f) => f !== "all"), "technology"],
              )
            }
          }}
        >
          Technology
        </Button>
        <Button
          variant={selectedFilters.includes("education") ? "default" : "outline"}
          size="sm"
          onClick={() => {
            if (selectedFilters.includes("education")) {
              setSelectedFilters(selectedFilters.filter((f) => f !== "education"))
              if (selectedFilters.length === 1) setSelectedFilters(["all"])
            } else {
              setSelectedFilters(
                selectedFilters.includes("all")
                  ? ["education"]
                  : [...selectedFilters.filter((f) => f !== "all"), "education"],
              )
            }
          }}
        >
          Education
        </Button>
        <Button
          variant={selectedFilters.includes("business and accountancy") ? "default" : "outline"}
          size="sm"
          onClick={() => {
            if (selectedFilters.includes("business and accountancy")) {
              setSelectedFilters(selectedFilters.filter((f) => f !== "business and accountancy"))
              if (selectedFilters.length === 1) setSelectedFilters(["all"])
            } else {
              setSelectedFilters(
                selectedFilters.includes("all")
                  ? ["business and accountancy"]
                  : [...selectedFilters.filter((f) => f !== "all"), "business and accountancy"],
              )
            }
          }}
        >
          Business & Accountancy
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {filteredCourses.length > 0 ? (
            filteredCourses
              .slice(0, Math.ceil(filteredCourses.length / 2))
              .map((course) => (
                <CourseCard
                  key={course.id}
                  code={course.code}
                  title={course.title}
                  count={course.count}
                  description={course.description}
                  color={course.color}
                  specificCourse={course.specificCourse}
                  admissionDate={course.admissionDate}
                  logo={courseLogo[course.code as keyof typeof courseLogo]}
                  onViewDetails={() => handleViewCourseDetails(course)}
                />
              ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No courses match your search criteria.</p>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {filteredCourses.length > 0 &&
            filteredCourses
              .slice(Math.ceil(filteredCourses.length / 2))
              .map((course) => (
                <CourseCard
                  key={course.id}
                  code={course.code}
                  title={course.title}
                  count={course.count}
                  description={course.description}
                  color={course.color}
                  specificCourse={course.specificCourse}
                  admissionDate={course.admissionDate}
                  logo={courseLogo[course.code as keyof typeof courseLogo]}
                  onViewDetails={() => handleViewCourseDetails(course)}
                />
              ))}

          <Card className="overflow-hidden bg-emerald-700 text-white">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Learn Effectively With BeastLink College!</h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6 8 8 0 0 0 4 14h4a8 8 0 0 0 4-14Z" />
                    <path d="M10 8h4" />
                    <path d="M10 12h4" />
                    <path d="M10 16h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-medium">Student</div>
                  <div className="text-xl font-bold">50,000+</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">View Application Status</h2>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-0">
                  <div className="rounded-lg border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left font-medium">Application name</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicants
                          .filter((a) => a.status === "pending")
                          .slice(0, 2)
                          .map((applicant) => (
                            <tr key={applicant.id} className="border-b">
                              <td className="px-4 py-3">
                                <div className="font-medium">{applicant.course}</div>
                                <div className="text-sm text-muted-foreground">{applicant.applicationDate}</div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-medium text-white">
                                  Pending
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="approved" className="mt-0">
                  <div className="rounded-lg border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left font-medium">Application name</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicants
                          .filter((a) => a.status === "approved")
                          .slice(0, 1)
                          .map((applicant) => (
                            <tr key={applicant.id}>
                              <td className="px-4 py-3">
                                <div className="font-medium">{applicant.course}</div>
                                <div className="text-sm text-muted-foreground">{applicant.applicationDate}</div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                                  Approved
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold">Application Form</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  A section with a direct link to the online application portal to view and submit personal details,
                  academic records, and documents.
                </p>
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700">View</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CourseDetailDialog
          isOpen={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          course={{
            ...selectedCourse,
            logo: selectedCourse.logo,
          }}
        />
      )}
    </PageLayout>
  )
}
