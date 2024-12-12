"use client";

import React, { ReactNode, FC } from "react";
import { useTranslation } from "next-i18next";

/**
 * @interface HistoryListProps
 */

/**
 * @interface HistroyTableProps
 */
interface HistroyTableProps {
  historyInfo: any;
  currentPage: number;
  currentSize: number;
  setCurrentPage: (page: number) => void;
  setCurrentSize: (size: number) => void;
  toPage: (page: any) => void;
}

const HistroyTable: FC<HistroyTableProps> = ({
  historyInfo,
  currentPage,
  currentSize,
  setCurrentPage,
  setCurrentSize,
  toPage,
}) => {
  /**
   * Trading Table Hook.
   */

  const { t } = useTranslation("founding");
  const totalItems = historyInfo?.totalItems;
  const totalPages = historyInfo?.totalPages;
  const currentDate = historyInfo?.margin;

  const startItem = currentPage * currentSize + 1;
  const endItem = Math.min((currentPage + 1) * currentSize, totalItems);

  return (
    <>
      {/* Desktop and Tablet Version */}
      <div className="relative overflow-x-auto hidden md:block">
        {currentDate === null || currentDate?.length === 0 ? (
          <div className="w-full flex justify-center items-center h-64 bg-sidebar rounded">
            <div className="flex items-center flex-col w-full">
              <div className="flex justify-center">
                <img src="/images/no-data.png" alt="No-Data" />
              </div>
              <div className="flex flex-col justify-center items-center px-2 pt-4">
                <p className="font-medium text-base md:text-xl leading-5 text-default font-aeonik">
                  {t("not_have_history")}
                </p>
                <div className="pt-1" />
                <p className="text-grey-seccondary font-normal text-sm  leading-4 text-center">
                  {t("not_history_title")} <br />
                  {t("not_history_title_two")}
                </p>
                <div className="pt-4" />
                <div className="bg-grey-extra-dark h-[1px] w-full " />
                {/* Divider */}
                <div className="pt-4" />
                <p className="flex flex-row text-center gap-[10px] text-sm">
                  <span className="text-grey-seccondary font-normal ">
                    {" "}
                    {t("start_by")}{" "}
                  </span>{" "}
                  <span className="font-medium"> {t("depositing_funds")} </span>{" "}
                  <span className="text-grey-seccondary font-normal">
                    {" "}
                    {t("or")}{" "}
                  </span>{" "}
                  <span className="font-medium">
                    {" "}
                    {t("adding_payout_method")}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[1280px] w-full overflow-x-auto scroll-smooth text-sm text-left rtl:text-right text-grey-seccondary">
              <thead className="text-xs text-grey-seccondary">
                <tr>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    {t("ticket")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    {t("account")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("deposit")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("withdrawal")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("credit_in")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    {t("credit_out")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("trade_date")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("time")}
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                     {t("comment")}
                  </th>
                  <th scope="col" className="w-5"></th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {currentDate?.length &&
                  currentDate.map(
                    (
                      item: {
                        ticket:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        account:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        deposit:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        withdrawal:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        creditIn:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        creditOut:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        tradeDate:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                        time:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <tr
                        className="group bg-sidebar text-default rounded-lg border-b-2 border-grey-exrta-ligth-extra hover:bg-hover-sidebar hover:cursor-pointer"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-4 py-8 font-medium whitespace-nowrap rounded-l-lg"
                        >
                          {item.ticket}
                        </th>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.account}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.deposit}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.withdrawal}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.creditIn}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.creditOut}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.tradeDate}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.time}
                          </span>
                        </td>
                        <td className="px-4 py-8 flex flex-row justify-between items-center relative">
                          <div className="font-normal text-sm leading-3.5 tracking-wider">
                            -
                          </div>
                        </td>
                        <td className="px-[10px] py-[10px] rounded-r-lg"></td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            {/* Pagination code */}
          </>
        )}
      </div>

      <div className="relative overflow-x-auto hidden md:block ">
        {currentDate === null || currentDate?.length === 0 ? null : (
          <div className="flex flex-1 items-center justify-between pt-2">
            <div>
              <p className="text-sm text-grey-seccondary flex gap-1 font-normal leading-4">
                {t("showing")}
                <span className="">{startItem}</span>
                to
                <span className="">{endItem}</span>
                of
                <span className="">{historyInfo?.totalItems}</span>
                {t("entries")}
              </p>
            </div>
            <div className="pr-6">
              <nav
                className="isolate space-x-1 rounded-md shadow-sm items-center flex"
                aria-label="Pagination"
              >
                <button
                  onClick={() => toPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`relative inline-flex items-center rounded-sm px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                      
                      ${currentPage === 0 ? "cursor-not-allowed" : ""}
                      `}
                >
                  <img
                    src="/icons/iconSmall/arrow-left-16.svg"
                    alt="Arrow-Left-16"
                  />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => toPage(index)}
                    className={`
                  inline-flex items-center rounded-l-md px-4 py-1 cursor-pointer
                  ${
                    currentPage === index
                      ? "text-default"
                      : "text-grey-tertiary"
                  }
                  
                  `}
                  >
                    <span className="">{index + 1}</span>
                  </div>
                ))}
                <button
                  onClick={() => toPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`relative inline-flex items-center rounded-sm px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                      ${
                        currentPage === totalPages - 1
                          ? "cursor-not-allowed"
                          : ""
                      }
                      `}
                >
                  <img
                    src="/icons/iconSmall/arrow-right-16.svg"
                    alt="Arrow-Right-16"
                  />
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto hidden  ">
        {currentDate === null || currentDate?.length === 0 ? (
          <div className="w-full flex justify-center items-center h-64 bg-sidebar rounded">
            <div className="flex items-center flex-col w-full ">
              <div className="flex justify-center">
                <img src="/images/no-data.png" alt="No-Data" />
              </div>
              <div className="flex flex-col justify-center items-center px-2 pt-4">
                <p className="font-medium text-base md:text-xl leading-5 text-default font-aeonik">
                  {t("not_have_history")}
                </p>
                <div className="pt-1" />
                <p className="text-grey-seccondary font-normal text-sm  leading-4 text-center">
                  {t("not_history_title")} <br />
                  {t("not_history_title_two")}
                </p>
                <div className="pt-4" />
                <div className="bg-grey-extra-dark h-[1px] w-full " />
                {/* Divider */}
                <div className="pt-4" />
                <p className="flex flex-row text-center gap-[10px] text-sm">
                  <span className="text-grey-seccondary font-normal ">
                    {" "}
                    {t("start_by")}{" "}
                  </span>{" "}
                  <span className="font-medium"> {t("depositing_funds")} </span>{" "}
                  <span className="text-grey-seccondary font-normal">
                    {" "}
                    {t("or")}{" "}
                  </span>{" "}
                  <span className="font-medium">
                    {" "}
                    {t("adding_payout_method")}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[1280px] w-full  overflow-x-auto scroll-smooth text-sm text-left rtl:text-right text-grey-seccondary ">
              <thead className="text-xs text-grey-seccondary ">
                <tr>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Ticket
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Account
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Deposit
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Withdrawal
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Credit In
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Credit Out
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Trade Date
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-normal text-sm leading-3.5 tracking-wider "
                  >
                    Comment
                  </th>
                  <th scope="col" className="w-5"></th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {currentDate?.length &&
                  currentDate.map(
                    (
                      item: {
                        [x: string]: ReactNode;
                        ticket:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        account:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        deposit:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        withdraw:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        credit_in:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        credit_out:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        trade_date:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        time:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <tr
                        className="group bg-sidebar text-default rounded-lg border-b-2 border-grey-exrta-ligth-extra  hover:bg-hover-sidebar hover:cursor-pointer"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-4 py-8 font-medium whitespace-nowrap rounded-l-lg "
                        >
                          {item.ticket}
                        </th>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.account}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.deposit}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.withdrawal}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {" "}
                            {item.creditIn}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.creditOut}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.tradeDate}
                          </span>
                        </td>
                        <td className="px-4 py-8">
                          <span className="font-normal text-sm leading-3.5 tracking-wider">
                            {item.time}
                          </span>
                        </td>
                        <td className="px-4 py-8 flex flex-row justify-between items-center relative  ">
                          <div className="font-normal text-sm leading-3.5 tracking-wider">
                            -
                          </div>
                          {/* <div className="hidden group-hover:flex justify-center right-1 absolute z-10 ">
                          <button className="border border-default border-opacity-10 text-center ro px-3 py-1.5 ">
                            <span className="text-sm leading-3 font-normal">
                              Details
                            </span>
                          </button>
                        </div> */}
                        </td>
                        <td className="px-[10px] py-[10px] rounded-r-lg"></td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>

            <div className="flex flex-1 items-center justify-between pt-2">
              <div>
                <p className="text-sm text-grey-seccondary flex gap-1 font-normal leading-4">
                  {t("showing")}
                  <span className="">{startItem}</span>
                  to
                  <span className="">{endItem}</span>
                  of
                  <span className="">{historyInfo?.totalItems}</span>
                  {t("entries")}
                </p>
              </div>
              <div className="pr-6">
                <nav
                  className="isolate -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => toPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`relative inline-flex items-center rounded-sm px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                      
                      ${currentPage === 0 ? "cursor-not-allowed" : ""}
                      `}
                  >
                    <img
                      src="/icons/iconSmall/arrow-left-16.svg"
                      alt="Arrow-Left-16"
                    />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <div
                      key={index}
                      onClick={() => toPage(index)}
                      className={`
                  inline-flex items-center rounded-l-md px-4 py-1 cursor-pointer
                  ${
                    currentPage === index
                      ? "text-default"
                      : "text-grey-tertiary"
                  }
                  
                  `}
                    >
                      <span className="">{index + 1}</span>
                    </div>
                  ))}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage <= totalPages}
                    className={`relative inline-flex items-center rounded-sm px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                      ${currentPage <= totalPages ? "cursor-not-allowed" : ""}
                      `}
                  >
                    <img
                      src="/icons/iconSmall/arrow-right-16.svg"
                      alt="Arrow-Right-16"
                    />
                  </button>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        {currentDate === null || currentDate?.length === 0 ? (
          <div className="w-full flex justify-center items-center h-286 bg-sidebar rounded">
            <div className="flex items-center flex-col w-[420px] ">
              <div className="flex justify-center">
                <img src="/images/no-data.png" alt="No-Data" />
              </div>
              <div className="flex flex-col justify-center items-center px-2 pt-4">
                <p className="font-medium text-base md:text-xl leading-5 text-default font-aeonik">
                  {t("not_have_history")}
                </p>
                <div className="pt-1" />
                <p className="text-grey-seccondary font-normal text-sm  leading-4 text-center">
                  {t("not_history_title")}
                  {t("not_history_title_two")}
                </p>
                <div className="pt-4" />
                <div className="bg-grey-extra-dark h-[1px] w-full " />
                {/* Divider */}
                <div className="pt-4" />
                <p className="flex flex-col text-center gap-[4px] text-sm">
                  <div className="flex flex-row gap-1">
                    <span className="text-grey-seccondary font-normal ">
                      {" "}
                      {t("start_by")}{" "}
                    </span>{" "}
                    <span className="font-medium">
                      {" "}
                      {t("depositing_funds")}{" "}
                    </span>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="text-grey-seccondary font-normal">
                      {" "}
                      {t("or")}{" "}
                    </span>{" "}
                    <span className="font-medium">
                      {" "}
                      {t("adding_payout_method")}{" "}
                    </span>
                  </div>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 ">
            {currentDate?.length &&
              currentDate.map(
                (item: any, index: React.Key | null | undefined) => (
                  <div className="bg-sidebar px-4 py-6 rounded-lg " key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-sm  whitespace-nowrap text-grey-seccondary">
                          Ticket
                        </p>
                        <p className="flex text-base font-medium items-center gap-1">
                          {item.ticket}
                        </p>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="border rounded-[1px] border-secondary border-opacity-10 p-2"
                        >
                          {/* <img src="/icons/plus.svg" alt="plus" /> */}
                          <img
                            src="/icons/arrows/arrow-right.svg"
                            alt="Arrow-Right"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="pt-5" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Account
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.account}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Deposit
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.deposit}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Withdrawal
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.withdrawal}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Credit In
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.creditIn}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Credit Out
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.creditOut}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Trade date
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.tradeDate}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Time
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    <div className="bg-default opacity-10 w-full h-[1px]" />
                    <div className="flex justify-between items-center pb-4 pt-4 ">
                      <div className="">
                        <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          Comment
                        </p>
                      </div>
                      <div className="flex flex-row">
                        <span className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-normal">
                          -
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        )}
        <div className="pt-6" />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[170px] flex flex-col">
            <nav
              className=" flex flex-row justify-between"
              aria-label="Pagination"
            >
              <button
                onClick={() => toPage(currentPage - 1)}
                disabled={currentPage === 0}
                className={`relative inline-flex items-center rounded-sm w-8 h-8 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                   ${currentPage === 0 ? "cursor-not-allowed" : ""}
                  `}
              >
                <img
                  src="/icons/iconSmall/arrow-left-16.svg"
                  alt="Arrow-Left-16"
                />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => toPage(index)}
                  className={`
                  inline-flex items-center rounded-l-md px-4 py-1 cursor-pointer
                  ${
                    currentPage === index
                      ? "text-default"
                      : "text-grey-tertiary"
                  }
                  
                  `}
                >
                  <span className="">{index + 1}</span>
                </div>
              ))}

              <button
                onClick={() => toPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`relative inline-flex items-center rounded-sm w-8 h-8 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                  ${currentPage === totalPages - 1 ? "cursor-not-allowed" : ""}
                  `}
              >
                <img
                  src="/icons/iconSmall/arrow-right-16.svg"
                  alt="Arrow-Right-16"
                />
              </button>
            </nav>
            <div className="pt-7" />
            <div className="">
              <p className="text-sm text-grey-seccondary flex gap-1 font-normal leading-4">
                {t("showing")}
                <span className="">{startItem}</span>
                to
                <span className="">{endItem}</span>
                of
                <span className="">{historyInfo?.totalItems}</span>
                {t("entries")}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default HistroyTable;
