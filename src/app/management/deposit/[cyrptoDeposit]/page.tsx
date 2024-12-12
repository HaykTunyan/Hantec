"use client";

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Layout from "@/app/dashboard/layout";
import DropDownComponent from "@/components/dropdown";
import InputForm from "@/components/inputForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import { setAccounts } from "@/store/slices/userOverview";
import { AppDispatch } from "@/store/store";
import { DepositUsdtSend, getClient, getUserOverview } from "@/services";
import DepositSuccess from "@/containers/deposit/depositSuccess";
import { useTranslation } from "next-i18next";

const DepositSend: FC = () => {
  /**
   *  Deposit Send View Hooks.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("deposit");
  const validValueNumber = 19; // Valid Value Number.
  const clientAccount = useSelector((state: RootState) => state.accounts);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [amountValue, setAmountValue] = useState<any>(null);
  const [ruleAccept, setRuleAccept] = useState<boolean>(false);
  const [accountList, setAccountList] = useState<any[]>([]);
  const [txIdValue, setTxIdValue] = useState<any>(null);
  const [hash, setHash] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isToken, setIsToken] = useState<any>(null);

  const handleSubmitUSD = async () => {
    try {
      const reponse = await DepositUsdtSend({
        paymentRef: "",
        txId: txIdValue,
      });

      if (reponse) {
        setHash(true);
      }
    } catch (error) {}
  };

  const postPaymentCreate = async () => {
    const sendAccounst = clientAccount.accounts
      .map((item) => item.accountCode)
      .join(", ");

    try {
      const url =
        "https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v2/payment-create";

      const payload = {
        paymentGatewayName: "USDT",
        platform: "HNZ MT4",
        cltCode: selectedAccount,
        name: client?.lastModUserName,
        idType: "",
        email: client?.email,
        mobile: `${client?.mobileNoArea}-${client?.mobileNo}`,
        inAmt: amountValue,
        ccy: "USD",
        basePath:
          "https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/payment-callback",
        paymentGatewayId: "12",
        companyId: "20",
        cltCodeListStr: sendAccounst,
        method: "nile",
        platformId: "42",
      };

      const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US",
        Authorization: `Bearer ${isToken}`,
      };

      const response = await axios.post(url, payload, { headers });

      if (response?.data) {
        handleSubmitUSD();
      }
    } catch (error) {}
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsToken(token);
    }
  }, [userId]);

  useEffect(() => {
    const getClientInfo = async () => {
      try {
        const res = await getClient(Number(userId));
        // @ts-ignore
        if (res) {
          const clientInfo = res?.data;

          setClient(clientInfo);

          if (client) {
          }
        }
      } catch (error) {}
    };
    if (userId) {
      getClientInfo();
    }
  }, [userId]);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        selectedAccount &&
        amountValue &&
        txIdValue &&
        amountValue > validValueNumber
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [selectedAccount, amountValue, txIdValue]);

  useEffect(() => {
    if (clientAccount.accounts?.length) {
      const filterAccountItem = clientAccount.accounts.map(
        (item: {
          id: any;
          balance: any;
          status: any;
          companyId: any;
          accountCode: any;
          platformId: any;
        }) => ({
          id: item.id,
          balance: item.balance,
          status: item.status,
          companyId: item.companyId,
          label: item.accountCode,
          value: item.accountCode,
          platformId: item.platformId,
        })
      );
      setAccountList(filterAccountItem);
    }
  }, [clientAccount]);

  useEffect(() => {
    const fetchUserOverview = async () => {
      try {
        const data = await getUserOverview();
        // @ts-ignore
        const allAccounts = data.data.liveAccounts;
        dispatch(setAccounts(allAccounts));
      } catch (error) {
        // @ts-ignore
        setErrorMessages(error?.message);
      }
    };

    fetchUserOverview();
  }, [router]);

  useLayoutEffect( () => {
    if(demo) {
      router.push("/dashboard");
    }
  },[demo]);

  return (
    <Layout>
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div className="px-4 py-10 md:py-20 md:px-0 w-full md:w-[720px] xl:w-[980px] md:mx-auto">
          <div className="flex flex-col">
            <h2 className="text-xl leading-5 md:text-[32px] font-medium md:leading-10 text-default">
              {t("deposit")} {""}
            </h2>
          </div>
          <div className="pt-10 pb-36 w-full  px-4 md:pt-20 md:pb-36 md:mx-auto md:w-[602px]">
            {ruleAccept ? (
              <div className="bg-hover-sidebar border shadow rounded p-5 flex flex-col">
                <div className="w-full flex justify-center">
                  <div className="">
                    <img
                      src="/images/found/USDT.tather.png"
                      alt="USDT.Tather"
                      width={220}
                      height={110}
                    />
                  </div>
                </div>
                <div className="mt-5" />
                <div className="flex flex-col ">
                  <div className="mt-4 ">
                    <DropDownComponent
                      options={accountList}
                      selectedOption={selectedAccount}
                      onChange={setSelectedAccount}
                      lableTitle={t("account")}
                      pleacholder={t("select_account")}
                    />
                  </div>
                  <div className="mt-4">
                    <InputForm
                      labelTitle={t("deposit_amount")}
                      value={amountValue}
                      placeholder={t("enter_deposit_amount")}
                      changeValue={setAmountValue}
                      // maxValue={"20"}
                    />
                    <div className="pt-1">
                      <span className="text-xxs font-normal leading-3 text-grey-seccondary">
                        {t("minimum_deposit_amount:")} {"20 USDT"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <InputForm
                      labelTitle={t("hash_txid")}
                      placeholder={t("enter_token_value")}
                      value={txIdValue}
                      changeValue={setTxIdValue}
                    />
                  </div>
                  <div className="mt-5" />
                  <div className=" w-full">
                    <div className="flex w-full justify-between px-4 py-4">
                      <button
                        type="button"
                        className="flex flex-row  items-center py-3.5 px-5 border border-sidebar  rounded-lg "
                        onClick={() => setRuleAccept(false)}
                      >
                        <span className="text-default font-medium text-sm leading-3.5">
                          {t("Cancel")}
                        </span>
                      </button>
                      <button
                        type="button"
                        className={`flex flex-row justify-center gap-1 items-center py-3.5 px-5 rounded-lg 
                          ${isFormValid ? "bg-default" : "bg-sidebar"}`}
                        disabled={!isFormValid}
                        onClick={postPaymentCreate}
                      >
                        {isFormValid ? (
                          <img
                            src="/icons/management/Padlock_Off_ligth.svg"
                            alt="Padlock_Off_Ligth"
                          />
                        ) : (
                          <img
                            src="/icons/management/Padlock_Off.svg"
                            alt="Padlock_Off"
                          />
                        )}
                        <span
                          className={` font-medium text-sm leading-3.5 *:first-letter:
                          ${isFormValid ? "text-white" : "text-grey-tertiary"}
                         
                         `}
                        >
                          {t("submit")}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-hover-sidebar border shadow rounded p-5 flex flex-col">
                <div className="w-full flex justify-center">
                  <div className="">
                    <img
                      src="/images/found/USDT.tather.png"
                      alt="USDT.Tather"
                      width={220}
                      height={110}
                    />
                  </div>
                </div>

                <div className="mt-6" />
                <div className="p-2">
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_1")} {""}
                  </p>
                  <div className="pt-2" />

                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_2")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_3")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_4")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_5")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_6")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_7")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_8")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_9")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_10")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_11")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_12")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_13")}
                  </p>
                  <div className="pt-2" />
                  <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                    {t("deposit_crypto_descritoion_14")}
                  </p>
                </div>
                <div className="mt-6" />
                <div className="flex w-full justify-center">
                  <button
                    type="button"
                    onClick={() => setRuleAccept(true)}
                    className="px-5 py-[14px] text-center bg-default rounded"
                  >
                    <span className="text-sm leading-3.5 font-medium  text-white ">
                      {t("accept_and_continue")}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DepositSuccess isOpen={hash} onClose={() => setClient(false)} />
    </Layout>
  );
};

export default DepositSend;
