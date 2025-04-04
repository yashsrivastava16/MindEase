"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { saveStressData } from "@/lib/stress-data"
import ProtectedRoute from "@/components/protected-route"

export default function TrackPage() {
  const [stressLevel, setStressLevel] = useState(5)
  const [stressSource, setStressSource] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [location, setLocation] = useState("")
  const [activity, setActivity] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save the stress data
    await saveStressData({
      timestamp: new Date(),
      stressLevel,
      stressSource,
      symptoms,
      location,
      activity,
    })

    setSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setStressLevel(5)
      setStressSource("")
      setSymptoms("")
      setLocation("")
      setActivity("")
      setSubmitted(false)
    }, 2000)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Track Your Stress</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Stress Check-in</CardTitle>
                <CardDescription>Log your current stress level and related information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stress-level">Stress Level (1-10)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="stress-level"
                      min={1}
                      max={10}
                      step={1}
                      value={[stressLevel]}
                      onValueChange={(value) => setStressLevel(value[0])}
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-medium">{stressLevel}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stress-source">What's causing your stress?</Label>
                  <Input
                    id="stress-source"
                    value={stressSource}
                    onChange={(e) => setStressSource(e.target.value)}
                    placeholder="Work, relationships, health, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Physical or emotional symptoms</Label>
                  <Textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Headache, racing thoughts, muscle tension, etc."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Where are you?</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Home, work, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">What are you doing?</Label>
                    <Input
                      id="activity"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="Working, relaxing, etc."
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full" disabled={submitted}>
                  {submitted ? "Saved Successfully!" : "Save Entry"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

