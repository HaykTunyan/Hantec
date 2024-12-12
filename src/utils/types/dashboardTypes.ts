// All Dashboard Types.

export interface DataItem {
  name: string;
  item: ["100%", "75%", "50%", "25%", "0"];
  uv: number;
  pv: number;
  amt: number;
}

export interface TradDataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface StockForex {}

export interface NewsItem {
  title: string;
  content: string;
  date: string;
}

export interface InfoStateTypes {
  lastModTime: number | null;
  lastModUserName: string;
  id: number | null;
  companyId: number | null;
  type: string;
  name: string;
  loginId: string;
  status: string;
  email: string;
  phone: string;
  address: string | null;
  crtTime: number | null;
}

export interface AssetsInfoData {
  openAmtBuyPercent: number;
  openAmtSellPercent: number;
  openAmtTotalPercent: number;
  productGroup: string;
  symbol: string;
}

export interface AssetsInfo {
  msg: null;
  rtnCode: null;
  status: string;
  data: AssetsInfoData[];
}

export interface LiveAccountProps {
  id: number;
  companyId: number;
  platformId: number;
  platformCatDesc: string;
  accountCode: string;
  status: string;
  availableMargin: number;
  availableBalance: number;
  balance: number;
  ccy: string;
  credit: number;
  leverage: number;
  netValue: number;
  accountType: number;
  platformTypeCode: string;
  openPL: number;
}
