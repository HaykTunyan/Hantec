import React, {useRef} from "react";
import ChartPercents from "@/components/trading/infoChart/chartPercents";
import ChartTitles from "@/components/trading/infoChart/chartTitles";
import {IAsset} from "@/app/trading/trade-accounts/[slug]/page";
import {roundToOneDecimal} from "@/hooks/roundToOneDecimel";
import {useTranslation} from "next-i18next";

interface IInfoChart {
    assets: IAsset[];
}

const InfoChart = ({assets}: IInfoChart) => {
    const topDivRef = useRef<HTMLDivElement>(null);
    const bottomDivRef = useRef<HTMLDivElement>(null);

    const {t} = useTranslation("trading");
    const charts: any = t("single_account.assets.chart", {returnObjects: true});

    const handleScroll = (source: "top" | "bottom") => {
        if (source === "top" && bottomDivRef.current && topDivRef.current) {
            bottomDivRef.current.scrollLeft = topDivRef.current.scrollLeft;
        }
        if (source === "bottom" && topDivRef.current && bottomDivRef.current) {
            topDivRef.current.scrollLeft = bottomDivRef.current.scrollLeft;
        }
    };

    return (
        <div className="w-[497px] mobile:w-full p-6 tablet:pr-0 flex flex-col gap-5 rounded-[8px] bg-main">
            <div className="flex items-center gap-1.5 mb-10 tablet:mb-[21px]">
                <div className="flex items-center gap-1">
                    <svg
                        className="w-4 h-4 object-contain"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="4" fill="#365848"/>
                    </svg>
                    <span className="text-14 text-grey-seccondary font-aeonik leading-3.5">{charts.buy}</span>
                </div>
                <svg
                    className="mt-1 w-1.5 h-4 object-contain"
                    width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.616 15.2L5.304 0.799999H6.552L1.864 15.2H0.616Z" fill="#686765"/>
                </svg>
                <div className="flex items-center gap-1">
                    <svg
                        className="w-4 h-4 object-contain"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="4" fill="#FFB109"/>
                    </svg>
                    <span className="text-14 text-grey-seccondary font-aeonik leading-3.5 ">{charts.sell}</span>
                </div>
            </div>
            <div className="flex tablet:w-full gap-2.5 items-center">
                <div className="flex flex-col tablet:flex-1 items-center gap-11 justify-between w-full">
                    <span className="text-11 text-grey-seccondary">100%</span>
                    <span className="text-11 text-grey-seccondary">75%</span>
                    <span className="text-11 text-grey-seccondary">50%</span>
                    <span className="text-11 text-grey-seccondary">25%</span>
                    <span className="text-11 text-grey-seccondary">0%</span>
                </div>
                <div className="w-[410px] tablet:w-full flex flex-col gap-[56px] relative">
                    <div className="flex items-center">
                        <div className="w-[410px] tablet:w-full border-b border-dashed border-grey-tertiary"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[410px] tablet:w-full border-b border-dashed border-grey-tertiary"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[410px] tablet:w-full border-b border-dashed border-grey-tertiary"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[410px] tablet:w-full border-b border-dashed border-grey-tertiary"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[410px] tablet:w-full border-b border-dashed border-grey-tertiary"></div>
                    </div>
                    <div
                        onScroll={() => handleScroll("top")}
                        ref={topDivRef}
                        className="w-full h-full absolute pl-8 left-0 top-0 flex gap-[76px] overflow-x-scroll">
                        {
                            assets.map((asset: IAsset, index) =>
                                <ChartPercents key={index} buy={roundToOneDecimal(asset.openAmtBuyPercent)}/>
                            )
                        }
                    </div>
                </div>
            </div>
            <div
                onScroll={() => handleScroll("bottom")}
                ref={bottomDivRef}
                className="w-[410px] tablet:w-full tablet:pl-8 flex self-end gap-5 relative overflow-x-scroll">
                {
                    assets.map((asset: IAsset, index) =>
                        <ChartTitles key={index} title={asset.symbol}
                                     value={roundToOneDecimal(asset.openAmtTotalPercent)}/>
                    )
                }
            </div>
        </div>
    );
};

export default InfoChart;
