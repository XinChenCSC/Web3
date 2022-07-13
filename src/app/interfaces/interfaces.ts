export interface PriceData {
  address: string | undefined,
  symbol: string | undefined,
  assetType: 'Crypto' | 'Forex' | 'Equities' | "Commodities",
  description: string,
  latestAnswer: number,
  decimals: number,
  price: number,
  watched : boolean,
}


export interface TableRow {
  watched : boolean,
  symbol: string | undefined,
  price: number,
  assetType: 'Crypto' | 'Forex' | 'Equities' | "Commodities",
  description: string,
}
