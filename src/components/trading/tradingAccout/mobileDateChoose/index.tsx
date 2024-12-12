import React, {useState} from "react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";

interface IMobileDateChoose {
    setCustomRange: (x: string) => void;
    setChooseRange: (x: boolean) => void;
    selectToDate: (x: Date) => void;
    selectFromDate: (x: Date) => void;
    setIsDateRange: (x: boolean) => void;
    setSelectedMenuTab: (x: number) => void;
    toDate: Date;
    fromDate: Date;
}

const MobileDateChoose = ({
                              selectFromDate,
                              setIsDateRange,
                              setChooseRange,
                              selectToDate,
                              setSelectedMenuTab,
                              setCustomRange,
                              toDate,
                              fromDate
                          }: IMobileDateChoose) => {
    const [firstDate, setFirstDate] = useState<Date>(new Date());
    const [lastDate, setLastDate] = useState<Date>(new Date());
    const [isOpenFirst, setIsOpenFirst] = useState<boolean>(false);
    const [isOpenLast, setIsOpenLast] = useState<boolean>(false);

    const handleSearch = () => {
        selectFromDate(firstDate);
        selectToDate(lastDate);
    };

    const handleFirstDivClick = (e: any) => {
        e.stopPropagation();
        setIsOpenFirst(!isOpenFirst);
    };

    const handleLastDivClick = (e: any) => {
        e.stopPropagation();
        setIsOpenLast(!isOpenLast);
    };

    const propsConfigs = {
        dateNavBtnProps: {
            color: "#2B2A28",
            fontSize: "14px"
        },
        dayOfMonthBtnProps: {
            defaultBtnProps: {
                color: "#2B2A28",
                borderRadius: "4px",
                width: "40px",
                height: "37px",
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
                width: "40px",
                height: "37px",
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
                borderRadius: "4px",
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
            padding: "5px 5px 15px",
            color: "#2B2A28",
            borderBottom: "1px solid #E8E5E1",
            marginBottom: "20px",
        },
        dateHeadingProps: {
            fontWeight: "bold",
            padding: "10px",
            color: "#2B2A28",
            fontSize: "14px",
            lineHeight: "14px",
        },
    };

    const configs = {
        dayNames: ["M", "T", "W", "T", "F", "S", "S"],
        monthNames: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    };

    return (
        <div className={"hidden items-center gap-2 w-full px-4 tablet:flex"}>
            <div
                onClick={handleFirstDivClick}
                className={"flex items-center gap-2 w-full px-[14px] py-[12px] justify-between rounded-8 border border-grey-extra-light dateContainer bg-white"}>
                {
                    isOpenFirst &&
                        <SingleDatepicker
                            name="date-input"
                            date={firstDate}
                            onDateChange={setFirstDate}
                            configs={configs}
                            propsConfigs={propsConfigs}
                            defaultIsOpen={true}
                        />
                }
                { !isOpenFirst && <SingleDatepicker
                            name="date-input"
                            date={firstDate}
                            onDateChange={setFirstDate}
                            configs={configs}
                            propsConfigs={propsConfigs}
                        />
                }
                <svg
                    className={"w-5 h-5 object-contain"}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M15.25 4.75V6H16.75V4.75H19C19.6904 4.75 20.25 5.30964 20.25 6V9.25H3.75V6C3.75 5.30964 4.30964 4.75 5 4.75H7.25V6H8.75V4.75H15.25ZM3.75 10.75V20C3.75 20.6904 4.30964 21.25 5 21.25H19C19.6904 21.25 20.25 20.6904 20.25 20V10.75H3.75ZM5 3.25H7.25V2H8.75V3.25H15.25V2H16.75V3.25H19C20.5188 3.25 21.75 4.48122 21.75 6V20C21.75 21.5188 20.5188 22.75 19 22.75H5C3.48122 22.75 2.25 21.5188 2.25 20V6C2.25 4.48122 3.48122 3.25 5 3.25Z"
                          fill="#2B2A28"/>
                </svg>
            </div>
            <div
                onClick={handleLastDivClick}
                className={"flex items-center gap-2 w-full px-[14px] py-[12px] justify-between rounded-8 border border-grey-extra-light dateContainer bg-white"}>
                {
                    isOpenLast &&
                    <SingleDatepicker
                        name="date-input"
                        date={lastDate}
                        onDateChange={setLastDate}
                        configs={configs}
                        propsConfigs={propsConfigs}
                        defaultIsOpen={true}
                    />
                }
                { !isOpenLast && <SingleDatepicker
                    name="date-input"
                    date={lastDate}
                    onDateChange={setLastDate}
                    configs={configs}
                    propsConfigs={propsConfigs}
                />
                }
                <svg
                    className={"w-5 h-5 object-contain"}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M15.25 4.75V6H16.75V4.75H19C19.6904 4.75 20.25 5.30964 20.25 6V9.25H3.75V6C3.75 5.30964 4.30964 4.75 5 4.75H7.25V6H8.75V4.75H15.25ZM3.75 10.75V20C3.75 20.6904 4.30964 21.25 5 21.25H19C19.6904 21.25 20.25 20.6904 20.25 20V10.75H3.75ZM5 3.25H7.25V2H8.75V3.25H15.25V2H16.75V3.25H19C20.5188 3.25 21.75 4.48122 21.75 6V20C21.75 21.5188 20.5188 22.75 19 22.75H5C3.48122 22.75 2.25 21.5188 2.25 20V6C2.25 4.48122 3.48122 3.25 5 3.25Z"
                          fill="#2B2A28"/>
                </svg>
            </div>
            <button
                onClick={handleSearch}
                className={"btnPrim"}
            >
                <svg
                    className={"w-4 h-4 object-contain"}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M20.9999 21L16.6499 16.65" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default MobileDateChoose;
