import { useMutation } from '@tanstack/react-query';
import { campaignOrderApi } from '../lib/api';

export function useCreateCampaignOrder() {
  return useMutation({
    mutationFn: (orderData: {
      campaign_id: number;
      exchange: string;
      symbol: string;
      order_type: string;
      side: 'buy' | 'sell';
      order_price: number;
      order_quantity: number;
    }) => campaignApi.createCampaignOrder(orderData),
  });
}