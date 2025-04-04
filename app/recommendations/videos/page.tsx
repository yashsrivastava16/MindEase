"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"

interface Video {
  id: string
  title: string
  creator: string
  duration: string
  category: string
  tags: string[]
  thumbnailUrl: string
  description: string
}

export default function VideoRecommendationsPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  // Mock data - in a real app, this would come from an API
  const videos: Video[] = [
    {
      id: "1",
      title: "5-Minute Guided Meditation for Stress Relief",
      creator: "Mindfulness Coach",
      duration: "5:12",
      category: "meditation",
      tags: ["quick", "beginner", "stress-relief"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description:
        "A short guided meditation perfect for quick stress relief during a busy day. No experience necessary.",
    },
    {
      id: "2",
      title: "Deep Breathing Exercises for Anxiety",
      creator: "Breathing Techniques",
      duration: "8:45",
      category: "breathing",
      tags: ["anxiety", "beginner", "breathing"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description: "Learn simple breathing techniques that can help reduce anxiety and promote relaxation in minutes.",
    },
    {
      id: "3",
      title: "Progressive Muscle Relaxation Guide",
      creator: "Relaxation Specialist",
      duration: "12:30",
      category: "relaxation",
      tags: ["muscle-tension", "evening", "sleep"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description:
        "Follow along with this progressive muscle relaxation exercise to release physical tension from your body.",
    },
    {
      id: "4",
      title: "Mindful Walking Practice",
      creator: "Mindfulness Coach",
      duration: "10:15",
      category: "meditation",
      tags: ["walking", "outdoors", "mindfulness"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description: "Transform your daily walk into a mindfulness practice with this guided walking meditation.",
    },
    {
      id: "5",
      title: "Calming Visualization for Stress",
      creator: "Guided Imagery",
      duration: "15:00",
      category: "relaxation",
      tags: ["visualization", "imagination", "stress-relief"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description: "Use the power of your imagination to transport yourself to a peaceful place and reduce stress.",
    },
    {
      id: "6",
      title: "Quick Office Stress Buster",
      creator: "Workplace Wellness",
      duration: "3:45",
      category: "breathing",
      tags: ["quick", "workplace", "discrete"],
      thumbnailUrl: "/placeholder.svg?height=200&width=360",
      description: "A discrete stress relief exercise you can do at your desk without anyone noticing.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Video Resources</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Stress Relief Videos</CardTitle>
              <CardDescription>Guided videos to help you manage stress and anxiety</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Videos</TabsTrigger>
                  <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  <TabsTrigger value="breathing">Breathing</TabsTrigger>
                  <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
                </TabsList>

                {["all", "meditation", "breathing", "relaxation"].map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos
                        .filter((video) => category === "all" || video.category === category)
                        .map((video) => (
                          <div key={video.id} className="cursor-pointer group" onClick={() => setSelectedVideo(video)}>
                            <div className="relative rounded-md overflow-hidden mb-2">
                              <img
                                src={video.thumbnailUrl || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full aspect-video object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <div className="bg-white bg-opacity-80 rounded-full p-3">
                                  <Play className="h-6 w-6 text-gray-900" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <h3 className="font-medium line-clamp-2">{video.title}</h3>
                            <p className="text-sm text-muted-foreground">{video.creator}</p>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedVideo ? (
                <div>
                  <div className="relative rounded-md overflow-hidden mb-4">
                    <img
                      src={selectedVideo.thumbnailUrl || "/placeholder.svg"}
                      alt={selectedVideo.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="bg-white bg-opacity-80 rounded-full p-4 cursor-pointer hover:bg-opacity-100 transition-all">
                        <Play className="h-8 w-8 text-gray-900" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-medium mb-2">{selectedVideo.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedVideo.creator} • {selectedVideo.duration}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedVideo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm">{selectedVideo.description}</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select a video to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

