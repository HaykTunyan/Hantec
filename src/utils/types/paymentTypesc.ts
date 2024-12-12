export interface CustomKvp {
  [key: string]: string;
}

export interface PaymentGatewayModel {
  pgId: string;
  ccy?: string;
  trxLimitAmtMin?: number;
  trxLimitAmtMax?: number;
  dailyLimitAmt?: number;
  category?: string;
  displaySeq?: number;
  availableLocations: string[];
  channels: PaymentGatewayModel[];
  pgExtMap?: CustomKvp;
  id?: number;
  parentId?: number;
  clientTrxLimitAmtMin?: number;
  clientTrxLimitAmtMax?: number;
  clientDailyLimitAmt?: number;
  pgwDailyLimitAmt?: number;
  reminderJson?: string;
  pgI18nName?: string;
  [key: string]: any;
}

