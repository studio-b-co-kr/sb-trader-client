import { useQuery } from '@tanstack/react-query';
import { campaignApi } from '../lib/api';

export function useCampaign(campaignId: string) {
  return useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => campaignApi.getCampaign(campaignId),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCampaignMySummary(campaignId: string) {
  return useQuery({
    queryKey: ['my-summary', campaignId],
    queryFn: () => campaignApi.getCampaignMySummary(campaignId),
    enabled: !!campaignId,
    staleTime: 2 * 60 * 1000, // 2 minutes (user data changes more frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCampaignMyOpenOrders(campaignId: string) {
  return useQuery({
    queryKey: ['my-open-orders', campaignId],
    queryFn: () => campaignApi.getCampaignMyOpenOrders(campaignId),
    enabled: !!campaignId,
    staleTime: 2 * 60 * 1000,
    // staleTime: 0, // need to refresh
    // refetchInterval: 3000, // 3초마다 polling
  });
}

export function useCampaignMyExecutedOrders(campaignId: string) {
  return useQuery({
    queryKey: ['my-executed-orders', campaignId],
    queryFn: () => campaignApi.getCampaignMyExecutedOrders(campaignId),
    enabled: !!campaignId,
    staleTime: 2 * 60 * 1000,
    // staleTime: 0, // need to refresh
    // refetchInterval: 3000, // 3초마다 polling
  });
}