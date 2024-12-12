"use client";

import React, { FC } from "react";
import ChartPercents from "@/components/trading/infoChart/chartPercents";
import ChartTitles from "@/components/trading/infoChart/chartTitles";

interface StackedBarChartProps {
  assetsChart: any[];
}

const SellChart: FC<StackedBarChartProps> = ({ assetsChart }) => {
  /**
   *  Sell  Chart Hooks.
   */

  return (
    <div className=" h-375 md:h-390 bg-sidebar p-6 flex flex-col gap-4 rounded-lg">
      <div className="flex items-center gap-1.5 mb-4 md:mb-10">
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 object-contain"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="4" fill="#365848" />
          </svg>
          <span className="text-14 text-grey-seccondary">Buy</span>
        </div>
        <span className="text-grey-seccondary">/</span>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 object-contain"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="4" fill="#FFB109" />
          </svg>
          <span className="text-14 text-grey-seccondary">Sell</span>
        </div>
      </div>
      <div className="flex gap-2.5 items-center">
        <div className="flex flex-col items-center gap-11 justify-between max-w-8 font-gaisyr">
          <span className="text-11 text-grey-seccondary relative bottom-1">
            100%
          </span>
          <span className="text-11 text-grey-seccondary relative bottom-1">
            75%
          </span>
          <span className="text-11 text-grey-seccondary">50%</span>
          <span className="text-11 text-grey-seccondary">25%</span>
          <span className="text-11 text-grey-seccondary">0%</span>
        </div>
        <div className="w-full flex flex-col gap-[56px] relative">
          <div className="flex items-center">
            <div className="w-full border-b border-dashed border-spacing-2 border-grey-tertiary"></div>
          </div>
          <div className="flex items-center">
            <div className="w-full border-b border-dashed border-spacing-2 border-grey-tertiary"></div>
          </div>
          <div className="flex items-center">
            <div className="w-full border-b border-dashed border-spacing-2 border-grey-tertiary"></div>
          </div>
          <div className="flex items-center">
            <div className="w-full border-b border-dashed border-spacing-2 border-grey-tertiary"></div>
          </div>
          <div className="flex items-center">
            <div className="w-full border-b border-dashed border-spacing-2 border-grey-tertiary"></div>
          </div>
          {/*  */}
          <div className="w-full h-full absolute left-0 top-0 flex justify-around overflow-x-scroll ">
            {assetsChart?.map(
              (item: { openAmtBuyPercent: string }, index: number) => (
                <ChartPercents buy={Number(item.openAmtBuyPercent)} key={index} />
              )
            )}
          </div>
        </div>
      </div>
      {/*  */}
      {assetsChart?.length ? (
        <div className="w-full flex self-end justify-around relative overflow-x-scroll min-w-[300px] pl-10 font-gaisyr">
          {assetsChart?.map(
            (
              item: { symbol: string; openAmtBuyPercent: string },
              index: number
            ) => (
              <ChartTitles
                title={item.symbol}
                value={Number(item.openAmtBuyPercent)}
                key={index}
              />
            )
          )}
        </div>
      ) : (
        <div className="w-full flex self-end justify-around bottom-3 relative min-w-[300px] pl-10 font-gaisyr">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="flex justify-center items-center w-16 fit-content text-default"
              key={index}
            >
              <span className="text-11">- / -</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellChart;
