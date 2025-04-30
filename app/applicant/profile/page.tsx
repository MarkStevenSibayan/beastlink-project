"use client"

import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { userProfiles } from "@/components/user-profiles"

export default function ApplicantProfilePage() {
  const profile = userProfiles.applicant

  return (
    <PageLayout title="Applicant Profile">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.role}</p>
            <p className="text-sm text-muted-foreground mt-1">High School: {profile.highSchool}</p>
            <p className="text-sm mt-4 text-center">{profile.bio}</p>
            <Button className="mt-6 w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profile.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profile.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" />
                  </div>
                </div>
                <Button className="w-full">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="highschool">High School</Label>
                  <Input id="highschool" defaultValue={profile.highSchool} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input id="gpa" type="number" step="0.01" placeholder="4.0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="graduation-year">Graduation Year</Label>
                  <Input id="graduation-year" type="number" placeholder="2025" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interests">Academic Interests</Label>
                  <textarea
                    id="interests"
                    className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="Computer Science, Artificial Intelligence, Machine Learning"
                  />
                </div>
                <Button className="w-full">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
