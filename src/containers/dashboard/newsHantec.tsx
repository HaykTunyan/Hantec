import React, { FC } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface NewsHantecProps {
  news: any;
  onClickOpen: () => void;
  onClickItem: (item: any) => void; 
}

const NewsHantec: FC<NewsHantecProps> = ({ news, onClickOpen, onClickItem  }) => {
  /**
   *  News Hantec Hooks.
   */

  const { t } = useTranslation("dashboard");

  return (
    <>
      <div className="hantec-news bg-orange-extra-light">
        <div className="pt-10 md:pt-16 xl:pt-20" />
        <div className="px-3 md:px-5 xl:pl-2.5 xl:pr-2.5 flex flex-col  md:flex-row gap-3 md:gap-10">
          <div className="w-full xl:w-2/5 md:w-3/5">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between md:pb-4 px-5">
                <h5 className="text-24 font-medium text-default leading-6 tracking-normal">
                  {" "}
                  {t("hantec_news")}
                </h5>
                <button onClick={onClickOpen} className="btnSec btnViewAll">
                  {t("view_all")}
                </button>
              </div>
              <div className="">
                {news?.map((item: any, index: React.Key | null | undefined) => (
                  <div
                    className="pt-5 pb-6 border-b bottom-1 border-default  border-opacity-10 hover:cursor-pointer hover:bg-hover-sidebar hover:rounded-lg px-5"
                    key={index}
                    onClick={() => onClickItem(item)}
                  >
                    <div className="flex flex-col ">
                      <div className="flex flex-row justify-between">
                        <div className="text-grey-seccondary text-sm font-normal leading-3.5 tracking-merge flex items-center gap-1 ">
                          {/* <span>{item?.title}</span> */}
                          <svg
                            width="2"
                            height="2"
                            viewBox="0 0 8 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="4" cy="4.5" r="4" fill="#868583" />
                          </svg>
                          <span>
                            {" "}
                            {format(item?.publish_date, "MMM dd, yyyy")}{" "}
                          </span>{" "}
                        </div>
                        {/* <div className="bg-hover-sidebar rounded card-time text-green-extra-dark text-11">
                          5 {t("min_read")}
                        </div> */}
                      </div>
                      <div className="mt-3">
                        <p className="text-default">{item?.title}</p>
                        <div className="pt-2" />
                        {/* <p className="text-default text-sm font-normal ">
                          {item?.notices_text}
                        </p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="pt-5 pb-6 border-b bottom-1 border-default  border-opacity-10">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <p className="text-grey-seccondary text-sm font-normal leading-3.5 tracking-merge ">
                      <span>Global</span> . <span>Apr 11, 2024</span>{" "}
                    </p>

                    <div className="bg-hover-sidebar rounded card-time text-green-extra text-xs">
                      2 min read
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-default">
                      Title Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sed do eiusmod tempor incididunt
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <Link
            className="w-full h-[480px] xl:w-3/5 md:w-2/5 flex xl:justify-center cursor-pointer newsHover"
            target="_blank"
            href={
              "https://hantec.com/af/en/analytics/trading-tools/economic-calendar.html"
            }
          >
            <div className="px-8 pb-6 w-full h-[480px] md:h-full relative economic rounded-lg">
              <div className="flex flex-col absolute bottom-6 w-60 xl:w-[500px] ">
                <div className="flex flex-col ">
                  <h4 className="font-aeonik font-medium text-xl leading-5 xl:text-2xl xl:leading-7 text-white">
                    {t("this_week’s")}
                  </h4>
                  <h4 className="font-aeonik font-medium text-xl leading-5 xl:text-2xl xl:leading-7 text-white">
                    {t("economic_calendar")}
                  </h4>
                  <div className="pt-2" />
                  <div className="flex flex-shrink-0">
                    <p className="font-aeonik font-normal text-white80 text-sm xl:text-base leading-5 tracking-wider forHover">
                      {t("economic_calendar_decisions.")}
                    </p>
                  </div>
                  <div className="flex xl:hidden pt-7">
                    <div className="flex flex-row items-center gap-1.5">
                      <span className="text-white text-sm leading-3.5 font-medium">
                        {" "}
                        {t("know_more")}
                      </span>
                      <img
                        src="/icons/iconSmall/arrow-up-right-16.svg"
                        alt="Arrow-Up-Right-16"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <img
              src="images/card-economic-calendar.png"
              alt="Card-Economic-Calendar"
              className="w-full xl:block hidden"
            />
            <img
              src="images/economic-calendar-tablet.png"
              alt="Card-Economic-Calendar"
              className="w-full block  xl:hidden"
            /> */}
          </Link>
        </div>
        <div className="pb-12 md:pb-18 xl:pb-20" />
      </div>
    </>
  );
};

export default NewsHantec;
