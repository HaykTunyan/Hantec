import React from "react";
import ColorPallet from "@/components/trading/infoChart/tradeDistribution/colorPallet";
import TradeDistributionRow from "@/components/trading/infoChart/tradeDistribution/tradeDistributionRow";
import {IAsset} from "@/app/trading/trade-accounts/[slug]/page";
import {roundToOneDecimal} from "@/hooks/roundToOneDecimel";
import {useTranslation} from "next-i18next";

interface ITradeDistribution {
    assets: IAsset[];
}

const colorPallets = [
    "#FAFEFF",
    "#E4F8FD",
    "#B5ECFB",
    "#81DFF8",
    "#66D8F7",
    "#22C6F2",
    "#0DB5E2",
    "#0CA2CA",
    "#1996B8",
    "#1D88A5",
    "#097B9A",
    "#086C87",
    "#095468",
    "#054354",
    "#033442",
];

const TradeDistribution = ({assets}: ITradeDistribution) => {
    const slicedColorPallets = colorPallets.slice(-assets.length);

    const {t} = useTranslation("trading");
    const accountAssets: any = t("single_account.assets", {returnObjects: true});

    return (
        <div className="w-full p-6 flex flex-col gap-[63px] tablet:gap-11 rounded-[8px] bg-main h-full">
            <span className="text-14 text-grey-seccondary">{accountAssets.trade_distributions}</span>
            <div className="flex items-start gap-8 tablet:gap-4">
                <div className="flex flex-col gap-[1px] max-w-[392px] w-full h-[284px]">
                    {
                        assets.map((asset, index) => {
                            return (
                                <ColorPallet
                                    key={index}
                                    percent={roundToOneDecimal(asset.openAmtTotalPercent)}
                                    backColor={slicedColorPallets[index]}
                                />
                            );
                        })
                    }
                </div>
                <div className="flex flex-col w-full">
                    {
                        assets.map((asset, index) => {
                                return (
                                    <TradeDistributionRow
                                        key={index}
                                        currency={asset.symbol}
                                        percent={roundToOneDecimal(asset.openAmtTotalPercent)}
                                        color={slicedColorPallets[index]}
                                    />
                                );
                            }
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TradeDistribution;
