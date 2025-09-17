import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import TradingViewWidget from "@/components/chart/BlueChart"

interface CampaignPageProps {
  campaignId: string
}

export default function CampaignPage({ campaignId }: CampaignPageProps) {
  return (
    <div className="container mx-auto max-w-9xl">
      <div className="flex flex-row justify-stretch gap-0 min-h-screen">
        <div className="flex-grow min-h-screen border-r border-[#B6A2B7]/20 pr-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Campaign {campaignId}</h1>
            <p className="text-gray-600">Campaign details and management</p>
          </div>

          <Card className="w-full h-[560px] dark rounded-[2px]">
            <CardHeader className="color-[#FAFAFA] text-2xl tabular-number">
              asdfasdf
            </CardHeader>
            <div className="color-[#FAFAFA] text-lg tabular-number pl-6">
              afffff
            </div>
            <TradingViewWidget />
          </Card>
        </div>
        <div className='w-96 min-h-screen p-8 space-y-8'>
          <Card className="dark rounded-[2px]">
            <CardHeader className="color-[#FAFAFA]">
              Campaign
            </CardHeader>
            <div className="color-[#FAFAFA] text-lg tabular-number pl-6">
              afffff
            </div>
          </Card>
          <Card className="dark rounded-[2px]">
            <CardHeader className="color-[#FAFAFA]">
              My Summary
            </CardHeader>
            <div className="color-[#FAFAFA] text-lg tabular-number pl-6">
              afffff
            </div>
          </Card>
          <Card className="dark rounded-[2px]">
            <CardHeader className="color-[#FAFAFA]">
              New Trade
            </CardHeader>
            <div className="color-[#FAFAFA] text-lg tabular-number pl-6">
              afffff
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
