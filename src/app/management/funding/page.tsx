"use client";

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import Layout from "@/app/dashboard/layout";
import Selector from "@/components/selector";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import DatePickerHistory from "@/containers/founding/datePicker";
import HistroyTable from "@/containers/founding/historyTable";
import { getGetHistory, getUserOverview } from "@/services";
import { useSelector } from "react-redux";
import { useDemo } from "@/context/DemoContext";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAccounts } from "@/store/slices/userOverview";
import LoadingScreen from "@/components/loadingScreen";

const FoundingHistory: FC = () => {
  /**
   *  Founding History  Hooks.
   */

  // Redux Client Accounts
  const clientAccounts = useSelector((state: RootState) => state.accounts);
  const { t } = useTranslation("founding");
  const router = useRouter();
  const { demo } = useDemo();
  // Sate
  const dispatch = useDispatch<AppDispatch>();
  const [history, setHistory] = useState<any>(null);
  const [accountList, setAccountList] = useState<any[]>([]);
  const [accountFound, setAccountFound] = useState<string | null>(null);
  const [accountSelected, setAccountSelected] = useState<any>(null);
  // Default Infor.
  const staticeId = 42;
  const staticPage = 0;
  const staticSize = 10;
  const platformId = accountSelected?.platformId || staticeId;
  const [isProcessing, setIsProcessing] = useState(false);

  // Date Picker state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(staticPage);
  const [currentSize, setCurrentSize] = useState<number>(staticSize);

  const handleSearch = async () => {
    setIsProcessing(true);
    const today = new Date();
    const fromTime = startDate
      ? format(startDate, "yyyy-MM-dd")
      : format(
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          "yyyy-MM-dd"
        );
    const toTime = endDate
      ? format(endDate, "yyyy-MM-dd")
      : format(
          new Date(today.getFullYear(), today.getMonth(), 0),
          "yyyy-MM-dd"
        );

    try {
      const response = await getGetHistory(
        accountFound || clientAccounts.accounts[0]?.accountCode,
        fromTime,
        toTime,
        platformId,
        currentPage,
        currentSize
      );
      //@ts-ignore
      setHistory(response?.data || []);
      setIsProcessing(false);
    } catch (error) {}
  };

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
        // setErrorMessages(error.message);
      }
    };

    fetchUserOverview();
  }, []);

  useEffect(() => {
    const today = new Date();
    const fromTime = startDate
      ? format(startDate, "yyyy-MM-dd")
      : format(
          new Date(today.getFullYear(), today.getMonth() - 1, 1),
          "yyyy-MM-dd"
        );
    const toTime = endDate
      ? format(endDate, "yyyy-MM-dd")
      : format(
          new Date(today.getFullYear(), today.getMonth(), 0),
          "yyyy-MM-dd"
        );

    if (
      clientAccounts.accounts[0]?.accountCode &&
      fromTime &&
      toTime &&
      platformId &&
      currentPage &&
      currentSize
    ) {
      getGetHistory(
        clientAccounts.accounts[0]?.accountCode,
        fromTime,
        toTime,
        platformId,
        currentPage,
        currentSize
      );
    }
  }, []);

  useEffect(() => {
    const filterActiveAccount = clientAccounts.accounts.filter(
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
      setAccountList(filterAccountItem);
    }
  }, [clientAccounts]);

  useEffect(() => {
    if (accountList.length) {
      setAccountFound(accountList[0].value);
    }
  }, [accountList]);

  useEffect(() => {
    const selectedAccount = accountList.find(
      (account) => account.value === accountFound
    );

    setAccountSelected(selectedAccount || null);
  }, [accountList, accountFound]);

  useEffect(() => {
    if (accountFound) {
      handleSearch();
    }
  }, [accountFound, platformId, currentPage, currentSize]);

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

  const goToPage = (page: number) => {
    if (page >= 0 && page < history?.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div className="founding-history px-2 pt-7 pb-44 md:pt-14 md:pb-40">
          <div className="h-full">
            <div className="px-2 md:px-6 flex flex-col">
              <div className="md:px-0 xl:px-6 flex flex-row justify-between">
                <div>
                  <h3 className="md:text-2xl md:leading-7 xl:text-3.5xl xl:leading-9 text-default font-medium">
                    {t("title_page")}
                  </h3>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="hidden md:block md:text-xl xl:text-2xl xl:leading-7 font-medium text-grey-tertiary">
                    {t("account_number")}
                  </div>
                  <div>
                    <Selector
                      options={accountList}
                      selectedOption={accountFound as string}
                      onChange={setAccountFound}
                      classStyle="md:text-xl xl:text-2xl xl:leading-7"
                    />
                  </div>
                  <div className="hidden md:block">
                    {accountSelected?.status === "A" ? (
                      <div className="bg-green px-5 py-2 flex justify-center rounded-sm gap-1 items-center">
                        <span className="live-icon"></span>
                        <span className="text-xxs leading-3 tracking-wider text-white">
                          {t("live")}
                        </span>
                      </div>
                    ) : (
                      <div className="bg-default px-5 py-2 flex justify-center rounded-sm gap-1 items-center">
                        <span className="live-icon"></span>
                        <span className="text-xxs leading-3 tracking-wider text-white">
                          {t("demo")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-16" />
              <div className="px-0 md:px-0 xl:px-6">
                <DatePickerHistory
                  handleSearch={handleSearch}
                  startDate={startDate as any}
                  endDate={endDate as any}
                  setStartDate={setStartDate as any}
                  setEndDate={setEndDate as any}
                />
              </div>
            </div>
            <div className="pt-6" />
            <div>
              <HistroyTable
                historyInfo={history}
                currentPage={currentPage}
                currentSize={currentSize}
                setCurrentPage={setCurrentPage}
                setCurrentSize={setCurrentSize}
                toPage={goToPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FoundingHistory;
