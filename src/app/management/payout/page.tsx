"use client";

import React, { FC, useEffect, useRef, useState, useLayoutEffect } from "react";
import Layout from "@/app/dashboard/layout";
import RightBankInformation from "@/containers/payout/bankInformations";
import CryptoTeamSidebar from "@/containers/payout/cryptoTeamSidebar";
import CryptoSendSidebar from "@/containers/payout/cryptoSendSidebar";
import MobileMoneySidebar from "@/containers/payout/mobileMoneySidebar";
import PerfectMoneySidebar from "@/containers/payout/perfectMoneySidebar";
import LoadingScreen from "@/components/loadingScreen";
import { getAllBanks } from "@/services";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";

interface BankItem {
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

const Payout: FC = () => {
  /**
   *  Payout Hooks View.
   */

  const { t } = useTranslation("payout");
  const { demo } = useDemo();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [banckTab, setBanckTab] = useState<string>("");
  const [isOpenBankSidebar, setIsOpenBankSidebar] = useState<boolean>(false);
  const [isOpenCriptoTeam, setIsOpenCriptoTeam] = useState<boolean>(false);
  const [isOpenCrypToSidebar, setIsOpenCrypToSidebar] =
    useState<boolean>(false);

  const [isOpenMoneySidebar, setIsOpenMoneySidebar] = useState<boolean>(false);
  const [isOpenPerfectSidebar, setIsOpenPerfectSidebar] =
    useState<boolean>(false);

  const [bankList, setBankList] = useState<BankItem>();

  const toggleSidebarBank = () => {
    setBanckTab("bank_account");
    setIsOpenBankSidebar(!isOpenBankSidebar);
    setIsOpenCriptoTeam(false);
    setIsOpenCrypToSidebar(false);
    setIsOpenMoneySidebar(false);
    setIsOpenPerfectSidebar(false);
  };

  const toggleSidebarCripto = () => {
    setBanckTab("crypto-wallet");
    setIsOpenCriptoTeam(!isOpenCriptoTeam);
    setIsOpenBankSidebar(false);
    setIsOpenCrypToSidebar(false);
    setIsOpenMoneySidebar(false);
    setIsOpenPerfectSidebar(false);
  };

  const toggleSidebarMobileMoney = () => {
    setBanckTab("mobile-money");
    setIsOpenMoneySidebar(!isOpenMoneySidebar);
    setIsOpenBankSidebar(false);
    setIsOpenCriptoTeam(false);
    setIsOpenPerfectSidebar(false);
    setIsOpenCrypToSidebar(false);
  };

  // const toggleSidebarPerfecMoney = () => {
  //   setBanckTab("perdect-money");
  //   setIsOpenPerfectSidebar(!isOpenPerfectSidebar);
  //   setIsOpenBankSidebar(false);
  //   setIsOpenCriptoTeam(false);
  //   setIsOpenCrypToSidebar(false);
  //   setIsOpenMoneySidebar(false);
  // };

  const toggleConfirmeCrypto = () => {
    setIsOpenCriptoTeam(false);
    setIsOpenCrypToSidebar(!isOpenCrypToSidebar);
    setBanckTab("crypto-wallet");
  };

  useEffect(() => {
    if (
      !isOpenBankSidebar &&
      !isOpenCrypToSidebar &&
      !isOpenMoneySidebar &&
      !isOpenPerfectSidebar
    ) {
      setBanckTab("");
    }
  }, [
    isOpenBankSidebar,
    isOpenCrypToSidebar,
    isOpenMoneySidebar,
    isOpenPerfectSidebar,
  ]);

  useEffect(() => {
    if (isOpenCriptoTeam || isOpenCrypToSidebar) {
      setBanckTab("crypto-wallet");
    }
  }, [isOpenCriptoTeam, isOpenCrypToSidebar]);

  useEffect(() => {
    setIsProcessing(true);
    const getBank = async () => {
      try {
        const res = await getAllBanks();
        // @ts-ignore
        const allData = res.data;
        setBankList(allData);
        setIsProcessing(false);
      } catch (error) {}
    };
    getBank();
  }, []);

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

  useLayoutEffect(() => {
    if (demo) {
      router.push("/dashboard");
    }
  }, [demo]);

  const sidebarRef = useRef(null);
  const sidebarRefExclude = useRef(null);
  useOnClickOutside(sidebarRef, setIsOpenBankSidebar, sidebarRefExclude);

  const cryptoRef = useRef(null);
  const cryptoRefExclude = useRef(null);
  useOnClickOutside(cryptoRef, setIsOpenCriptoTeam, cryptoRefExclude);

  const mobMonRef = useRef(null);
  const mobMonRefExclude = useRef(null);
  useOnClickOutside(mobMonRef, setIsOpenMoneySidebar, mobMonRefExclude);

  const perfectMoneyRef = useRef(null);
  const perfectMoneyRefExclude = useRef(null);
  useOnClickOutside(
    perfectMoneyRef,
    setIsOpenPerfectSidebar,
    perfectMoneyRefExclude
  );

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      <div className="flex-1 h-full font-aeonik bg-grey-exrta-ligth-extra">
        <div
          className={`pt-10 pb-36 w-full px-4 md:pb-36 md:pt-20 md:w-[720px]  ${
            banckTab !== "" ? "md:mx-auto" : "md:mx-auto"
          } `}
        >
          <div className="flex flex-col">
            <h2 className="text-xl leading-6 md:text-3.5xl md:leading-9 font-aeonik font-medium text-default ">
              {t("my_payout_methods")}
            </h2>
            <div className="mt-2" />
            <p className="text-lg font-normal leading-5.5 text-grey-seccondary ">
              {t("my_payoyt_subtitle")}
            </p>
          </div>
          <div className="mt-10" />
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xxs font-normal leading-3 text-grey-tertiary">
                {" "}
                {t("set_up_payout")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Bank Information */}
              <div
                ref={sidebarRefExclude}
                className={`group flex flex-row flex-shrink-0 px-4 py-7 md:p-12 border rounded-lg items-center gap-2 border-dashed cursor-pointer 
                            hover:border-default hover:shadow  ${
                              banckTab === "bank_account"
                                ? "border-default bg-orange-extra-light"
                                : "bg-grey-exrta-ligth-extra  border-grey-profile"
                            }
                            `}
                onClick={() => toggleSidebarBank()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6  ${
                    banckTab === "bank_account" ? "bg-default" : "bg-sidebar"
                  } `}
                >
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
                </div>
                <div className="flex flex-col w-full md:w-[410px]">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("bank_information")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("bank_information_description")}
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="button-div hidden group-hover:block ">
                    <button className="bg-default  flex rounded py-[14px] px-5 items-center justify-center">
                      <img
                        src="/icons/management/plus-ligth.svg"
                        alt="Plus-Ligth"
                      />
                      <span className="mx-1"></span>
                      <span className="text-sm font-medium leading-4 text-white">
                        {" "}
                        {t("add")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Crypto Wallet */}
              <div
                ref={cryptoRefExclude}
                className={`group flex flex-row flex-shrink-0 px-4 py-7 md:p-12 border rounded-lg items-center gap-2 border-dashed cursor-pointer
                  hover:border-default hover:shadow 
                  ${
                    banckTab === "crypto-wallet"
                      ? "border-default bg-orange-extra-light"
                      : "bg-grey-exrta-ligth-extra  border-grey-profile"
                  }
                  `}
                onClick={() => toggleSidebarCripto()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6  ${
                    banckTab === "crypto-wallet" ? "bg-default" : "bg-sidebar"
                  } `}
                >
                  {banckTab === "crypto-wallet" ? (
                    <img
                      src="/icons/management/Crypto-Wallet-ligth.svg"
                      alt="Crypto-Wallet-Ligth"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <img
                      src="/icons/management/Crypto-Wallet.svg"
                      alt="Crypto-Wallet"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <div className="flex flex-col w-full md:w-[410px]">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("crypto_wallet")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("crypto_wallet_description")}
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="button-div hidden group-hover:block">
                    <button className="bg-default rounded py-[14px] px-5 flex items-center justify-center">
                      <img
                        src="/icons/management/plus-ligth.svg"
                        alt="Plus-Ligth"
                      />
                      <span className="mx-1"></span>
                      <span className="text-sm font-medium leading-4 text-white">
                        {" "}
                        {t("add")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Mobile Money */}
              <div
                ref={mobMonRefExclude}
                className={`group flex flex-row flex-shrink-0 px-4 py-7 md:p-12 border rounded-lg items-center gap-2 border-dashed cursor-pointer
                  hover:border-default hover:shadow 
                  ${
                    banckTab === "mobile-money"
                      ? "border-default bg-orange-extra-light"
                      : "bg-grey-exrta-ligth-extra  border-grey-profile"
                  }
                  `}
                onClick={() => toggleSidebarMobileMoney()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6  ${
                    banckTab === "mobile-money" ? "bg-default" : "bg-sidebar"
                  } `}
                >
                  {banckTab === "mobile-money" ? (
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
                </div>
                <div className="flex flex-col w-full md:w-[410px]">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("mobile_money")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("mobile_money_description")}
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="button-div hidden group-hover:block ">
                    <button className="bg-default rounded py-[14px] px-5 flex items-center justify-center">
                      <img
                        src="/icons/management/plus-ligth.svg"
                        alt="Plus-Ligth"
                      />
                      <span className="mx-1"></span>
                      <span className="text-sm font-medium leading-4 text-white">
                        {" "}
                        {t("add")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Perfect Money */}
              {/* This line comment for the new Update */}
              {/* <div
                ref={perfectMoneyRefExclude}
                className={`group flex flex-row flex-shrink-0 px-4 py-7 md:p-12 border rounded-lg items-center gap-2 border-dashed cursor-pointer
                  hover:border-default hover:shadow
                  ${
                    banckTab === "perdect-money"
                      ? "border-default bg-orange-extra-light"
                      : "bg-grey-exrta-ligth-extra  border-grey-profile"
                  }
                  `}
                onClick={() => toggleSidebarPerfecMoney()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6  ${
                    banckTab === "perdect-money" ? "bg-default" : "bg-sidebar"
                  } `}
                >
                  {banckTab === "perdect-money" ? (
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
                </div>
                <div className="flex flex-col w-full md:w-[410px]">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("perfect_money")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("perfect_money_description")}
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="button-div hidden group-hover:block">
                    <button className="bg-default rounded py-[14px] px-5 flex items-center justify-center">
                      <img
                        src="/icons/management/plus-ligth.svg"
                        alt="Plus-Ligth"
                      />
                      <span className="mx-1"></span>
                      <span className="text-sm font-medium leading-4 text-white">
                        {" "}
                        {t("add")}
                      </span>
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* <div ref={sidebarRef}>
          <RightBankInformation
            isOpenBar={isOpenBankSidebar}
            setIsOpen={setIsOpenBankSidebar}
            bankList={bankList as BankItem}
          />
        </div> */}

        <div ref={sidebarRef} onClick={() => setIsOpenBankSidebar(false)}>
          <RightBankInformation
            isOpenBar={isOpenBankSidebar}
            setIsOpen={setIsOpenBankSidebar}
            bankList={bankList as BankItem}
          />
        </div>

        <div ref={cryptoRef} onClick={() => setIsOpenCriptoTeam(false)}>
          <CryptoTeamSidebar
            isOpenBar={isOpenCriptoTeam}
            setIsOpen={setIsOpenCriptoTeam}
            acceptCrypto={toggleConfirmeCrypto}
          />
        </div>

        <div>
          <CryptoSendSidebar
            isOpenBar={isOpenCrypToSidebar}
            setIsOpen={setIsOpenCrypToSidebar}
          />
        </div>

        <div ref={mobMonRef}>
          <MobileMoneySidebar
            isOpenBar={isOpenMoneySidebar}
            setIsOpen={setIsOpenMoneySidebar}
          />
        </div>

        <div ref={perfectMoneyRef}>
          <PerfectMoneySidebar
            isOpenBar={isOpenPerfectSidebar}
            setIsOpen={setIsOpenPerfectSidebar}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Payout;
