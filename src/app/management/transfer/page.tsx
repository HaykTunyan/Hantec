"use client";

import Layout from "@/app/dashboard/layout";
import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDemo } from "@/context/DemoContext";
import { Option } from "@/utils/types/managementTypes";
import SelecetAccount from "@/containers/transfer/selectAccount";
import CommpletedCard from "@/containers/transfer/commpletedCard";
import { sendTransferMoney, getUserOverview } from "@/services";
import { setAccounts } from "@/store/slices/userOverview";
import LoadingScreen from "@/components/loadingScreen";
import { useTranslation } from "next-i18next";

const InternalTransfer: FC = () => {
  /**
   *  Internal Transfer Hooks.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const { t } = useTranslation("internal_transfer");
  // Redux Client Accounts
  const clientAccounts = useSelector((state: RootState) => state.accounts);

  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<any>(null);

  const [fromBalance, setFromBalance] = useState<Option>({
    id: "",
    value: "",
    label: "",
    balance: "",
  });

  const [toBalance, setToBalance] = useState<Option>({
    id: "",
    value: "",
    label: "",
    balance: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAccounts, setCurrentAccounts] = useState<any>(null);
  const [balanceCurrentAccounts, setBalanceCurrentAccounts] =
    useState<any>(null);
  const [toSendCurrentAccounts, setToSendCurrentAccount] = useState<any>(null);
  const [fromBalancePrice, setFromBalancePrice] = useState<string>("");
  const [toBalancePrice, setToBalancePrice] = useState<string>("+0");
  const [activeFromDiv, setActiveFromDiv] = useState<boolean>(false);
  const [clickFromDiv, setClickFromDiv] = useState<boolean>(false);
  const [clickToDiv, setClickToDiv] = useState<boolean>(false);
  const [transferTo, setTrasferTo] = useState<boolean>(false);
  const [disabledTranser, setDisabledTransfer] = useState<boolean>(true);
  const [transferButton, setTransferButton] = useState<boolean>(false);
  const [transferCompleted, setTransferCompleted] = useState<boolean>(false);
  const [priceForAmt, setPriceFromAmt] = useState<string | null>(null);

  const handleClickFromAccount = () => {
    if (!transferTo) {
      setClickFromDiv(true);
    }
  };

  const handleTransferPrice = () => {
    setClickFromDiv(false);
    setTrasferTo(!transferTo);
    const temp = fromBalancePrice;
    setPriceFromAmt(temp);
    setFromBalancePrice(toBalancePrice);
    setToBalancePrice(temp);
    // setFromBalancePrice(toBalancePrice.startsWith('-') ? toBalancePrice : `-${toBalancePrice}`);
    // setToBalancePrice(temp.startsWith('-') ? temp.substring(1) : temp);
    setTransferButton(true);
  };

  const handleChangeToBalance = (event: ChangeEvent<HTMLInputElement>) => {
    setToBalancePrice(event.target.value);
  };

  const handleChangeFromBalance = (event: ChangeEvent<HTMLInputElement>) => {
    setFromBalancePrice(`${event.target.value}`);
    setDisabledTransfer(false);
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, [userId]);

  useLayoutEffect(() => {
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

  // currentAccounts
  useEffect(() => {
    const filterActiveAccount = clientAccounts.accounts.filter(
      // @ts-ignore
      (item) => item.accountType === 0
    );

    if (clientAccounts.accounts?.length) {
      const filterAccountItem = filterActiveAccount.map((item) => ({
        id: item.id,
        balance: item.balance,
        status: item.status,
        companyId: item.companyId,
        label: item.accountCode,
        value: item.accountCode,
        platformId: item.platformId,
      }));
      setCurrentAccounts(filterAccountItem);
    }
  }, [clientAccounts]);

  // balanceCurrentAccounts
  useEffect(() => {
    const filterActiveAccount = clientAccounts.accounts.filter(
      // @ts-ignore
      (item) => item.accountType === 0 && item?.availableBalance > 0
    );

    if (clientAccounts.accounts?.length) {
      const filterAccountItem = filterActiveAccount.map((item) => ({
        id: item.id,
        balance: item.balance,
        status: item.status,
        companyId: item.companyId,
        label: item.accountCode,
        value: item.accountCode,
        platformId: item.platformId,
      }));
      setBalanceCurrentAccounts(filterAccountItem);
    }
  }, [clientAccounts]);

  useEffect(() => {
    if (toBalance?.value && fromBalance?.value) {
      setActiveFromDiv(true);
    }
  }, [toBalance, fromBalance]);

  useEffect(() => {
    if (fromBalance?.value) {
      const listItem = currentAccounts.filter(
        (titile: { value: any }) => titile.value !== fromBalance.value
      );
      setToSendCurrentAccount(listItem);
    }
  }, [fromBalance]);

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

  const handleTransferMoney = async () => {
    setIsProcessing(true);
    const transferDetails = {
      fmTradingAccountId: Number(fromBalance.id), // 28059
      fmAccountCcy: "USD", // 'USD'
      fmAmt: Number(priceForAmt), // 54
      toTradingAccountId: Number(toBalance.id), // 28060
      toAccountCcy: "USD", // 'USD'
      toAmt: Number(priceForAmt), // 54
      userId: userId,
      maxTransferAmt: 3000, // 3009.12 this the max Value.
    };

    try {
      const response = await sendTransferMoney(transferDetails);

      if (response?.status === "success") {
        setTransferCompleted(true);

        fetchUserOverview();

        setIsProcessing(false);
      }
    } catch (err) {
    } finally {
    }
  };

  const handleRessetAllInfo = () => {
    setFromBalance({
      id: "",
      value: "",
      label: "",
      balance: "",
    });
    setToBalance({
      id: "",
      value: "",
      label: "",
      balance: "",
    });
    setFromBalancePrice("");
    setToBalancePrice("+0");
    setActiveFromDiv(false);
    setClickFromDiv(false);
    setClickToDiv(false);
    setTrasferTo(false);
    setDisabledTransfer(true);
    setTransferButton(false);
    setTransferCompleted(false);
  };

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div className="w-full px-2 md:w-[720px] md:mx-auto">
          <div className="py-14">
            <div className="flex flex-col">
              <div className="pl-4 pr-8 md:px-0">
                <h1 className="text-xl md:text-3.5xl font-medium md:leading-9 text-default">
                  {t("title_transfer")}
                </h1>
                <div className="pt-1.5 md:pt-2" />
                <p className="text-sm leading-4 md:text-lg font-normal md:leading-6 tracking-wider text-grey-seccondary hidden lg:flex  lg:flex-col ">
                   {t("subtitle_transfer_desktop_one")}
                  <br />
                  <span> {t("subtitle_transfer_desktop_two")} </span>
                </p>
                <p className="text-sm leading-4 md:text-lg font-normal md:leading-6 tracking-wider text-grey-seccondary flex flex-col lg:hidden ">
                 {t("subtitle_transfer_mobile_one")}
                  <br/>
                  <span> {t("subtitile_transfer_mobile_two")}</span>
                </p>
              </div>
              <div className="pt-8 md:pt-10" />
              {transferCompleted ? (
                <CommpletedCard
                  fromAccount={fromBalance.value}
                  toAccount={toBalance.value}
                  fromPrice={toBalancePrice}
                  toPrice={toBalancePrice}
                />
              ) : (
                <div className="bg-white rounded-lg px-3 py-7 md:py-14 md:px-16">
                  <p className="text-base leading-4 md:text-lg font-medium md:leading-5 -tracking-normal text-default">
                    {t("select_accounts_between_you")} {""}
                    <br className="block md:hidden" />
                    {t("want to")} <br className="hidden md:block" />
                    {t("transfer_the_money")}.
                  </p>
                  <div className="pt-8" />
                  <div className="grid grid-cols-1">
                    {/* From Account */}
                    <div
                      className={`px-2 py-5 md:py-7 md:px-8 rounded w-full flex flex-row gap-5 cursor-pointer
                    ${
                      clickFromDiv
                        ? "bg-orange-extra-light border border-default border-opacity-40"
                        : "bg-grey-exrta-ligth-extra border border-inherit  "
                    }
                        
                    ${!transferTo ? "cursor-pointer " : "cursor-not-allowed"}
                    `}
                      onClick={
                        activeFromDiv ? handleClickFromAccount : undefined
                      }
                    >
                      <div className="w-2/5 md:w-1/3 border-r border-grey-extra-light">
                        <SelecetAccount
                          type={"From"}
                          options={balanceCurrentAccounts as Option[]}
                          selectedOption={fromBalance}
                          onChange={setFromBalance}
                        />
                      </div>

                      <div className="w-3/5 md:w-2/3 gap-2 relative flex flex-row items-center">
                        {transferTo ? (
                          <input
                            type="text"
                            className={`h-full border-none w-full focus-visible:border-none outline-none focus:border-none text-right text-2xl md:text-3.5xl leading-8 text-grey-seccondary bg-inherit 
                              ${transferTo ? "cursor-not-allowed" : ""}
                            `}
                            value={fromBalancePrice}
                            onChange={handleChangeFromBalance}
                            disabled={transferTo}
                            placeholder={"-0"}
                          />
                        ) : (
                          <input
                            type="text"
                            className={`h-full border-none w-full focus-visible:border-none outline-none focus:border-none text-right text-2xl md:text-3.5xl leading-8 text-grey-seccondary bg-inherit 
                          ${activeFromDiv ? "cursor-pointer" : ""}
                      `}
                            value={fromBalancePrice}
                            onChange={handleChangeFromBalance}
                            disabled={!activeFromDiv}
                            // max={fromBalancePrice < fromBalance?.balance}
                            placeholder={"-0"}
                          />
                        )}

                        {/* ${!clickFromDiv ? "cursor-no-drop" : ""} */}
                        <img
                          src="/icons/management/$-pasive.svg"
                          alt="$-Pasive"
                          className="w-3 h-6 md:w-5 md:h-8"
                        />
                      </div>
                    </div>
                    <div className="h-4 w-full relative flex justify-center">
                      <div
                        className={`absolute w-11 h-11 flex justify-center bg-white border border-grey-100 border-opacity-10 rounded z-50 -bottom-4 cursor-pointer 
                       ${disabledTranser ? "cursor-no-drop" : ""}
                      `}
                        onClick={
                          !disabledTranser ? handleTransferPrice : undefined
                        }
                      >
                        {transferTo ? (
                          <img
                            src="/icons/iconSmall/arrow_down_16.svg"
                            alt="Arrow_Down_16"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <img
                            src="/icons/iconSmall/arrow_up_16.svg"
                            alt="Arrow_Up_16"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                    </div>
                    {/* To Account */}
                    <div
                      className={`px-2 py-5 md:py-7 md:px-8 rounded w-full flex flex-row gap-5 
                    ${
                      clickToDiv
                        ? "bg-grey-exrta-ligth-extra border border-default border-opacity-40"
                        : "bg-grey-exrta-ligth-extra"
                    }`}
                      // onClick={handleClickToAccount}
                    >
                      <div
                        className={`w-2/5 md:w-1/3  border-r border-grey-extra-light ${
                          !fromBalance?.value ? "cursor-no-drop" : ""
                        } `}
                      >
                        <SelecetAccount
                          type={"To"}
                          options={
                            toSendCurrentAccounts as any as unknown as Option[]
                          }
                          selectedOption={toBalance}
                          onChange={setToBalance}
                          disabled={!fromBalance?.value ? true : false}
                        />
                      </div>
                      <div className="w-3/5 md:w-2/3 gap-2 relative flex flex-row items-center">
                        <input
                          type="text"
                          className={`h-full border-none w-full focus-visible:border-none outline-none focus:border-none text-right text-2xl md:text-3.5xl leading-8 text-grey-secondary bg-inherit
                         ${!clickToDiv ? "cursor-no-drop" : ""}
                        `}
                          value={toBalancePrice}
                          onChange={handleChangeToBalance}
                          disabled={!clickToDiv}
                          placeholder={"+0"}
                        />
                        <img
                          src="/icons/management/$-active.svg"
                          alt="$-Active"
                          className="w-3 h-6 md:w-5 md:h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-6 md:pt-10" />
              <div className="flex justify-center">
                {transferCompleted ? (
                  <button
                    type="button"
                    onClick={handleRessetAllInfo}
                    className={`py-4 px-5 rounded flex text-center  bg-default `}
                  >
                    <span
                      className={`font-medium text-sm leading-3.5 text-white `}
                    >
                      {t("reset_all")}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={transferButton ? handleTransferMoney : undefined}
                    className={`py-4 px-5 rounded flex text-center  
                  ${
                    transferButton
                      ? "bg-default "
                      : "bg-sidebar cursor-not-allowed"
                  }
                  
                  `}
                  >
                    <span
                      className={`font-medium text-sm leading-3.5 
                  
                  ${transferButton ? "text-white" : "text-grey-tertiary"}

                  `}
                    >
                      {t("transfer_money")}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InternalTransfer;
