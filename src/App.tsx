import { useEffect, useState } from 'react'
import './App.css'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CampaignBlankPage from './pages/CampaignBlankPage'
import CampaignPage from './pages/CampaignPage'

function App() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to: string) => {
    if (to === window.location.pathname) {
      return
    }

    window.history.pushState({}, '', to)
    setPath(to)
  }

  if (path.startsWith('/campaign/')) {
    const slug = path.slice('/campaign/'.length)
    const campaignId = slug.length > 0 ? decodeURIComponent(slug) : 'unknown'

    return <CampaignPage campaignId={campaignId} />
  }

  return (
    <>
      <div className="text-3xl font-bold underline">
        afasdfasdfasdf
      </div>
      <button
        className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        onClick={() => navigate('/campaign/example-campaign')}
      >
        Go to Example Campaign
      </button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default App
