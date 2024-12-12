"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../../styles/charts.scss";

/**
 * @interface DataItem.
 */
interface DataItem {
  name: string;
  item: Array<"100%" | "75%" | "50%" | "25%" | "0">;
  uv: number;
  pv: number;
  amt: number;
}

interface InputData {
  symbol: string;
  productGroup: string;
  openAmtTotalPercent: number;
  openAmtBuyPercent: number;
  openAmtSellPercent: number;
}

interface OutputData {
  name: string;
  pv: number;
  uv: number;
}

/**
 * @interface StackedBarChartProps.
 */
interface StackedBarChartProps {
  stackData: DataItem[];
  assetsData: { data: InputData[] };
}

const BuyChart: React.FC<StackedBarChartProps> = ({
  stackData,
  assetsData,
}) => {
  /**
   *  Buy Chart Hooks.
   */

  const [chartInfo, setChartInfo] = useState<OutputData[]>([]);
  const domain = 100;

  useEffect(() => {
    const newChart = assetsData?.data;

    const transformData = (inputData: InputData[]): OutputData[] => {
      return inputData?.map((item) => ({
        name: item.symbol,
        pv: item.openAmtBuyPercent,
        uv: item.openAmtSellPercent,
      }));
    };

    const transformedData = transformData(newChart);
    setChartInfo(transformedData);
  }, [assetsData?.data]);

  const toPercent = (decimal: number) => `${decimal.toFixed(0)}%`;

  return (
    <>
      <div className="bay-chart bg-sidebar p-2 lg:p-6 rounded-lg h-375 md:h-390">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <span className="buy-icon mr-2"></span>
            <span className="text-grey-seccondary  text-sm font-normal">
              {" "}
              Buy{" "}
            </span>
          </div>
          <div className="text-grey-seccondary mx-2">/</div>
          <div className="flex flex-row items-center">
            <span className="sel-icon mr-2"></span>
            <span className="text-grey-seccondary  text-sm font-normal">
              {" "}
              Sell{" "}
            </span>
          </div>
        </div>
        <div className="pt-8" />
        <div className="w-full">
          <ResponsiveContainer width={330} height={292}>
            <BarChart
              data={chartInfo}
              width={330}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              barCategoryGap={20}
              barGap={20}
            >
              <CartesianGrid
                strokeDasharray="20"
                strokeDashoffset={140}
                horizontal
                vertical={false}
              />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, domain]} allowDataOverflow  
              tickFormatter={toPercent} 
              />
              <Tooltip />
              <Bar
                dataKey="pv"
                stackId="a"
                fill="#365848"
                barSize={8}
                radius={20}
                spacing={10}
              />
              <Bar
                radius={20}
                dataKey="spacing"
                values="0"
                offset={20}
                stackId="a"
                fill="transparent"
              />
              <Bar
                radius={20}
                dataKey="spacing"
                values="0"
                offset={20}
                stackId="a"
                fill="transparent"
              />
              <Bar
                radius={20}
                dataKey="uv"
                stackId="a"
                fill="#FFB109"
                barSize={8}
                spacing={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BuyChart;
