import React from "react";
import {useSeparateDecimal} from "@/hooks/separateDecimal";

interface IInfoBadge {
    backColor?: string,
    title: string,
    value: number,
    valueColor?: string,
    titleColor?: string,
    width?: string,
}

const InfoBadge = ({backColor, title, value, valueColor, titleColor, width}: IInfoBadge) => {
    const integerPart = useSeparateDecimal(value)?.integerPart;
    const decimalPart = useSeparateDecimal(value)?.decimalPart;

    return (
        <div
            className="flex flex-col items-start rounded-[8px] p-6 gap-[31px] w-full"
            style={{
                background: `${backColor}`,
                width: `${width ? width : "100"}%`
            }}
        >
            <span
                className="text-14"
                style={{color: `${titleColor}`}}
            >{title}</span>
            <div
                className="font-gaisyr flex items-end"
            >
                <span
                    className="text-32-t32-g"
                    style={{color: `${valueColor}`, lineHeight: "32px"}}
                >${value ? integerPart : "0"}</span>
                {
                    value ? <span
                            className="text-14-g"
                            style={{color: `${valueColor}`, marginBottom: "3px"}}
                        >{decimalPart}</span>
                        : <span
                            className="text-14-g"
                            style={{color: `${valueColor}`, marginBottom: "3px"}}
                        ></span>
                }
            </div>
        </div>
    );
};

export default InfoBadge;
