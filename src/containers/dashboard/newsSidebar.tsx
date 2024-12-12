import React, { FC, useState, useEffect, Fragment } from "react";
import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import PaginationNews from "./pagination";

/**
 *  @interface RightSidebarProps
 */

/**
 *  Custom Style for DengerousHTML
 */

export const styleObj = {};

interface RightSidebarProps {
  toggleSidebarNews: () => void;
  setIsOpenNews: (isOpen: boolean) => void;
  setNewsLimit: (limit: number) => void;
  setNewsOffset: (offset: number) => void;
  newsOffset: number;
  newsLimit: number;
  isOpenNews: boolean;
  newItem: any;
  news: any;
  allNews: any;
}

const RightNewsSidebar: FC<RightSidebarProps> = ({
  toggleSidebarNews,
  setIsOpenNews,
  setNewsLimit,
  setNewsOffset,
  newsOffset,
  newsLimit,
  isOpenNews,
  newItem,
  news,
  allNews,
}) => {
  /**
   *  RightSidebar Notifiaction Hooks.
   */

  const { t } = useTranslation("dashboard");
  const countNews = allNews?.total;

  // Local Tab.

  const [itemTab, setItemTab] = useState<any | null>(null);
  const [showTheInfo, setShowTheInfo] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangeTab = (tab: any) => {
    setItemTab(tab);
    setShowTheInfo(true);
  };

  const handleCloseTab = () => {
    setShowTheInfo(false);
    setItemTab(null);
  };

  useEffect(() => {
    const pages = Math.ceil(countNews / 10);
    setTotalPages(pages);
  }, [news, newsLimit]);

  useEffect(() => {
    if (newItem?.title) {
      setItemTab(newItem);
      setShowTheInfo(true);
    } else {
    }
  }, [newItem]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newOffset = currentPage * newsLimit;
      setNewsOffset(newOffset);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newOffset = (currentPage - 2) * newsLimit;
      setNewsOffset(newOffset);
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newOffset = (page - 1) * newsLimit;
      setNewsOffset(newOffset);
      setCurrentPage(page);
    }
  };

  const closeSidebar = () => {
    setIsOpenNews(false);
    setItemTab(null);
    setShowTheInfo(false);
  };

  return (
    <aside
      className={`transition-box2 z-[3000] fixed top-0 right-0  w-full md:w-128 overflow-y-auto h-screen transition-transform transform  duration-1000 ease-in-out  ${
        // isOpenNews ? "translate-x-0" : "translate-x-full"
        isOpenNews ? "open2" : "close2"
      } bg-gray-50 `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex flex-row justify-end">
          <div className="">
            <button
              type="button"
              className="p-4 border rounded-sm border-gray-300 "
              onClick={closeSidebar}
            >
              <img src="/icons/iconSmall/close-x-16x16.svg" alt="Close-X" />
            </button>
          </div>
        </div>
        <div className="pt-10" />
        <div
          className={` flex flex-row justify-between   ${
            showTheInfo ? "px-8 mb-6" : "px-8 mb-6"
          } `}
        >
          {showTheInfo ? (
            <Fragment>
              <div className="w-full flex justify-between">
                <div className="flex flex-row  items-center gap-4">
                  <button
                    type="button"
                    className="border-none cursor-pointer"
                    onClick={handleCloseTab}
                  >
                    <img src="/icons/arrow-left.svg" alt="Arrow-Left" />
                  </button>
                  <h3 className="text-default text-2xl font-medium leading-6">
                    {" "}
                    News{" "}
                  </h3>
                </div>
                <div className="flex align-bottom pt-3">
                  {itemTab?.publish_date && (
                    <p className="text-xs font-normal tracking-wider text-grey-seccondary">
                      {" "}
                      {format(itemTab?.publish_date, "MMM dd, yyyy")}
                    </p>
                  )}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="">
                <h3 className="text-default text-2xl font-medium">
                  {" "}
                  {t("all_news")}{" "}
                </h3>
              </div>
            </Fragment>
          )}

          <div className="flex"></div>
        </div>

        {!showTheInfo ? (
          <Fragment>
            {/* All News */}

            <div className="px-5 md:px-8 pt-10 max-h-[600px] overflow-y-auto">
              <div className="p-1">
                {news?.map((item: any, index: React.Key | null | undefined) => (
                  <div
                    className="card-notifiction pt-5 group hover:cursor-pointer"
                    key={index}
                    onClick={() => handleChangeTab(item)}
                  >
                    <div className="py-4 flex flex-col">
                      <div className="flex flex-row justify-between items-center">
                        <p className="text-text-default text-sm font-medium leading-3.5 tracking-merge ">
                          <span>{item?.title}</span>
                        </p>
                      </div>
                      <div className="mt-2" />
                      <div className="">
                        <p className="text-grey-seccondary text-sm font-normal leading-3.5 tracking-merge">
                          {item?.notices_text} {"  "}
                        </p>
                      </div>

                      <div className="mt-3" />
                      <div className="flex flex-row justify-between items-center">
                        <p className="text-grey-seccondary text-xxs font-normal leading-3 tracking-merge ">
                          <span>{item?.status_text}</span> .{" "}
                          <span>
                            {" "}
                            {format(item?.publish_date, "MMM dd, yyyy")}{" "}
                          </span>{" "}
                        </p>
                      </div>

                      {/* <div
                    className="text-default text-sm font-normal curstom-news"
                    dangerouslySetInnerHTML={{ __html: item?.content_text }}
                    style={styleObj}
                  ></div> */}
                      <div className="mt-4">
                        <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6" />
            <div className="flex flex-1 items-center justify-center">
              <div className=" flex flex-col">
                <nav
                  className=" flex flex-row justify-between"
                  aria-label="Pagination"
                >
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={` relative inline-flex items-center rounded-sm w-8 h-8 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                   ${currentPage === 1 ? "cursor-not-allowed" : ""}
                  `}
                  >
                    <img
                      src="/icons/iconSmall/arrow-left-16.svg"
                      alt="Arrow-Left-16"
                    />
                  </button>

                  <PaginationNews
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={goToPage}
                  />

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-sm w-8 h-8 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 
                  ${currentPage === totalPages ? "cursor-not-allowed" : ""}
                  `}
                  >
                    <img
                      src="/icons/iconSmall/arrow-right-16.svg"
                      alt="Arrow-Right-16"
                    />
                  </button>
                </nav>
              </div>
              <div></div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="card-notifiction pt-5 group hover:cursor-pointer px-8 max-h-[700px] overflow-y-auto">
              <div className="py-4 flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-text-default text-sm font-medium leading-3.5 tracking-merge ">
                    <span>{itemTab?.title}</span>
                  </p>
                </div>
                <div className="mt-2" />
                <div className="">
                  <p className="text-grey-seccondary text-sm font-normal leading-3.5 tracking-merge">
                    {itemTab?.notices_text} {"  "}
                  </p>
                </div>

                <div className="mt-3" />
                <div className="flex flex-row justify-between items-center">
                  <p className="text-grey-seccondary text-xs font-normal leading-3 tracking-merge ">
                    <span>{itemTab?.status_text}</span> .{" "}
                    <span>
                      {" "}
                      {/* {format(itemTab?.publish_date, "MMM dd, yyyy")} */}
                    </span>{" "}
                  </p>
                </div>

                <div
                  className="text-default text-sm font-normal curstom-news"
                  dangerouslySetInnerHTML={{ __html: itemTab?.content_text }}
                  style={styleObj}
                ></div>
                <div className="mt-4">
                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />
                </div>
              </div>
            </div>
          </Fragment>
        )}

        {/* Item News */}

        {/* Item Notification */}

        <div className="pb-10" />
      </div>
    </aside>
  );
};

export default RightNewsSidebar;
