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
        <div className="flex-grow min-h-screen border-r border-[#B6A2B7]/20 pr-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Campaign {campaignId}</h1>
            <p className="text-gray-600">Campaign details and management</p>
          </div>

          <Card className="w-full h-[560px] dark rounded-[2px]">
            <CardHeader className="color-[#FAFAFA] text-2xl number-font">
              asdfasdf
            </CardHeader>
            <div className="color-[#FAFAFA] text-lg number-font pl-6">
              afffff
            </div>
            <TradingViewWidget />
          </Card>
        </div>
        <div className='w-96 min-h-screen p-6 space-y-6'>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              Campaign
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Start Date - End Date</div>
              <div className="text-normal number-font">Sept 20 - Sept 27</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-normal number-font">$10,000</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize structure</div>
              <div className="text-normal number-font">128</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Rules</div>
              <div className="text-sm number-font">Lorem ipsum dolor sit amet, consectetur..</div>
            </div>
          </Card>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              My Summary
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-normal number-font">$10,000</div>
            </div>
          </Card>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              New Trade
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-normal number-font">$10,000</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
