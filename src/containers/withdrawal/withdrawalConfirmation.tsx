"use client";

import React, { useLayoutEffect, useState } from "react";
// import { PaymentGatewaySend, PaymentGatewaySendUSDT } from "@/services";
// import ConfirmWithdrawal from "@/services/withdrawal/confirmWithdrawal";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

interface WithdrawalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  confirmed?: () => void;
  checkConfirmId: (id: string) => void;
  submitData: any;
}

const WithdrawalConfirmation: React.FC<WithdrawalConfirmationProps> = ({
  isOpen,
  onClose,
  confirmed,
  checkConfirmId,
  submitData,
}) => {
  /**
   * WithdrawalConfirmation Hooks.
   */

  const { t } = useTranslation("withdrawal");
  const [isToken, setIsToken] = useState<any>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsToken(token);
    }
  }, []);

  if (!isOpen) return null;
  // is Always 0;
  const adminFeeValue = 0;
  const handleConfirmWithdrawal = async () => {
    if (submitData?.typeForSend === "USDT") {
      try {
        const urlUsdt =
          "https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw";

        const payload = {
          accountCcy: "USD", //  "USD"
          accountCode: submitData?.accountCode, // is Account id "367000053"
          bankAccNo: submitData?.bankAccNo,
          bankName: "USDT",
          companyId: 20, // company Id.
          maxWithdrawalAmt: submitData?.maxWithdrawalAmt,
          outputCcy: "USD",
          paymentMethod: submitData?.paymentMethod, // "PC" or "USDTD"
          platform: 42, // platform 42
          region: submitData?.region, // region of All Regions or AFRICA
          remarks: "", // is only string
          tradingAccountId: submitData.tradingAccountId.toString(), // is Account tading ID
          userType: "CLIENT", // is only CLIENT,:
          withdrawalAmt: 10,
        };

        const headers = {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US",
          Authorization: `Bearer ${isToken}`,
        };

        // const response = await PaymentGatewaySendUSDT({
        //   accountCcy: "USD", //  "USD"
        //   accountCode: submitData?.accountCode, // is Account id "367000053"
        //   bankAccNo: "78954654651546",
        //   bankName: "USDT",
        //   companyId: 20, // company Id.
        //   maxWithdrawalAmt: submitData?.maxWithdrawalAmt,
        //   outputCcy: "USD",
        //   paymentMethod: submitData?.paymentMethod, // "PC" or "USDTD"
        //   platform: 42, // platform 42
        //   region: "AFRICA", // region of ASIAN or AFRICA
        //   remarks: "", // is only string
        //   tradingAccountId: submitData.tradingAccountId.toString(), // is Account tading ID
        //   userType: "CLIENT", // is only CLIENT,:
        //   withdrawalAmt: 10,
        // });

        const response = await axios.post(urlUsdt, payload, { headers });
        if (response.data) {
          // @ts-ignore
          const sendInfoId = response?.data?.data?.id;
          // @ts-ignore
          checkConfirmId(sendInfoId);
          onClose();

          // confirmed();
        }
      } catch (error) {}
    } else {
      try {
        const urlSend =
          "https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw";

        const payload = {
          paymentMethod: submitData?.paymentMethod,
          accountCode: submitData?.accountCode,
          accountCcy: "USD",
          companyId: 20,
          tradingAccountId: submitData?.tradingAccountId.toString(),
          maxWithdrawalAmt: submitData?.maxWithdrawalAmt,
          userType: "CLIENT",
          platform: 42,
          region: submitData?.region,
          remarks: "",
        };

        const headers = {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US",
          Authorization: `Bearer ${isToken}`,
        };

        const response = await axios.post(urlSend, payload, { headers });
        if (response.data) {
          // @ts-ignore
          const sendInfoId = response?.data?.data?.id;
          // @ts-ignore
          checkConfirmId(sendInfoId);

          onClose();
          // confirmed();
        }
      } catch (error) {
        const errorMessage = "Record has been made in the past 24 hours";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div
      className=" fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full  "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg px-6 py-4  font-aeonik">
          <div className="flex justify-end ">
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <img src="/icons/management/modal-close.svg" alt="Modal-Close" />
            </button>
          </div>
          <div className="mt-6" />
          <div className="mx-auto w-[278px] md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/management/info-circle_dark.svg"
                  alt="Info-Circle_Dark"
                />
              </div>
              <div className="mt-[16px]" />
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-xl leading-6 text-default  tracking-tight text-center">
                  {t("withdrawal_confirmation")}
                </h4>
                <div className="mt-1" />
                <p className="font-normal text-sm leading-4 tracking-normal text-center text-grey-seccondary">
                  {t("before_confirming_details")}
                </p>
              </div>
            </div>
            <div className="mt-8" />

            <div className="flex flex-col px-0 md:px-18">
              {/* Client Number */}
              <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light ">
                <div className="">
                  <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                    {" "}
                    {t("client_Number")}
                  </span>
                </div>
                <div className="">
                  <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                    {" "}
                    {submitData?.accountCode}
                  </span>
                </div>
              </div>
              {/* Currency */}
              {submitData?.accountCcy && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("Currency")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <img src="/icons/country/USD.svg" alt="USD" />
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData.accountCcy}
                    </span>
                  </div>
                </div>
              )}
              {/* Receive Currency */}
              {submitData?.paymentMethod && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("receive_currency")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.paymentMethod}
                    </span>
                  </div>
                </div>
              )}
              {/* Withdraw Amount */}
              {submitData?.withdrawalAmt && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("withdraw_amount")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.withdrawalAmt}
                    </span>
                  </div>
                </div>
              )}
              {/* Admin Fee */}
              {submitData?.adminFees === adminFeeValue && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      Admin Fee
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.adminFees}
                    </span>
                  </div>
                </div>
              )}
              {/* Bank Name */}
              {submitData?.bankAccName && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("bank_name")}
                    </span>
                  </div>
                  <div className="flex flex-end items-center">
                    <span className="font-normal text-end  text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.bankAccName}
                    </span>
                  </div>
                </div>
              )}
              {/* Bank Location */}
              {submitData?.bankLocation && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("bank_Location")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.bankLocation}
                    </span>
                  </div>
                </div>
              )}
              {/* Bank Branch */}
              {submitData?.bankAddr && (
                <div className="flex flex-row justify-between pt-3 pb-4 border-b border-grey-extra-light">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("bank_branch")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.bankAddr}
                    </span>
                  </div>
                </div>
              )}
              {/* International Bank Account Number */}
              {submitData?.bankIban && (
                <div className="flex flex-row justify-between pt-3 pb-4 ">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("international_bank")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.bankIban}
                    </span>
                  </div>
                </div>
              )}

              {/* Cypto Wallet Address */}
              {submitData?.cyptoWalletAddress && (
                <div className="flex flex-row justify-between pt-3 pb-4 ">
                  <div className="">
                    <span className="font-normal text-sm text-grey-seccondary leading-3.5 tracking-wider">
                      {" "}
                      {t("crypto_wallet_address")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span className="font-normal text-sm text-default leading-3.5 tracking-wider">
                      {" "}
                      {submitData?.cyptoWalletAddress}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-10" />
            {/*  */}
            <div className="flex flex-row justify-center">
              <div className="flex flex-row gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex justify-center px-5 py-[14px] border border-grey-extra-light rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-default">
                    {t("cancel")}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmWithdrawal()}
                  // onClick={handleWithdrawConfirm}
                  className="flex justify-center px-5 py-[14px] bg-default  rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    {t("confirm")}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mb-16 md:mb-6" />
        </div>
      </div>
    </div>
  );
};

export default WithdrawalConfirmation;
