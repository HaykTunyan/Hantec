import React from "react";

interface IInfoBlock {
    icon: string,
    title: string,
    description: string,
}

const InfoBlock = ({icon, title, description}: IInfoBlock) => {
    return (
        <div className="flex items-start py-6 gap-4 border-b border-info-badge">
            <img src={`/images/downloadCenter/${icon}.svg`} alt=""/>
            <div className="flex flex-col gap-1">
                <span className="text-16 font-medium tracking-normal">{title}</span>
                <span className="text-14_16 text-grey-seccondary tracking-wider">{description}</span>
            </div>
        </div>
    );
};

export default InfoBlock;
