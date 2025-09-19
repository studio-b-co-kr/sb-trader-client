import logoBlue from "@/assets/logo-blue.png"
import NewTradeCard from "@/components/NewTradeCard"
import TradesCard from "@/components/TradesCard"

import {
  Card,
  CardHeader,
} from "@/components/ui/card"


import TradingViewWidget from "@/components/chart/TradingViewWidget"
import { useCampaign, useCampaignMySummary, useCampaignMyOpenOrders, useCampaignMyExecutedOrders } from "@/hooks/useCampaign"

interface CampaignPageProps {
  campaignId: string
}

export default function CampaignPage({ campaignId }: CampaignPageProps) {
  const { data: campaign, isLoading: campaignLoading, error: campaignError } = useCampaign(campaignId);
  const { data: mySummaryResponse, isLoading: mySummaryLoading, error: mySummaryError } = useCampaignMySummary(campaignId);
  const { data: myOpenOrders, isLoading: myOpenOrdersLoading, error: myOpenOrdersError } = useCampaignMyOpenOrders(campaignId);
  const { data: myExecutedOrders, isLoading: myExecutedOrdersLoading, error: myExecutedOrdersError } = useCampaignMyExecutedOrders(campaignId);

  const isLoading = campaignLoading || mySummaryLoading || myOpenOrdersLoading || myExecutedOrdersLoading;
  const error = campaignError || mySummaryError || myOpenOrdersError || myExecutedOrdersError;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-9xl flex items-center justify-center min-h-screen">
        <div className="text-[#FAFAFA] text-xl">Loading campaign...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-9xl flex items-center justify-center min-h-screen">
        <div className="text-red-400 text-xl">
          Error loading campaign: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto max-w-9xl flex items-center justify-center min-h-screen">
        <div className="text-[#FAFAFA] text-xl">Campaign not found</div>
      </div>
    );
  }

  const mySummaryData = mySummaryResponse?.my_summary;

  // Helper functions for formatting
  const formatVolume = (volume: number) => `${volume.toLocaleString()} KRW`;
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto max-w-9xl">
      <div className="flex flex-row justify-stretch gap-0 min-h-screen">
        <div className="flex-grow min-h-screen border-r border-[#B6A2B7]/20 pr-6 pt-6">
          <div className="mb-6 flex flex-row gap-8 items-center">
            <h1 className="text-xl flex flex-row gap-1">
              <img src={logoBlue} alt="Logo" className="w-8 h-8" />
              <span className="lowercase">{campaign.title}</span>
              <span className="text-[#EE82DA] uppercase font-bold">{campaign.tokenSymbol}</span>
            </h1>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Current Price</div>
              <div className="text-lg number-font">{campaign.tokenCurrentPrice}</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-lg number-font">{campaign.rewardTotalQuantity}</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Exchange</div>
              <div className="text-lg number-font">{campaign.supportedExchanges?.join(', ') ?? ''}</div>
            </div>
          </div>

          <Card className="w-full h-[560px] dark rounded-[2px]">
            <div>
              <div className="text-[#FAFAFA] text-4xl number-font pl-6 mb-2">
                {campaign.tokenCurrentPrice}
              </div>
              <div className="text-[#EE82DA] text-normal number-font pl-6 flex flex-row gap-1">
                <div>{campaign.priceChange}</div>
                <div>({campaign.priceChangePercent}<span className="support-character">%</span>)</div>
              </div>
            </div>
            {campaign.tokenSymbol && <TradingViewWidget token={campaign.tokenSymbol} />}
          </Card>
          <TradesCard myOpenOrders={myOpenOrders} myExecutedOrders={myExecutedOrders} />
        </div>
        <div className='w-96 min-h-screen p-6 space-y-6'>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              Campaign
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Start Time</div>
              <div className="text-normal number-font">{formatDateTime(campaign.startTime)}</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">End Time</div>
              <div className="text-normal number-font">{formatDateTime(campaign.endTime)}</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool</div>
              <div className="text-normal number-font">{campaign.rewardTotalQuantity}
                <span className="text-[#EE82DA] uppercase font-bold"> {campaign.tokenSymbol}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Prize structure</div>
              <div className="text-normal number-font">{campaign.rewardAllocationMethod}</div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Max Participant</div>
              <div className="text-sm number-font">{campaign.rewardMaxParticipants}</div>
            </div>
          </Card>
          <Card className="dark rounded-[2px] overflow-hidden">
            <CardHeader className="color-[#FAFAFA]">
              My Summary
            </CardHeader>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Eligibility for Prize Pool</div>
              <div className="text-normal number-font">
                {mySummaryData?.reward_eligibility ? 'Eligible' : 'Not Eligible'}
              </div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Total Executed Trade Vol</div>
              <div className="text-normal number-font">
                {mySummaryData?.trading_volume ? formatVolume(mySummaryData.trading_volume) : '0 KRW'}
              </div>
            </div>
            <div className="flex flex-col gap-1 px-6">
              <div className="text-sm uppercase text-[#FAFAFA]/30">Outstanding Orders</div>
              <div className="text-normal number-font">
                {mySummaryData?.outstandingOrders?.length || 0} orders
              </div>
            </div>
            {mySummaryData && mySummaryData.reward_rank && (
              <div className="flex flex-col gap-1 px-6">
                <div className="text-sm uppercase text-[#FAFAFA]/30">Prize Pool Rank</div>
                <div className="text-normal number-font">#{mySummaryData.reward_rank}</div>
              </div>
            )}
          </Card>
          <NewTradeCard campaignToken={campaign.tokenSymbol} />
        </div>
      </div>
    </div>
  )
}
