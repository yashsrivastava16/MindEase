"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import ProtectedRoute from "@/components/protected-route"
import { CheckCircle, Loader2 } from "lucide-react"
import { ChromeIcon as Google, Github } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  const loginWithSocial = async (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isSuccess && (
                  <div className="bg-green-50 text-green-600 px-4 py-2 rounded-md text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Profile updated successfully!
                  </div>
                )}

                {user?.provider && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-2">
                    {user.provider === "google" && (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Google className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {user.provider === "github" && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Github className="h-4 w-4 text-gray-800" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        Connected with {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        You're logged in using your {user.provider} account
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!!user?.provider} />
                  {user?.provider && (
                    <p className="text-xs text-muted-foreground">
                      Your name is managed by your {user.provider} account
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  <p className="text-xs text-muted-foreground">
                    {user?.provider
                      ? `Your email is managed by your ${user.provider} account`
                      : "Email cannot be changed"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading || !!user?.provider}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password</Label>
                {user?.provider ? (
                  <div className="text-sm text-muted-foreground">
                    Password management is handled by your {user.provider} account
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input type="password" value="••••••••" disabled />
                    <Button variant="outline">Change</Button>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Account Activity</h3>
                <p className="text-sm text-muted-foreground">Last login: Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>Manage your connected social accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Google className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.provider === "google" ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {user?.provider === "google" ? (
                  <Button variant="outline" size="sm" disabled>
                    Connected
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => loginWithSocial("google")}>
                    Connect
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Github className="h-4 w-4 text-gray-800" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.provider === "github" ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                {user?.provider === "github" ? (
                  <Button variant="outline" size="sm" disabled>
                    Connected
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => loginWithSocial("github")}>
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

