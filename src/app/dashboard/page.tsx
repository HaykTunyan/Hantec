"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Notification from "@/containers/dashboard/notification";
import Equity from "@/containers/dashboard/equity";
import TradingTable from "@/containers/dashboard/tradingTable";
import Disclaimer from "@/containers/dashboard/disclaimer";
import RightSidebar from "@/containers/dashboard/notificationSidebar";
import NewsHantec from "@/containers/dashboard/newsHantec";
import Selector from "@/components/selector";
import SocialFeed from "@/containers/dashboard/socialFeed";

// Store Redux.
import { setInfo } from "@/store/slices/infoSlice";
import { setAccountSummary } from "@/store/slices/accountSummarySlice";
import { unverify, verify } from "@/store/slices/verificationSlice";
import { AppDispatch, RootState } from "@/store/store";

// API && Service.
import { useDispatch, useSelector } from "react-redux";
import {
  getAssetsData,
  getClient,
  getGetAccInfo,
  getGetAccOpen,
  getGetAccountSummary,
  getGetLatestNotices,
  getUserOverview,
} from "@/services";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
// Json Import
import { MarkData } from "@/json";
import SliderNotification from "@/containers/dashboard/sliderNotification";
import WidthdrawalProcess from "@/containers/dashboard/widthdrawalProcess";
import DemoHighlight from "@/components/registration/demo";
import RegistrationPassedSteps from "@/components/registration/registrationPassedSteps";
import { setAccounts } from "@/store/slices/userOverview";
import { setDemoAccount } from "@/store/slices/demoOverview";
import { LiveAccountProps } from "@/utils/types/dashboardTypes";
import { getClientInfo } from "@/api/registration/getClientInfo";
import { getAccountOpen } from "@/api/registration/getAccountOpen";
import { getLatestNotices } from "@/api/news/notesNews";
import RightNewsSidebar from "@/containers/dashboard/newsSidebar";
import TradingAssets from "@/components/trading/tradingAssets";
import { setShowAgreement } from "@/store/slices/applicationSlice";
import ManualProcessModal from "@/components/manualProcessModal";
import LoadingScreen from "@/components/loadingScreen";
import { setUserRegions } from "@/store/slices/regionUser";
import MiddleProcessModal from "@/components/middleProcessModal";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import RejectedModal from "@/components/rejectedModal";

type CityTime = {
  city: string;
  timeZone: string;
};

type TimeDisplayObject = {
  day: string;
  date: string;
  time: string;
};

const DashboardView = () => {
  /**
   *  Dashboard View Hooks.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const clientAccount = useSelector((state: RootState) => state.accounts);
  const clientDemo = useSelector( (state: RootState) => state.demoAccount );

  const isVerified = useSelector(
    (state: RootState) => state.verification.isVerified
  );

  //
  const cityTimes: CityTime[] = [
    { city: t("market_hongkong"), timeZone: "Asia/Hong_Kong" },
    { city: t("market_tokyo"), timeZone: "Asia/Tokyo" },
    { city: t("market_london"), timeZone: "Europe/London" },
    { city: t("market_newyork"), timeZone: "America/New_York" },
  ];

  const SelectHeaderCity = [
    {
      value: "Hong Kong",
      label: "Hong Kong",
    },
    {
      value: "Tokyo",
      label: "Tokyo",
    },
    {
      value: t("market_london"),
      label: t("market_london"),
    },
    {
      value: "New York",
      label: "New York",
    },
  ];

  // Hooks.
  const isInitialRender = useRef(true);
  const [markTime] = useState<any>(MarkData);

  // Local state
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [isOpenNotifiction, setIsOpenNotifiction] = useState(false);
  const [isOpenNews, setIsOpenNews] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Hong Kong");
  const [selectedCity, setSelectedCity] = useState<CityTime | null>(null);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [timeObject, setTimeObject] = useState<TimeDisplayObject | null>(null);
  const [statusUser, setStatusUser] = useState<any>(null);
  const [refreshUpdate, setRefreshUpdate] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [liveAccountData, setLiveAccountData] = useState<
    LiveAccountProps | any
  >([]);
  const [demoAccountData, setDemoAccountData] = useState<
    LiveAccountProps | any
  >([]);
  const [isVerificationInProgress, setIsVerificationInProgress] =
    useState<boolean>(false);
  const [accOpenId, setAccOpenId] = useState<number>();
  const [progressStep, setProgressStep] = useState(0);
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [userOverview, setUserOverview] = useState<any | null>(null);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState<string>("");
  const [assetsDataInfo, setAssetsDataInfo] = useState<any>(null);
  const [newsInformation, setNewsInformation] = useState<any>(null);
  const [newsNotices, setNewsNotices] = useState<any | null>(null);
  const [isDemoVersion, setIsDemoVersion] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUserProcess, setIsUserProcess] = useState<boolean>(false);
  const [isUserCheck, setIsUserCheck] = useState<boolean>(false);
  const [isUserSubmited, setIsUserSubmited] = useState<boolean>(false);
  const [ismiddleProcess, setIsMiddleProcess] = useState<boolean>(false);
  const [isCheckedProces, setIsCheckedProces] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [clickOnNews, setClickOnNews] = useState<any | null>(null);

  // Pagination State
  const [newsLimit, setNewsLimit] = useState<number>(10);
  const [newsOffset, setNewsOffset] = useState<number>(0);
  const [allNesData, setAllNewsData] = useState<any | null>(null);

  // Callback Function

  const handelClickOnNews = (newsItem: any) => {
    setClickOnNews(newsItem);
    setIsOpenNews(true);
  };

  const toggleSidebarNotifiction = () => {
    setIsOpenNotifiction(!isOpenNotifiction);
  };

  const toggleSidebarNews = () => {
    setClickOnNews(null);
    setIsOpenNews(!isOpenNews);
  };

  const handleUpdateData = async () => {
    setIsProcessing(true);

    const currentNewTime = new Date().toLocaleTimeString();
    setLocalTime(currentNewTime);

    await new Promise<void>((resolve) => {
      setRefreshUpdate((prevState) => {
        const newState = !prevState;
        resolve();
        return newState;
      });
    });

    setIsProcessing(false);
  };

  const handleRedirectToTraddingAccount = () => {
    router.push("/trading/trade-accounts");
  };

  const handledOpenProcessModal = () => {
    if (statusUser?.status === "Pending" && statusUser.appType === "acc-open") {
      // setIsUserProcess(true);
      setIsMiddleProcess(true);
    } else if (
      statusUser?.status === "Submitted" &&
      statusUser.appType === "acc-open"
    ) {
      setIsUserCheck(true);
      // setIsMiddleProcess(true);
    } else if (
      statusUser?.status === "Checked" &&
      statusUser.appType === "acc-open"
    ) {
      setIsUserCheck(true);
    } else {
    }
  };

  const handleCountunesRegistration = () => {
    setIsMiddleProcess(false);
    router.push("/registration/register-live-account");
  };

  const handleChangeCurrentCity = (option: string) => {
    setSelectedOption(option);

    const selected = cityTimes.find((c) => c.city === option);
    if (selected) {
      setSelectedCity(selected);
    }
    checkIfMarketIsOpen(option);
  };

  const checkIfMarketIsOpen = (city: string) => {
    const cityData = markTime.find(
      (market: { label: string }) => market.label === city
    );
    if (!cityData) return;
    // @ts-ignore
    const currentTimeData = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      timeZone: cityData.timezoneId,
    });

    const isOpenTime = cityData.time.some((timeSlot: any) => {
      return (
        currentTimeData >= timeSlot.open && currentTimeData <= timeSlot.close
      );
    });

    setIsMarketOpen(isOpenTime);
  };

  const updateCityTime = (cityTime: CityTime) => {
    const now = new Date();
    const zonedTime = toZonedTime(now, cityTime.timeZone);

    const formattedTime: TimeDisplayObject = {
      day: format(zonedTime, "eeee"),
      date: format(zonedTime, "MMMM d, yyyy"),
      time: format(zonedTime, "HH:mm"),
    };
    setTimeObject(formattedTime);
  };

  const convertTo12HourFormat = (time?: string): string => {
    if (!time || typeof time !== "string") {
      return "Invalid time";
    }
    const [hours, minutes] = time.split(":").map(Number);
    const isPM = hours >= 12;
    const period = isPM ? "PM" : "AM";
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Call API

  const fetchUserOverview = async () => {
    setIsProcessing(true);
    try {
      const data = await getUserOverview();
      const { liveAccounts, demoAccounts, regions, showAgreement } = data.data;

      setUserOverview(data);
      setLiveAccountData(liveAccounts);
      setDemoAccountData(demoAccounts);
      dispatch(setAccounts(liveAccounts));
      dispatch(setDemoAccount(demoAccounts));
      dispatch(setUserRegions(regions));
      dispatch(setShowAgreement(showAgreement));
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }

    setIsProcessing(false);
  };

  // Hooks Call.

  useLayoutEffect(() => {
    () => checkIfMarketIsOpen(selectedOption);
  }, [router]);

  useEffect(() => {
    if (!accOpenId) return;

    getAccountOpen(accOpenId).then((data) => {
      const application = data?.data.data;

      if (application.personalInfo?.addrResidential2) {
        setProgressStep(4);
        return;
      }
      if (application.personalInfo?.addrResidential1) {
        setProgressStep(3);
        return;
      }
      if (application.personalInfo?.idType && application.personalInfo?.idNo) {
        setProgressStep(2);
        return;
      }
      if (
        application.personalInfo?.mobileNo &&
        application.personalInfo?.countryMobileNo
      ) {
        setProgressStep(1);
        return;
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (selectedCity) {
      updateCityTime(selectedCity);
    } else {
      updateCityTime(cityTimes[0]);
    }
  }, [selectedCity]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, [userId, demo]);

  useEffect(() => {
    setIsProcessing(true);
    getClientInfo().then((res) => {
      if (res) {
        const status = res.data.data;

        const pending = status.filter(
          (i: any) => i.status === "Pending" && i.appType === "acc-open"
        );

        const rejected = status
          .filter(
            (i: any) => i.status === "Rejected" && i.appType === "acc-open"
          )
          .sort((a: any, b: any) => b.id - a.id);

        const submitted = status.filter(
          (i: any) => i.status === "Submitted" && i.appType === "acc-open"
        );

        const checked = status.filter(
          (i: any) => i.status === "Checked" && i.appType === "acc-open"
        );

        const approved = status.filter(
          (i: any) => i.status === "Approved" && i.appType === "acc-open"
        );

        if (pending.length > 0) {
          setAccOpenId(pending[0].id);
          setStatusUser(pending[0]);
          return;
        } else if (
          pending.length === 0 &&
          submitted.length === 0 &&
          checked.length === 0 &&
          approved.length === 0
        ) {
          if (rejected.length > 0) {
            setStatusUser(rejected[0]);
            dispatch(verify());
            return;
          }
        } else {
          setStatusUser(submitted[0] || checked[0]);
          dispatch(unverify());
          setIsUserProcess(false);
          setIsVerificationInProgress(false);
        }

        // setIsProcessing(false);

        // This code is inportant , when all data is show, then the load is can finished

        const shouldFetchData =
          demo ||
          (!isVerificationInProgress &&
            statusUser?.status !== "Submitted" &&
            statusUser?.status !== "Checked" &&
            statusUser?.status !== "Rejected" &&
            !isVerified);

        if (shouldFetchData) {
          setIsProcessing(true);
        } else {
          setIsProcessing(false);
        }
      }
    });
    // .catch(() => setIsProcessing(false))
    // .finally(() => setIsProcessing(false));
  }, [router]);

  useEffect(() => {
    if (statusUser?.status === "Pending" && statusUser.appType === "acc-open") {
      dispatch(verify());
      setIsOpen(true);
      setIsVerificationInProgress(true);
      setIsCheckedProces(true);
      setIsRejected(false);
      return;
    }

    if (
      statusUser?.status === "Submitted" &&
      statusUser.appType === "acc-open"
    ) {
      dispatch(verify());
      setIsOpen(false);
      setIsVerificationInProgress(true);
      setIsUserProcess(true);
      setIsCheckedProces(false);
      setIsRejected(false);
      return;
    }

    if (statusUser?.status === "Checked" && statusUser.appType === "acc-open") {
      dispatch(verify());
      setIsOpen(false);
      setIsCheckedProces(false);
      setIsVerificationInProgress(true);
      setIsRejected(false);
      return;
    }
    if (
      statusUser?.status === "Rejected" &&
      statusUser.appType === "acc-open"
    ) {
      setIsRejected(true);
      return;
    }
  }, [statusUser, demo]);

  // New Version
  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const res = await getClient(Number(userId));
        if (res?.data) {
          setClient(res.data);
        }
      } catch (error) {}
    };

    const shouldFetchClientInfo = () =>
      !isVerificationInProgress &&
      statusUser?.status !== "Submitted" &&
      statusUser?.status !== "Checked";

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (shouldFetchClientInfo() && !isVerified) {
      fetchClientInfo();
    }
  }, [
    userId,
    refreshUpdate,
    demo,
    router,
    isVerified,
    isVerificationInProgress,
    statusUser,
    getClient,
    setClient,
  ]);

  useEffect(() => {
    const getQueryParams = () => {
      const params = new URLSearchParams(window.location.search);
      const paramsObject: Record<string, string> = {};
      params.forEach((value, key) => {
        paramsObject[key] = value;
      });
      return paramsObject;
    };
    const currentQueryParams = getQueryParams();
    setQueryParams(currentQueryParams);
    if (currentQueryParams.processing === "withdrawal") {
      setIsWithdrawal(true);
    } else {
      setIsWithdrawal(false);
    }
    // if (currentQueryParams.processing === "demo") {
    //   setIsDemoVersion(true);
    // } else {
    //   setIsDemoVersion(false);
    // }
    // if (currentQueryParams.processing === "empty") {
    //     setIsEmpty(true);
    // } else {
    //     setIsEmpty(false);
    // }
    if (queryParams) {
    }
  }, [router]);

  useEffect(() => {
    const accountCodes = demo ? clientDemo?.demoAccount?.map((item) => item.accountCode) :  
      clientAccount?.accounts?.map((item) => item.accountCode) || [];

    // Join without spaces
    const accountCodeToSend = accountCodes.join(",");

    // Create a placeholder string for platform IDs
    const accountsLength = accountCodes.length;
    const placeholderString = Array(accountsLength).fill(42).join(",");

    const platformIdListInStr = placeholderString;

    const fetchAccountSummary = async () => {
      try {
        if (!accountCodeToSend || !platformIdListInStr) {
          return;
        }

        const response = await getGetAccountSummary(
          accountCodeToSend,
          platformIdListInStr
        );

        if (response) {
          const infoData = response.data;
          // @ts-ignore
          const accountSummary = infoData?.accountSummaryToCcyMap?.USD;

          if (accountSummary) {
            dispatch(setAccountSummary(accountSummary));
          } else {
          }
        }
      } catch (error: any) {
        setErrorMessages(
          error?.message ??
            "An error occurred while fetching the account summary."
        );
      }
    };

    if (
      clientAccount?.accounts?.length &&
      platformIdListInStr &&
      accountCodeToSend
    ) {
      fetchAccountSummary();
    }
  }, [refreshUpdate, clientAccount, router, demo]);

  // call trade-distribution api.

  useEffect(() => {
    const assetsNumber: number = 5;

    const accountCodes = demo ? clientDemo?.demoAccount?.map((item) => item.accountCode) :
      clientAccount?.accounts?.map((item) => item.accountCode) || [];

    // Join without spaces
    const accountCodeToSend = accountCodes.join(",");

    // Create a placeholder string for platform IDs
    const accountsLength = accountCodes.length;
    const placeholderString = Array(accountsLength).fill(42).join(",");

    const platformIdListInStr = placeholderString;

    const getAssetsChart = async () => {
      try {
        const res = await getAssetsData(
          platformIdListInStr,
          accountCodeToSend,
          assetsNumber
        );
        // @ts-ignore
        const responseInfo = res?.data;
        if (demo) {
          setAssetsDataInfo(null);
        } else {
          setAssetsDataInfo(responseInfo);
        }
        // @ts-ignore
      } catch (error) {
        // @ts-ignore
        setErrorMessages(error?.message);
      }
    };

    if (
      clientAccount?.accounts?.length &&
      accountCodeToSend &&
      assetsNumber &&
      platformIdListInStr
    ) {
      getAssetsChart();
    }
  }, [refreshUpdate, clientAccount, demo, router]);

  useEffect(() => {
    const getAccountNoticas = async () => {
      const limitSatart = 0;
      const limitLenght = 3;
      const lang: string = "en_US";
      const slug: string = "hf-web";
      try {
        const res = await getGetLatestNotices(
          limitSatart,
          limitLenght,
          lang,
          slug
        );
        //@ts-ignore
        setNewsInformation(res.data);

        if (res) {
        }
        //@ts-ignore
        // setSummaryInfo(res.data);
      } catch (error) {
        // @ts-ignore
      }
    };
    getAccountNoticas();
  }, [router, demo]);

  useEffect(() => {
    const fetchAccountNotices = async () => {
      const limitStart = 0;
      const limitLength = 3;
      const lang = "en_US";
      const slug = "hf-web";

      try {
        const res = await getGetLatestNotices(
          limitStart,
          limitLength,
          lang,
          slug
        );

        //@ts-ignore
        setNewsInformation(res.data);
      } catch (error) {
        if (error instanceof Error) {
          // setError(error.message);
        } else {
          // setError("An unknown error occurred.");
        }
      }
    };

    fetchAccountNotices();
  }, [router, demo]);

  // New Version

  useEffect(() => {
    const shouldFetchData =
      demo ||
      (!isVerificationInProgress &&
        statusUser?.status !== "Submitted" &&
        statusUser?.status !== "Checked" &&
        !isVerified);

    if (shouldFetchData) {
      fetchUserOverview();
    }
  }, [
    demo,
    isVerified,
    isVerificationInProgress,
    refreshUpdate,
    statusUser,
    dispatch,
  ]);

  useEffect(() => {
    const featchGetAccOpen = async () => {
      try {
        const res = await getGetAccOpen();
        if (res) {
        }
      } catch (error) {}
    };
    featchGetAccOpen();
  }, [router, demo]);

  useEffect(() => {
    const featchGetAccInfo = async () => {
      try {
        const res = await getGetAccInfo();
        const infoData = res?.data;
        setUserName(infoData.name);
        setEmail(infoData.email);
        setId(infoData.id);
        dispatch(setInfo(infoData));
      } catch (error) {}
    };
    featchGetAccInfo();
  }, [router, demo]);

  // All News API
  useEffect(() => {
    const featchGetNews = async () => {
      const limitSatart = newsOffset ? newsOffset : 0;
      const limitLenght = newsLimit ? newsLimit : 10;
      const lang: string = "en_US";
      const slug: string = "hf-web";

      try {
        const res = await getLatestNotices(
          limitSatart,
          limitLenght,
          lang,
          slug
        );
        if (res) {
          // @ts-ignore
          setAllNewsData(res);
          // @ts-ignore
          const info = res?.data;
          // @ts-ignore
          setNewsNotices(info);
        }
      } catch (error) {}
    };
    featchGetNews();
  }, [router, newsOffset, newsLimit]);

  useEffect(() => {
    if (errorMessages) return;
    if (userOverview) return;
    if (client) return;
    // @ts-ignore
  }, []);

  useLayoutEffect(() => {
    if (demo) {
      setIsDemoVersion(true);
    } else {
      setIsDemoVersion(false);
    }
  }, [demo]);

  useEffect(() => {
    const hasPendingStatus = statusUser?.status === "Pending";
    const hasApprovedStatus = statusUser?.status === "Approved";
    const hasCheckedStatus = statusUser?.status === "Checked";
    const hasRejectedStatus = statusUser?.status === "Rejected";
    const hasSubmittedStatus = statusUser?.status === "Submitted";

    const isLiveAccountValid =
      liveAccountData?.length > 0 && assetsDataInfo?.length > 0;
    const isDemoAccountValid =
      demoAccountData?.length > 0 && assetsDataInfo?.length > 0;

    if (hasCheckedStatus) {
      setIsProcessing(false);
    }

    if (hasRejectedStatus) {
      setIsProcessing(false);
    }

    if (hasSubmittedStatus) {
      setIsProcessing(false);
    }

    if (
      (isLiveAccountValid || isDemoAccountValid) &&
      (hasPendingStatus || hasApprovedStatus)
    ) {
      setIsProcessing(false);
    }
  }, [
    userOverview,
    liveAccountData,
    demoAccountData,
    assetsDataInfo,
    statusUser,
  ]);

  return (
    <>
      <div className="flex flex-col">
        {isDemoVersion && <DemoHighlight />}
        {isRejected && !isDemoVersion && (
          <RejectedModal onClose={setIsRejected} id={id} email={email} />
        )}
        {isCheckedProces && !isDemoVersion && (
          <RegistrationPassedSteps
            accountName={userName.split(" ")[0]}
            progressStep={progressStep}
          />
        )}
        {/* When is Loagin */}
        <LoadingScreen isLoading={isProcessing} />
        {/*  */}
        <div className="flex w-full bg-grey-exrta-ligth-extra p-2 md:px-2 xl:p-2">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between md:hidden border-b border-default border-opacity-20 px-2 pt-8 pb-6">
              <div className="flex flex-col">
                <div className="bg-inherit -inset-5pl-">
                  {/* HeaderCity */}
                  <Selector
                    options={SelectHeaderCity}
                    selectedOption={selectedOption}
                    onChange={handleChangeCurrentCity}
                    divClassStyle="justify-center"
                    classStyle=""
                  />
                </div>
                <div className="pt-2" />
                <div className="text-grey-seccondary">
                  {/* {currentTime} {"AM"} */}
                  {/* {timeObject?.time} */}
                  {convertTo12HourFormat(timeObject?.time as any)}
                </div>
              </div>
              {/* demo */}
              {!isMarketOpen ? (
                <div className="text-grey-seccondary ml-2 flex items-center align-bottom pt-4">
                  <span className="close-icon mr-1"></span>
                  <span>{t("trading_closed")}</span>
                </div>
              ) : (
                <div className="text-grey-seccondary ml-2 flex items-center align-bottom pt-4">
                  <span className="open-icon mr-1"></span>
                  <span>{t("trading_open")}</span>
                </div>
              )}
            </div>
            <div className="xl:pt-4 md:pt-5 pt-8" />
            <div className="w-full xl:w-3/4 md:px-6">
              <div className="flex justify-between px-2 md:px-0">
                <div className="">
                  <p className="text-default text-lg font-medium leading-6 tracking-tight">
                    {t("my_performance")}
                  </p>
                </div>
                <div className="flex flex-row gap-2 md:gap-3 ">
                  {localTime && (
                    <div className="flex flex-row items-center">
                      <span className="font-normal text-xs text-grey-seccondary">
                        {t("last_updated")}:{" "}
                      </span>
                      <span className="ml-1 font-normal text-xs font-aeonik text-grey-seccondary">
                        {localTime}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    className={"btnSec btnRefresh"}
                    onClick={
                      !isVerified ? handleUpdateData : handledOpenProcessModal
                    }
                  >
                    <span className="hidden md:block text-default text-xs font-medium">
                      {t("refresh_data")}
                    </span>
                    <img src="/icons/refresh-icon.svg" alt="Refresh-Icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="xl:pt-4 md:pt-2 pt-4" />
            <div className="flex gap-2">
              {/* My equity */}
              <div className="w-full xl:w-3/4 ">
                <Equity
                  liveAccountData={
                    demo ? demoAccountData : (liveAccountData as any)
                  }
                />
                <div className="md:pt-14 pt-11" />
                {/* Assets */}
                {/* Charts Tabs */}
                <div className="xl:pt-5 md:pt-2 pt-4" />
                {/* All Tabs  */}
                <TradingAssets assets={assetsDataInfo} />
                <div className="pt-10" />
                {/* My Trading Accounts */}
                <div className="flex flex-row justify-between px-4 md:px-6 ">
                  <p className="text-lg font-medium text-default">
                    {" "}
                    {t("my_trading_accounts")}
                  </p>

                  <button
                    className={`btnSec btnRefresh ${
                      isVerified ? "" : "cursor-pointer"
                    }`}
                    // disabled={isVerified}
                    onClick={
                      !isVerified
                        ? handleRedirectToTraddingAccount
                        : handledOpenProcessModal
                    }
                  >
                    <span className="text-default text-xs font-medium">
                      {t("view_all")}
                    </span>
                  </button>
                </div>
                <div className="xl:pt-4 md:pt-4 pt-4" />
                <div className="">
                  <TradingTable
                    liveAccountData={
                      demo ? demoAccountData : (liveAccountData as any)
                    }
                    isWithdrawal={isWithdrawal}
                    loading={isProcessing}
                    status={statusUser}
                  />
                </div>
              </div>
              <div className="hidden xl:block w-1/4">
                {isWithdrawal && (
                  <div className="mb-2">
                    <WidthdrawalProcess />
                  </div>
                )}
                {/* Important Notification */}
                <div className="hidden">
                  <Notification
                    toggleSidebarNotification={toggleSidebarNotifiction}
                  />
                </div>
                {/* pt-4 to change pt-0 */}
                <div className="pt-0 w-full sticky top-[84px]">
                  <SliderNotification />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:pt-11" />
        {/* New Hantec */}
        {!demo && (
          <div>
            <NewsHantec
              news={newsInformation as any}
              onClickOpen={toggleSidebarNews}
              onClickItem={handelClickOnNews}
            />
          </div>
        )}
        {/* Social Feed */}
        {!demo && (
          <div className="">
            <SocialFeed />
          </div>
        )}
        <div className="flex w-full pt-20 pl-2 pr-0 pb-6 md:pl-8 xl:pl-8 xl:pr-2 xl:pt-16 bg-sidebar">
          <Disclaimer />
        </div>
      </div>
      <div className="">
        <RightSidebar
          toggleSidebarNotifiction={toggleSidebarNotifiction}
          setIsOpenNotifiction={setIsOpenNotifiction}
          isOpenNotifiction={isOpenNotifiction}
        />
      </div>
      <div className="">
        <RightNewsSidebar
          toggleSidebarNews={toggleSidebarNews}
          setIsOpenNews={setIsOpenNews}
          setNewsLimit={setNewsLimit}
          setNewsOffset={setNewsOffset}
          newsOffset={newsOffset}
          newsLimit={newsLimit}
          isOpenNews={isOpenNews}
          news={newsNotices as any}
          newItem={clickOnNews as any}
          allNews={allNesData}
        />
      </div>
      {/* ManualProcessModal */}
      <div className="">
        {isUserProcess && !demo && (
          <ManualProcessModal
            isOpen={isUserProcess}
            onClose={() => setIsUserProcess(false)}
            type="proccess"
          />
        )}
      </div>

      <div className="">
        {isUserCheck && !demo && (
          <ManualProcessModal
            isOpen={isUserCheck}
            onClose={() => setIsUserCheck(false)}
            type="checked"
          />
        )}
      </div>

      <div className="">
        {isUserSubmited && (
          <ManualProcessModal
            isOpen={isUserSubmited}
            onClose={() => setIsUserSubmited(false)}
            type="submited"
          />
        )}
      </div>

      <div className="">
        <MiddleProcessModal
          isOpen={ismiddleProcess}
          onClose={() => setIsMiddleProcess(false)}
          onContinue={handleCountunesRegistration}
        />
      </div>

      {/* Is Processing */}
      <div className="">
        <LoadingScreen isLoading={isProcessing} />
      </div>
    </>
  );
};

export default DashboardView;
