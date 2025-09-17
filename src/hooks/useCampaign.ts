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

export function useUserData(campaignId: string, userId: string = '123') {
  return useQuery({
    queryKey: ['user-data', campaignId, userId],
    queryFn: () => campaignApi.getUserData(campaignId, userId),
    enabled: !!campaignId,
    staleTime: 2 * 60 * 1000, // 2 minutes (user data changes more frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}