"use client"

import type React from "react"
import { Bell, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "Application Update",
    message: "Your Computer Science application has been received.",
    time: "10 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    title: "Exam Reminder",
    message: "Your admission exam for IT is scheduled tomorrow at 10:00 AM.",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    title: "Document Required",
    message: "Please upload your transcript for the Engineering application.",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: 4,
    title: "Payment Confirmation",
    message: "Your application fee payment has been confirmed.",
    time: "Yesterday",
    isRead: true,
  },
]

interface PageLayoutProps {
  children: React.ReactNode
  title: string
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notificationsData, setNotificationsData] = useState(notifications)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // Count unread notifications
  const unreadCount = notificationsData.filter((notification) => !notification.isRead).length

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationsData((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    )
  }

  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotificationsData((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Handle logout
  const handleLogout = () => {
    router.push("/login")
  }

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Get user role from pathname
  const getUserRole = () => {
    const path = pathname.split("/")[1]
    switch (path) {
      case "admin":
        return "Administrator"
      case "staff":
        return "Staff Member"
      case "chairperson":
        return "Department Chairperson"
      case "interviewer":
        return "Interviewer"
      case "applicant":
      default:
        return "Applicant"
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-[220px]">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                // Dispatch custom event to toggle sidebar
                window.dispatchEvent(
                  new CustomEvent("toggleSidebar", {
                    detail: { isOpen: !isMenuOpen },
                  }),
                )
              }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground md:inline-block">{getUserRole()}</span>
            <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationsData.length > 0 ? (
                  notificationsData.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex cursor-default flex-col items-start p-3 ${!notification.isRead ? "bg-blue-50" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex w-full justify-between">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">View all notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="primary" className="bg-red-600 text-white hover:bg-red-700" onClick={handleLogout}>
              Log out
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
