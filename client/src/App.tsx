import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState<string | null>(null)

  const handleAnalyze = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      if (!url) return

      try {
        const parsedUrl = new URL(url)
        let id: string | null = null

        if (parsedUrl.hostname.includes("youtube.com")) {
          id = parsedUrl.searchParams.get("v")
        } else if (parsedUrl.hostname === "youtu.be") {
          id = parsedUrl.pathname.slice(1)
        }

        setVideoId(id)
        if (id) {
          fetchVideoScore(id)
        }
      } catch (err) {
        console.error("Could not parse URL:", err)
      }
    })
  }

  const fetchVideoScore = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await new Promise<any>((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: 'FETCH_VIDEO_SCORE', videoId: id },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else if (response && response.success) {
              resolve(response.data);
            } else {
              reject(new Error(response?.error || 'Unknown error'));
            }
          }
        );
      });
      
      setScore(response.score || "Score retrieved successfully");
    } catch (error: any) {
      console.error("Error fetching video score:", error);
      setScore(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex items-center justify-center">
      <Card className="w-[320px] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            🎬 Video Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={handleAnalyze} className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>

          {videoId && (
            <p className="text-center text-sm text-gray-700">
              Video ID: <span className="font-mono">{videoId}</span>
            </p>
          )}

          {score && (
            <p className="text-center text-sm text-gray-700">
              Score: <span className="font-mono">{score}</span>
            </p>
          )}

          {!videoId && !score && (
            <p className="text-center text-sm text-gray-400">
              Click "Analyze" to extract video ID and get score
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
