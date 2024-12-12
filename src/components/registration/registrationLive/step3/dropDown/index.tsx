import React, {useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface IDrpDwn {
    data: any;
    handleSelectItem: (x: any) => void;
    selectedValue: string;
    label: string;
}

const DrpDwn = ({data, handleSelectItem, selectedValue, label}: IDrpDwn) => {
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);

    const drpDwnRef = useRef(null);
    const excludeRef = useRef(null);
    useOnClickOutside(drpDwnRef, setIsDropDownOpened, excludeRef);

    const handleSelectValue = (value: string) => {
        handleSelectItem(value);
        setIsDropDownOpened(false);
    };

    return (
        <div className="flex flex-col gap-1">
            <span className="text-14 text-default tracking-wider">{label}</span>
            <div
                ref={excludeRef}
                className={`w-full py-[15px] px-3.5 border flex items-center justify-between ${isDropDownOpened ? "border-default" : "border-grey-extra"} rounded text-16 leading-4 bg-white relative xl:hover:border-default
                        cursor-pointer`}
                onClick={() => setIsDropDownOpened(!isDropDownOpened)}
            >
                <span className="text-16-16">{selectedValue}</span>
                <svg
                    className={`w-5 h-5 object-contain ${isDropDownOpened ? "drpDwnOpened" : "drpDwnClosed"}`}

                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M20 9.06066L12.2198 16.8409L4.43942 9.06066L5.50008 8L12.2197 14.7196L18.9393 8L20 9.06066Z"
                          fill="#2B2A28"/>
                </svg>
                {
                    isDropDownOpened && <div
                        ref={drpDwnRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute flex flex-col gap-2 w-[362px] mobile:w-full bg-white -left-[1px] top-14 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                    >
                        {
                            data.map((item: any, index: number) =>
                                <div
                                    key={index}
                                    onClick={(e) => handleSelectValue(item)}
                                    className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${selectedValue === item ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                >
                                    <span className="text-16-16">{item}</span>
                                    {
                                        selectedValue === item && <svg
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
        </div>
    );
};

export default DrpDwn;
