import React, {useEffect, useRef, useState} from "react";
import {RangeDatepicker} from "chakra-dayzed-datepicker";
import {formatDates} from "@/hooks/reformatDate";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

const propsConfigs = {
    dateNavBtnProps: {
        color: "#2B2A28",
    },
    dayOfMonthBtnProps: {
        defaultBtnProps: {
            color: "#2B2A28",
            borderRadius: "4px",
            width: "48px",
            height: "45px",
            fontFamily: "Aeonik-fonts",
            fontSize: "14px",
            lineHeight: "14px"
        },
        isInRangeBtnProps: {
            background: "rgba(54, 88, 72, .2)",
        },
        selectedBtnProps: {
            background: "#365848",
            color: "#FFFFFF",
            borderRadius: "4px",
            width: "48px",
            height: "45px"
        },
        todayBtnProps: {
            background: "#E8E7E2",
            color: "#2B2A28"
        }
    },
    inputProps: {
        size: "sm"
    },
    popoverCompProps: {
        popoverContentProps: {
            background: "#FFFFFF",
        },
    },
    calendarPanelProps: {
        wrapperProps: {
            borderColor: "green",
        },
        contentProps: {
            border: "1px solid #E8E5E1",
            borderRadius: "4px",
        },
        headerProps: {
            padding: "4px",
        },
        dividerProps: {
            display: "none",
        },
    },
    weekdayLabelProps: {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "14px",
        padding: "10px 10px 25px",
        color: "#2B2A28",
        borderBottom: "1px solid #E8E5E1",
        marginBottom: "20px",
    },
    dateHeadingProps: {
        fontWeight: "bold",
        padding: "10px",
        color: "#2B2A28",
        fontSize: "18px",
        lineHeight: "22px",
    },
};

const configs = {
    dayNames: ["M", "T", "W", "T", "F", "S", "S"],
    monthNames: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
};

interface IRangeChooseModal {
    setCustomRange: (x: string) => void;
    setChooseRange: (x: boolean) => void;
    selectToDate: (x: Date) => void;
    selectFromDate: (x: Date) => void;
    setIsDateRange: (x: boolean) => void;
    setSelectedMenuTab: (x: number) => void;
}

const RangeChooseModal = ({
                              setCustomRange,
                              setChooseRange,
                              selectFromDate,
                              selectToDate,
                              setIsDateRange,
                              setSelectedMenuTab
                          }: IRangeChooseModal) => {
    const {t} = useTranslation("trading");
    const dayInfo: any = t("single_account.positions.day_tabs", {returnObjects: true});
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const calendarRef = useRef<any>(null);
    const btnSRef = useRef<any>(null);

    const calculateDays = (dateArray: Date[]) => {
        if (dateArray.length < 2) return 0; // Make sure there are at least two dates

        const diffTime = Math.abs(dateArray[1].getTime() - dateArray[0].getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        return diffDays + 1; // Including the start day
    };

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (
                (calendarRef.current && !calendarRef.current.contains(e.target as Node)) ||
                (btnSRef.current && btnSRef.current.contains(e.target as Node))
            ) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        };

        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleSaveRange = () => {
        selectFromDate(selectedDates[0]);
        selectToDate(selectedDates[1]);
        setCustomRange(formatDates(selectedDates));
        setChooseRange(false);
        setIsDateRange(true);
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    };

    const handleCancelRangeChoose = () => {
        setSelectedMenuTab(1);
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    };

    const modalRef = useRef(null);
    useOnClickOutside(modalRef, setChooseRange);

    const disabledDoneBtn = !selectedDates[0] || !selectedDates[1];

    const handleCloseDateRangeChooseModal = () => {
        setSelectedMenuTab(1);
        setChooseRange(false);
    };

    return (
        <div
            onClick={handleCloseDateRangeChooseModal}
            className="fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                className="max-w-[793px] h-[620px] w-full py-8 px-6 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col justify-between gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 chakraHideBlock">
                    <div className="flex flex-col gap-4 items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M15.25 4.75V6H16.75V4.75H19C19.6904 4.75 20.25 5.30964 20.25 6V9.25H3.75V6C3.75 5.30964 4.30964 4.75 5 4.75H7.25V6H8.75V4.75H15.25ZM3.75 10.75V20C3.75 20.6904 4.30964 21.25 5 21.25H19C19.6904 21.25 20.25 20.6904 20.25 20V10.75H3.75ZM5 3.25H7.25V2H8.75V3.25H15.25V2H16.75V3.25H19C20.5188 3.25 21.75 4.48122 21.75 6V20C21.75 21.5188 20.5188 22.75 19 22.75H5C3.48122 22.75 2.25 21.5188 2.25 20V6C2.25 4.48122 3.48122 3.25 5 3.25Z"
                                  fill="#2B2A28"/>
                        </svg>
                        <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                            <span className="text-20 font-medium">{dayInfo.select_date_range}</span>
                        </div>
                    </div>
                    <div ref={calendarRef} className="mobile:flex-col">
                        <RangeDatepicker
                            selectedDates={selectedDates}
                            onDateChange={setSelectedDates}
                            defaultIsOpen={true}
                            propsConfigs={propsConfigs}
                            closeOnSelect={false}
                            disabled={true}
                            configs={configs}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-14_16 text-grey-seccondary">{calculateDays(selectedDates)} {dayInfo.days_count}</span>
                    <div
                        ref={btnSRef}
                        className="flex gap-2"
                    >
                        <button
                            className={"btnSec"}
                            onClick={handleCancelRangeChoose}
                        >{dayInfo.buttons.cancel}
                        </button>
                        <button
                            disabled={disabledDoneBtn}
                            className={"btnPrim"}
                            onClick={handleSaveRange}
                        >{dayInfo.buttons.done}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeChooseModal;
