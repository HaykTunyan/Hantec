"use client";

import React, { FC, useEffect, useState } from "react";
import { useDemo } from "@/context/DemoContext";

interface StackedBarChartProps {
  assetsChart: any;
}

type SizeItem = {
  size: number;
  // Add other properties if they exist
};

const TradingChart: FC<StackedBarChartProps> = ({ assetsChart }) => {
  /**
   *  Trading Chart Hooks.
   */

  const showTheSize = assetsChart;
  const minmalSize = 10;
  const [hightSize, setHightSize] = useState(null);
  const { demo } = useDemo();

  const colors = [
    "chart-blue-150",
    "chart-blue-200",
    "chart-blue-300",
    "chart-blue-400",
    "chart-blue-500",
    "chart-blue-600",
    "chart-blue-650",
    "chart-blue-700",
    "chart-blue-750",
    "chart-blue-800",
    "chart-blue-900",   
  ];

  const iconsColor = [
    "chart-icon-900",
    "chart-icon-800",
    "chart-icon-750",
    "chart-icon-700",
    "chart-icon-650",
    "chart-icon-600",
    "chart-icon-500",
    "chart-icon-400",
    "chart-icon-300",
    "chart-icon-200",
    "chart-icon-150",
  ];

  useEffect(() => {
    if (assetsChart?.length) {
      // @ts-ignore
      const tradingSize = showTheSize.map((item) => {
        return { size: item.openAmtTotalPercent };
      });
      if(demo) {
        setHightSize(null);
      } else {
        setHightSize(tradingSize);
      }
    }
  }, [assetsChart, demo ]);

  // @ts-ignore
  const sortedSizes = hightSize?.length && hightSize?.sort((a, b) => a.size - b.size);

  return (
    <div className="bg-sidebar p-2 lg:p-6 rounded-lg h-375 md:h-390 ">
      <div className="flex flex-row">
        <div className="flex flex-row items-center">
          <p className="text-grey-seccondary text-sm font-normal">
            {" "}
            Trade distributions{" "}
          </p>
        </div>
      </div>
      <div className="pt-9 xl:pt-10" />
      <div className="flex flex-row gap-4">
        {/* Chart py-0.75 px-1.25 */}
        <div className="w-3/5 ">
          {sortedSizes?.length ? (
            <div className="h-[284px]">
              {sortedSizes?.length &&
                sortedSizes.map((item: SizeItem, index: number) => (
                  <div
                    key={index}
                    className={`${colors[index % colors.length]} flex px-1.5`}
                    style={{ height: `${item.size}%` }}
                  >
                    <span className="text-white font-light text-xxs">
                      {/*  */}
                      {item?.size > minmalSize ? item.size : ""}
                      {item?.size > minmalSize ? "%" : ""}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-[284px] relative">
              <div className="absolute bottom-0 w-full bg-grey-tertiary h-[10px] rounded-t-sm">
                <span className="text-xxs leading-3 tracking-widest text-white text-opacity-80 relative bottom-2">
                  -%
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Chart Info */}
        <div className="w-2/5">
          {sortedSizes?.length ? (
            <div className="flex flex-col">
              {showTheSize?.length &&
                showTheSize.map((item: any, index: number) => (
                  <div
                    className="border-b border-grey-extra flex flex-row justify-between pb-1"
                    key={index}
                  >
                    <div className="flex flex-row items-center">
                      <div
                        className={`icon ${
                          iconsColor[index % iconsColor.length]
                        }`}
                      />
                      <span className="text-default text-sm font-medium ml-1">
                        {item?.openAmtTotalPercent}
                        {"%"}{" "}
                      </span>
                    </div>

                    {item.productGroup === "FX" ? (
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row">
                          <img src="icons/apple.svg" alt="Apple" />
                          <span className="text-xs font-normal text-default">
                            {" "}
                            NKE{" "}
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="text-xs font-normal text-default">
                            {" "}
                            {"FX"}{" "}
                          </span>
                        </div>
                      </div>
                    ) : item.productGroup === "LLG" ? (
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row">
                          <img src="icons/apple.svg" alt="Apple" />
                          <span className="text-xs font-normal text-default">
                            {" "}
                            AAPL
                          </span>
                        </div>
                        <div className="mx-1 ">/</div>
                        <div className="flex flex-row">
                          <img src="icons/country/chaina.svg" alt="Chaina" />
                          <span className="text-xs font-normal text-default">
                            {" "}
                            {"LLG"}
                          </span>
                        </div>
                      </div>
                    ) : item.productGroup === "SIL" ? (
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row">
                          
                          <span className="text-xs font-normal text-default">
                            {" "}
                            {"Silver"}{" "}
                          </span>
                        </div>
                      </div>
                    ) : item.productGroup === "OIL" ? (
                      <div className="flex flex-row items-center ">
                        <div className="flex flex-row">
                            <img src="icons/country/usa.svg" alt="USA" />
                            <span className="text-xs font-normal text-default"> USA </span>
                        </div>
                        <div className="mx-1 ">
                            /
                        </div>
                        <div className="flex flex-row">
                            <img src="icons/country/chaina.svg" alt="Chaina" />
                            <span className="text-xs font-normal text-default "> {"OIL"} </span>
                        </div>
                    </div>
                    )  :  item.productGroup === "GAS" ? (
                      <div className="flex flex-row items-center ">
                        <div className="flex flex-row">
                         
                            <span className="text-xs font-normal text-default "> {"GASUSD (CFD)"} </span>
                        </div>
                    </div>
                    ): item.productGroup === "US"  ? (
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row">
                        <img src="icons/country/usa.svg" alt="USA" />
                          <span className="text-xs font-normal text-default">
                            {" "}
                            USA Stock
                          </span>
                        </div>
                        <div className="mx-1 ">/</div>
                        <div className="flex flex-row">
                          <img src="icons/country/chaina.svg" alt="Chaina" />
                          <span className="text-xs font-normal text-default">
                            {" "}
                            {"CFD  Stock"}
                          </span>
                        </div>
                      </div>
                    ) : item.productGroup === "INDEX" ? (
                      <div className="flex flex-row items-center">
                      <div className="flex flex-row">
                        <img src="icons/metal.svg" alt="Metal" />
                        <span className="text-xs font-normal text-default">
                          {" "}
                          {"INDEX"}{" "}
                        </span>
                      </div>
                    </div>
                    )   : (
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row">
                          <span className="text-xs font-normal text-default">
                            {" "}
                            {item.symbol}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="border-b border-grey-extra flex flex-row justify-between items-center pb-1 px-1">
                <div className="flex flex-row items-center gap-1">
                  <span className="grey-icon"></span>
                  <span className="text-default text-xs font-normal">-</span>
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-row">
                    <span className="text-xs font-normal text-default">-</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
