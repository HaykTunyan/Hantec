import React from "react";

interface IDaysTab {
    tabs: string[],
    setSelectedMenuTab: (x: number) => void,
    selectedMenuTab: number,
    isCustomRangeSelected?: boolean,
    setSelectedTabs?: (tabs: string[]) => void,
    isDateRange: boolean;
    setIsDateRange: (x: boolean) => void;
}

const DaysTab = ({
                     tabs,
                     setSelectedMenuTab,
                     selectedMenuTab,
                     isCustomRangeSelected,
                     setSelectedTabs,
                     isDateRange,
                     setIsDateRange
                 }: IDaysTab) => {
    const handleResetRange = (e: any, idx: number) => {
        e.stopPropagation();

        if(selectedMenuTab === 7 && idx === 7) {
            return;
        }

        setIsDateRange(false);
        setSelectedMenuTab(idx);
        const newTabs = [...tabs];
        newTabs[newTabs.length - 1] = "Custom Range";

        if (setSelectedTabs) {
            setSelectedTabs(newTabs);
        }
    };

    const handleChooseRange = (e: any, idx: number) => {
        handleResetRange(e, idx);
    };

    const handleDeleteChoosenRange = (e: any) => {
        e.stopPropagation();
        setSelectedMenuTab(1);
        const newTabs = [...tabs];
        newTabs[newTabs.length - 1] = "Custom Range";

        if (setSelectedTabs) {
            setSelectedTabs(newTabs);
        }
    };

    return (
        <div className="flex flex-wrap items-start gap-1 tablet:hidden">
            {
                tabs.map((item, index) =>
                    <span
                        key={index}
                        onClick={(e) => handleChooseRange(e, index + 1)}
                        className={`${selectedMenuTab === index + 1 ? "btnPrim" : "btnSec"} btnTabMenu flex-0-0-auto cursor-pointer`}
                    >
                        {item}
                        {index === tabs.length - 1 && isCustomRangeSelected && (
                            <svg
                                onClick={(e) => handleResetRange(e, 1)}
                                className="w-4 h-4 cursor-pointer"
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M4 4L12 12" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                        )}
                        {
                            selectedMenuTab === 7 && index === 6 && isDateRange && <img
                                onClick={(e) => handleDeleteChoosenRange(e)}
                                src="/icons/new/close-3.svg"
                                alt=""
                            />
                        }
                    </span>
                )
            }
        </div>
    );
};

export default DaysTab;
