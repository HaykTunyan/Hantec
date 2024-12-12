import React, { useState } from "react";
import ClockCard from "@/components/canvasClock";
import { Swiper, SwiperSlide } from "swiper/react";
// Styles For Components.
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../styles/slider.scss";
// import { Durection } from "@/json";
import { useTranslation } from "next-i18next";
import { toZonedTime } from "date-fns-tz";
import {
  parse,
  isAfter,
  isBefore,
  differenceInMinutes,
  addDays,
} from "date-fns";
import Link from "next/link";

interface MarketTime {
  label: string;
  time: { open: string; close: string }[];
  timezoneId: string;
}

const Disclaimer = () => {
  /**
   *  Disclaimer Hooks.
   */

  const { t } = useTranslation("dashboard");

  const DurectionCity = [
    {
      label: "Tokyo",
      time: [
        {
          open: "09:00",
          close: "15:00",
        },
      ],
      timezoneId: "Asia/Tokyo",
    },
    {
      label: "Hong Kong",
      time: [
        {
          open: "09:30",
          close: "16:00",
        },
      ],
      timezoneId: "Asia/Hong_Kong",
    },
    {
      label: t("market_london"),
      time: [
        {
          open: "08:00",
          close: "16:30",
        },
      ],
      timezoneId: "Europe/London",
    },
    {
      label: "New York",
      time: [
        {
          open: "09:30",
          close: "16:00",
        },
      ],
      timezoneId: "America/New_York",
    },
  ];

  // const [markTime] = useState<any>(MarkData);
  const [durection] = useState<any>(DurectionCity);

  // useLayoutEffect(() => {
  //   const interval = setInterval(() => {
  //     const savedLanguage = localStorage.getItem("language");
  //     if (savedLanguage === "fr") {
  //       // setDurection(durectionFr);
  //     } else {
  //       // setDurection(durectionEn);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [ t]);

  const padTime = (time: number): string =>
    time < 10 ? `0${time}` : `${time}`;

  // Updated function to handle current and next-day market timings
  const checkMarketStatus = (
    cityLabel: string,
    markData: MarketTime[]
  ): string => {
    const cityData = markData.find((city) => city.label === cityLabel);

    if (!cityData) {
      return "City";
    }

    const currentDate = new Date();
    const timezone = cityData.timezoneId;

    const currentTimeInZone = toZonedTime(currentDate, timezone);

    let nextOpenTime: Date | null = null;
    let nextCloseTime: Date | null = null;

    // Iterate through the city's market times to find the next event
    for (const period of cityData.time) {
      // @ts-ignore
      const openTime = parse(period.open, "HH:mm", currentTimeInZone);
      // @ts-ignore
      const closeTime = parse(period.close, "HH:mm", currentTimeInZone);

      if (isBefore(currentTimeInZone, openTime)) {
        // If current time is before the next opening time, set nextOpenTime
        if (!nextOpenTime || isBefore(openTime, nextOpenTime)) {
          nextOpenTime = openTime;
        }
      } else if (
        isAfter(currentTimeInZone, openTime) &&
        isBefore(currentTimeInZone, closeTime)
      ) {
        // If market is open, calculate time until it closes
        nextCloseTime = closeTime;
      }
    }

    let timeUntilEvent: string;

    if (nextCloseTime) {
      // Market is open, calculate time until it closes
      const minutesToClose = differenceInMinutes(
        nextCloseTime,
        currentTimeInZone
      );
      const hours = Math.floor(minutesToClose / 60);
      const minutes = minutesToClose % 60;
      timeUntilEvent = `${padTime(hours)}:${padTime(minutes)} H`;
    } else if (nextOpenTime) {
      // Market is closed, calculate time until it opens
      const minutesToOpen = differenceInMinutes(
        nextOpenTime,
        currentTimeInZone
      );
      const hours = Math.floor(minutesToOpen / 60);
      const minutes = minutesToOpen % 60;
      timeUntilEvent = `${padTime(hours)}:${padTime(minutes)} H`;
    } else {
      // No more events today, calculate time until next day's opening
      const nextDayOpenTime = addDays(
        parse(cityData.time[0].open, "HH:mm", currentTimeInZone),
        1
      );
      const minutesToNextOpen = differenceInMinutes(
        nextDayOpenTime,
        currentTimeInZone
      );
      const hours = Math.floor(minutesToNextOpen / 60);
      const minutes = minutesToNextOpen % 60;
      timeUntilEvent = `${padTime(hours)}:${padTime(minutes)} H`;
    }

    return timeUntilEvent;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        {/* Column 1 */}
        <div className="w-full md:w-2/5 md:pr-10">
          <div>
            <h6 className="text-sm font-medium text-default leading-4 tracking-merge ">
              {t("risk_disclaimer")}
            </h6>
            <div className="pt-3 xl:pt-4" />
            <p className="font-normal text-xs text-grey-seccondary leading-3.5 tracking-wider">
              {t("risk_disclaimer_descritpion")} <br />
              <Link
                href={"https://hantec.com/af/en/legal/risk-disclosures.html"}
                target={"_blank"}
                className="text-grey-seccondary underline cursor-pointer"
              >
                {t("risk_click")}
              </Link>
            </p>
          </div>
        </div>
        {/* Column 2 */}
        <div className="w-full pt-6 xl:pt-0 md:w-3/5">
          {/* <div className="hidden xl:grid grid-cols-2 lg:grid-cols-4 gap-1 ">
            <ClockCard
              city="Tokyo"
              timezone="Asia/Tokyo"
              format24Hour={false}
              marketStatus={checkMarketStatus("Tokyo", markTime)}
            />
            <ClockCard
              city="Hong Kong"
              timezone="Asia/Hong_Kong"
              format24Hour={false}
            />
            <ClockCard
              city="London"
              timezone="Europe/London"
              format24Hour={false}
            />
            <ClockCard
              city="New York"
              timezone="America/New_York"
              format24Hour={false}
            />
          </div> */}
          <div className="hidden xl:grid grid-cols-2 lg:grid-cols-4 gap-1 ">
            {durection.map((city: any) => (
              <ClockCard
                key={city.label}
                city={city.label}
                timezone={city.timezoneId}
                format24Hour={false}
                marketStatus={checkMarketStatus(city.label, durection)}
              />
            ))}
          </div>
          <div className="flex w-full overflow-y-auto xl:hidden">
            <Swiper
              spaceBetween={4}
              slidesPerView={1}
              className="slider-clock"
              style={{}}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  // slidesOffsetBefore: 20,
                },
                370: {
                  slidesPerView: 1.5,
                  // slidesOffsetBefore: 20,
                },
                420: {
                  slidesPerView: 2.2,
                  // slidesPerView: 2,
                  // slidesOffsetBefore: 20,
                },
                750: {
                  // slidesPerView: 3,
                  slidesPerView: 4,
                  // slidesOffsetBefore: 20,
                },
              }}
            >
              {durection.map((city: any) => (
                <SwiperSlide key={city.label}>
                  <ClockCard
                    city={city.label}
                    timezone={city.timezoneId}
                    format24Hour={false}
                    marketStatus={checkMarketStatus(city.label, durection)}
                  />
                </SwiperSlide>
              ))}
              {/* <SwiperSlide>
                <ClockCard
                  city="Tokyo"
                  timezone="Asia/Tokyo"
                  format24Hour={false}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ClockCard
                  city="Hong Kong"
                  timezone="Asia/Hong_Kong"
                  format24Hour={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ClockCard
                  city="London"
                  timezone="Europe/London"
                  format24Hour={false}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ClockCard
                  city="New York"
                  timezone="America/New_York"
                  format24Hour={true}
                />
              </SwiperSlide> */}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
