"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Define the types for our shared data
type Course = {
  id: string
  code: string
  title: string
  count: string
  description: string
  color: string
  category: string
  admissionDate: string
  specificCourse: string
}

type Applicant = {
  id: string
  name: string
  course: string
  status: "pending" | "approved" | "rejected"
  examScore?: number
  applicationDate: string
}

type Event = {
  id: number
  title: string
  date: Date
  type: "admission" | "academic" | "career"
}

type Interview = {
  id: string
  applicantName: string
  course: string
  date: Date
  time: string
  interviewer: string
  location: string
  status: "scheduled" | "completed" | "cancelled"
  result?: "passed" | "failed"
  remarks?: string
}

type Exam = {
  id: string
  title: string
  course: string
  code: string
  date: string
  time: string
  location: string
  type: "Entrance" | "Placement"
}

type SharedDataContextType = {
  courses: Course[]
  applicants: Applicant[]
  events: Event[]
  interviews: Interview[]
  exams: Exam[]
  updateCourse: (id: string, updatedCourse: Partial<Course>) => void
  updateEvent: (id: number, updatedEvent: Partial<Event>) => void
  updateExam: (id: string, updatedExam: Partial<Exam>) => void
  updateInterview: (id: string, updatedInterview: Partial<Interview>) => void
  addCourse: (course: Course) => void
  addEvent: (event: Event) => void
  addExam: (exam: Exam) => void
  addInterview: (interview: Interview) => void
  removeCourse: (id: string) => void
  removeEvent: (id: number) => void
  removeExam: (id: string) => void
  removeInterview: (id: string) => void
}

// Initial data
const initialCourses: Course[] = [
  {
    id: "cot1",
    code: "CS",
    title: "Computer Science",
    count: "5,000+ Courses",
    description:
      "Covers algorithms, programming, and problem-solving, essential for computing and software development.",
    color: "bg-green-500",
    category: "technology",
    admissionDate: "2025-04-25",
    specificCourse: "College of Technology",
  },
  {
    id: "cot2",
    code: "CoE",
    title: "Computer Engineering",
    count: "5,000+ Courses",
    description:
      "Covers hardware, software, and embedded systems, essential for designing and optimizing computing technologies.",
    color: "bg-green-500",
    category: "technology",
    admissionDate: "2025-04-25",
    specificCourse: "College of Technology",
  },
  {
    id: "cot3",
    code: "IT",
    title: "Information Technology",
    count: "5,000+ Courses",
    description:
      "Covers networking, cybersecurity, and software development, essential for IT support and system management.",
    color: "bg-green-500",
    category: "technology",
    admissionDate: "2025-04-25",
    specificCourse: "College of Technology",
  },
  {
    id: "coed1",
    code: "Elem",
    title: "Elementary Education",
    count: "5,000+ Courses",
    description:
      "Prepares future teachers for primary education, focusing on child development, pedagogy, and subject-specific teaching for Grades 1-6.",
    color: "bg-red-500",
    category: "education",
    admissionDate: "2025-04-25",
    specificCourse: "College of Education",
  },
  {
    id: "coed2",
    code: "Sec",
    title: "Secondary Education",
    count: "5,000+ Courses",
    description:
      "Trains educators to teach in junior and senior high school (Grades 7-12), specializing in subjects like Math, Science, English, or Social Studies.",
    color: "bg-red-500",
    category: "education",
    admissionDate: "2025-04-25",
    specificCourse: "College of Education",
  },
  {
    id: "coed3",
    code: "Sped",
    title: "Special Education",
    count: "5,000+ Courses",
    description:
      "Equips teachers with strategies to support students with disabilities and special needs, promoting inclusive and adaptive learning.",
    color: "bg-red-500",
    category: "education",
    admissionDate: "2025-04-25",
    specificCourse: "College of Education",
  },
  {
    id: "cba1",
    code: "Acc",
    title: "Accountancy",
    count: "5,000+ Courses",
    description:
      "Prepares students for careers in accounting, auditing, and taxation, with a strong focus on financial reporting and CPA licensure.",
    color: "bg-yellow-500",
    category: "business and accountancy",
    admissionDate: "2025-04-25",
    specificCourse: "College of business and accountancy",
  },
  {
    id: "cba2",
    code: "HRDM",
    title: "Human Resource Development Management",
    count: "5,000+ Courses",
    description:
      "Equips students with skills in recruitment, training, and labor relations, essential for effective workforce management and organizational development.",
    color: "bg-yellow-500",
    category: "business and accountancy",
    admissionDate: "2025-04-25",
    specificCourse: "College of business and accountancy",
  },
  {
    id: "cba3",
    code: "FM",
    title: "Financial Management",
    count: "5,000+ Courses",
    description:
      "Teaches financial analysis, investment strategies, and risk management, preparing students for careers in banking, corporate finance, and investment planning.",
    color: "bg-yellow-500",
    category: "business and accountancy",
    admissionDate: "2025-04-25",
    specificCourse: "College of business and accountancy",
  },
]

const initialApplicants: Applicant[] = [
  {
    id: "a1",
    name: "John Doe",
    course: "Computer Science",
    status: "pending",
    applicationDate: "2025-02-15",
  },

  {
    id: "a2",
    name: "Jane Smith",
    course: "Information Technology",
    status: "approved",
    examScore: 92,
    applicationDate: "2025-02-10",
  },
  {
    id: "a3",
    name: "Michael Johnson",
    course: "Computer Engineering",
    status: "rejected",
    examScore: 65,
    applicationDate: "2025-02-05",
  },
  {
    id: "a4",
    name: "Emily Davis",
    course: "Accountancy",
    status: "approved",
    examScore: 88,
    applicationDate: "2025-01-25",
  },
  {
    id: "a5",
    name: "Robert Wilson",
    course: "Human Resource Development Management",
    status: "pending",
    applicationDate: "2025-02-20",
  },
  {
    id: "a6",
    name: "Sarah Brown",
    course: "Computer Science",
    status: "approved",
    examScore: 95,
    applicationDate: "2025-01-15",
  },
  {
    id: "a7",
    name: "David Miller",
    course: "Information Technology",
    status: "pending",
    applicationDate: "2025-02-18",
  },
  {
    id: "a8",
    name: "Jennifer Taylor",
    course: "Computer Engineering",
    status: "approved",
    examScore: 85,
    applicationDate: "2025-01-30",
  },
  {
    id: "a9",
    name: "James Anderson",
    course: "Secondary Education",
    status: "rejected",
    examScore: 60,
    applicationDate: "2025-02-08",
  },
  {
    id: "a10",
    name: "Lisa Thomas",
    course: "Special Education",
    status: "approved",
    examScore: 90,
    applicationDate: "2025-01-20",
  },
  {
    id: "a11",
    name: "Steve Thomas",
    course: "Information Technology",
    status: "approved",
    examScore: 85,
    applicationDate: "2025-01-20",
  },
  {
    id: "a12",
    name: "Mark Steven Sibayan",
    course: "Information Technology",
    status: "approved",
    examScore: 95,
    applicationDate: "2025-01-20",
  },
  {
    id: "a13",
    name: "Mark Babon",
    course: "Information Technology",
    status: "approved",
    examScore: 75,
    applicationDate: "2025-01-20",
  },
  {
    id: "a14",
    name: "Mark Luis",
    course: "Computer Engineering",
    status: "approved",
    examScore: 80,
    applicationDate: "2025-01-20",
  },
  {
    id: "a15",
    name: "Henry Zy",
    course: "Elementary Education",
    status: "approved",
    examScore: 83,
    applicationDate: "2025-01-20",
  },
  {
    id: "a16",
    name: "Lucas Wayzu",
    course: "Accountancy",
    status: "approved",
    examScore: 90,
    applicationDate: "2025-01-20",
  },
  {
    id: "a17",
    name: "Henry Yi",
    course: "Financial Management",
    status: "approved",
    examScore: 92,
    applicationDate: "2025-01-20",
  },
]

const initialEvents: Event[] = [
  { id: 1, title: "Admission Open House", date: new Date(2025, 2, 15), type: "admission" },
  { id: 2, title: "Computer Science Seminar", date: new Date(2025, 2, 18), type: "academic" },
  { id: 3, title: "Campus Tour", date: new Date(2025, 2, 20), type: "admission" },
  { id: 4, title: "IT Workshop", date: new Date(2025, 2, 22), type: "academic" },
  { id: 5, title: "Accounting Career Fair", date: new Date(2025, 2, 25), type: "career" },
  { id: 6, title: "Engineering Expo", date: new Date(2025, 2, 28), type: "academic" },
]

const initialInterviews: Interview[] = [
  {
    id: "i1",
    applicantName: "John Doe",
    course: "Computer Science",
    date: new Date(2025, 2, 16),
    time: "10:00 AM",
    interviewer: "Dr. Smith",
    location: "Room 101, Main Building",
    status: "scheduled",
  },
  {
    id: "i2",
    applicantName: "Jane Smith",
    course: "Information Technology",
    date: new Date(2025, 2, 17),
    time: "2:00 PM",
    interviewer: "Dr. Johnson",
    location: "Room 102, IT Building",
    status: "completed",
    result: "passed",
    remarks: "Excellent communication skills and technical knowledge. Strong problem-solving abilities.",
  },
  {
    id: "i3",
    applicantName: "Michael Johnson",
    course: "Computer Engineering",
    date: new Date(2025, 2, 18),
    time: "11:00 AM",
    interviewer: "Dr. Williams",
    location: "Room 103, Engineering Building",
    status: "completed",
    result: "failed",
    remarks: "Lacks fundamental understanding of core engineering concepts. Needs more preparation.",
  },
  {
    id: "i4",
    applicantName: "Emily Davis",
    course: "Accountancy",
    date: new Date(2025, 2, 19),
    time: "3:00 PM",
    interviewer: "Dr. Brown",
    location: "Room 104, Business Building",
    status: "completed",
  },
  {
    id: "i5",
    applicantName: "Robert Wilson",
    course: "Human Management",
    date: new Date(2025, 2, 20),
    time: "9:00 AM",
    interviewer: "Dr. Jones",
    location: "Room 105, Management Building",
    status: "scheduled",
  },
  {
    id: "i6",
    applicantName: "Sarah Brown",
    course: "Computer Science",
    date: new Date(2025, 2, 21),
    time: "1:00 PM",
    interviewer: "Dr. Smith",
    location: "Room 101, Main Building",
    status: "completed",
    result: "passed",
    remarks: "Strong academic background and passion for the field. Recommended for admission.",
  },
  {
    id: "i7",
    applicantName: "David Miller",
    course: "Information Technology",
    date: new Date(2025, 2, 22),
    time: "10:30 AM",
    interviewer: "Dr. Johnson",
    location: "Room 102, IT Building",
    status: "scheduled",
  },
  {
    id: "i8",
    applicantName: "Jennifer Taylor",
    course: "Computer Engineering",
    date: new Date(2025, 2, 23),
    time: "2:30 PM",
    interviewer: "Dr. Williams",
    location: "Room 103, Engineering Building",
    status: "completed",
    result: "passed",
    remarks: "Excellent technical skills and project experience. Great fit for the program.",
  },
]

const initialExams: Exam[] = [
  {
    id: "e1",
    title: "Admission Test: Computer Science",
    course: "Computer Science",
    code: "CS101",
    date: "March 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Hall A, Main Building",
    type: "Entrance",
  },
  {
    id: "e2",
    title: "Admission Test: Data Structures",
    course: "Computer Science",
    code: "CS202",
    date: "March 18, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Hall B, Computer Science Building",
    type: "Placement",
  },
  {
    id: "e3",
    title: "Admission Test: Network Security",
    course: "Information Technology",
    code: "IT305",
    date: "March 20, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "Lab 4, IT Building",
    type: "Entrance",
  },
  {
    id: "e4",
    title: "Admission Test: Digital Electronics",
    course: "Computer Engineering",
    code: "CoE201",
    date: "March 22, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Engineering Hall, Floor 2",
    type: "Placement",
  },
  {
    id: "e5",
    title: "Admission Test: Financial Accounting",
    course: "Accountancy",
    code: "ACC101",
    date: "March 25, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Business School, Room 305",
    type: "Entrance",
  },
]

// Create the context
const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined)

// Create a provider component
export function SharedDataProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews)
  const [exams, setExams] = useState<Exam[]>(initialExams)

  // Update functions
  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course)),
    )
  }

  const updateEvent = (id: number, updatedEvent: Partial<Event>) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)))
  }

  const updateExam = (id: string, updatedExam: Partial<Exam>) => {
    setExams((prevExams) => prevExams.map((exam) => (exam.id === id ? { ...exam, ...updatedExam } : exam)))
  }

  const updateInterview = (id: string, updatedInterview: Partial<Interview>) => {
    setInterviews((prevInterviews) =>
      prevInterviews.map((interview) => (interview.id === id ? { ...interview, ...updatedInterview } : interview)),
    )
  }

  // Add functions
  const addCourse = (course: Course) => {
    setCourses((prevCourses) => [...prevCourses, course])
  }

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event])
  }

  const addExam = (exam: Exam) => {
    setExams((prevExams) => [...prevExams, exam])
  }

  const addInterview = (interview: Interview) => {
    setInterviews((prevInterviews) => [...prevInterviews, interview])
  }

  // Remove functions
  const removeCourse = (id: string) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id))
  }

  const removeEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
  }

  const removeExam = (id: string) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.id !== id))
  }

  const removeInterview = (id: string) => {
    setInterviews((prevInterviews) => prevInterviews.filter((interview) => interview.id !== id))
  }

  const value = {
    courses,
    applicants,
    events,
    interviews,
    exams,
    updateCourse,
    updateEvent,
    updateExam,
    updateInterview,
    addCourse,
    addEvent,
    addExam,
    addInterview,
    removeCourse,
    removeEvent,
    removeExam,
    removeInterview,
  }

  return <SharedDataContext.Provider value={value}>{children}</SharedDataContext.Provider>
}

// Custom hook to use the shared data context
export function useSharedData() {
  const context = useContext(SharedDataContext)
  if (context === undefined) {
    throw new Error("useSharedData must be used within a SharedDataProvider")
  }
  return context
}
