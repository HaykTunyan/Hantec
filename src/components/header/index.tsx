"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Selector from "../selector";
import { MarkData } from "@/json";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { getGetAccOpen, getGetAccountSummary } from "@/services";
import { setAccountSummary } from "@/store/slices/accountSummarySlice";
import { AppDispatch, RootState } from "@/store/store";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useTranslation } from "next-i18next";
import { fr } from "date-fns/locale";
import Link from "next/link";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  processIsUserProcess: () => void;
  clientStatus: any;
}

type CityTime = {
  city: string;
  timeZone: string;
};

type TimeDisplayObject = {
  day: string;
  date: string;
  time: string;
};

// const cityTimes: CityTime[] = [
//   { city: "Hong Kong", timeZone: "Asia/Hong_Kong" },
//   { city: "Tokyo", timeZone: "Asia/Tokyo" },
//   { city: "London", timeZone: "Europe/London" },
//   { city: "New York", timeZone: "America/New_York" },
// ];

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  notificationOpen,
  setNotificationOpen,
  processIsUserProcess,
  clientStatus,
}: HeaderProps) => {
  const router = useRouter();
  const fixedNumber = 2;
  const { t } = useTranslation("dashboard");
  const { demo } = useDemo();
  const dispatch = useDispatch<AppDispatch>();

  const clientAccountSummary = useSelector(
    (state: RootState) => state.accountSummary
  );

  const clientDemo = useSelector((state: RootState) => state.demoAccount);

  const isVerified = useSelector(
    (state: RootState) => state.verification.isVerified
  );

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

  const clientAccount = useSelector((state: RootState) => state.accounts);
  const [selectedOption, setSelectedOption] = useState<string>("Hong Kong");
  const [integerPart, decimalPart] = clientAccountSummary?.equity
    .toFixed(fixedNumber)
    .split(".");

  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [currentWeek, setCurrentWeek] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [markTime] = useState<any>(MarkData);
  const [language, setLanguage] = useState<string | null>(null);

  const [isMarketOpen, setIsMarketOpen] = useState<boolean | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityTime | null>(null);
  const [timeObject, setTimeObject] = useState<TimeDisplayObject | null>(null);

  // Demo Version State.
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [isDemoVersion, setIsDemoVersion] = useState<boolean>(demo);
  const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);

  //  Check for Live Button.
  const [liveAccountExists, setLiveAccountExists] = useState<boolean>(false);
  const [isKYCPassed, setKYCPassed] = useState<boolean>(true);

  const overView = useSelector((state: RootState) => state.overView);

  useEffect(() => {
    if (overView.allow) {
      setLiveAccountExists(overView.liveAccounts.length > 0);
    }
  }, [overView]);

  useEffect(() => {
    setIsDemoVersion(demo);
  }, [demo]);

  // const handleOpenLive = () => {
  //   router.push("/registration/register-live-account");
  // };

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const dayOfMonth = currentDate.getDate();
    const dayOfWeek = currentDate.toLocaleString("default", {
      weekday: "long",
    });
    const hoursPadNumber = 2;
    const hours = currentDate
      .getHours()
      .toString()
      .padStart(hoursPadNumber, "0");
    const minutes = currentDate
      .getMinutes()
      .toString()
      .padStart(hoursPadNumber, "0");
    const currentNowTime = `${hours}:${minutes}`;
    setCurrentTime(currentNowTime);
    setCurrentWeek(dayOfWeek);
    setCurrentDay(dayOfMonth);
    setCurrentMonth(month);

    if (currentMonth) return;
    if (currentDay) return;
    if (currentWeek) return;
    if (currentTime) return;
  }, []);

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
    // if (currentQueryParams.processing === "demo") {
    //   setIsDemoVersion(true);
    // } else {
    //   setIsDemoVersion(false);
    // }
    if (currentQueryParams.processing === "withdrawal") {
      setIsWithdrawal(true);
    } else {
      setIsWithdrawal(false);
    }
    if (queryParams) {
    }
  }, [router]);

  useEffect(() => {
    const accountCodes = demo
      ? clientDemo?.demoAccount?.map((item) => item.accountCode)
      : clientAccount?.accounts?.map((item) => item.accountCode) || [];

    // Join without spaces
    const accountCodeToSend = accountCodes.join(",");

    // Create a placeholder string for platform IDs
    const accountsLength = accountCodes.length;
    const placeholderString = Array(accountsLength).fill(42).join(",");

    const platformIdListInStr = placeholderString;

    const accountSummaryeData = async () => {
      try {
        const res = await getGetAccountSummary(
          accountCodeToSend,
          platformIdListInStr
        );
        if (res) {
          const infoData = res?.data;
          // Assuming USD is the currency you care about
          // @ts-ignore
          const setTheInfoSummary = infoData?.accountSummaryToCcyMap?.USD;
          dispatch(setAccountSummary(setTheInfoSummary));
        }
      } catch (error) {}
    };

    if (clientAccount?.accounts?.length && accountCodes.length > 0) {
      accountSummaryeData();
    }
  }, [clientAccount, router]);

  const onRedirectDaposit = () => {
    router.push("/management/deposit");
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

    const isOpen = cityData.time.some((timeSlot: any) => {
      return (
        currentTimeData >= timeSlot.open && currentTimeData <= timeSlot.close
      );
    });

    setIsMarketOpen(isOpen);
  };

  const updateCityTime = (cityTime: CityTime) => {
    const now = new Date();
    const zonedTime = toZonedTime(now, cityTime.timeZone);

    if (language === "fr") {
      const formattedTime: TimeDisplayObject = {
        day: format(zonedTime, "eeee", { locale: fr }),
        date: format(zonedTime, "d MMMM yyyy", { locale: fr }),
        time: format(zonedTime, "HH:mm", { locale: fr }),
      };
      setTimeObject(formattedTime);
    } else {
      const formattedTime: TimeDisplayObject = {
        day: format(zonedTime, "eeee"),
        date: format(zonedTime, "MMMM d, yyyy"),
        time: format(zonedTime, "HH:mm"),
      };
      setTimeObject(formattedTime);
    }
  };

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage && savedLanguage !== language) {
        setLanguage(savedLanguage);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [language, t]);

  const handleDisabledTrade = () => {
    processIsUserProcess();
  };

  const handleOpenTrade = () => {
    router.push("/trading/trade-terminal");
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

  useEffect(() => {
    if (selectedCity) {
      updateCityTime(selectedCity);
    } else {
      updateCityTime(cityTimes[0]);
    }
  }, [selectedCity, language, t]);

  useEffect(() => {
    getGetAccOpen().then((res: any) => {
      if (res && res.data) {
        setKYCPassed(res.data.kyc);
      } else {
        setKYCPassed(false);
      }
    });
  }, []);

  return (
    <header className="bg-grey-exrta-ligth-extra">
      {/* Desktop Version */}
      <div className="hidden xl:flex flex-row text-default items-center">
        <div className="p-5 w-2/12 ">
          <div className="bg-inherit xl:mr-3">
            <Selector
              options={SelectHeaderCity}
              selectedOption={selectedOption}
              onChange={handleChangeCurrentCity}
              divClassStyle=""
              classStyle=""
            />
          </div>
        </div>
        <div className="border-l grey-border-dark p-5 flex justify-between items-center flex-row w-10/12">
          <div className="flex flex-col pl-5">
            <div className="">
              <p className="text-base font-normal leading-4 text-default capitalize">
                {" "}
                {/* {currentWeek}{ */}
                {timeObject?.day}
              </p>
            </div>
            <div className="flex flex-row">
              <div className="flex text-grey-seccondary items-center">
                {" "}
                <div className="text-grey-seccondary font-normal leading-3 mr-2 capitalize">
                  {/* {currentMonth} {currentDay} */}
                  {timeObject?.date}
                </div>
                <div className="w-[1px] border-1 grey-extra-light h-4 "></div>
                <div className="text-grey-seccondary font-normal leading-3 mx-2">
                  {/* {currentTime} */}
                  {/* {timeObject?.time} */}
                  {convertTo12HourFormat(timeObject?.time as any)}
                </div>{" "}
                <div className="w-[1px] border-1 grey-extra-light h-4 "></div>
                {!isMarketOpen ? (
                  <div className="text-grey-seccondary ml-2 flex items-center">
                    <span className="close-icon mr-1"></span>
                    <span> {t("trading_closed")}</span>
                  </div>
                ) : (
                  <div className="text-grey-seccondary ml-2 flex items-center">
                    <span className="open-icon mr-1"></span>
                    <span> {t("trading_open")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            {!isWithdrawal && (
              <div className="flex flex-col pr-[42px]">
                <p className="text-sm font-aeonik font-normal leading-3.5 text-grey-seccondary">
                  {t("my_equity")}
                </p>
                <div className="pt-1.5" />
                <p className="text-xl font-gaisyr leading-5 font-normal text-default">
                  {"$"}
                  {Intl.NumberFormat().format(Number(integerPart))}.
                  {decimalPart}
                  {/* {integerPart}.{decimalPart} */}
                </p>
              </div>
            )}
            <div className="flex flex-row gap-2">
              {/* Don't delete this code */}
              {isDemoVersion && !liveAccountExists && !isKYCPassed && (
                <button
                  type="button"
                  onClick={() =>
                    router.push("/registration/register-live-account")
                  }
                  className="  flex font-medium rounded text-sm px-2 py-2.5 w-40 justify-center focus:outline-none items-center text-default"
                >
                  <span className=" ml-1 font-medium text-sm">
                    {" "}
                    {t("open_live_account")}
                  </span>
                </button>
              )}

              <button
                type="button"
                className={`${isDemoVersion ? "btnPrim" : "btnSec"}  ${
                  isVerified ? "cursor-pointer" : "cursor-pointer"
                } btnTrade`}
                onClick={
                  !isVerified
                    ? handleOpenTrade
                    : demo && clientStatus?.status === "Submitted"
                    ? handleOpenTrade
                    : demo && clientStatus?.status === "Pending"
                    ? handleOpenTrade
                    : handleDisabledTrade
                }
              >
                {isDemoVersion ? (
                  <img src="/icons/Trade-ligth.svg" alt="Trade-ligth" />
                ) : (
                  <img src="/icons/trade-icon.svg" alt="Trade-Icon" />
                )}
                <span>{isDemoVersion ? t("trade_demo") : t("trade")}</span>
              </button>

              {!isDemoVersion && (
                <button
                  // disabled={isVerified}
                  // onClick={onRedirectDaposit}
                  onClick={
                    !isVerified
                      ? onRedirectDaposit
                      : () => processIsUserProcess()
                  }
                  className={`btnPrim btnWidthFixed ${
                    isVerified ? "cursor-pointer rounded  " : "cursor-pointer "
                  }`}
                >
                  <img
                    src="/icons/iconSmall/deposite-white-16x16.svg"
                    alt="Deposite"
                  />
                  <span>{t("deposit")}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className="xl:hidden flex flex-row justify-between ">
        <div className="flex flex-row items-center ">
          <Link
            href="https://www.hantec.com/af/en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-4 "
          >
            <img src="/icons/logo-mobile.svg" alt="Logo-Mobile" />
          </Link>
          <div className="hidden md:flex flex-row items-center px-4 py-4 ">
            <div className="bg-inherit w-44 items-center flex justify-center">
              <Selector
                options={SelectHeaderCity}
                selectedOption={selectedOption}
                onChange={handleChangeCurrentCity}
                divClassStyle=""
                classStyle=""
              />
            </div>
          </div>
          <div className="hidden  md:flex items-center flex-row border-l grey-border-dark px-4 py-4  ">
            <div className="flex flex-col pl-5">
              <div className="">
                <p className="font-normal  md:text-base xl:text-lg text-default ">
                  {" "}
                  {/* {currentWeek}{" "} */}
                  {timeObject?.day}
                </p>
              </div>
              <div className="flex flex-row">
                <div className="flex text-grey-seccondary items-center">
                  {" "}
                  <div className="font-normal leading-3 text-grey-seccondary mr-1 text-sm">
                    {/* {currentMonth} {currentDay} */}

                    {timeObject?.date}
                  </div>
                  <div className="border-1 grey-extra-light w-[1px] h-3 mx-1 "></div>
                  <div className="text-grey-seccondary font-normal leading-3 mx-1 text-sm ">
                    {/* {currentTime} */}
                    {/* {timeObject?.time} */}
                    {convertTo12HourFormat(timeObject?.time as any)}
                  </div>{" "}
                  <div className="border-1 grey-extra-light w-[1px] h-3 mx-1"></div>
                  {/* demo */}
                  {!isMarketOpen ? (
                    <div className="text-grey-seccondary ml-2 flex items-center text-sm  ">
                      <span className="close-icon mr-1"></span>
                      <span> {t("trading_closed")} </span>
                    </div>
                  ) : (
                    <div className="text-grey-seccondary ml-2 flex items-center text-sm  ">
                      <span className="open-icon mr-1"></span>
                      <span> {t("trading_open")} </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 px-4 py-4 ">
          <button
            type="button"
            className="relative"
            onClick={() => setNotificationOpen(true)}
          >
            <img src="/icons/notification-icon.svg" alt="Notification-Icon" />

            <div className="w-1.5 h-1.5 rounded-full bg-orange absolute bottom-7 left-5" />
          </button>

          <button
            type="button"
            className=""
            onClick={() => setSidebarOpen(true)}
          >
            <img src="/icons/menu-icon.svg" alt="Menu-Icon" />
          </button>
        </div>
      </div>
      <div className="border-b grey-border-dark" />
    </header>
  );
};

export default Header;
