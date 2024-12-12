import React from "react";

interface IChartTitle {
    title: string,
    value: number
}

const ChartTitles = ({title, value}: IChartTitle) => {
    return (
        <div className='flex flex-col items-center w-[64px] flex-0-0-auto-all'>
            <span className='text-11'>{title}</span>
            <span className='text-11 font-gaisyr'>{value}</span>
        </div>
    );
};

export default ChartTitles;
