// ClockCard.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import clocks from "./clock";
import "@/styles/clock.scss";
import moment from "moment-timezone";
import { MarkData } from "@/json";
import { useTranslation } from "next-i18next";

interface ClockCardProps {
  city: string;
  timezone: string;
  format24Hour: boolean;
  marketStatus?: any;
}

const ClockCard: React.FC<ClockCardProps> = ({
  city,
  timezone,
  format24Hour,
  marketStatus
}) => {
  
  /**
   * ClockCard Component
   * @implements cuty , timezone and marketStatus
   */

  const { t } = useTranslation("dashboard");

  const canvasMekMainRef = useRef<HTMLParagraphElement>(null);
  const canvasMekRef = useRef<HTMLParagraphElement>(null);
  const rtRef = useRef<HTMLParagraphElement>(null);

  const [timeH, setTimeH] = useState<boolean>(false);
  const [ampm, setAmpm] = useState<string>("");

  const [markTime] = useState<any>(MarkData);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean | null>(null);

  useEffect(() => {
    clocks(
      canvasMekMainRef.current,
      canvasMekRef.current,
      rtRef.current,
      timezone,
      timeH
    );

    const updateTime = () => {
      const currentTime = moment.tz(timezone);
      const hours = currentTime.hours();
      setAmpm(hours >= 12 ? "PM" : "AM");
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  useLayoutEffect(() => {
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
  }, []);

  // @ts-ignore

  return (
    <div className="clock-card card py-2 px-6 bg-white rounded-lg h-56 w-full">
      <div className="flex flex-row items-center justify-between mt-2 text-sm text-gray-800">
        <p className="text-sm font-normal leading-3.5 text-default">{city}</p>
        <p className="text-sm font-normal leading-3.5 text-default"> {ampm} </p>
      </div>
      <div className="relative w-full h-[150px] px-8 py-4 mt-1 flex items-center justify-center">
        <div className="canvas_content">
          <canvas id="clockCanvas-1" ref={canvasMekMainRef as any}></canvas>
          <canvas
            id="clockCanvas-2"
            ref={canvasMekRef as any}
            width="100"
            height="100"
          ></canvas>
        </div>
      </div>

      <div className="divider-extra-dark" />
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm font-normal flex items-center">
          {isMarketOpen ? (
            <>
              <span className="close-icon"></span>
              <span className="text-grey-seccondary ml-1 text-xxs leading-3 ">
                {" "}
                {t("close_in")}
              </span>
            </>
          ) : (
            <>
              <span className="open-icon"></span>
              <span className="text-grey-seccondary ml-1 text-xxs leading-3 ">
                {" "}
                {t("open_in")}
              </span>
            </>
          )}
        </p>
        <p className="text-xs font-normal text-default">
          <span ref={rtRef} className="text-grey-seccondary text-xxs leading-3 hidden">
            --:--
          </span>

          <span  className="text-grey-seccondary text-xxs leading-3">
         {marketStatus}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ClockCard;
