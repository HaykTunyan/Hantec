"use client";

import React, { FC, useState, useEffect, Fragment  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { useTranslation } from "next-i18next";

/**
 * @interface UserOverview
 */
interface UserOverview {
  id: number;
  companyId: number;
  platformId: number;
  platformCatDesc: string;
  accountCode: string;
  status: string;
  availableMargin: number;
  availableBalance: number;
  balance: number;
  ccy: string;
  credit: number;
  leverage: number;
  netValue: number;
  accountType: number;
  platformTypeCode: string;
  openPL: number;
}

/**
 * @interface TradingTableProps
 */
interface TradingTableProps {
  liveAccountData: UserOverview[] | null;
  isWithdrawal: boolean;
  loading: boolean;
  status: any;
}

const TradingTable: FC<TradingTableProps> = ({
  liveAccountData,
  isWithdrawal,
  loading,
  status,
}) => {
  /**
   *  Trading Table Hook.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const { t } = useTranslation("dashboard");

  // Local state
  const [noData, setNoData] = useState(false);

  // Didn't delete this funciton.
  // const renderSkeletonRows = (rows: number) => {
  //   return Array.from({ length: rows }).map((_, index) => (
  //     <tr key={index} className="animate-pulse">
  //       <td className="px-6 py-4">
  //         <div className="w-24 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-20 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-16 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-16 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-16 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-20 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //       <td className="px-6 py-4">
  //         <div className="w-20 h-6 bg-gray-300 rounded"></div>
  //       </td>
  //     </tr>
  //   ));
  // };

  useEffect(() => {
    const checkData = () => {
      if (Array.isArray(liveAccountData) && liveAccountData.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    };
    checkData(); 
  }, [liveAccountData]);

  return (
    <Fragment>
      {/* Skeleton loader when loading */}
      {liveAccountData?.length === 0 && !noData && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-grey-seccondary">
              <tr>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("account_number")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("state")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("Currency")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("today_pl")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("open_pl")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("equity")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                 {t("free_margin")}
                </th>
              </tr>
            </thead>
            <tbody className="w-full h-286 bg-sidebar rounded">
    
             </tbody>{" "}
            {/* Rendering 5 skeleton rows */}
          </table>
        </div>
      )}

      {/* Show actual data when it's not loading and there's data */}
      {!loading && liveAccountData && liveAccountData.length > 0 && (
        <div className="relative overflow-x-auto hidden md:block">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-grey-seccondary ">
              <tr>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("account_number")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("state")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("Currency")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("today_pl")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("open_pl")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("equity")}
                </th>
                <th scope="col" className="px-6 py-3 font-normal">
                  {t("free_margin")}
                </th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {liveAccountData.map((item, index) => (
                <tr
                  className="bg-sidebar text-default rounded-lg border-b-2 border-grey-exrta-ligth-extra"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap rounded-l-lg"
                  >
                    {"#" + item.accountCode}
                  </th>
                  <td className="px-6 py-8">
                    <div className="flex flex-row items-center gap-1">
                      {item.status === "A" ? (
                        <span className="open-icon"> </span>
                      ) : (
                        <span className="close-icon"></span>
                      )}
                      <span className="font-normal">
                        {!demo ? "Live" : "Demo"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    {item.ccy === "USD" && (
                      <div className="flex flex-row">
                        <img src="/icons/country/usa.svg" alt="USA" />
                        <span className="font-normal"> {item.ccy} </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-8">
                    <span className="px-4 py-1 text-xs font-normal bg-hover-sidebar flex items-center rounded-sm w-max">
                      {item.status === "A" ? (
                        <span className="open-icon mr-1"> </span>
                      ) : (
                        <span className="close-icon mr-1"> </span>
                      )}
                      <span className="font-normal">{"$" + item.balance}</span>
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <span className="font-normal">
                      {item.openPL < 0
                        ? "-$" + Math.abs(item.openPL)
                        : "$" + item.openPL}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    <span className="font-normal">{"$" + item.netValue}</span>
                  </td>
                  <td className="px-6 py-8 rounded-r-lg xl:rounded-none">
                    <span className="font-normal">
                      {"$" + item.availableMargin}
                    </span>
                  </td>
                  <td className="px-6 py-8 rounded-lg hidden xl:block h-full"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fallback message when no data is available */}
      {isWithdrawal ||
        (noData && liveAccountData?.length === 0 && (
          <div className="w-full flex justify-center items-center h-286 bg-sidebar rounded ">
            <div className="flex items-center flex-col w-[420px] ">
              <div className="flex justify-center">
                <img src="/images/no-data.png" alt="No-Data" />
              </div>
              <div className="flex justify-center items-center px-2 pt-4">
                <p className="font-medium text-xl text-default font-aeonik">
                  {t("have_not_account")}
                </p>
              </div>
              <div className="flex justify-center items-center pt-1">
                <p className="text-center font-normal text-xs text-grey-seccondary font-aeonik">
                  {t("have_not_account_description")}
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* Mobile View */}
      <div className="block md:hidden">
        {!loading && liveAccountData && liveAccountData.length > 0 && (
          <div className="mobile-swiper-container">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar]}
              spaceBetween={8}
              onSwiper={(swiper) => {}}
              style={{ height: "310px", paddingRight: "50px" }} // Adding height for the swiper
              className="slider-table"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                375: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              // pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              slidesPerView={"auto"}
            >
              {liveAccountData?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className=" bg-sidebar px-4 py-6 rounded-lg mr-2 ">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <div className="">
                          <p className="font-medium whitespace-nowrap">
                            {"#"}
                            {item.accountCode}
                          </p>
                          <p className="flex items-center gap-1">
                            <span
                              className={`${
                                item.status === "A" ? "open-icon" : "red-icon"
                              } `}
                            >
                              {" "}
                            </span>
                            <span className="font-normal">
                              {item.status === "A" ? "Live" : "Demo"}
                            </span>
                          </p>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            onClick={() =>
                              router.push("/trading/trade-accounts")
                            }
                            className="border rounded-[1px] border-secondary border-opacity-10 p-2"
                          >
                            <img
                              src="/icons/arrow-right.svg"
                              alt="arrow-right"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="pt-5" />
                      {/* Currency */}
                      <div className="flex justify-between items-center pb-2 pt-2 ">
                        <div className="">
                          <p className="text-sm text-grey-seccondary leading-6">
                            {" "}
                            {t("Currency")}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <img src="/icons/country/usa.svg" alt="USA" />
                          <span className="font-normal"> {item.ccy} </span>
                        </div>
                      </div>
                      <div className="bg-default opacity-10 w-full h-[1px]" />
                      {/* Today P/L */}
                      <div className="flex justify-between items-center pb-2 pt-2 ">
                        <div className="">
                          <p className="text-sm text-grey-seccondary leading-6">
                            {t("today_pl")}
                          </p>
                        </div>

                        <div className="flex flex-row">
                          <span className="px-4 py-1 text-xs font-normal bg-hover-sidebar flex items-center rounded-sm w-max">
                            <span className="open-icon mr-1"></span>
                            <span className="font-normal">
                              {" "}
                              {"$"}
                              {item.balance}{" "}
                            </span>
                          </span>
                          <span className="font-normal ml-2">
                            {" "}
                            {"$"}
                            {item.openPL}{" "}
                          </span>
                        </div>
                      </div>
                      {/* Equity */}
                      <div className="bg-default opacity-10 w-full h-[1px]" />
                      <div className="flex justify-between items-center pb-2 pt-2 ">
                        <div className="">
                          <p className="text-sm text-grey-seccondary leading-6">
                            {" "}
                            {t("equity")}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <span className="font-normal">
                            {" "}
                            {"$"}
                            {item.netValue}{" "}
                          </span>
                        </div>
                      </div>

                      {/* Free Margin */}
                      <div className="bg-default opacity-10 w-full h-[1px]" />
                      <div className="flex justify-between items-center pb-2 pt-2 ">
                        <div className="">
                          <p className="text-sm text-grey-seccondary leading-6">
                            {" "}
                            {t("free_margin")}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <span className="font-normal">
                            {" "}
                            {"$"}
                            {item.availableMargin}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default TradingTable;
