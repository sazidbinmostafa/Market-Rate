export interface ChangeData {

  dir: 'up' | 'down' | string;

  pct: number;

}



export interface MarketPrice {

  market: string;

  division: string;

  min: number;

  max: number;

}



export interface Product {

  id: number;

  slug: string;

  nameBn: string;

  category: string;

  categoryNameBn: string;

  categoryIcon: string;

  unit: string;

  image: string;

  today: number;

  yesterday: number;

  lastWeek: number;

  lastMonth: number;

  change: ChangeData;

  markets: MarketPrice[];

} 

