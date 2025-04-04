"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Brain } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Track", path: "/track" },
    { name: "Analyze", path: "/analyze" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Scheduler", path: "/scheduler" },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          <span className="text-xl font-bold">MindEase</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

