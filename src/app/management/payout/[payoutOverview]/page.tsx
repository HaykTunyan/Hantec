"use client";

import React, {
  FC,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  Fragment,
} from "react";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import Layout from "@/app/dashboard/layout";
import BankInformationSidebar from "@/containers/payout/bankAccountSidebar";
import ModalCondifrmPassword from "@/containers/payout/modalConfirmPassword";
// import ModalDeleteConfirmation from "@/containers/payout/modalDeleteConfirmation";
import ModalDeleteReminder from "@/containers/payout/modalDeleteReminder";
import SetUpPayoutMethodSidebar from "@/containers/payout/setUpPayoutMethodSidebar";
import CryptoSendSidebar from "@/containers/payout/cryptoSendSidebar";
import RightBankInformation from "@/containers/payout/bankInformations";
import CryptoTeamSidebar from "@/containers/payout/cryptoTeamSidebar";
import MobileMoneySidebar from "@/containers/payout/mobileMoneySidebar";
import PerfectMoneySidebar from "@/containers/payout/perfectMoneySidebar";
import { getClient, getAllBanks } from "@/services";
import LoadingScreen from "@/components/loadingScreen";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";
import DeleteSuccessfully from "@/containers/payout/deleteSuccessfully";

interface BankItem {
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

const PayoutOverview: FC = () => {
  /**
   *  Payout Overview Hooks.
   */

  const { t } = useTranslation("payout");
  const router = useRouter();
  const { demo } = useDemo();
  const [isOpenAccountSidebar, setIsOpenAccountSidebar] =
    useState<boolean>(false);
  const [isOpenSetUpPayoutSidebar, setIsOpenSetUpPayoutSidebar] =
    useState<boolean>(false);
  const [isOpenConfirmEditModal, setIsOpenConfirmEditModal] =
    useState<boolean>(false);
  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
    useState<boolean>(false);

  // Payout Method Sidebar
  const [isOpenBankSidebar, setIsOpenBankSidebar] = useState<boolean>(false);
  const [isOpenCryptoSidebar, setIsOpenCryptoSidebar] =
    useState<boolean>(false);
  const [isOpenCriptoTeam, setIsOpenCriptoTeam] = useState<boolean>(false);
  const [isOpenMoneySidebar, setIsOpenMoneySidebar] = useState<boolean>(false);
  const [isOpenPerfectSidebar, setIsOpenPerfectSidebar] =
    useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isAccountTypes, setIsAccountType] = useState<string>("");
  const [bankList, setBankList] = useState<BankItem>();
  const [userId, setUserId] = useState<any>(null);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);

  const [sendId, setSendId] = useState<any>(null);
  const [sendType, setSendType] = useState<string>("");

  // Cients
  const [clientInfo, setClientInfo] = useState<any>(null);
  const listOfBanks = clientInfo?.banks;
  const listOfCrypto = clientInfo?.cryptoWallets;
  const listOfMobileMoney = clientInfo?.mobileMoney;
  {
    /* This line comment for the new Update */
  }
  // const listOfPerfectMoney = clientInfo?.perfectMoney;

  const toggleAccountSidebar = (toggleType: string) => {
    setIsOpenAccountSidebar(!isOpenAccountSidebar);
    setIsAccountType(toggleType);
  };

  const confirmationEditModal = () => {};

  const confirmationDelete = (type: string) => {
    if (type === "success") {
      setSuccessDelete(true);
    }
  };

  const openModalCondifrmPassword = () => {
    setIsOpenAccountSidebar(false);
    setIsOpenConfirmEditModal(true);
  };

  const confirmationDeleteModal = (Id: any, type: string) => {
    setSendId(Id);
    setSendType(type);
    setIsOpenAccountSidebar(false);
    setIsOpenDeleteConfirmation(true);
  };

  const handelSetUpPayoutSidebar = () => {
    setIsOpenSetUpPayoutSidebar(true);
  };

  // Open Cyrpto Wallet Sidebar
  const handleOpenBankSidebar = () => {
    setIsOpenSetUpPayoutSidebar(false);
    setIsOpenBankSidebar(true);
  };

  const handleOpenCryptoSidebar = () => {
    setIsOpenSetUpPayoutSidebar(false);
    setIsOpenCriptoTeam(true);
  };

  const handleOpenMoneySidebar = () => {
    setIsOpenSetUpPayoutSidebar(false);
    setIsOpenMoneySidebar(true);
  };

  const handleOpenPerfectMoneySidebar = () => {
    setIsOpenSetUpPayoutSidebar(false);
    setIsOpenPerfectSidebar(true);
  };

  const toggleConfirmeCrypto = () => {
    setIsOpenCriptoTeam(false);
    setIsOpenCryptoSidebar(true);
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, [userId]);

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

  useEffect(() => {
    setIsProcessing(true);
    const getClientInfo = async () => {
      try {
        const res = await getClient(Number(userId));
        // @ts-ignore
        setClientInfo(res.data);

        setIsProcessing(false);
      } catch (error) {}
    };
    if (userId) {
      getClientInfo();
    }
  }, [
    isOpenDeleteConfirmation,
    isOpenMoneySidebar,
    isOpenCryptoSidebar,
    userId,
  ]);

  // useEffect(() => {
  //   const changeChatPosition = () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     if (chatWidget) {
  //       chatWidget.classList.add("custom-chat-position");
  //     }
  //   };
  //
  //   setTimeout(() => {
  //     changeChatPosition();
  //   }, 1500);
  //
  //   return () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     chatWidget?.classList.remove("custom-chat-position");
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
          className={`pt-10 pb-48 w-full px-4 md:pb-36 md:pt-20 md:w-[720px] ${
            isOpenAccountSidebar ? "ml-8" : "md:mx-auto"
          }`}
        >
          <div className="flex flex-col">
            <h2 className="text-xl leading-6 md:text-3.5xl md:leading-9 font-medium text-default ">
              {t("my_payout_methods")}
            </h2>
            <div className="mt-2" />
            <p className="text-lg font-normal leading-5.5 text-grey-seccondary">
              {t("my_payoyt_subtitle")}
            </p>
          </div>
          <div className="mt-10" />
          <div className="flex flex-col ">
            <div className="">
              <button
                type="button"
                onClick={() => handelSetUpPayoutSidebar()}
                className="border border-default border-opacity-10 p-3.5 rounded  md:px-3.5 md:py-3.5 flex justify-center items-center hover:border-opacity-45 "
              >
                <img src="/icons/plus.svg" alt="Plus" />

                <span className="text-default font-medium leading-3.5 text-sm">
                  {" "}
                  {t("add_new_payment_method")}
                </span>
              </button>
            </div>
            {/* Bank Accounts */}
            <div className="pt-10" />
            <div className="flex flex-col">
              {listOfBanks?.length ? (
                <span className="text-xxs font-normal leading-3 tracking-normal text-grey-tertiary ">
                  {" "}
                  {t("my_bank_accounts")}
                </span>
              ) : (
                <Fragment></Fragment>
              )}

              {/* listOfBanks */}
              {listOfBanks?.length ? (
                <Fragment>
                  {listOfBanks.map(
                    (item: any, index: React.Key | null | undefined) => (
                      <div className="pt-3" key={index}>
                        <div className="border border-default border-opacity-10  p-4 md:p-6 rounded-lg w-full flex flex-row md:items-center">
                          <div className="w-5/12 md:w-3/12 flex flex-col">
                            <div className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              AB Bank Limited
                            </div>
                            {item.status === "P" && (
                              <div className="rounded-sm px-1 py-0.5 bg-hover-sidebar text-xxs leading-3 tracking-normal text-default w-min">
                                <div className="pt-1.5" />
                                Pending
                              </div>
                            )}
                          </div>
                          <div className="hidden w-2/12 md:flex flex-row justify-start items-center">
                            <img
                              src="/icons/country/england.svg"
                              alt="England"
                            />
                            <span className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {" "}
                              GBP{" "}
                            </span>
                          </div>
                          <div className="w-5/12 md:w-3/12 flex justify-start items-center ">
                            <span className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {item.bankAccNo}
                            </span>
                          </div>

                          <div className="w-2/12 flex justify-end items-center">
                            {item.status !== "P" && (
                              <div
                                className="flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded "
                                onClick={() => toggleAccountSidebar("bank")}
                              >
                                <img
                                  src="/icons/management/dots-horizontal.svg"
                                  alt="Dots-Horizontal"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
            {/* Crypto Wallets */}
            <div className="pt-8" />
            <div className="flex flex-col ">
              {listOfCrypto?.length ? (
                <span className="text-xxs font-normal leading-3 tracking-normal text-grey-tertiary ">
                  {" "}
                  {t("my_saved_crypto_wallets")}
                </span>
              ) : (
                <Fragment></Fragment>
              )}

              {listOfCrypto?.length ? (
                <Fragment>
                  {listOfCrypto.map(
                    (item: any, index: React.Key | null | undefined) => (
                      <div className="pt-3" key={index}>
                        <div className="border border-default border-opacity-10 p-4 md:p-6 rounded-lg w-full flex flex-row items-center">
                          <div className="w-5/12 md:w-3/12 flex flex-col">
                            <div className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {item.walletName}
                            </div>
                          </div>
                          <div className="hidden w-2/12 md:flex flex-row justify-start items-center">
                            <img
                              src="/icons/country/england.svg"
                              alt="England"
                            />
                            <span className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {" "}
                              GBP{" "}
                            </span>
                          </div>
                          <div className="w-5/12  md:w-3/12 flex justify-start items-center ">
                            <div className="font-normal text-sm leading-3.5 tracking-wider text-default w-28 md:w-full overflow-hidden whitespace-nowrap truncate">
                              {item.walletAddress}
                            </div>
                          </div>
                          <div className="w-2/12 md:w-4/12 flex justify-end items-center gap-2">
                            <div
                              className="flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded "
                              onClick={() =>
                                confirmationDeleteModal(item.id, "crypto")
                              }
                            >
                              <img
                                src="/icons/management/trash.svg"
                                alt="Trash"
                              />
                            </div>
                            {/* <div
                    className="flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded"
                    onClick={() => toggleAccountSidebar("crypto")}
                  >
                    <img
                      src="/icons/management/dots-horizontal.svg"
                      alt="Dots-Horizontal"
                    />
                  </div> */}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
            {/* Mobile Money  */}
            <div className="pt-8" />
            <div className="flex flex-col">
              {listOfMobileMoney?.length ? (
                <span className="text-xxs font-normal leading-3 tracking-normal text-grey-tertiary ">
                  {" "}
                  {t("my_mobile_money_accounts")}
                </span>
              ) : (
                <Fragment></Fragment>
              )}

              {listOfMobileMoney?.length ? (
                <Fragment>
                  {listOfMobileMoney.map(
                    (item: any, index: React.Key | null | undefined) => (
                      <div className="pt-3" key={index}>
                        <div className="border border-default border-opacity-10 p-4 md:p-6 rounded-lg w-full flex flex-row items-center">
                          <div className="w-5/12 md:w-3/12 flex flex-col">
                            <div className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {item.walletLocation}
                            </div>
                          </div>
                          <div className="w-5/12 md:w-3/12 flex flex-row justify-start items-center">
                            <span className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {item.walletProviderName}
                            </span>
                          </div>
                          <div className="w-2/12 md:w-6/12 flex justify-end items-center gap-2">
                            <div
                              className="flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded "
                              onClick={() =>
                                confirmationDeleteModal(item.id, "mobile")
                              }
                            >
                              <img
                                src="/icons/management/trash.svg"
                                alt="Trash"
                              />
                            </div>
                            {/* <div
                    className="flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded "
                    onClick={() => toggleAccountSidebar("mobile")}
                  >
                    <img
                      src="/icons/management/dots-horizontal.svg"
                      alt="Dots-Horizontal"
                    />
                  </div> */}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
            {/* Perfect Money  */}
            {/* This line comment for the new Update */}
            {/* <div className="pt-8" /> */}
            {/* <div className="flex flex-col ">
              <span className="text-xxs font-normal leading-3 tracking-normal text-grey-tertiary ">
                {" "}
                {t("my_perfect_money_accounts")}
              </span>
              {listOfPerfectMoney?.length ? (
                <Fragment>
                  {listOfPerfectMoney.map(
                    (item: any, index: React.Key | null | undefined) => (
                      <div className="pt-3" key={index}>
                        <div className="border border-default border-opacity-10 p-4 md:p-6 rounded-lg w-full flex flex-row items-center">
                          <div className="w-5/12 md:w-3/12 flex flex-col">
                            <div className="font-normal text-sm leading-3.5 tracking-wider text-default w-28 md:w-full overflow-hidden whitespace-nowrap truncate">
                              {item.accHolderName}
                            </div>
                          </div>
                          <div className="w-5/12 md:w-3/12 flex flex-row justify-start items-center">
                            <span className="font-normal text-sm leading-3.5 tracking-wider text-default">
                              {item.accNo}
                            </span>
                          </div>
                          <div className="w-2/12 md:w-6/12 flex justify-end items-center gap-2">
                            <div
                              className="hidden md:flex items-center w-8 h-8 p-2 md:w-14 md:h-11 md:px-5 md:py-4  border border-default border-opacity-10 cursor-pointer hover:border-opacity-45 rounded "
                              onClick={() =>
                                confirmationDeleteModal(item.id, "perfect")
                              }
                            >
                              <img
                                src="/icons/management/trash.svg"
                                alt="Trash"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </div> */}
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="" ref={sidebarRef}>
        <RightBankInformation
          isOpenBar={isOpenBankSidebar}
          setIsOpen={setIsOpenBankSidebar}
          bankList={bankList as BankItem}
        />
      </div>

      <div className="">
        {/* Show the Account Information */}

        <div className="" onClick={() => setIsOpenAccountSidebar(false)}>
          <BankInformationSidebar
            typeAccount={isAccountTypes}
            isOpenBar={isOpenAccountSidebar}
            setIsOpen={setIsOpenAccountSidebar}
            isOpenEditModal={openModalCondifrmPassword}
            isOpenDeleteModal={() => confirmationDeleteModal(sendId, sendType)}
          />
        </div>

        <div className="">
          <CryptoSendSidebar
            isOpenBar={isOpenCryptoSidebar}
            setIsOpen={setIsOpenCryptoSidebar}
          />
        </div>

        <div>
          <CryptoTeamSidebar
            isOpenBar={isOpenCriptoTeam}
            setIsOpen={setIsOpenCriptoTeam}
            acceptCrypto={toggleConfirmeCrypto}
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

        <SetUpPayoutMethodSidebar
          isOpenBar={isOpenSetUpPayoutSidebar}
          setIsOpen={setIsOpenSetUpPayoutSidebar}
          handleOpenBankSidebar={handleOpenBankSidebar}
          handleOpenCryptoSidebar={handleOpenCryptoSidebar}
          handleOpenMoneySidebar={handleOpenMoneySidebar}
          handleOpenPerfectMoneySidebar={handleOpenPerfectMoneySidebar}
        />
      </div>
      {/* Modals */}
      <div className="">
        <ModalCondifrmPassword
          isOpen={isOpenConfirmEditModal}
          onClose={() => setIsOpenConfirmEditModal(false)}
          confirmed={confirmationEditModal}
        />
        {/* <ModalDeleteConfirmation
          isOpen={isOpenDeleteConfirmation}
          onClose={() => setIsOpenDeleteConfirmation(false)}
          sendType={sendType}
          sendId={sendId}
        /> */}

        <ModalDeleteReminder
          isOpen={isOpenDeleteConfirmation}
          onClose={() => setIsOpenDeleteConfirmation(false)}
          confirmation={confirmationDelete}
          sendType={sendType}
          sendId={sendId}
        />

        <DeleteSuccessfully
          isOpen={successDelete}
          onClose={() => setSuccessDelete(false)}
          sendType={sendType}
        />
      </div>
    </Layout>
  );
};

export default PayoutOverview;
