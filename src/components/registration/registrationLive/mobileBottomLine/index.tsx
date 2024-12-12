import React from "react";

interface IMobileBottomLine {
    lineWidth: number;
    bottom?: string
}

const MobileBottomLine = ({lineWidth, bottom}: IMobileBottomLine) => {
    return (
        <div
            className={`hidden fixed bottom-[61px] h-0 tablet:h-1.5 tablet:block w-0 bg-default transition duration-300`}
            style={{width: `${lineWidth}%`, bottom: `${bottom}`}}
        ></div>
    );
};

export default MobileBottomLine;
