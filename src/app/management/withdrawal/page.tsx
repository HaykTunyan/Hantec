"use client";

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import Layout from "@/app/dashboard/layout";
import BanckAccount from "@/containers/withdrawal/bankAccount";
import MobileMoney from "@/containers/withdrawal/mobileMoney";
import PerfectMoney from "@/containers/withdrawal/perfectMoney";
import UsdtAccount from "@/containers/withdrawal/usdt";
import RightWithdrawalReminder from "@/containers/withdrawal/rightWithdrawalReminder";
import WithdrawalConfirmation from "@/containers/withdrawal/withdrawalConfirmation";
import WithdrawalReceived from "@/containers/withdrawal/withdrawalReceived";
import { useDemo } from "@/context/DemoContext";
// API && Service.
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AppDispatch } from "@/store/store";
import { setConfigWithdraw } from "@/store/slices/configWithdraw";
import {
  getAllBanks,
  PaymentGatewayConfirm,
  getClient,
  getUserOverview,
  fetchConfigWithdraw,
  getBankLocation,
} from "@/services";
import { setWallet } from "@/store/slices/walletSlice";
import { useRouter } from "next/navigation";
import { setAccounts } from "@/store/slices/userOverview";
import LoadingScreen from "@/components/loadingScreen";
import { useTranslation } from "next-i18next";

interface BankItem {
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

const Withdrawal: FC = () => {
  /**
   * Withdrawal View Hooks.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const { t } = useTranslation("withdrawal");
  const dispatch = useDispatch<AppDispatch>();
  const clientAccount = useSelector((state: RootState) => state.accounts);
  const currencyWithdrawal = useSelector(
    (state: RootState) => state.configWithdraw
  );

  const currencyRegion = useSelector((state: RootState) => state.userRegions);

  const [isOpenReminder, setIsOpenReminder] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenReceived, setIsOpenReceived] = useState<boolean>(false);
  const [banckTab, setBanckTab] = useState<string>("bank_account");
  const [onLeft, setOnLef] = useState<boolean>(false);
  const [client, setClient] = useState<any>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bankList, setBankList] = useState<BankItem>();
  const [submitData, setSubmitData] = useState<any | null>(null);
  const [userId, setUserId] = useState<any>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [showIframe, setShowIframe] = useState<boolean>(false);
  const [clientRegion] = useState<any>(currencyRegion?.regions);

  const handleChangeTabBank = (titleType: string): void => {
    setBanckTab(titleType);
    setIframeUrl("");
    setSubmitData(null);
    setShowIframe(false);
    setIsModalOpen(false);
    setIsOpenReminder(false);
  };

  const toggleSidebarReminder = () => {
    setIsOpenReminder(!isOpenReminder);
  };

  const openWithdrawalModal = () => {
    setIsModalOpen(true);
  };

  const closeWithdrawalModal = () => {
    setIsModalOpen(false);
  };

  const confirmWithdrawal = async () => {
    setIsModalOpen(false);
    try {
      const response = await PaymentGatewayConfirm(confirmId as any);

      if (response.data) {
        const clientAction = response?.data?.clientSideAction?.redirectUrl;
        setIframeUrl(clientAction);
      }
      setShowIframe(true);
    } catch (error) {}
    //  setIsOpenReceived(true);
  };

  const closeRecived = () => {
    setIsOpenReceived(false);
  };

  useEffect(() => {
    if (isOpenReminder) {
      setOnLef(true);
    } else {
      setOnLef(false);
    }
  }, [isOpenReminder]);

  useEffect(() => {
    const getWithdrawalConfig = async () => {
      try {
        const response = await fetchConfigWithdraw({
          companyId: 20,
          isActive: true,
          region: clientRegion[0]?.region,
          userType: "CLIENT",
        });
        if (response) {
          const confirmWithdrawalInfo = response?.data;
          dispatch(setConfigWithdraw(confirmWithdrawalInfo));
        }
      } catch (error) {}
    };
    getWithdrawalConfig();
  }, []);

  useEffect(() => {
    const fetchBankLocation = async () => {
      try {
        const response = await getBankLocation();

        if (response) {
        }
      } catch (error) {}
    };

    fetchBankLocation();
  }, []);

  useEffect(() => {
    const getBank = async () => {
      try {
        const res = await getAllBanks();
        // @ts-ignore
        const allData = res.data;
        setBankList(allData);
      } catch (error) {}
    };
    getBank();
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
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
            setWalletClient(client?.cryptoWallets);

            dispatch(setWallet(client.cryptoWallets));
          }

          if (walletClient) {
          }
        }
      } catch (error) {}
    };
    if (userId) {
      getClientInfo();
    }
  }, [userId, router]);

  useEffect(() => {
    if (confirmId) {
      confirmWithdrawal();
    } else {
    }
  }, [isModalOpen, banckTab]);

  useEffect(() => {
    setIsProcessing(true);
    const fetchUserOverview = async () => {
      try {
        const data = await getUserOverview();
        // @ts-ignore
        const allAccounts = data.data.liveAccounts;
        dispatch(setAccounts(allAccounts));
        setIsProcessing(false);
      } catch (error) {
        // @ts-ignore
        setErrorMessages(error?.message);
      }
    };

    fetchUserOverview();
  }, [router]);

  // useEffect(() => {
  //   const changeChatPosition = () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     if (chatWidget) {
  //       chatWidget.classList.add("custom-chat-position");
  //     }
  //   };
  //
  //   changeChatPosition();
  //
  //   return () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     if (chatWidget) {
  //       chatWidget.classList.remove("custom-chat-position");
  //     }
  //   };
  // }, []);

  useLayoutEffect( () => {
    if(demo) {
      router.push("/dashboard");
    }
  },[demo]);

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div
          className={`pt-10 pb-36 w-full  px-4 md:pt-20 md:pb-36  md:w-[602px]  
           ${onLeft ? "md:mx-auto" : "md:mx-auto"}
          `}
        >
          {/* Title */}
          <div className="flex flex-col">
            <h2 className="text-xl md:text-[32px] font-medium leading-10 text-default">
              {t("title_withdrawal")}
            </h2>
            <div className="mt-2" />
            <p className="font-normal text-lg leading-6  text-grey-seccondary">
              {t("select_payment_gateways")}
            </p>
          </div>
          <div className="mt-6" />
          <div className="">
            <div className="flex flex-row overflow-x-auto scroll-smooth  md:flex-row gap-1 md:gap-[14px] ">
              <div
                className={`w-28 min-w-28 h-18 md:w-[140px] md:h-[90px]  rounded-lg px-6 py-2  cursor-pointer
                ${
                  banckTab === "bank_account" ? " bg-default " : "bg-sidebar"
                } `}
                onClick={() => handleChangeTabBank("bank_account")}
              >
                <div className="flex flex-col items-center py-3 md:py-2">
                  {banckTab === "bank_account" ? (
                    <img
                      src="/icons/management/Bank_ligth.svg"
                      alt="Bank_ligth"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <img
                      src="/icons/management/Bank.svg"
                      alt="Bank"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="mt-2" />
                  <p
                    className={`
                      hidden md:block
                     text-xxs font-medium leading-3
                    ${
                      banckTab === "bank_account"
                        ? " text-orange-extra-light "
                        : "text-grey-seccondary"
                    }
                    `}
                  >
                    {" "}
                    {t("bank_account")}
                  </p>
                </div>
              </div>
              <div
                className={`
              w-28 min-w-28 h-18 md:w-[140px] md:h-[90px]  rounded-lg px-6 py-2  cursor-pointer
              ${banckTab === "mobile_money" ? " bg-default " : "bg-sidebar"}
              `}
                onClick={() => handleChangeTabBank("mobile_money")}
              >
                <div className="flex flex-col items-center py-3 md:py-2">
                  {banckTab === "mobile_money" ? (
                    <img
                      src="/icons/management/Mobile_Money_ligth.svg"
                      alt="Mobile_Money_ligth"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <img
                      src="/icons/management/Mobile_Money.svg"
                      alt="Mobile_Money"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="mt-2" />
                  <p
                    className={`
                      hidden md:block
                     text-xxs font-medium leading-3
                    ${
                      banckTab === "mobile_money"
                        ? " text-orange-extra-light "
                        : "text-grey-seccondary"
                    }
                    `}
                  >
                    {" "}
                    {t("mobile_money")}
                  </p>
                </div>
              </div>
              <div
                className={`
              w-28 min-w-28 h-18 md:w-[140px] md:h-[90px]  rounded-lg px-6 py-2  cursor-pointer
              ${banckTab === "perfect_money" ? " bg-default " : "bg-sidebar"}
              `}
                onClick={() => handleChangeTabBank("perfect_money")}
              >
                <div className="flex flex-col  items-center py-3 md:py-2">
                  {banckTab === "perfect_money" ? (
                    <img
                      src="/icons/management/Perfect_Money_ligth.svg"
                      alt="Perfect_Money_ligth"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <img
                      src="/icons/management/Perfect_Money.svg"
                      alt="Perfect_Money"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="mt-2" />
                  <p
                    className={`
                      hidden md:block
                     text-xxs font-medium leading-3
                    ${
                      banckTab === "perfect_money"
                        ? " text-orange-extra-light "
                        : "text-grey-seccondary"
                    }
                    `}
                  >
                    {t("perfect_money")}
                  </p>
                </div>
              </div>
              <div
                className={`
               w-28 min-w-28 h-18 md:w-[140px] md:h-[90px]  rounded-lg px-6 py-2  cursor-pointer
              ${banckTab === "usdt" ? " bg-default " : "bg-sidebar"}
              `}
                onClick={() => handleChangeTabBank("usdt")}
              >
                <div className="flex flex-col items-center py-3 md:py-2">
                  {banckTab === "usdt" ? (
                    <img
                      src="/icons/management/USDT_ligth.svg"
                      alt="USDT_ligth"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <img
                      src="/icons/management/USDT.svg"
                      alt="USDT"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="mt-2" />
                  <p
                    className={`
                      hidden md:block
                     text-xxs font-medium leading-3
                    ${
                      banckTab === "usdt"
                        ? " text-orange-extra-light "
                        : "text-grey-seccondary"
                    }
                    `}
                  >
                    {t("usdt")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14">
            {/* Banck Account */}
            {banckTab === "bank_account" && (
              <BanckAccount
                toggleSidebarReminder={toggleSidebarReminder}
                openModal={openWithdrawalModal}
                clientAccount={clientAccount}
                currencyWithdrawal={currencyWithdrawal}
                bankList={bankList as BankItem}
                setSubmitData={setSubmitData as any}
                iframeUrl={iframeUrl}
                showIframe={showIframe}
              />
            )}
            {/* Mobile Money */}
            {banckTab === "mobile_money" && (
              <MobileMoney
                toggleSidebarReminder={toggleSidebarReminder}
                openModal={openWithdrawalModal}
                clientAccount={clientAccount}
                currencyWithdrawal={currencyWithdrawal}
                bankList={bankList as BankItem}
                setSubmitData={setSubmitData as any}
                iframeUrl={iframeUrl}
                showIframe={showIframe}
              />
            )}

            {/* Banck Account */}
            {banckTab === "perfect_money" && (
              <PerfectMoney
                toggleSidebarReminder={toggleSidebarReminder}
                openModal={openWithdrawalModal}
                clientAccount={clientAccount}
                setSubmitData={setSubmitData}
                iframeUrl={iframeUrl}
                showIframe={showIframe}
              />
            )}

            {/* Banck Account */}
            {banckTab === "usdt" && (
              <UsdtAccount
                toggleSidebarReminder={toggleSidebarReminder}
                openModal={openWithdrawalModal}
                clientAccount={clientAccount}
                setSubmitData={setSubmitData}
                iframeUrl={iframeUrl}
                showIframe={showIframe}
              />
            )}
          </div>
        </div>
      </div>
      <div className="">
        <RightWithdrawalReminder
          toggleSidebar={toggleSidebarReminder}
          setIsOpen={setIsOpenReminder}
          isOpenBar={isOpenReminder}
        />

        <WithdrawalConfirmation
          isOpen={isModalOpen}
          onClose={closeWithdrawalModal}
          // confirmed={confirmWithdrawal}
          submitData={submitData}
          checkConfirmId={setConfirmId as any}
        />
        <WithdrawalReceived isOpen={isOpenReceived} onClose={closeRecived} />
      </div>
    </Layout>
  );
};

export default Withdrawal;
