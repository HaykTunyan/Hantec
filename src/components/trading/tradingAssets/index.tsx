import React, { useEffect, useRef, useState } from "react";
import InfoChart from "@/components/trading/infoChart";
import TradeDistribution from "@/components/trading/infoChart/tradeDistribution";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IAsset } from "@/app/trading/trade-accounts/[slug]/page";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";

interface ITradingAssets {
  assets: IAsset[] | null;
}

const TradingAssets = ({ assets }: ITradingAssets) => {
  const { t } = useTranslation("trading");

  const filters = [
    {
      title: t("assets_all"),  
      name: "All",
      values: ["all"],
    },
    {
      title: t("assets_forex"),
      name: "Forex",
      values: ["FX"],
    },
    {
        title: t("assets_metal"),
      name: "Metal",
      values: ["LLG", "SIL"],
    },
    {
        title: t("assets_oil"),
      name: "Oil",
      values: ["OIL", "USOil", "UKOil (CFD)"],
    },
    {
    title: "Gas",
      name: "Gas",
      values: ["GAS", "GASUSD (CFD)"],
    },
    {
      title: "Stock",
      name: "Stock",
      values: ["US-STOCK"],
    },
    {
        title: t("assets_index"),
      name: "Index",
      values: ["INDEX", "Index (CFD)"],
    },
  ];

  const [currentAssets, setCurrentAssets] = useState<IAsset[]>(
    assets ? [...assets] : []
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [isMobileDrpDwnOpened, setIsMobileDrpDwnOpened] =
    useState<boolean>(false);

  const accountAssets: any = t("single_account.assets", {
    returnObjects: true,
  });

  useEffect(() => {
    if (assets) {
      setCurrentAssets(assets);
    }
  }, [assets]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    drag: false,
    slides: {
      perView: 1,
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const handleFilterAssets = (tabToSelect: any) => {
    if (!assets) return;

    if (tabToSelect.values.includes("All")) {
      setCurrentAssets([...assets]);
      setSelectedTab("All");
      setIsMobileDrpDwnOpened(false);
      return;
    }

    const filteredAssets = assets.filter((asset) =>
      tabToSelect.values.includes(asset.productGroup)
    );

    setCurrentAssets(filteredAssets);
    setSelectedTab(tabToSelect.name);
    setIsMobileDrpDwnOpened(false);
  };

  const availableFilters = assets
    ? filters.filter((filter) =>
        filter.values.some((value) =>
          assets.some((asset) => asset.productGroup === value)
        )
      )
    : [];

  const assetsRef = useRef(null);
  const assetsRefExclude = useRef(null);
  useOnClickOutside(assetsRef, setIsMobileDrpDwnOpened, assetsRefExclude);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center md:gap-3 md:px-6 gap-2 px-3">
        <span className="text-18-m16 text-default font-medium mobile:hidden">
          {accountAssets.my_assets}:
        </span>
        <span className="hidden text-18-m16 text-default font-medium mobile:block pr-2 border-r border-grey-extra-light">
          {t("my_assets")}
        </span>
        <div
          ref={assetsRefExclude}
          onClick={() => setIsMobileDrpDwnOpened(!isMobileDrpDwnOpened)}
          className={"hidden mobile:flex items-center gap-2 relative"}
        >
          <span className={"text-16-16"}>{selectedTab}</span>
          <svg
            className={`w-4 h-4 object-contain ${
              isMobileDrpDwnOpened ? "drpDwnOpened" : "drpDwnClosed"
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4925 9.00743V7.5H4.50732V9.00743L11.9999 16.5L19.4925 9.00743Z"
              fill="#2B2A28"
            />
          </svg>

          {isMobileDrpDwnOpened && (
            <div
              ref={assetsRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute flex flex-col gap-2 w-[160px] bg-white -left-2.5 top-8 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
            >
              <div
                onClick={() =>
                  handleFilterAssets({ name: "All", values: ["All"] })
                }
                className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${
                  selectedTab === "All" ? "bg-hover-sidebar" : ""
                }
                                    xl:hover:bg-hover-sidebar relative
                                    `}
              >
                <span>{accountAssets.all}</span>
                {selectedTab === "All" && (
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                      fill="#2B2A28"
                    />
                  </svg>
                )}
              </div>
              {availableFilters.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFilterAssets(item)}
                  className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${
                    selectedTab === item.name ? "bg-hover-sidebar" : ""
                  }
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                >
                  <span className="">{item.name}</span>
                  {selectedTab === item.name && (
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                        fill="#2B2A28"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 mobile:hidden">
          <span
            className={`text-18 font-medium pb-1 ${
              selectedTab === "All"
                ? "underline custom-underline-tab"
                : "text-grey-seccondary"
            }  cursor-pointer tabTitle`}
            onClick={() => handleFilterAssets({ name: "All", values: ["All"] })}
          >
            {accountAssets.all}
          </span>
          {availableFilters.map((filter) => (
            <span
              key={filter.name}
              className={`text-18 font-medium pb-1 ${
                selectedTab === filter.name
                  ? "underline custom-underline-tab"
                  : "text-grey-seccondary"
              } cursor-pointer tabTitle`}
              onClick={() => handleFilterAssets(filter)}
            >
              {filter.title}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden mobile:flex w-full px-2 ">
        <button
          className={`${
            currentSlide === 0 ? "btnPrim" : " btnSec"
          } w-full flex items-center justify-center `}
          onClick={() => instanceRef.current?.moveToIdx(0)}
        >
          {accountAssets.chart.buy} {accountAssets.chart.sell}
        </button>
        <button
          className={`${
            currentSlide === 1 ? "btnPrim" : "btnSec"
          } w-full flex items-center justify-center `}
          onClick={() => instanceRef.current?.moveToIdx(1)}
        >
          {accountAssets.trade_distribution}
        </button>
      </div>

      <div className="hidden mobile:block">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <InfoChart assets={currentAssets} />
          </div>
          <div className="keen-slider__slide number-slide2">
            <TradeDistribution
              assets={currentAssets.sort(
                (a, b) => a.openAmtTotalPercent - b.openAmtTotalPercent
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-1 mobile:hidden">
        <InfoChart assets={currentAssets} />
        <TradeDistribution
          assets={currentAssets.sort(
            (a, b) => a.openAmtTotalPercent - b.openAmtTotalPercent
          )}
        />
      </div>
    </div>
  );
};

export default TradingAssets;
