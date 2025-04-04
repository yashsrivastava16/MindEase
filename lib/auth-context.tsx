"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Update the User interface to include more fields for social login
export interface User {
  id: string
  email: string
  name: string
  provider?: string // 'google', 'github', etc.
  avatarUrl?: string
}

// Add social login methods to the AuthContextType
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, name: string, password: string) => Promise<boolean>
  logout: () => void
  loginWithSocial: (provider: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mindease_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just check if the email contains "test" and password is "password"
      if (email.includes("test") && password === "password") {
        const newUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email,
          name: email.split("@")[0],
        }

        // Store user in localStorage
        localStorage.setItem("mindease_user", JSON.stringify(newUser))
        setUser(newUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Register function
  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just create a new user
      const newUser = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        name,
      }

      // Store user in localStorage
      localStorage.setItem("mindease_user", JSON.stringify(newUser))
      setUser(newUser)
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("mindease_user")
    setUser(null)
  }

  // Add the loginWithSocial method implementation to the AuthProvider
  // Inside the AuthProvider function, add this method:

  // Social login function
  const loginWithSocial = async (provider: string): Promise<boolean> => {
    try {
      // In a real app, this would redirect to the OAuth provider
      // For demo purposes, we'll create a mock user based on the provider

      let newUser: User

      if (provider === "google") {
        newUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email: `user.${Math.random().toString(36).substring(2, 6)}@gmail.com`,
          name: "Google User",
          provider: "google",
          avatarUrl: "/placeholder.svg?height=40&width=40",
        }
      } else if (provider === "github") {
        newUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email: `user.${Math.random().toString(36).substring(2, 6)}@github.com`,
          name: "GitHub User",
          provider: "github",
          avatarUrl: "/placeholder.svg?height=40&width=40",
        }
      } else {
        newUser = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email: `user.${Math.random().toString(36).substring(2, 6)}@${provider}.com`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          provider: provider,
          avatarUrl: "/placeholder.svg?height=40&width=40",
        }
      }

      // Store user in localStorage with document-like structure
      const userDoc = {
        _id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        provider: newUser.provider,
        avatarUrl: newUser.avatarUrl,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      localStorage.setItem("mindease_user", JSON.stringify(userDoc))
      setUser(newUser)
      return true
    } catch (error) {
      console.error(`${provider} login error:`, error)
      return false
    }
  }

  // Update the AuthContext.Provider value to include the new method
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithSocial }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

