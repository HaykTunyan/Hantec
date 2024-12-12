import React from "react";

interface IStepComp {
    title: string;
    description: string;
    index: number;
    removeLastBorder?: boolean,
    lastIndex?: number
}

const Step = ({title, description, index, removeLastBorder, lastIndex}: IStepComp) => {
    return (
        <div 
            className={`
            w-full py-6 flex items-start gap-7 justify-between 
            ${removeLastBorder && lastIndex === index ? "" : "border-b border-grey-extra-light"}
            `}
        >
            <span className="text-24-g text-default pt-1.5">0{index + 1}</span>
            <div className="flex flex-col gap-1.5">
                <span className="text-24 font-medium text-default">{title}</span>
                <span className="text-16 text-grey-seccondary">{description}</span>
            </div>
        </div>
    );
};

export default Step;
