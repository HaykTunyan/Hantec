import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DropdownVIew from "@/containers/dashboard/dropdownUser";
// import { getGeoCodeClient } from "@/services/client/geocodeClient";
// import { getLocalLangages } from "@/services/locales/getLocalsUS";
import { InfoStateTypes } from "@/utils/types/dashboardTypes";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { createDemoAccount } from "@/api/registration/createDemoAccount";
import { useDemo } from "@/context/DemoContext";
import { getGetAccInfo } from "@/services";
// Store Redux.
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "@/store/slices/infoSlice";
import { AppDispatch, RootState } from "@/store/store";
import { getClientInfo } from "@/api/registration/getClientInfo";

interface SidebarProps {
  toggleSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  setIsAddLiveAccountModalOpened: (x: boolean) => void;
  setIsDemoTurnModalOpened?: (x: boolean) => void;
  isMakeNewDemo: boolean;
  isSetMakeNewDemo: (isMakeNewDemo: boolean) => void;
  processIsUserProcess: () => void;
  setAccountType: (i: string) => void;
  setIsDemoAccountOpened: (isOpen: boolean) => void;
  setMaxLimitReachedModal: (isOpen: boolean) => void;
}

// interface GeoCodeResponse {
//   latitude: number;
//   longitude: number;
//   localityLanguage: string;
// }

const Sidebar: FC<SidebarProps> = ({
  toggleSidebar,
  setIsOpen,
  isOpen,
  setIsAddLiveAccountModalOpened,
  setIsDemoTurnModalOpened,
  isMakeNewDemo,
  isSetMakeNewDemo,
  processIsUserProcess,
  setIsDemoAccountOpened,
  setMaxLimitReachedModal,
  setAccountType,
}) => {
  /**
   *  Sidebar Hooks.
   */

  const { t, i18n } = useTranslation("dashboard");

  const infoUserStore: InfoStateTypes = useSelector(
    (state: RootState) => state.info
  );

  const isVerified = useSelector(
    (state: RootState) => state.verification.isVerified
  );

  const demoAccounts = useSelector((state: RootState) => state.demoAccount);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const [isOpenTrade, setIsOpenTrade] = useState(false);
  const [isOpenFound, setIsOpenFound] = useState(false);
  // const [geoCodeData, setGeoCodeData] = useState<any>(null);
  // const [langData, setLangData] = useState<any>(null);
  const [statusUser, setStatusUser] = useState<any>(null);
  const [hasRelevantAppType, setHasRelevantAppType] = useState(false);

  const { demo, toggleDemo } = useDemo();

  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd MMM yy");

  const showManagement = !demo;

  const handleOpenDemoToggle = () => {
    if (demo) {
      if (pathnameParts[3] && pathnameParts[2] === "trade-accounts") {
        router.push("/trading/trade-accounts");
      }
      toggleDemo();
      return;
    }

    if (setIsDemoTurnModalOpened) {
      setIsDemoTurnModalOpened(true);
    }
    document.querySelector("body")?.classList.add("bodyOverflowHidden");
  };

  const toggleDropdown = () => {
    setIsOpenTrade(!isOpenTrade);
  };

  const handleOpenDemoAccount = () => {
    if (
      demoAccounts?.demoAccount?.length === 5 ||
      demoAccounts?.demoAccount?.length > 5
    ) {
      document.querySelector("body")?.classList.add("bodyOverflowHidden");
      setMaxLimitReachedModal(true);
      setAccountType("demo");
      return;
    } else {
      createDemoAccount({
        campaignId: 53,
      }).then(() => {
        setIsDemoAccountOpened(true);
      });
    }
  };

  const toggleDropdownFound = () => {
    setIsOpenFound(!isOpenFound);
  };

  // const languageAPI = async (langType: string): Promise<void> => {
  //   try {
  //     const resLanguages = await getLocalLangages<{ [key: string]: any }>({
  //       lang: langType,
  //     });
  //     setLangData(resLanguages);
  //     if (langData) return;
  //   } catch (error) {}
  // };

  const handleChangeLanguages = async (langCode: string): Promise<void> => {
    try {
      const language = langCode === "ENG" ? "en" : "fr";

      await i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    } catch (error) {}
  };

  const handleOpenNewLiveAccountModal = () => {
    setIsAddLiveAccountModalOpened(true);
    document.querySelector("body")?.classList.add("bodyOverflowHidden");
  };

  useEffect(() => {
    if (
      pathname === "/management/deposit" ||
      pathname === "/management/withdrawal" ||
      pathname === "/management/payout" ||
      pathname === "/management/transfer" ||
      pathname === "/management/funding"
    ) {
      setIsOpenFound(true);
    }

    if (
      pathname.includes("/trading/trade-accounts") ||
      pathname === "/trading/leverage-levels" ||
      pathname.includes("/trading/download-center") ||
      pathname === "/trading/trade-terminal"
    ) {
      setIsOpenTrade(true);
    }

    if (pathname === "/dashboard") {
      setIsOpenFound(false);
    }
  }, []);

  useEffect(() => {
    const featchGetAccInfo = async () => {
      try {
        const res = await getGetAccInfo();
        const infoData = res?.data;

        dispatch(setInfo(infoData));
      } catch (error) {}
    };
    featchGetAccInfo();
  }, [router]);

  useEffect(() => {
    getClientInfo().then((res) => {
      if (res) {
        const status = res.data.data;
        setStatusUser(status);
      }
    });
  }, [router]);

  useEffect(() => {
    if (Array.isArray(statusUser)) {
      const relevantAppTypes = [
        "crypto-wallet",
        "perfect-money",
        "mobile-money",
        "bank-info",
      ];
      const hasMatchingType = statusUser.some((user) =>
        relevantAppTypes.includes(user.appType)
      );

      setHasRelevantAppType(hasMatchingType);
    } else {
      setHasRelevantAppType(false);
    }
  }, [statusUser]);

  useLayoutEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <>
      <div className="text-default bg-grey-extra-light sidebar-dashboard flex flex-col h-full">
        <div className="flex-grow">
          <div className="p-6 w-full">
            <Link href="https://www.hantec.com/af/en" target="_blank" rel="noopener noreferrer" className="hidden xl:block">
              <img src="/icons/Logo-Hantec.svg" alt="Logo-Hantec" />
            </Link>
            <div className="flex flex-row justify-end xl:hidden ">
              <button
                type="button"
                className=""
                onClick={() => setIsOpen(false)}
              >
                <img src="/icons/close-x.svg" alt="Close-X" />
              </button>
            </div>
          </div>
          <div className="w-full">
            <nav className="mt-4">
              <ul className="space-y-2 px-2">
                {/* Dashboard */}
                <Link
                  href={"/dashboard"}
                  className={`link rounded ${
                    pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  <li
                    className={`flex items-center p-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 py-[17px] rounded  ${
                      pathname === "/dashboard" ? "bg-hover-sidebar" : ""
                    } `}
                  >
                    <span className="mr-1">{t("title")}</span>
                    {pathname === "/dashboard" && (
                      <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                        {" "}
                      </span>
                    )}
                  </li>
                </Link>
                {/* Trading */}

                <li>
                  <div
                    className={`p-4 flex flex-row justify-between items-center 
                        ${
                          isVerified && !demo
                            ? "rounded "
                            : "hover:bg-hover-sidebar cursor-pointer rounded"
                        }
                        `}
                    aria-controls="dropdown-trading"
                    onClick={
                      !isVerified || demo
                        ? toggleDropdown
                        : processIsUserProcess
                    }
                  >
                    <span className="font-normal text-14">{t("trading")}</span>
                    {!isOpenTrade ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                          fill="#2B2A28"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.66602 10.6264L7.85285 5.43956L13.0397 10.6264L12.3326 11.3335L7.85285 6.85377L3.37312 11.3335L2.66602 10.6264Z"
                          fill="#2B2A28"
                        />
                      </svg>
                    )}
                  </div>
                  <ul
                    id="dropdown-trading"
                    className={`space-y-1 pl-2 flex flex-col gap-1 mt-2 ${
                      isOpenTrade ? "" : "hidden"
                    }`}
                  >
                    <Link
                      href={"/trading/trade-accounts"}
                      className={
                        pathname.includes("/trading/trade-accounts")
                          ? "active"
                          : ""
                      }
                    >
                      <li
                        className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded flex items-center ${
                          pathname.includes("/trading/trade-accounts")
                            ? "bg-hover-sidebar"
                            : ""
                        }`}
                      >
                        <span className="mr-1">{t("trade_accounts")}</span>
                        {pathname.includes("/trading/trade-accounts") && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>
                    {/*pathname === "/trading/leverage-levels" ||*/}
                    {/*pathname === "/trading/download-center" ||*/}
                    {/*pathname === "/trading/trade-terminal"*/}
                    <Link href={"/trading/trade-terminal"}>
                      <li
                        className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded flex items-center ${
                          pathname.includes("/trading/trade-terminal")
                            ? "bg-hover-sidebar"
                            : ""
                        }`}
                      >
                        <span className="mr-1"> {t("trade_terminal")}</span>
                        {pathname.includes("/trading/trade-terminal") && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>

                    <Link href={"/trading/leverage-levels"}>
                      <li
                        className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded flex items-center ${
                          pathname.includes("/trading/leverage-levels")
                            ? "bg-hover-sidebar"
                            : ""
                        }`}
                      >
                        <span className="mr-1"> {t("leverage_levels")}</span>
                        {pathname.includes("/trading/leverage-levels") && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>
                    <Link href={"/trading/download-center"}>
                      <li
                        className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded flex items-center ${
                          pathname.includes("/trading/download-center")
                            ? "bg-hover-sidebar"
                            : ""
                        }`}
                      >
                        <span className="mr-1"> {t("download_center")}</span>
                        {pathname.includes("/trading/download-center") && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>
                  </ul>
                </li>
                {/* Funds Management */}
                {showManagement && (
                  <li>
                    <div
                      className={` p-4 flex flex-row justify-between items-center
                            ${
                              isVerified
                                ? "rounded "
                                : "hover:bg-hover-sidebar cursor-pointer rounded"
                            }
                          `}
                      aria-controls="dropdown-management"
                      onClick={
                        !isVerified ? toggleDropdownFound : processIsUserProcess
                      }
                    >
                      <span className="font-normal text-14">
                        {t("funds_management")}
                      </span>
                      {!isOpenFound ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                            fill="#2B2A28"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.66602 10.6264L7.85285 5.43956L13.0397 10.6264L12.3326 11.3335L7.85285 6.85377L3.37312 11.3335L2.66602 10.6264Z"
                            fill="#2B2A28"
                          />
                        </svg>
                      )}
                    </div>
                    <ul
                      id="dropdown-management"
                      className={`space-y-1 pl-2 flex flex-col gap-1 ${
                        isOpenFound ? "" : "hidden"
                      }`}
                    >
                      <Link
                        href={`/management/deposit`}
                        className={`link ${
                          pathname === "/management/deposit" ? "active" : ""
                        }`}
                      >
                        <li
                          className={`flex items-center py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded 
                     ${
                       pathname === "/management/deposit"
                         ? "bg-hover-sidebar"
                         : ""
                     }
                    `}
                        >
                          <span className="mr-1"> {t("deposit")}</span>
                          {pathname === "/management/deposit" && (
                            <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                              {" "}
                            </span>
                          )}
                        </li>
                      </Link>

                      <Link
                        href={`/management/withdrawal`}
                        className={`link ${
                          pathname === "/management/withdrawal" ||
                          pathname === "/management/withdrawal/withdrawalFinish"
                            ? "active"
                            : ""
                        }`}
                      >
                        <li
                          className={`flex items-center py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded 
                      
                       ${
                         pathname === "/management/withdrawal" ||
                         pathname === "/management/withdrawal/withdrawalFinish"
                           ? "bg-hover-sidebar"
                           : ""
                       }
                      `}
                        >
                          <span className="mr-1"> {t("withdrawal")}</span>
                          {pathname === "/management/withdrawal" ||
                          pathname ===
                            "/management/withdrawal/withdrawalFinish" ? (
                            <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                              {" "}
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                      </Link>
                      {/* /management/payout */}
                      <Link
                        href={`${
                          hasRelevantAppType
                            ? "/management/payout/payoutOverview"
                            : "/management/payout"
                        }  `}
                        className={`link ${
                          pathname === "/management/payout" ||
                          pathname === "/management/payout/payoutOverview"
                            ? "active"
                            : ""
                        }`}
                      >
                        <li
                          className={`flex items-center py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 rounded 
                       ${
                         pathname === "/management/payout" ||
                         pathname === "/management/payout/payoutOverview"
                           ? "bg-hover-sidebar"
                           : ""
                       }
                      `}
                        >
                          <span className="mr-1">
                            {/* payout_methods */}
                          {hasRelevantAppType ? <>{t("payment_methods")}</> : <>{t("payment_methods")}</>   }
                           </span>
                          {pathname === "/management/payout" ||
                          pathname === "/management/payout/payoutOverview" ? (
                            <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                              {" "}
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                      </Link>

                      <Link
                        href={`/management/transfer`}
                        className={`link ${
                          pathname === "/management/transfer" ? "active" : ""
                        }`}
                      >
                        <li
                          className={`flex items-center  py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14  rounded 
                      ${
                        pathname === "/management/transfer"
                          ? "bg-hover-sidebar"
                          : ""
                      }
                      `}
                        >
                          <span className="mr-1">
                            {" "}
                            {t("internal_transfer")}{" "}
                          </span>
                          {pathname === "/management/transfer" && (
                            <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                              {" "}
                            </span>
                          )}
                        </li>
                      </Link>

                      <Link
                        href={`/management/funding`}
                        className={`link ${
                          pathname === "/management/funding" ? "active" : ""
                        }`}
                      >
                        <li
                          className={`flex items-center py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal rounded  text-14 *:
                      ${
                        pathname === "/management/funding"
                          ? "bg-hover-sidebar"
                          : ""
                      }
                      `}
                        >
                          <span className="mr-1">{t("funding_history")}</span>
                          {pathname === "/management/funding" && (
                            <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                              {" "}
                            </span>
                          )}
                        </li>
                      </Link>
                    </ul>
                  </li>
                )}

                {/* Knowledge Hub */}
                <Link
                  href={"/daily-review"}
                  className={`link rounded ${
                    pathname === "/daily-review" ? "active" : ""
                  }`}
                >
                  <li
                    className={`flex items-center mt-2 p-4 hover:bg-hover-sidebar cursor-pointer font-normal text-14 py-[17px] rounded  ${
                      pathname === "/daily-review" ? "bg-hover-sidebar" : ""
                    } `}
                  >
                    <span className="mr-1"> {t("daily_review")} </span>
                    {pathname === "/daily-review" && (
                      <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                        {" "}
                      </span>
                    )}
                  </li>
                </Link>
                {/* News */}
                {/* Don't Delete this Comment */}
                {/* <Link href={"/news"}>
                <li className="p-4 hover:bg-hover-sidebar cursor-pointer font-normal text-sm">
                  News
                </li>
              </Link> */}
              </ul>
            </nav>
          </div>
          <div className="pt-5 w-full" />
          {/* New Live Account */}
          <div className="p-2 w-full">
            {!demo && (
              <button
                className={`btnSec btnSidebar ${isVerified ? "" : ""} `}
                onClick={
                  !isVerified
                    ? handleOpenNewLiveAccountModal
                    : processIsUserProcess
                }
              >
                <svg
                  className="w-4 h-4 object-contain"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.24967 3.33203V3.35337V3.37467V3.39594V3.41717V3.43836V3.45952V3.48064V3.50172V3.52278V3.54379V3.56477V3.58572V3.60662V3.6275V3.64834V3.66915V3.68992V3.71066V3.73136V3.75203V3.77266V3.79327V3.81383V3.83437V3.85487V3.87534V3.89577V3.91618V3.93655V3.95689V3.97719V3.99746V4.01771V4.03792V4.05809V4.07824V4.09835V4.11844V4.13849V4.15851V4.1785V4.19846V4.21839V4.23828V4.25815V4.27799V4.2978V4.31757V4.33732V4.35704V4.37673V4.39639V4.41602V4.43562V4.45519V4.47473V4.49425V4.51373V4.53319V4.55262V4.57202V4.59139V4.61074V4.63006V4.64935V4.66861V4.68785V4.70706V4.72624V4.74539V4.76452V4.78363V4.8027V4.82175V4.84077V4.85977V4.87874V4.89769V4.91661V4.93551V4.95438V4.97322V4.99204V5.01084V5.02961V5.04835V5.06708V5.08577V5.10445V5.1231V5.14172V5.16033V5.17891V5.19746V5.21599V5.2345V5.25299V5.27145V5.28989V5.30831V5.32671V5.34508V5.36344V5.38177V5.40007V5.41836V5.43663V5.45487V5.47309V5.4913V5.50948V5.52764V5.54578V5.56389V5.58199V5.60007V5.61813V5.63617V5.65419V5.67219V5.69017V5.70813V5.72607V5.74399V5.76189V5.77978V5.79764V5.81549V5.83332V5.85113V5.86892V5.8867V5.90446V5.9222V5.93992V5.95762V5.97531V5.99298V6.01063V6.02827V6.04589V6.0635V6.08108V6.09865V6.11621V6.13375V6.15127V6.16878V6.18627V6.20375V6.22121V6.23866V6.25609V6.27351V6.29091V6.3083V6.32568V6.34303V6.36038V6.37771V6.39503V6.41234V6.42963V6.4469V6.46417V6.48142V6.49866V6.51589V6.5331V6.5503V6.56749V6.58467V6.60183V6.61898V6.63612V6.65325V6.67037V6.68748V6.70457V6.72166V6.73873V6.75579V6.77284V6.78989V6.80692V6.82394V6.84095V6.85795V6.87494V6.89192V6.9089V6.92586V6.94281V6.95976V6.9767V6.99362V7.01054V7.02745V7.04435V7.06125V7.07813V7.09501V7.11188V7.12874V7.1456V7.16245V7.17929V7.19612V7.21295V7.22977V7.24658V7.2487H3.33301V8.7487H7.24967V8.75081V8.76763V8.78445V8.80127V8.81811V8.83495V8.8518V8.86865V8.88551V8.90238V8.91926V8.93615V8.95304V8.96994V8.98685V9.00377V9.0207V9.03764V9.05458V9.07154V9.0885V9.10547V9.12245V9.13945V9.15645V9.17346V9.19048V9.20751V9.22455V9.2416V9.25867V9.27574V9.29282V9.30992V9.32703V9.34414V9.36127V9.37841V9.39557V9.41273V9.42991V9.4471V9.4643V9.48151V9.49874V9.51597V9.53323V9.55049V9.56777V9.58506V9.60237V9.61968V9.63702V9.65436V9.67172V9.6891V9.70648V9.72389V9.7413V9.75874V9.77618V9.79365V9.81112V9.82862V9.84612V9.86365V9.88119V9.89874V9.91631V9.9339V9.9515V9.96912V9.98676V10.0044V10.0221V10.0398V10.0575V10.0752V10.0929V10.1107V10.1285V10.1463V10.1641V10.1819V10.1998V10.2176V10.2355V10.2534V10.2713V10.2893V10.3072V10.3252V10.3432V10.3612V10.3793V10.3973V10.4154V10.4335V10.4516V10.4698V10.4879V10.5061V10.5243V10.5425V10.5608V10.579V10.5973V10.6156V10.634V10.6523V10.6707V10.6891V10.7075V10.7259V10.7444V10.7629V10.7814V10.7999V10.8185V10.8371V10.8557V10.8743V10.8929V10.9116V10.9303V10.949V10.9678V10.9866V11.0054V11.0242V11.043V11.0619V11.0808V11.0997V11.1187V11.1376V11.1566V11.1756V11.1947V11.2138V11.2329V11.252V11.2712V11.2903V11.3095V11.3288V11.348V11.3673V11.3867V11.406V11.4254V11.4448V11.4642V11.4837V11.5031V11.5227V11.5422V11.5618V11.5814V11.601V11.6207V11.6404V11.6601V11.6798V11.6996V11.7194V11.7392V11.7591V11.779V11.7989V11.8189V11.8389V11.8589V11.879V11.899V11.9192V11.9393V11.9595V11.9797V11.9999V12.0202V12.0405V12.0608V12.0812V12.1016V12.1221V12.1425V12.163V12.1836V12.2041V12.2247V12.2454V12.266V12.2867V12.3075V12.3282V12.3491V12.3699V12.3908V12.4117V12.4326V12.4536V12.4746V12.4957V12.5168V12.5379V12.559V12.5802V12.6015V12.6227V12.644V12.6654H8.74967V12.644V12.6227V12.6015V12.5802V12.559V12.5379V12.5168V12.4957V12.4746V12.4536V12.4326V12.4117V12.3908V12.3699V12.3491V12.3282V12.3075V12.2867V12.266V12.2454V12.2247V12.2041V12.1836V12.163V12.1425V12.1221V12.1016V12.0812V12.0608V12.0405V12.0202V11.9999V11.9797V11.9595V11.9393V11.9192V11.899V11.879V11.8589V11.8389V11.8189V11.7989V11.779V11.7591V11.7392V11.7194V11.6996V11.6798V11.6601V11.6404V11.6207V11.601V11.5814V11.5618V11.5422V11.5227V11.5031V11.4837V11.4642V11.4448V11.4254V11.406V11.3867V11.3673V11.348V11.3288V11.3095V11.2903V11.2712V11.252V11.2329V11.2138V11.1947V11.1756V11.1566V11.1376V11.1187V11.0997V11.0808V11.0619V11.043V11.0242V11.0054V10.9866V10.9678V10.949V10.9303V10.9116V10.8929V10.8743V10.8557V10.8371V10.8185V10.7999V10.7814V10.7629V10.7444V10.7259V10.7075V10.6891V10.6707V10.6523V10.634V10.6156V10.5973V10.579V10.5608V10.5425V10.5243V10.5061V10.4879V10.4698V10.4516V10.4335V10.4154V10.3973V10.3793V10.3612V10.3432V10.3252V10.3072V10.2893V10.2713V10.2534V10.2355V10.2176V10.1998V10.1819V10.1641V10.1463V10.1285V10.1107V10.0929V10.0752V10.0575V10.0398V10.0221V10.0044V9.98676V9.96912V9.9515V9.9339V9.91631V9.89874V9.88119V9.86365V9.84612V9.82862V9.81112V9.79365V9.77618V9.75874V9.7413V9.72389V9.70648V9.6891V9.67172V9.65436V9.63702V9.61968V9.60237V9.58506V9.56777V9.55049V9.53323V9.51597V9.49874V9.48151V9.4643V9.4471V9.42991V9.41273V9.39557V9.37841V9.36127V9.34414V9.32703V9.30992V9.29282V9.27574V9.25867V9.2416V9.22455V9.20751V9.19048V9.17346V9.15645V9.13945V9.12245V9.10547V9.0885V9.07154V9.05458V9.03764V9.0207V9.00377V8.98685V8.96994V8.95304V8.93615V8.91926V8.90238V8.88551V8.86865V8.8518V8.83495V8.81811V8.80127V8.78445V8.76763V8.75081V8.7487H12.6663V7.2487H8.74967V7.24658V7.22977V7.21295V7.19612V7.17929V7.16245V7.1456V7.12874V7.11188V7.09501V7.07813V7.06125V7.04435V7.02745V7.01054V6.99362V6.9767V6.95976V6.94281V6.92586V6.9089V6.89192V6.87494V6.85795V6.84095V6.82394V6.80692V6.78989V6.77284V6.75579V6.73873V6.72166V6.70457V6.68748V6.67037V6.65325V6.63612V6.61898V6.60183V6.58467V6.56749V6.5503V6.5331V6.51589V6.49866V6.48142V6.46417V6.4469V6.42963V6.41234V6.39503V6.37771V6.36038V6.34303V6.32568V6.3083V6.29091V6.27351V6.25609V6.23866V6.22121V6.20375V6.18627V6.16878V6.15127V6.13375V6.11621V6.09865V6.08108V6.0635V6.04589V6.02827V6.01063V5.99298V5.97531V5.95762V5.93992V5.9222V5.90446V5.8867V5.86892V5.85113V5.83332V5.81549V5.79764V5.77978V5.76189V5.74399V5.72607V5.70813V5.69017V5.67219V5.65419V5.63617V5.61813V5.60007V5.58199V5.56389V5.54578V5.52764V5.50948V5.4913V5.47309V5.45487V5.43663V5.41836V5.40007V5.38177V5.36344V5.34508V5.32671V5.30831V5.28989V5.27145V5.25299V5.2345V5.21599V5.19746V5.17891V5.16033V5.14172V5.1231V5.10445V5.08577V5.06708V5.04835V5.02961V5.01084V4.99204V4.97322V4.95438V4.93551V4.91661V4.89769V4.87874V4.85977V4.84077V4.82175V4.8027V4.78363V4.76452V4.74539V4.72624V4.70706V4.68785V4.66861V4.64935V4.63006V4.61074V4.59139V4.57202V4.55262V4.53319V4.51373V4.49425V4.47473V4.45519V4.43562V4.41602V4.39639V4.37673V4.35704V4.33732V4.31757V4.2978V4.27799V4.25815V4.23828V4.21839V4.19846V4.1785V4.15851V4.13849V4.11844V4.09835V4.07824V4.05809V4.03792V4.01771V3.99746V3.97719V3.95689V3.93655V3.91618V3.89577V3.87534V3.85487V3.83437V3.81383V3.79327V3.77266V3.75203V3.73136V3.71066V3.68992V3.66915V3.64834V3.6275V3.60662V3.58572V3.56477V3.54379V3.52278V3.50172V3.48064V3.45952V3.43836V3.41717V3.39594V3.37467V3.35337V3.33203H7.24967Z"
                    fill="#2B2A28"
                  />
                </svg>
                <span> {t("new_live_account")} </span>
              </button>
            )}
          </div>
          {/* New Demo Account */}
          <div className="p-2 w-full">
            {demo && (
              <button
                className={`btnSec btnSidebar ${isVerified ? "" : ""} `}
                onClick={handleOpenDemoAccount}
              >
                <svg
                  className="w-4 h-4 object-contain"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.24967 3.33203V3.35337V3.37467V3.39594V3.41717V3.43836V3.45952V3.48064V3.50172V3.52278V3.54379V3.56477V3.58572V3.60662V3.6275V3.64834V3.66915V3.68992V3.71066V3.73136V3.75203V3.77266V3.79327V3.81383V3.83437V3.85487V3.87534V3.89577V3.91618V3.93655V3.95689V3.97719V3.99746V4.01771V4.03792V4.05809V4.07824V4.09835V4.11844V4.13849V4.15851V4.1785V4.19846V4.21839V4.23828V4.25815V4.27799V4.2978V4.31757V4.33732V4.35704V4.37673V4.39639V4.41602V4.43562V4.45519V4.47473V4.49425V4.51373V4.53319V4.55262V4.57202V4.59139V4.61074V4.63006V4.64935V4.66861V4.68785V4.70706V4.72624V4.74539V4.76452V4.78363V4.8027V4.82175V4.84077V4.85977V4.87874V4.89769V4.91661V4.93551V4.95438V4.97322V4.99204V5.01084V5.02961V5.04835V5.06708V5.08577V5.10445V5.1231V5.14172V5.16033V5.17891V5.19746V5.21599V5.2345V5.25299V5.27145V5.28989V5.30831V5.32671V5.34508V5.36344V5.38177V5.40007V5.41836V5.43663V5.45487V5.47309V5.4913V5.50948V5.52764V5.54578V5.56389V5.58199V5.60007V5.61813V5.63617V5.65419V5.67219V5.69017V5.70813V5.72607V5.74399V5.76189V5.77978V5.79764V5.81549V5.83332V5.85113V5.86892V5.8867V5.90446V5.9222V5.93992V5.95762V5.97531V5.99298V6.01063V6.02827V6.04589V6.0635V6.08108V6.09865V6.11621V6.13375V6.15127V6.16878V6.18627V6.20375V6.22121V6.23866V6.25609V6.27351V6.29091V6.3083V6.32568V6.34303V6.36038V6.37771V6.39503V6.41234V6.42963V6.4469V6.46417V6.48142V6.49866V6.51589V6.5331V6.5503V6.56749V6.58467V6.60183V6.61898V6.63612V6.65325V6.67037V6.68748V6.70457V6.72166V6.73873V6.75579V6.77284V6.78989V6.80692V6.82394V6.84095V6.85795V6.87494V6.89192V6.9089V6.92586V6.94281V6.95976V6.9767V6.99362V7.01054V7.02745V7.04435V7.06125V7.07813V7.09501V7.11188V7.12874V7.1456V7.16245V7.17929V7.19612V7.21295V7.22977V7.24658V7.2487H3.33301V8.7487H7.24967V8.75081V8.76763V8.78445V8.80127V8.81811V8.83495V8.8518V8.86865V8.88551V8.90238V8.91926V8.93615V8.95304V8.96994V8.98685V9.00377V9.0207V9.03764V9.05458V9.07154V9.0885V9.10547V9.12245V9.13945V9.15645V9.17346V9.19048V9.20751V9.22455V9.2416V9.25867V9.27574V9.29282V9.30992V9.32703V9.34414V9.36127V9.37841V9.39557V9.41273V9.42991V9.4471V9.4643V9.48151V9.49874V9.51597V9.53323V9.55049V9.56777V9.58506V9.60237V9.61968V9.63702V9.65436V9.67172V9.6891V9.70648V9.72389V9.7413V9.75874V9.77618V9.79365V9.81112V9.82862V9.84612V9.86365V9.88119V9.89874V9.91631V9.9339V9.9515V9.96912V9.98676V10.0044V10.0221V10.0398V10.0575V10.0752V10.0929V10.1107V10.1285V10.1463V10.1641V10.1819V10.1998V10.2176V10.2355V10.2534V10.2713V10.2893V10.3072V10.3252V10.3432V10.3612V10.3793V10.3973V10.4154V10.4335V10.4516V10.4698V10.4879V10.5061V10.5243V10.5425V10.5608V10.579V10.5973V10.6156V10.634V10.6523V10.6707V10.6891V10.7075V10.7259V10.7444V10.7629V10.7814V10.7999V10.8185V10.8371V10.8557V10.8743V10.8929V10.9116V10.9303V10.949V10.9678V10.9866V11.0054V11.0242V11.043V11.0619V11.0808V11.0997V11.1187V11.1376V11.1566V11.1756V11.1947V11.2138V11.2329V11.252V11.2712V11.2903V11.3095V11.3288V11.348V11.3673V11.3867V11.406V11.4254V11.4448V11.4642V11.4837V11.5031V11.5227V11.5422V11.5618V11.5814V11.601V11.6207V11.6404V11.6601V11.6798V11.6996V11.7194V11.7392V11.7591V11.779V11.7989V11.8189V11.8389V11.8589V11.879V11.899V11.9192V11.9393V11.9595V11.9797V11.9999V12.0202V12.0405V12.0608V12.0812V12.1016V12.1221V12.1425V12.163V12.1836V12.2041V12.2247V12.2454V12.266V12.2867V12.3075V12.3282V12.3491V12.3699V12.3908V12.4117V12.4326V12.4536V12.4746V12.4957V12.5168V12.5379V12.559V12.5802V12.6015V12.6227V12.644V12.6654H8.74967V12.644V12.6227V12.6015V12.5802V12.559V12.5379V12.5168V12.4957V12.4746V12.4536V12.4326V12.4117V12.3908V12.3699V12.3491V12.3282V12.3075V12.2867V12.266V12.2454V12.2247V12.2041V12.1836V12.163V12.1425V12.1221V12.1016V12.0812V12.0608V12.0405V12.0202V11.9999V11.9797V11.9595V11.9393V11.9192V11.899V11.879V11.8589V11.8389V11.8189V11.7989V11.779V11.7591V11.7392V11.7194V11.6996V11.6798V11.6601V11.6404V11.6207V11.601V11.5814V11.5618V11.5422V11.5227V11.5031V11.4837V11.4642V11.4448V11.4254V11.406V11.3867V11.3673V11.348V11.3288V11.3095V11.2903V11.2712V11.252V11.2329V11.2138V11.1947V11.1756V11.1566V11.1376V11.1187V11.0997V11.0808V11.0619V11.043V11.0242V11.0054V10.9866V10.9678V10.949V10.9303V10.9116V10.8929V10.8743V10.8557V10.8371V10.8185V10.7999V10.7814V10.7629V10.7444V10.7259V10.7075V10.6891V10.6707V10.6523V10.634V10.6156V10.5973V10.579V10.5608V10.5425V10.5243V10.5061V10.4879V10.4698V10.4516V10.4335V10.4154V10.3973V10.3793V10.3612V10.3432V10.3252V10.3072V10.2893V10.2713V10.2534V10.2355V10.2176V10.1998V10.1819V10.1641V10.1463V10.1285V10.1107V10.0929V10.0752V10.0575V10.0398V10.0221V10.0044V9.98676V9.96912V9.9515V9.9339V9.91631V9.89874V9.88119V9.86365V9.84612V9.82862V9.81112V9.79365V9.77618V9.75874V9.7413V9.72389V9.70648V9.6891V9.67172V9.65436V9.63702V9.61968V9.60237V9.58506V9.56777V9.55049V9.53323V9.51597V9.49874V9.48151V9.4643V9.4471V9.42991V9.41273V9.39557V9.37841V9.36127V9.34414V9.32703V9.30992V9.29282V9.27574V9.25867V9.2416V9.22455V9.20751V9.19048V9.17346V9.15645V9.13945V9.12245V9.10547V9.0885V9.07154V9.05458V9.03764V9.0207V9.00377V8.98685V8.96994V8.95304V8.93615V8.91926V8.90238V8.88551V8.86865V8.8518V8.83495V8.81811V8.80127V8.78445V8.76763V8.75081V8.7487H12.6663V7.2487H8.74967V7.24658V7.22977V7.21295V7.19612V7.17929V7.16245V7.1456V7.12874V7.11188V7.09501V7.07813V7.06125V7.04435V7.02745V7.01054V6.99362V6.9767V6.95976V6.94281V6.92586V6.9089V6.89192V6.87494V6.85795V6.84095V6.82394V6.80692V6.78989V6.77284V6.75579V6.73873V6.72166V6.70457V6.68748V6.67037V6.65325V6.63612V6.61898V6.60183V6.58467V6.56749V6.5503V6.5331V6.51589V6.49866V6.48142V6.46417V6.4469V6.42963V6.41234V6.39503V6.37771V6.36038V6.34303V6.32568V6.3083V6.29091V6.27351V6.25609V6.23866V6.22121V6.20375V6.18627V6.16878V6.15127V6.13375V6.11621V6.09865V6.08108V6.0635V6.04589V6.02827V6.01063V5.99298V5.97531V5.95762V5.93992V5.9222V5.90446V5.8867V5.86892V5.85113V5.83332V5.81549V5.79764V5.77978V5.76189V5.74399V5.72607V5.70813V5.69017V5.67219V5.65419V5.63617V5.61813V5.60007V5.58199V5.56389V5.54578V5.52764V5.50948V5.4913V5.47309V5.45487V5.43663V5.41836V5.40007V5.38177V5.36344V5.34508V5.32671V5.30831V5.28989V5.27145V5.25299V5.2345V5.21599V5.19746V5.17891V5.16033V5.14172V5.1231V5.10445V5.08577V5.06708V5.04835V5.02961V5.01084V4.99204V4.97322V4.95438V4.93551V4.91661V4.89769V4.87874V4.85977V4.84077V4.82175V4.8027V4.78363V4.76452V4.74539V4.72624V4.70706V4.68785V4.66861V4.64935V4.63006V4.61074V4.59139V4.57202V4.55262V4.53319V4.51373V4.49425V4.47473V4.45519V4.43562V4.41602V4.39639V4.37673V4.35704V4.33732V4.31757V4.2978V4.27799V4.25815V4.23828V4.21839V4.19846V4.1785V4.15851V4.13849V4.11844V4.09835V4.07824V4.05809V4.03792V4.01771V3.99746V3.97719V3.95689V3.93655V3.91618V3.89577V3.87534V3.85487V3.83437V3.81383V3.79327V3.77266V3.75203V3.73136V3.71066V3.68992V3.66915V3.64834V3.6275V3.60662V3.58572V3.56477V3.54379V3.52278V3.50172V3.48064V3.45952V3.43836V3.41717V3.39594V3.37467V3.35337V3.33203H7.24967Z"
                    fill="#2B2A28"
                  />
                </svg>
                <span> {t("new_demo_account")}</span>
              </button>
            )}
          </div>
        </div>
        <div className="mt-auto" />
        <div className="mt-auto">
          <div className="p-4 m-2 bg-grey-exrta-ligth-extra rounded-lg">
            <div className="flex flex-row">
              <div className="w-8 h-8 rounded-full bg-grey-tertiary border border-grey-profile flex justify-center items-center ">
                <span className="text-xxs font-medium leading-3 text-white m-auto">
                  {infoUserStore?.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col ml-2 items-center">
                <h4 className="text-base font-normal w-28 overflow-hidden whitespace-nowrap truncate">
                  {infoUserStore?.name}
                </h4>
                <p className="text-grey-seccondary text-xxs w-full flex items-center font-normal ml-1 mr-1 gap-1 leading-3 tracking-wider">
                  <span> {t("last_log")}: {""} </span>
                  <span>{formattedDate}</span>
                </p>
              </div>
              <div className="ml-auto">
                <DropdownVIew
                  onClickLangages={handleChangeLanguages}
                  buttonIsUserProcess={processIsUserProcess}
                />
              </div>
            </div>
            <div className="mt-2" />
            <div
              className={`${
                demo ? "bg-blue-20" : "bg-orange-extra-light"
              }   flex flex-row justify-center p-4 rounded-lg`}
            >
              <div className="flex flex-row gap-2  items-center">
                <span
                  className={`text-xs font-normal ${
                    demo ? "text-default" : "text-grey-tertiary"
                  }`}
                >
                  {" "}
                  {t("demo")}
                </span>
                <label className="inline-flex items-center cursor-pointer ">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={!demo}
                    onChange={handleOpenDemoToggle}
                  />
                  <div className="relative w-9 h-5 bg-default rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white  after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF3F32]"></div>
                </label>
                <span
                  className={`text-xs font-normal ${
                    demo ? "text-grey-tertiary" : "text-default"
                  }`}
                >
                  {" "}
                  {t("live")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
