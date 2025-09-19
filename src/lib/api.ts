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
  supportedExchanges: string;
}

export interface Order {
  id: number;
  input_date: string; // ISO8601 format date/time when order was created
  status: 'pending' | 'completed' | string; // Order status
  direction: 'buy' | 'sell'; // Trade direction
  price: number; // Order price
  quantity: number; // Order quantity (6 decimal precision)
  total?: number; // Total value (price × quantity for executed orders)
  value: number; // Order value
  amount: number; // Order amount (same as quantity)
  token: string; // Trading token (e.g., "BLUE")
  quote_currency: string; // Quote currency (e.g., "KRW")
  fee_token: string; // Fee token
  fee_amount: number; // Fee amount (4 decimal precision)
  vol_from_market?: number; // Volume from market

  // Legacy fields for backward compatibility
  pair?: string;
  type?: 'buy' | 'sell';
  created_at?: string;
  fee?: number;
  executed_at?: string;
}

export interface RankingEntry {
  rank: number;
  user_id: string;
  wallet: string;
  trades: number;
  volume: number;
}

export interface MyData {
  campaignId: number;
  userId: string;
  rewardEligibility: boolean;
  tradingVolume: number;
  rewardRank: number;
  executedOrders: Order[];
  outstandingOrders: Order[];
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
    supportedExchanges: safeStringify(apiResponse.supported_exchanges),
  };
}

// Transform order data to ensure proper mapping
function transformOrder(orderData: any): Order {
  return {
    id: orderData.id,
    input_date: orderData.input_date || orderData.created_at || '',
    status: orderData.status || 'unknown',
    direction: orderData.direction || orderData.type || 'buy',
    price: Number(orderData.price) || 0,
    quantity: Number(orderData.quantity) || Number(orderData.amount) || 0,
    total: orderData.total ? Number(orderData.total) : undefined,
    value: Number(orderData.value) || Number(orderData.total) || 0,
    amount: Number(orderData.amount) || Number(orderData.quantity) || 0,
    token: orderData.token || 'BLUE',
    quote_currency: orderData.quote_currency || 'KRW',
    fee_token: orderData.fee_token || orderData.token || 'BLUE',
    fee_amount: Number(orderData.fee_amount) || Number(orderData.fee) || 0,
    vol_from_market: orderData.vol_from_market ? Number(orderData.vol_from_market) : undefined,

    // Legacy fields for backward compatibility
    pair: orderData.pair || `${orderData.token || 'BLUE'}${orderData.quote_currency || 'KRW'}`,
    type: orderData.type || orderData.direction,
    created_at: orderData.created_at || orderData.input_date,
    fee: orderData.fee || orderData.fee_amount,
    executed_at: orderData.executed_at,
  };
}

export const campaignApi = {
  getCampaign: async (campaignId: string): Promise<Campaign> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}`);

    // Handle potential nested response structure
    const campaignData = response.campaign || response.data || response;

    return transformCampaignResponse(campaignData);
  },

  getCampaignMySummary: async (campaignId: string): Promise<{ my_summary: MySummary }> => {
    const response = await apiRequest<any>(`/api/v1/campaigns/${campaignId}/my_summary`);

    // Transform the response to handle any field mapping if needed
    if (response.my_summary) {
      // Ensure outstandingOrders and executedOrders are properly mapped
      if (response.my_summary.outstandingOrders) {
        response.my_summary.outstandingOrders = response.my_summary.outstandingOrders.map(transformOrder);
      }
      if (response.my_summary.executedOrders) {
        response.my_summary.executedOrders = response.my_summary.executedOrders.map(transformOrder);
      }
    }

    return response;
  },
};