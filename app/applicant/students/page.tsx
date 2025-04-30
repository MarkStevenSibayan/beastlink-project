import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, BookOpen, GraduationCap, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApplicantStudentsPage() {
  return (
    <PageLayout title="Students & Classes">
      <Alert className="mb-6 border-amber-500 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Enrollment Required</AlertTitle>
        <AlertDescription>
          You must be enrolled in courses to view your classes. Please complete the admission process.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">50,432</div>
              <Users className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,245</div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">32</div>
              <GraduationCap className="h-8 w-8 text-purple-500" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Across 5 faculties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Class Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">42</div>
              <Users className="h-8 w-8 text-amber-500" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Students per class</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Process</CardTitle>
            <CardDescription>Complete these steps to enroll in classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Complete Application</h3>
                  <p className="text-sm text-muted-foreground">Submit your application through the admissions portal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Receive Acceptance</h3>
                  <p className="text-sm text-muted-foreground">
                    Wait for your application to be processed and approved
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Pay Tuition</h3>
                  <p className="text-sm text-muted-foreground">Complete payment for your selected courses</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Register for Classes</h3>
                  <p className="text-sm text-muted-foreground">Select your courses and complete registration</p>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full bg-emerald-600 text-white hover:bg-emerald-700">
              Start Enrollment Process
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Programs</CardTitle>
            <CardDescription>Most enrolled programs this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Information Technology</h3>
                  <p className="text-sm text-muted-foreground">Software Engineering Track</p>
                </div>
                <Badge className="bg-emerald-600">4,521 Students</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Computer Science</h3>
                  <p className="text-sm text-muted-foreground">Network Security Track</p>
                </div>
                <Badge className="bg-emerald-600">3,845 Students</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Computer Engineering</h3>
                  <p className="text-sm text-muted-foreground">Hardware Design Track</p>
                </div>
                <Badge className="bg-emerald-600">3,210 Students</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Accountancy</h3>
                  <p className="text-sm text-muted-foreground">Financial Analysis Track</p>
                </div>
                <Badge className="bg-emerald-600">2,876 Students</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Secondary Education</h3>
                  <p className="text-sm text-muted-foreground">Business Leadership Track</p>
                </div>
                <Badge className="bg-emerald-600">2,543 Students</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
