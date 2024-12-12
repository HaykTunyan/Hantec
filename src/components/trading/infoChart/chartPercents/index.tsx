import React, {useState} from "react";

interface IChartPercents {
    buy: number,
}

const ChartPercents = ({buy}: IChartPercents) => {
    const [isBuyHovered, setIsBuyHovered] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center w-2 gap-0.5 h-full transition duration-300">
            <div
                className="bg-chart-orange w-2 rounded transition duration-[3000ms]"
                style={{height: `calc(100% - ${buy}%)`}}
            ></div>
            <div
                onMouseEnter={() => setIsBuyHovered(true)}
                onMouseLeave={() => setIsBuyHovered(false)}
                className={`
                bg-green-extra-dark rounded transition duration-300 cursor-pointer flex items-end justify-center
                pb-2
                `}
                style={{
                    height: `${buy}%`,
                    width: isBuyHovered ? "40px" : "8px",
                    transitionProperty: "width",
                }}
            >
                <span
                    className={`
                    text-chart text-chart-percent
                    ${isBuyHovered ? "opacity-100 transition-opacity duration-500" : "opacity-0"}
                    `}
                >
                    {buy}<span className='text-percent text-chart-percent'>%</span>
                </span>
            </div>
        </div>
    );
};

export default ChartPercents;
