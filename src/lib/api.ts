const API_BASE_URL = 'http://localhost:3000/api/v1/demo';

export interface Campaign {
  id: string;
  name: string;
  token: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  prizeStructure: string;
  rules: string;
  tokenCurrentPrice: string;
  priceChange: string;
  priceChangePercent: string;
  exchange: string;
  totalPrizePool: string;
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
  profit: number;
  trades: number;
  volume: number;
}

export interface UserData {
  campaign_id: number;
  user_id: string;
  eligibilityForPrizePool: boolean;
  totalExecutedTradeVol: number;
  outstandingOrders: Order[];
  prize_pool_rank: number;
  price_pool_rank_listing: RankingEntry[];
  executedOrders: Order[];
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
    name: safeStringify(apiResponse.name || apiResponse.campaign_name || 'Unnamed Campaign'),
    token: safeStringify(apiResponse.token || apiResponse.symbol),
    startDate: safeStringify(apiResponse.start_date || apiResponse.startDate),
    endDate: safeStringify(apiResponse.end_date || apiResponse.endDate),
    prizePool: safeStringify(apiResponse.prize_pool || apiResponse.prizePool),
    prizeStructure: safeStringify(apiResponse.prize_structure || apiResponse.prizeStructure),
    rules: safeStringify(apiResponse.rules),
    tokenCurrentPrice: safeStringify(apiResponse.token_current_price || apiResponse.tokenCurrentPrice || apiResponse.current_price || apiResponse.price),
    priceChange: safeStringify(apiResponse.price_change || apiResponse.priceChange || apiResponse.change || apiResponse.price_diff),
    priceChangePercent: safeStringify(apiResponse.price_change_percent || apiResponse.priceChangePercent || apiResponse.price_change_percentage || apiResponse.change_percent),
    exchange: safeStringify(apiResponse.exchange),
    totalPrizePool: safeStringify(apiResponse.total_prize_pool || apiResponse.totalPrizePool || apiResponse.prize_pool),
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
    const response = await apiRequest<any>(`/campaigns/${campaignId}`);

    // Handle potential nested response structure
    const campaignData = response.campaign || response.data || response;

    return transformCampaignResponse(campaignData);
  },

  getUserData: async (campaignId: string, userId: string = '123'): Promise<{ user_data: UserData }> => {
    const response = await apiRequest<any>(`/campaigns/${campaignId}/user_data?user_id=${userId}`);

    // Transform the response to handle any field mapping if needed
    if (response.user_data) {
      // Ensure outstandingOrders and executedOrders are properly mapped
      if (response.user_data.outstandingOrders) {
        response.user_data.outstandingOrders = response.user_data.outstandingOrders.map(transformOrder);
      }
      if (response.user_data.executedOrders) {
        response.user_data.executedOrders = response.user_data.executedOrders.map(transformOrder);
      }
    }

    return response;
  },
};