const API_BASE_URL = 'http://localhost:3000';

export interface Campaign {
  id: string;
  title: string;
  tokenSymbol: string;
  startTime: string;
  endTime: string;
  rewardTotalQuantity: string;
  rewardSymbol: string;
  rewardDistributionMethod: string;
  rewardAllocationMethod: string;
  rewardMaxParticipants: string;
  tokenCurrentPrice: string;
  priceChange: string;
  priceChangePercent: string;
  supportedExchanges: string[];
}

export interface Order {
  id: number;
  campaignId: number;
  exchange: string;
  symbol: string;
  orderId: string;
  orderType: string; // ex) "limit" | "market"
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  orderValue: number;

  filledPrice: number;
  filledQuantity: number;
  filledValue: number;
  filledAt?: string | null;
  cancelledAt?: string | null;

  status: 'pending' | 'cancelled' | 'filled' | string;

  feeCurrency: string;
  feeAmount: number;

  createdAt: string;
}

export interface RankingEntry {
  rank: number;
  user_id: string;
  wallet: string;
  trades: number;
  volume: number;
}

export interface MySummary {
  campaignId: number;
  userId: string;
  rewardEligibility: boolean;
  tradingVolume: number;
  rewardRank: number;
}

class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Helper function to safely convert values to strings
function safeStringify(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    // Handle the rules object specifically
    if (value.min_trade_amount !== undefined) {
      return `Min trade: ${value.min_trade_amount}, Max trades/day: ${value.max_trades_per_day}, Allowed pairs: ${value.allowed_pairs?.join(', ') || 'N/A'}`;
    }
    return JSON.stringify(value);
  }
  return String(value);
}

// Transform snake_case API response to camelCase
function transformCampaignResponse(apiResponse: any): Campaign {
  if (!apiResponse) {
    throw new Error('No campaign data received from API');
  }

  return {
    id: safeStringify(apiResponse.id || apiResponse.campaign_id),
    title: safeStringify(apiResponse.title || 'Unnamed Campaign'),
    tokenSymbol: safeStringify(apiResponse.token_symbol),
    startTime: safeStringify(apiResponse.start_time),
    endTime: safeStringify(apiResponse.end_time),
    rewardTotalQuantity: safeStringify(apiResponse.reward_total_quantity),
    rewardSymbol: safeStringify(apiResponse.reward_symbol),
    rewardDistributionMethod: safeStringify(apiResponse.reward_distribution_method),
    rewardAllocationMethod: safeStringify(apiResponse.reward_allocation_method),
    rewardMaxParticipants: safeStringify(apiResponse.reward_max_participants),
    tokenCurrentPrice: safeStringify(apiResponse.token_current_price),
    priceChange: safeStringify(apiResponse.price_change),
    priceChangePercent: safeStringify(apiResponse.price_change_percent),
    supportedExchanges: apiResponse.supported_exchanges,
  };
}

// Transform order data to ensure proper mapping
function transformOrder(orderData: any): Order {
  return {
    id: orderData.id,
    campaignId: orderData.campaign_id,
    exchange: orderData.exchange,
    symbol: orderData.symbol,
    orderId: orderData.order_id,
    orderType: orderData.order_type,
    side: orderData.side,
    price: Number(orderData.price),
    quantity: Number(orderData.quantity),
    orderValue: Number(orderData.price) || 0 * Number(orderData.quantity) || 0,
    filledPrice: Number(orderData.filled_price),
    filledQuantity: Number(orderData.filled_quantity),
    filledValue: Number(orderData.filled_price) || 0 * Number(orderData.filled_quantity) || 0,
    filledAt: orderData.filled_at,
    cancelledAt: orderData.cancelled_at,
    status: orderData.status,
    feeCurrency: orderData.fees && orderData.fees[0] ? orderData.fees[0].fee_coin : 0,
    feeAmount: orderData.fees && orderData.fees[0] ? Number(orderData.fees[0].fee) : 0,
    createdAt: orderData.created_at || orderData.input_date,
  };
}

export const campaignApi = {
  getCampaign: async (campaignId: string): Promise<Campaign> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}`);

    // Handle potential nested response structure
    const campaignData = response.campaign;

    return transformCampaignResponse(campaignData);
  },

  getCampaignMyOpenOrders: async (campaignId: string): Promise<Order[]> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}/my_open_orders`);

    // Handle potential nested response structure
    const campaignMyOpenOrderData = response.my_open_orders;

    return campaignMyOpenOrderData.map(transformOrder)
  },

  getCampaignMyExecutedOrders: async (campaignId: string): Promise<Order[]> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}/my_executed_orders`);

    // Handle potential nested response structure
    const campaignMyExecutedOrderData = response.my_executed_orders;

    return campaignMyExecutedOrderData.map(transformOrder)
  },

  getCampaignMySummary: async (campaignId: string): Promise<{ my_summary: MySummary }> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}/my_summary`);

    return response;
  },
};