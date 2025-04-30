"use client"

import React from "react"
import Link from "next/link"
import { BookOpen, Calendar, Cog, Home, Users } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Make the sidebar component accessible from outside
  React.useEffect(() => {
    // Create a custom event for toggling the sidebar
    const handleToggleSidebar = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen)
    }

    // Add event listener
    window.addEventListener("toggleSidebar" as any, handleToggleSidebar)

    // Close sidebar when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("toggleSidebar" as any, handleToggleSidebar)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Determine the dashboard type from the pathname
  const dashboardType = pathname.split("/")[1] || "applicant"

  // Define base routes based on dashboard type
  const baseRoute = `/${dashboardType}`

  return (
    <>
      {/* Sidebar for mobile and desktop */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-50 w-[220px] flex-col bg-[#07362C] text-white transition-transform duration-300 ease-in-out md:flex overflow-y-auto`}
      >
        <div className="flex h-[100px] items-center justify-center border-b border-emerald-900">
          <div className="flex items-center justify-center">
            <div className="relative h-16 w-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eigsb1SIMfbPbccpEtruwPhK35koLO.png"
                alt="Beastlink University Logo"
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="ml-2">
              <div className="text-lg font-bold">Beastlink</div>
              <div className="text-sm">University</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavItem href={`${baseRoute}/dashboard`} icon={Home} active={pathname.endsWith("/dashboard")}>
            Dashboard
          </NavItem>
          <NavItem href={`${baseRoute}/events`} icon={Calendar} active={pathname.includes("/events")}>
            Events
          </NavItem>
          <NavItem href={`${baseRoute}/students`} icon={Users} active={pathname.includes("/students")}>
            Students
          </NavItem>
          <NavItem href={`${baseRoute}/profile`} icon={Cog} active={pathname.includes("/profile")}>
            Profile
          </NavItem>
          <NavItem href={`${baseRoute}/exams`} icon={BookOpen} active={pathname.includes("/exams")}>
            Exams
          </NavItem>
        </nav>
      </div>
    </>
  )
}

function NavItem({
  href,
  icon: Icon,
  children,
  active,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-emerald-600 text-white" : "text-emerald-100 hover:bg-emerald-800 hover:text-white",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  )
}
