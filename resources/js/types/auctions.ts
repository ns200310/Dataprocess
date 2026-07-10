interface Auctions {
  base_currency: string
  buyers_fee: number;
  listing_fee: number;
  name: string;
  reserve_fee: number;
  sellers_fee: number;
  slug: string;
  url:string;
}

interface AuctionsData {
  all_auctions_lots_count: number;
  auction_lots_count: number;
  auction_name: string;
  auction_trading_volume: number;
  dt: string;
  winning_bid_mean: number;
}