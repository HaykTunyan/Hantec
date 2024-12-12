import React from "react";

interface IColorPallet {
    percent: number,
    backColor: string
}

const ColorPallet = ({percent, backColor}: IColorPallet) => {
    return (
        <div
            className='w-full colorPallet'
            style={{height: `${percent}%`, background: `${backColor}`}}
        >
            <span className='text-11-percent'>{percent}%</span>
        </div>
    );
};

export default ColorPallet;
