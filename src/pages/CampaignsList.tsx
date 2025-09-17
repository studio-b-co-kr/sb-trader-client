import logoBlue from "@/assets/logo-blue.png"
import { Link } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CampaignsList() {
  const campaigns = [
    { id: "abc", name: "Campaign A" },
    { id: "xyz", name: "Campaign X" },
  ];



  return (
    <div className="container mx-auto max-w-9xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl text-[#FAFAFA] mb-2">Campaigns</h1>
        <p className="text-[#FAFAFA]/60">Active trading campaigns</p>
      </div>
      <ul className="mb-6">
        {campaigns.map((c) => (
          <li key={c.id}>
            <Link
              to="/campaigns/$campaignId"
              params={{ campaignId: c.id }}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dark rounded-[2px] overflow-hidden hover:border-[#EE82DA]/40 transition-colors cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <img src={logoBlue} alt="Logo" className="w-6 h-6" />
              <CardTitle className="text-lg text-[#FAFAFA] flex gap-1">
                <span className="lowercase">meme</span>
                <span className="text-[#EE82DA] uppercase font-bold">MEME</span>
              </CardTitle>
            </div>
            <CardDescription className="text-[#FAFAFA]/60">
              High-volume meme token trading campaign
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="text-xs uppercase text-[#FAFAFA]/30">Current Price</div>
                <div className="text-lg number-font text-[#FAFAFA]">$0.001728</div>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <div className="text-xs uppercase text-[#FAFAFA]/30">24h Change</div>
                <div className="text-sm number-font text-[#EE82DA]">+1.23%</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#FAFAFA]/60">Prize Pool</span>
                <span className="text-sm number-font text-[#FAFAFA]">$10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#FAFAFA]/60">Duration</span>
                <span className="text-sm number-font text-[#FAFAFA]">Sept 20 - Sept 27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#FAFAFA]/60">Participants</span>
                <span className="text-sm number-font text-[#FAFAFA]">128</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#B6A2B7]/20">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase text-[#FAFAFA]/30">Status</span>
                <span className="text-xs bg-[#EE82DA]/20 text-[#EE82DA] px-2 py-1 rounded">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}