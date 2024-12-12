import Api from "../Api";
import { requestAPI } from "@/services/globalAxios";

export type WithdrawalRequestModel = {
    tradingAccountId?: string;
    accountCcy?: string;
    withdrawalAmt?: number;
    maxWithdrawalAmt?: number;
    bankCode?: string;
    bankName?: string;
    bankPrefixCode?: string;
    bankSwiftCode?: string;
    bankLocation?: string;
    bankAccName?: string;
    bankAccNo?: string;
    bankAddr?: string;
    bankIban?: string;
    outputCcy?: string;
    remarks?: string;
    paymentMethod?: string;
    adminFees?: number;
    accountCode?: string;
    handlingFees?: number;
    companyId?: number;
    createdWithdrawalId?: number;
    platform?: number;
    userType?: string;
    region?: string;
  }

export interface TransactionModel {
    paymentGatewayName?: string;
    platform?: string;
    cltCode?: string;
    name?: string;
    idType?: string;
    id?: string;
    email?: string;
    mobile?: string;
    inAmt?: string;
    ccy?: string;
    basePath?: string;
    remarks?: string;
    providerId?: string;
    method?: string;  
    clientSidePaymentSuccessUrl?: string;
    clientSidePaymentSuccessUrlMethod?: string;
    clientSidePaymentFailUrl?: string;
    clientSidePaymentFailUrlMethod?: string;
    clientSidePaymentCompleteUrl?: string;
    clientSidePaymentCompleteUrlMethod?: string;
    platformId?: string;
    companyId?: string;
    paymentGatewayId?: any; // string
    cltCodeListStr?: string;
    bankAccountNo?: string;
    region?: string;
    countryCode?: string;
    chiName?: string;
  }

export interface TransactionUpdateRequestModel {
    ref?: string;
    cltCode?: string;
    txdId?: string;
    walletAddress?: string;
  }

const getDusupayPaymentOptions = (paymentType: string, code: string) => {
  return Api.get(
    `/ps/payment-gateway/v1/payment-option/${process.env.REACT_APP_COMPANY_PREFIX?.toLocaleUpperCase()}/dusupay`,
    {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      params: { paymentType: paymentType, countryCode: code },
    }
  );
};

const getExchangeRate = (base?: string) => {
  return Api.get(`/ps/payment-gateway/v1/exchange-rate`, {
    params: { 
       // eslint-disable-next-line camelcase
      app_id: "oiPk4h0crhF8L8FsCaJe", 
      base: base 
    },
  });
};

const getWithdrawAdminFee = (
  accountCode: string,
  accountCcy: string,
  companyId: number,
  platformId: number,
  withdrawAmount: number,
  withdrawPaymentMethod: string,
  withdrawCcy?: string
) => {
  return Api.get("/ps/payment-gateway/v1/withdraw-admin-fees", {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      accountCode,
      accountCcy,
      companyId,
      platformId,
      userType: "CLIENT",
      withdrawAmount,
      withdrawPaymentMethod,
      withdrawCcy,
    },
  });
};

const withdraw = (request: {
  paymentMethod: string;
  accountCode: string;
  accountCcy: string;
  companyId: number;
  tradingAccountId: number;
  maxWithdrawalAmt: number;
  userType: string;
  platform: number;
}) => {
  return Api.post("/ps/payment-gateway/v1/withdraw", request, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const confirmWithdraw = (id: number) => {
  return Api.post(`/ps/payment-gateway/v1/withdraw/${id}/confirm`, null, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const newTransactionV2Ps = (createTransaction: TransactionModel) => {
  return requestAPI.post("/api/ps/payment-gateway/v2/payment-create", createTransaction, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateTransaction = (updateTransaction: TransactionUpdateRequestModel) => {
  return Api.post(`/ps/payment-gateway/v1/payment-callback/${process.env.REACT_APP_COMPANY_PREFIX!}/usdt`, {
    paymentRef: updateTransaction.ref,
    txId: updateTransaction.txdId,
  }, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getWithdrawConfig = (
  companyId: number,
  region?: string,  
) => {
  return Api.get("/ps/payment-gateway/v2/withdraw-config/read", {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      companyId,
      isActive: true,
      region,
      userType: "CLIENT",
    },
  });
};

const createWithdraw = (request: WithdrawalRequestModel) => {
  return Api.post("/ps/payment-gateway/v1/withdraw", request, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const confirmWithdrawal = (id: number) => {
  return Api.post(`/ps/payment-gateway/v1/withdraw/${id}/confirm`,undefined, {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  })
};

const getWithdrawLimit = (
  tradingAccountId?: string,
  paymentMethod?: string,
  accountCode?: string,
  accountCcy?: string,
  region?: string,
  companyId?: number,
  coCode?: string,
  platform?: number
) => {
  return Api.get("/ps/payment-gateway/v1/withdraw-limit", {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      tradingAccountId,
      paymentMethod,
      accountCode,
      accountCcy,
      region,
      companyId,
      coCode,
      platform,
      userType: "CLIENT",
    },
  });
};

const PaymentServiceApi = {
  getDusupayPaymentOptions,
  getExchangeRate,
  getWithdrawAdminFee,
  withdraw,
  confirmWithdraw,
  newTransactionV2Ps,
  updateTransaction,
  getWithdrawConfig,
  createWithdraw,
  confirmWithdrawal,
  getWithdrawLimit,
};

export default PaymentServiceApi;
