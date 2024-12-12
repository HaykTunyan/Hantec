import React from "react";

interface IAdditionalInfoRow {
    index: number,
    instruction: string;
    length: number,
    button?: boolean
}

const AdditionalInfoRow = ({index, instruction, length, button}: IAdditionalInfoRow) => {
    return (
        <div className={`
        py-4 flex items-start gap-3
        ${index === length - 1 && !button ? "border-none" : "border-b border-grey-extra-light"}
        `}>
            <span className="text-14 text-grey-seccondary tracking-wider">0{index + 1}</span>
            <span className="text-14_16 font-medium text-grey-seccondary tracking-wider -mt-[1px]">{instruction}</span>
        </div>
    );
};

export default AdditionalInfoRow;
