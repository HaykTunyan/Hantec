import React, {useState} from "react";

interface IDaysTabMobile {
    tabs: string[],
    setSelectedMenuTab: (x: number) => void,
    selectedMenuTab: number,
    isCustomRangeSelected?: boolean,
    setSelectedTabs?: (tabs: string[]) => void,
    isDateRange?: boolean;
    setIsDateRange?: (x: boolean) => void;
}

const DaysTabMobile = ({
                           tabs,
                           selectedMenuTab,
                           setSelectedMenuTab,
                           setIsDateRange,
                           isDateRange,
                           setSelectedTabs,
                           isCustomRangeSelected
                       }: IDaysTabMobile) => {
    const [isDropDownOpened, setIsDropDownOpened] = useState(false);

    const handleResetRange = (e: any, idx: number) => {
        e.stopPropagation();
        setIsDropDownOpened(false);

        if (selectedMenuTab === 7 && idx === 7) {
            return;
        }

        if (setIsDateRange) {
            setIsDateRange(false);
        }

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

    return (
        <div
            className="hidden tablet:flex items-center gap-2 cursor-pointer relative"
            onClick={() => setIsDropDownOpened(!isDropDownOpened)}
        >
            <span className="text-18-m16 font-medium">{tabs[selectedMenuTab]}</span>
            <svg
                className={`w-4 h-4 object-contain ${isDropDownOpened ? "drpDwnOpened" : "drpDwnClosed"}`}
                width="16" height="17" viewBox="0 0 16 17" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12.995 6.50496V5.5H3.00488V6.50496L7.99993 11.5L12.995 6.50496Z"
                      fill="#2B2A28"/>
            </svg>
            {
                isDropDownOpened && <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute flex flex-col gap-2 w-[160px] bg-white -left-2 top-8 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                >
                    {
                        tabs.map((item, index) =>
                            <div
                                key={index}
                                onClick={(e) => handleChooseRange(e, index + 1)}
                                className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${selectedMenuTab === index ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                            >
                                <span className="text-16">{item}</span>
                                {
                                    selectedMenuTab === index && <svg
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                                              fill="#2B2A28"/>
                                    </svg>
                                }
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default DaysTabMobile;
