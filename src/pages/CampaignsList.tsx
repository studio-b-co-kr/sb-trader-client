import suiLogo from "@/assets/sui-logo.png"
import {
  useNavigate,
 } from "@tanstack/react-router";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/v1/campaigns');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Failed to fetch campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);


  if (loading) {
    return (
      <div className="container mx-auto max-w-9xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl text-[#FAFAFA] mb-2">Campaigns</h1>
          <p className="text-[#FAFAFA]/60">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-9xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl text-[#FAFAFA] mb-2">Campaigns</h1>
          <p className="text-red-400">Error loading campaigns: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6">
      <div className="max-w-9xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl text-[#FAFAFA] mb-2 fancy-font">Campaigns</h1>
          <p className="text-[#FAFAFA]/60 text-sm">Campaigns you can participate in!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 border-b border-[#B6A2B7]/20">
          {campaigns.filter((c: any) => c.status === 'active').map((c: any) => (
            <Card
              key={c.id}
              className="dark rounded-[2px] overflow-hidden hover:border-[#EE82DA]/40 transition-colors cursor-pointer"
              onClick={() => {
                navigate({to: "/campaigns/$campaignId", params: {campaignId: c.id}});
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col items-start gap-2 mb-2">
                  <CardTitle className="text-lg text-[#FAFAFA] flex gap-1">
                    <span className="capitalize">{c.title || 'campaign'}</span>
                  </CardTitle>
                  <div className="flex flex-row items-start gap-2 mb-2">
                    <img src={suiLogo} alt="Logo" className="w-6 h-6" />
                    <span className="text-[#EE82DA] uppercase font-bold">{c.token_symbol || 'TOKEN'}</span>
                  </div>
                </div>
                <CardDescription className="text-[#FAFAFA]/60">
                  {c.supported_exchanges ? `Trading on ${c.supported_exchanges.join(', ')}` : 'Trading campaign'} • {c.reward_allocation_method?.replace('_', ' ') || 'Prize structure TBD'}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs uppercase text-[#FAFAFA]/30">Current Price</div>
                    <div className="text-lg number-font text-[#FAFAFA]">
                      {c.token_current_price || '0.00'} {c.price_currency || 'USD'}
                    </div>
                  </div>
{/*                  <div className="flex flex-col gap-1 text-right">
                    <div className="text-xs uppercase text-[#FAFAFA]/30">Max Trades/Day</div>
                    <div className="text-sm number-font text-[#FAFAFA]">
                      {c.rules?.max_trades_per_day || 'Unlimited'}
                    </div>
                  </div>*/}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#FAFAFA]/60">Prize Pool</span>
                    <span className="text-sm number-font text-[#FAFAFA]">
                      {c.reward_total_quantity || '0'} {c.reward_symbol || c.token_symbol || 'tokens'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#FAFAFA]/60">Duration</span>
                    <span className="text-sm number-font text-[#FAFAFA]">
                      {c.start_time && c.end_time
                        ? `${new Date(c.start_time).toLocaleDateString()} - ${new Date(c.end_time).toLocaleDateString()}`
                        : 'TBD'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#FAFAFA]/60">Max Participant</span>
                    <span className="text-sm number-font text-[#FAFAFA]">
                      {c.reward_max_participants || '0'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#B6A2B7]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase text-[#FAFAFA]/30">Status</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      c.status === 'active'
                        ? 'bg-[#EE82DA]/20 text-[#EE82DA]'
                        : c.status === 'completed'
                        ? 'bg-green-400/20 text-green-400'
                        : c.status === 'cancelled'
                        ? 'bg-red-400/20 text-red-400'
                        : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="max-w-9xl mx-auto mt-12">
        <Card className="dark rounded-[2px] overflow-hidden">
          <CardHeader>
            All Campaigns
          </CardHeader>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Max Participant</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((c: any) => (
                  <TableRow 
                    key={c.id}
                    className="cursor-pointer hover:bg-[#B6A2B7]/10"
                    onClick={() => {
                      navigate({to: "/campaigns/$campaignId", params: {campaignId: c.id}});
                    }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img src={suiLogo} alt="Logo" className="w-5 h-5" />
                        <span className="capitalize">{c.title || 'campaign'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-[#EE82DA] uppercase font-bold">{c.token_symbol || 'TOKEN'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm number-font text-[#FAFAFA]">
                        {c.token_current_price || '0.00'} {c.price_currency || 'USD'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm number-font text-[#FAFAFA]">
                        {c.reward_total_quantity || '0'} {c.reward_symbol || c.token_symbol || 'tokens'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-[#FAFAFA]/60">
                        {c.start_time && c.end_time
                          ? `${new Date(c.start_time).toLocaleDateString()} - ${new Date(c.end_time).toLocaleDateString()}`
                          : 'TBD'
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm number-font text-[#FAFAFA]">
                        {c.reward_allocation_method || 'TBD'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm number-font text-[#FAFAFA]">
                        {c.reward_max_participants || 'TBD'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        c.status === 'active'
                          ? 'bg-[#EE82DA]/20 text-[#EE82DA]'
                          : c.status === 'completed'
                          ? 'bg-green-400/20 text-green-400'
                          : c.status === 'cancelled'
                          ? 'bg-red-400/20 text-red-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'Unknown'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}