"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, GraduationCap, Award, MapPin, DollarSign } from "lucide-react"

interface CourseDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  course: {
    id: string
    code: string
    title: string
    count: string
    description: string
    color: string
    category: string
    admissionDate: string
    specificCourse: string
    logo?: string
  }
}

export function CourseDetailDialog({ isOpen, onClose, course }: CourseDetailDialogProps) {
  // Additional course details (would come from API in a real app)
  const courseDetails = {
    duration: "4 years",
    credits: 120,
    startDate: "August 2025",
    faculty: "Dr. Sarah Johnson",
    department: "College of Technology",
    tuitionFee: "$12,500 per year",
    scholarships: "Available for top performers",
    location: "Main Campus, Building A",
    careerOpportunities: [
      "Software Developer",
      "Systems Analyst",
      "Database Administrator",
      "Web Developer",
      "IT Consultant",
    ],
    requirements: [
      "High School Diploma or equivalent",
      "Minimum GPA of 3.0",
      "Proficiency in Mathematics",
      "Basic computer skills",
    ],
    curriculum: [
      "Introduction to Programming",
      "Data Structures and Algorithms",
      "Database Systems",
      "Web Development",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Artificial Intelligence",
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-md ${course.color} text-white`}>
              {course.logo ? (
                <img src={course.logo || "/placeholder.svg"} alt={`${course.title} logo`} className="h-10 w-10" />
              ) : (
                course.code
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl">{course.title}</DialogTitle>
              <DialogDescription>{course.specificCourse}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Overview</h3>
            <p>{course.description}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Duration: {courseDetails.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span>Credits: {courseDetails.credits}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Start Date: {courseDetails.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span>Faculty: {courseDetails.faculty}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Location: {courseDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span>Tuition: {courseDetails.tuitionFee}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Admission Requirements</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {courseDetails.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Career Opportunities</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {courseDetails.careerOpportunities.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Curriculum Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courseDetails.curriculum.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Financial Information</h3>
            <div className="space-y-2">
              <div>
                <strong>Tuition Fee:</strong> {courseDetails.tuitionFee}
              </div>
              <div>
                <strong>Scholarships:</strong> {courseDetails.scholarships}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
