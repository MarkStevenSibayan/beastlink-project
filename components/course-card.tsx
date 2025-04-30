"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface CourseCardProps {
  code: string
  title: string
  count: string
  description: string
  color: string
  specificCourse: string
  admissionDate: string
  logo?: string
  onViewDetails: () => void
}

export function CourseCard({
  code,
  title,
  count,
  description,
  color,
  specificCourse,
  admissionDate,
  logo,
  onViewDetails,
}: CourseCardProps) {
  // Helper function to format dates
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

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
