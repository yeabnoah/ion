import { useState } from "react"
import ReactDOM from "react-dom/client"
import { Button } from "@/components/ui/button"

function ContentApp() {
  const [videoId, setVideoId] = useState<string | null>(null)

  const handleAnalyze = () => {
    const url = window.location.href
    let id: string | null = null

    try {
      const parsedUrl = new URL(url)
      if (parsedUrl.hostname.includes("youtube.com")) {
        id = parsedUrl.searchParams.get("v")
      } else if (parsedUrl.hostname === "youtu.be") {
        id = parsedUrl.pathname.slice(1)
      }
    } catch (err) {
      console.error("Could not parse URL", err)
    }

    setVideoId(id)
  }

  

  return (
    <div className="fixed top-20 right-5 z-[9999]">
      <Button
        onClick={handleAnalyze}
        className="animate-pulse shadow-lg bg-red-500 hover:bg-red-600 text-white"
      >
        🔍 Analyze
      </Button>
      {videoId && (
        <div className="mt-2 text-white bg-black/80 px-3 py-1 rounded">
          Video ID: {videoId}
        </div>
      )}
    </div>
  )
}

// Inject React root into YouTube page
const container = document.createElement("div")
document.body.appendChild(container)
ReactDOM.createRoot(container).render(<ContentApp />)
