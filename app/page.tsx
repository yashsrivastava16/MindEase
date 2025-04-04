import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, Calendar, Music, Video } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">MindEase</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Track, analyze, and manage your stress levels with personalized recommendations and scheduled breaks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Track Your Stress</CardTitle>
            <CardDescription>Log your stress levels and identify triggers throughout your day</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Stress tracking illustration"
              className="rounded-lg w-full h-48 object-cover"
            />
          </CardContent>
          <CardFooter>
            <Link href="/track" className="w-full">
              <Button className="w-full">
                Start Tracking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyze Patterns</CardTitle>
            <CardDescription>Visualize your stress data and understand your patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Stress analysis illustration"
              className="rounded-lg w-full h-48 object-cover"
            />
          </CardContent>
          <CardFooter>
            <Link href="/analyze" className="w-full">
              <Button className="w-full">
                View Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Music Therapy</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Personalized music recommendations to help you relax</p>
          </CardContent>
          <CardFooter>
            <Link href="/recommendations/music" className="w-full">
              <Button variant="outline" className="w-full">
                Explore
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Resources</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Guided meditation and relaxation videos</p>
          </CardContent>
          <CardFooter>
            <Link href="/recommendations/videos" className="w-full">
              <Button variant="outline" className="w-full">
                Watch
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break Scheduler</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Schedule regular breaks to manage stress</p>
          </CardContent>
          <CardFooter>
            <Link href="/scheduler" className="w-full">
              <Button variant="outline" className="w-full">
                Schedule
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center">
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            <BarChart2 className="h-5 w-5" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

