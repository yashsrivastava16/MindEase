"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAverageStressLevel } from "@/lib/stress-data"
import { Music, Video, BookOpen, Coffee, Dumbbell, Leaf, Smile, Frown, Meh } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { Progress } from "@/components/ui/progress"

interface RecommendationItem {
  title: string
  description: string
  category: string
  stressLevel: "low" | "medium" | "high" | "all"
  icon: React.ElementType
  link?: string
  external?: boolean
}

export default function RecommendationsPage() {
  const [stressLevel, setStressLevel] = useState<number>(5)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const avgStress = await getAverageStressLevel()
      setStressLevel(avgStress || 5)
      setLoading(false)
    }

    loadData()
  }, [])

  const getStressCategory = (level: number): "low" | "medium" | "high" => {
    if (level <= 3) return "low"
    if (level <= 7) return "medium"
    return "high"
  }

  const stressCategory = getStressCategory(stressLevel)

  const recommendations: RecommendationItem[] = [
    // Music recommendations
    {
      title: "Calming Classical Music",
      description: "Gentle piano and string compositions to reduce anxiety",
      category: "music",
      stressLevel: "high",
      icon: Music,
      link: "/recommendations/music",
    },
    {
      title: "Nature Sounds",
      description: "Relaxing sounds of rain, ocean waves, and forest ambience",
      category: "music",
      stressLevel: "medium",
      icon: Music,
      link: "/recommendations/music",
    },
    {
      title: "Upbeat Instrumental",
      description: "Positive and energetic music to improve your mood",
      category: "music",
      stressLevel: "low",
      icon: Music,
      link: "/recommendations/music",
    },

    // Video recommendations
    {
      title: "Guided Meditation",
      description: "10-minute guided meditation for immediate stress relief",
      category: "videos",
      stressLevel: "high",
      icon: Video,
      link: "/recommendations/videos",
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Learn to release physical tension from your body",
      category: "videos",
      stressLevel: "medium",
      icon: Video,
      link: "/recommendations/videos",
    },
    {
      title: "Mindful Walking Practice",
      description: "Transform your daily walk into a mindfulness practice",
      category: "videos",
      stressLevel: "low",
      icon: Video,
      link: "/recommendations/videos",
    },

    // Reading recommendations
    {
      title: "Quick Stress Relief Techniques",
      description: "Simple techniques you can use anywhere, anytime",
      category: "reading",
      stressLevel: "high",
      icon: BookOpen,
      external: true,
      link: "#",
    },
    {
      title: "Understanding Your Stress Triggers",
      description: "Learn to identify and manage your personal stress triggers",
      category: "reading",
      stressLevel: "medium",
      icon: BookOpen,
      external: true,
      link: "#",
    },
    {
      title: "Building Resilience",
      description: "Long-term strategies for stress management and prevention",
      category: "reading",
      stressLevel: "low",
      icon: BookOpen,
      external: true,
      link: "#",
    },

    // Activities
    {
      title: "3-Minute Breathing Space",
      description: "A quick mindfulness practice to help you pause and reset",
      category: "activities",
      stressLevel: "all",
      icon: Leaf,
      link: "/recommendations/breathing-space",
    },
    {
      title: "15-Minute Yoga Sequence",
      description: "Gentle stretches to release physical tension",
      category: "activities",
      stressLevel: "medium",
      icon: Dumbbell,
    },
    {
      title: "Mindful Tea Break",
      description: "Transform a simple tea break into a mindfulness practice",
      category: "activities",
      stressLevel: "low",
      icon: Coffee,
    },
  ]

  const getStressIcon = () => {
    if (stressCategory === "low") return <Smile className="h-8 w-8 text-green-500" />
    if (stressCategory === "medium") return <Meh className="h-8 w-8 text-yellow-500" />
    return <Frown className="h-8 w-8 text-red-500" />
  }

  const getStressColor = () => {
    if (stressCategory === "low") return "bg-green-500"
    if (stressCategory === "medium") return "bg-yellow-500"
    return "bg-red-500"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <p>Loading recommendations...</p>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Personalized Recommendations</h1>
        <p className="text-muted-foreground mb-8">
          Based on your stress patterns, we've curated these resources to help you manage stress effectively
        </p>

        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">{getStressIcon()}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Your average stress level: {stressLevel}/10</span>
                    <span className="text-sm font-medium capitalize">{stressCategory} stress</span>
                  </div>
                  <Progress value={stressLevel * 10} className={`h-2 ${getStressColor()}`} />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stressCategory === "low"
                      ? "You're managing stress well. These recommendations will help maintain your balance."
                      : stressCategory === "medium"
                        ? "You're experiencing moderate stress. These techniques can help reduce your stress levels."
                        : "Your stress levels are high. These resources are designed for immediate relief."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Recommendations</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {["all", "music", "videos", "reading", "activities"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations
                  .filter(
                    (rec) =>
                      (category === "all" || rec.category === category) &&
                      (rec.stressLevel === stressCategory || rec.stressLevel === "all"),
                  )
                  .map((rec, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <rec.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{rec.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        {rec.link ? (
                          <Link href={rec.link} className="w-full">
                            <Button variant="outline" className="w-full">
                              {rec.category === "music"
                                ? "Listen"
                                : rec.category === "videos"
                                  ? "Watch"
                                  : rec.category === "reading"
                                    ? "Read"
                                    : "View"}
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" className="w-full">
                            Try Now
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Collections</CardTitle>
              <CardDescription>Curated resources for specific needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Sleep Better</h3>
                  <p className="text-sm text-muted-foreground">Resources to improve your sleep quality</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Work Stress Management</h3>
                  <p className="text-sm text-muted-foreground">Techniques for workplace stress</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Quick Stress Relief</h3>
                  <p className="text-sm text-muted-foreground">Fast techniques for immediate relief</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Recommendation</CardTitle>
              <CardDescription>Try something new today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 text-center">
                <h3 className="font-medium text-lg mb-2">3-Minute Breathing Space</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A quick mindfulness practice you can do anywhere to reset and refocus
                </p>
                <ol className="text-sm text-left space-y-2 mb-4">
                  <li>1. Become aware of your thoughts, feelings, and bodily sensations</li>
                  <li>2. Gently direct your attention to your breathing</li>
                  <li>3. Expand your awareness to your whole body</li>
                </ol>
                <Link href="/recommendations/breathing-space">
                  <Button className="w-full">Start 3-Minute Timer</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

