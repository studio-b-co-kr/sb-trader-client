import { useEffect, useState } from 'react'
import './App.css'

import CampaignBlankPage from './pages/CampaignBlankPage'
import CampaignPage from './pages/CampaignPage'
import CampaignsList from './pages/CampaignsList'

function App() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const segments = path
    .split('/')
    .filter(Boolean)

  if (segments.length === 0) {
    return <CampaignsList />
  }

  const [rootSegment, ...rest] = segments

  if (rootSegment === 'campaigns') {
    return <CampaignsList />
  }

  if (rootSegment === 'campaign') {
    const slug = rest[0]

    if (!slug) {
      return <CampaignBlankPage campaignId="unknown" />
    }

    const campaignId = decodeURIComponent(slug)

    return <CampaignPage campaignId={campaignId} campaignToken={campaignId} />
  }

  return <CampaignBlankPage campaignId="unknown" />
}

export default App
