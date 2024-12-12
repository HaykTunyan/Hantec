"use client";

import React, {useEffect, useRef, useState} from "react";
import Button from "@/components/button";
import TradingAccountInfo from "../tradingperformance";
import TradingAssets from "@/components/trading/tradingAssets";
import {useRouter} from "next/navigation";
import PositionsTable from "@/components/trading/positionTable";
import DeleteModal from "@/components/profile/profileInfo/delete/deleteModal";
import PasswordChangeModal from "@/components/trading/tradingAccout/passwordChangeModal";
import RecoveryModal from "@/components/trading/tradingAccout/recoveryModal";
import Pagination from "@/components/trading/pagination";
import DaysTab from "@/components/trading/tradingAccout/daysTab";
import DaysTabMobile from "@/components/trading/tradingAccout/daysTabMobile";
import RangeChooseModal from "@/components/trading/tradingAccout/rangeChooseModal";
import {IAsset, IOpenedPositions, ITradingAccount} from "@/app/trading/trade-accounts/[slug]/page";
import {getOpenedPositions} from "@/api/trading/getOpenedPositions";
import {getCurrentTime} from "@/hooks/getCurrentTime";
import {getUserTradingAccount} from "@/api/profile/getUserTradingAccount";
import {getClosedPositions} from "@/api/trading/getClosedPositions";
import {formatTimestampDateOnly} from "@/hooks/formatTimestampDateOnly";
import {getUserInfo} from "@/api/profile/getUserInfo";
import {downloadClosedPositions} from "@/api/trading/downloadClosedPositions";
import styles from "./tradingAccount.module.scss";
import ReactPaginate from "react-paginate";
import MobileDateChoose from "@/components/trading/tradingAccout/mobileDateChoose";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import LoadingScreen from "@/components/loadingScreen";
import {useTranslation} from "next-i18next";
import PositionsTableOpen from "@/components/trading/positionTableOpen";
import MobileOpenPositions from "@/components/trading/mobileOpenPositions";
import MobileAccountsListClosed from "../mobileClosedPositions";

interface ITradingAccountComp {
    accountNumber: string;
    platformId: string;
    accounts: string[];
    tradingAccount: ITradingAccount;
    assets: IAsset[];
    tradingAccountId: number;
}

const tabsForRanges = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "Custom Range"];

export const ArrowRight = () => {
    return (
        <Button
            className={`btnSec btnArrow`}
            icon={"arrowRight"}
        />
    );
};

export const ArrowLeft = () => {
    return (
        <Button
            className={`btnSec btnArrow`}
            icon={"arrowLeft"}
        />
    );
};

const TradingAccountComp = ({
                                accountNumber,
                                platformId,
                                accounts,
                                tradingAccount,
                                assets,
                                tradingAccountId
                            }: ITradingAccountComp) => {
    const [email, setEmail] = useState<string>("");

    const overviewTab = 1;
    const openTab = 2;
    const closedTab = 3;
    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [toDate, setToDate] = useState<Date>(new Date());
    const router = useRouter();
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<number>(overviewTab);
    const [selectedMenuTab, setSelectedMenuTab] = useState<number>(1);
    const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
    const [passwordChangeModalOpened, setPasswordChangeModalOpened] = useState<boolean>(false);
    const [recoveryModalOpened, setRecoveryModalOpened] = useState<boolean>(false);
    const [chooseRange, setChooseRange] = useState<boolean>(false);
    const [chooseRangeMobile, setChooseRangeMobile] = useState(false);
    const [tabs, setSelectedTabs] = useState<string[]>(tabsForRanges);
    const [customRange, setCustomRange] = useState<string>("Custom Range");
    const offsetStep = 10;
    const [openCount, setOpenCount] = useState<number>(0);
    const [closedCount, setClosedCount] = useState<number>(0);
    const [currentOpenPositions, setCurrentOpenPositions] = useState<IOpenedPositions[]>([]);
    const [currentClosedPositions, setCurrentClosedPositions] = useState<IOpenedPositions[]>([]);
    const [currentOpenPage, setCurrentOpenPage] = useState<number>(1);

    const [lastOpenDate, setLastOpenDate] = useState<string>("");
    const [lastClosedDate, setLastClosedDate] = useState<string>("");
    const [lastOverviewDate, setLastOverviewDate] = useState<string>("");

    const [currentTradingAccount, setCurrentTradingAccount] = useState<ITradingAccount>({...tradingAccount});
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const mobileMaxSize = 1279;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const {t} = useTranslation("trading");
    const singleAccount: any = t("single_account", {returnObjects: true});

    useEffect(() => {
        if (typeof window !== undefined) {
            setIsMobile(window.innerWidth <= mobileMaxSize);
        }
    }, []);

    const handleRefreshOverviewData = () => {
        setIsProcessing(true);

        getUserTradingAccount(accountNumber, Number(platformId))
            .then(res => {
                if (res) {
                    setCurrentTradingAccount({...res});
                    const currentDate = getCurrentTime();
                    setLastOverviewDate(currentDate);
                }
                setIsProcessing(false);
            });
    };

    useEffect(() => {
        setSelectedTabs(prevTabs => {
            const newTabs = [...prevTabs];
            newTabs[newTabs.length - 1] = customRange;
            return newTabs;
        });
    }, [customRange]);

    const loadOpenData = (offset: number) => {
        setIsProcessing(true);

        getOpenedPositions(accountNumber, Number(platformId), offset, offsetStep)
            .then(res => {
                if (res) {
                    setCurrentOpenPositions([...res.openedPositions]);
                    setOpenCount(res.count);
                    const currentDate = getCurrentTime();
                    setLastOpenDate(currentDate);
                }
                setIsProcessing(false);
            });
    };

    const loadClosedData = (offset: number) => {
        setIsProcessing(true);

        const currentToDate = toDate ? toDate : new Date();
        getClosedPositions(accountNumber, Number(platformId), offset, offsetStep, formatTimestampDateOnly(fromDate), formatTimestampDateOnly(currentToDate))
            .then(res => {
                if (res) {
                    setCurrentClosedPositions([...res.closedPositions]);
                    setClosedCount(res.count);
                    const currentDate = getCurrentTime();
                    setLastClosedDate(currentDate);
                }
                setIsProcessing(false);
            });
    };

    const handleLoadPage = (event: any) => {
        const page = event.selected + 1;
        const pageOffset = page * offsetStep;
        loadClosedData(pageOffset);
        setCurrentPage(page);

        window.scrollTo({
            top: 0,
        });
    };

    useEffect(() => {
        loadClosedData(1);
    }, [fromDate, toDate]);

    useEffect(() => {
        loadOpenData(1);
        loadClosedData(1);
        const currentDate = getCurrentTime();
        setLastOverviewDate(currentDate);
    }, []);

    useEffect(() => {
        const compare = selectedMenuTab - 1;
        if (compare >= 0 && compare < tabs.length && tabs[compare] === "Custom Range") {
            if (isMobile) {
                setChooseRangeMobile(true);
            } else {
                setChooseRange(true);
                document.querySelector("body")?.classList.add("bodyOverflowHidden");
            }
            return;
        }

        setChooseRange(false);
        setChooseRangeMobile(false);

        const today = new Date();
        let newFromDate: Date = today;
        let newToDate: Date = today;

        switch (selectedMenuTab) {
            case 1: // Today
                newFromDate = today;
                newToDate = today;
                break;
            case 2: // Yesterday
                newFromDate = new Date(today.setDate(today.getDate() - 1));
                newToDate = newFromDate;
                break;
            case 3: // Last 7 Days
                newFromDate = new Date(today.setDate(today.getDate() - 7));
                newToDate = new Date();
                break;
            case 4: // Last 30 Days
                newFromDate = new Date(today.setDate(today.getDate() - 30));
                newToDate = new Date();
                break;
            case 5: // This Month
                newFromDate = new Date(today.getFullYear(), today.getMonth(), 1);
                newToDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 6: // Last Month
                newFromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                newToDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            default:
                break;
        }

        setFromDate(newFromDate);
        setToDate(newToDate);
    }, [selectedMenuTab]);

    const handleRedirectToAccount = (account: string) => {
        router.push(`/trading/trade-accounts/${account}?platformId=${platformId}`);
    };

    const totalOpenPages = openCount / offsetStep;

    const handleLoadOpenPage = (page: number) => {
        setCurrentOpenPage(page);
        loadOpenData(page);
    };

    const handleLoadOpenNextPage = () => {
        setCurrentOpenPage(prev => prev + 1);
        handleLoadOpenPage(currentOpenPage + 1);
    };

    const handleLoadOpenPrevPage = () => {
        setCurrentOpenPage(prev => prev - 1);
        handleLoadOpenPage(currentOpenPage - 1);
    };

    const handleRefreshOpenedPositions = () => {
        loadOpenData(1);
        setCurrentOpenPage(1);
    };

    const handleRefreshClosedPositions = () => {
        loadClosedData(1);
    };

    useEffect(() => {
        getUserInfo(Number(localStorage.getItem("user_id")!))
            .then(res => {
                setEmail(res?.email);
            });
    }, []);

    const handleDownloadClosedPositions = () => {
        downloadClosedPositions(accountNumber, Number(platformId), formatTimestampDateOnly(fromDate), formatTimestampDateOnly(toDate))
            .then(blob => {
                if (!blob) {
                    new Error("Failed to download the file.");
                    return;
                }

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "ClosedPositions.xlsx";
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(error => {
                new Error("Failed to download file:", error);
            });
    };

    const handleChangeTab = (tabName: number) => {
        setSelectedTab(tabName);
        setFromDate(new Date());
        setToDate(new Date());
        setSelectedMenuTab(1);
    };

    const [isDateRange, setIsDateRange] = useState<boolean>(false);

    const accountDrpDwnRef = useRef(null);
    const accountDrpDwnExcludeRef = useRef(null);
    useOnClickOutside(accountDrpDwnRef, setIsDropDownOpened, accountDrpDwnExcludeRef);

    const handleOpenPasswordChangeModal = () => {
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
        setPasswordChangeModalOpened(true);
    };

    const handleOpenAccountDeleteModal = () => {
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
        setDeleteModalOpened(true);
    };

    return (
        <div className="py-14 tablet:py-6 tablet:pb-[136px] flex flex-col gap-12 bg-grey-exrta-ligth-extra">
            <LoadingScreen isLoading={isProcessing}/>
            {
                deleteModalOpened && <DeleteModal
                    setIsEditModalOpened={setDeleteModalOpened}
                />
            }
            {
                passwordChangeModalOpened && <PasswordChangeModal
                    tradingAccountId={tradingAccountId}
                    accountNumber={accountNumber}
                    setIsEditModalOpened={setPasswordChangeModalOpened}
                    setRecoveryModalOpened={setRecoveryModalOpened}
                />
            }
            {
                recoveryModalOpened && <RecoveryModal
                    email={email}
                    tradingAccountId={tradingAccountId}
                    setIsEditModalOpened={setRecoveryModalOpened}
                />
            }
            {
                chooseRange && <RangeChooseModal
                    setSelectedMenuTab={setSelectedMenuTab}
                    setIsDateRange={setIsDateRange}
                    selectFromDate={setFromDate}
                    selectToDate={setToDate}
                    setChooseRange={setChooseRange}
                    setCustomRange={setCustomRange}
                />
            }
            <div
                className="px-8 w-f tablet:px-7 mobile:px-0 flex mobile:flex-col mobile:gap-8 items-start justify-between">
                <div
                    className="flex items-start mobile:w-full gap-4 mobile:px-4 mobile:pb-3.5 mobile:border-b border-grey-extra-light">
                    <svg
                        onClick={() => router.back()}
                        className="w-6 h-6 mt-[2.5px] object-contain cursor-pointer"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M2.66699 7.85485L7.85382 13.0417L8.56093 12.3346L4.58123 8.35488L14.0407 8.35488V7.35488L4.58117 7.35488L8.56093 3.37507L7.85382 2.66797L2.66699 7.85485Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-2 mobile:gap-2.5 w-full mobile:justify-between">
                        <div
                            className="flex tablet:flex-col mobile:flex-row mobile:justify-between mobile:items-center items-center tablet:items-start gap-4 tablet:gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-24-18 font-medium text-grey-tertiary">{singleAccount.account_number}</span>
                                <div
                                    ref={accountDrpDwnExcludeRef}
                                    className="flex items-center gap-2 cursor-pointer relative"
                                    onClick={() => setIsDropDownOpened(!isDropDownOpened)}
                                >
                                    <span className="text-24-18 font-medium">#{accountNumber}</span>
                                    <svg
                                        className={`w-4 h-4 object-contain ${isDropDownOpened ? "drpDwnOpened" : "drpDwnClosed"}`}
                                        width="16" height="17" viewBox="0 0 16 17" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.995 6.50496V5.5H3.00488V6.50496L7.99993 11.5L12.995 6.50496Z"
                                              fill="#2B2A28"/>
                                    </svg>
                                    {
                                        isDropDownOpened && <div
                                            ref={accountDrpDwnRef}
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute flex flex-col gap-2 w-[160px] bg-white -left-2.5 top-8 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                                        >
                                            {
                                                accounts.map((item, index) =>
                                                    <div
                                                        key={index}
                                                        onClick={() => handleRedirectToAccount(item)}
                                                        className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${accountNumber === item ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                                    >
                                                        <span>{item}</span>
                                                        {
                                                            accountNumber === item && <svg
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
                            <div className="tablet:hidden mobile:flex">
                                <Button
                                    className={"btnPrim btnLive"}
                                    btnName={singleAccount.live_tag}
                                    icon={"live"}
                                />
                            </div>
                        </div>
                        <div className="flex items-end gap-4 flex-wrap">
                            <div className="hidden tablet:flex mobile:hidden">
                                <Button
                                    className={"btnPrim btnLive"}
                                    btnName={singleAccount.live_tag}
                                    icon={"live"}
                                />
                            </div>
                            <span
                                onClick={handleOpenPasswordChangeModal}
                                className="text-14_16 pb-1 underline text-grey-seccondary custom-underline cursor-pointer">{singleAccount.change_password}</span>
                            <span
                                onClick={handleOpenAccountDeleteModal}
                                className="text-14_16 pb-1 underline text-grey-seccondary custom-underline cursor-pointer">{singleAccount.delete_trade_account}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mobile:overflow-y-auto mobile:px-4 mobile:pt-[0.5px] flex-0-0-auto-all">
                    <span
                        onClick={() => handleChangeTab(overviewTab)}
                        className={`
                        text-20-18 font-medium pb-1 cursor-pointer flex-0-0-auto
                        ${selectedTab === overviewTab ? "text-default underline custom-underline-tab" : "text-grey-seccondary cursor-pointer tabTitle"}
                        `}
                    >{singleAccount.tabs.overview}</span>
                    <span
                        onClick={() => handleChangeTab(openTab)}
                        className={`
                        text-20-18 font-medium pb-1 cursor-pointer tabTitle flex-0-0-auto
                        ${selectedTab === openTab ? "text-default underline custom-underline-tab" : "text-grey-seccondary cursor-pointer tabTitle"}
                        `}
                    >{singleAccount.tabs.open_positions} <sup>{openCount}</sup></span>
                    <span
                        onClick={() => handleChangeTab(closedTab)}
                        className={`
                        text-20-18 font-medium pb-1 cursor-pointer tabTitle flex-0-0-auto
                        ${selectedTab === closedTab ? "text-default underline custom-underline-tab" : "text-grey-seccondary cursor-pointer tabTitle"}
                        `}
                    >{singleAccount.tabs.closed_positions} <sup>{closedCount}</sup></span>
                </div>
            </div>
            {
                selectedTab === overviewTab && <div className="flex flex-col gap-4 tablet:gap-2">
                    <div className="px-8 mobile:px-4 flex items-center justify-between">
                        <span className="text-18-m16 font-medium">{singleAccount.title}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-11 text-grey-seccondary">{singleAccount.update}: {lastOverviewDate}</span>
                            <div className="mobile:hidden">
                                <Button
                                    className={"btnSec btnRefresh"}
                                    btnName={singleAccount.refresh_button}
                                    icon={"refresh"}
                                    request={handleRefreshOverviewData}
                                    reverse={true}
                                />
                            </div>
                            <div className="hidden mobile:flex">
                                <Button
                                    request={handleRefreshOverviewData}
                                    className={"btnSec btnRefresh"}
                                    icon={"refresh"}
                                    reverse={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-14 tablet:gap-8">
                        <TradingAccountInfo tradingAccount={currentTradingAccount}/>
                        <TradingAssets assets={assets}/>
                    </div>
                </div>
            }
            {
                selectedTab === openTab && <div className="flex flex-col gap-4 tablet:gap-2 mobile:gap-4">
                    <div className="px-8 mobile:px-4 flex items-center justify-end gap-1">
                        <div className="flex items-center gap-2 flex-0-0-auto-all ">
                            <span className="text-11 text-grey-seccondary mobile:hidden">{singleAccount.update}: {lastOpenDate}</span>
                            <div className="mobile:hidden">
                                <Button
                                    className={"btnSec btnRefresh"}
                                    btnName={singleAccount.refresh_button}
                                    request={handleRefreshOpenedPositions}
                                    icon={"refresh"}
                                    reverse={true}
                                />
                            </div>
                            <div className="hidden mobile:flex">
                                <Button
                                    className={"btnSec btnRefresh"}
                                    request={handleRefreshOpenedPositions}
                                    icon={"refresh"}
                                    reverse={true}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        currentOpenPositions.length > 0 && <PositionsTableOpen positions={currentOpenPositions}/>
                    }
                    {
                        currentOpenPositions.length > 0 && <MobileOpenPositions positions={currentOpenPositions}/>
                    }
                    {
                        totalOpenPages > 1 && <Pagination
                            currentPage={currentOpenPage}
                            totalPages={totalOpenPages}
                            handleLoadNextPage={handleLoadOpenNextPage}
                            handleLoadPrevPage={handleLoadOpenPrevPage}
                            handleLoadPage={handleLoadOpenPage}
                        />
                    }
                </div>
            }
            {
                selectedTab === closedTab && <div className="flex flex-col gap-4 tablet:gap-2 mobile:gap-4">
                    <div className="px-8 mobile:px-4 flex items-center justify-between gap-1">
                        <DaysTab
                            isDateRange={isDateRange}
                            setIsDateRange={setIsDateRange}
                            tabs={tabs}
                            setSelectedTabs={setSelectedTabs}
                            setSelectedMenuTab={setSelectedMenuTab}
                            selectedMenuTab={selectedMenuTab}
                        />
                        <DaysTabMobile
                            setIsDateRange={setIsDateRange}
                            setSelectedTabs={setSelectedTabs}
                            isDateRange={isDateRange}
                            tabs={tabs}
                            setSelectedMenuTab={setSelectedMenuTab}
                            selectedMenuTab={selectedMenuTab - 1}
                        />
                        <div className="flex items-center gap-2 flex-0-0-auto-all">
                            <span
                                className="text-11 text-grey-seccondary mobile:hidden">{singleAccount.update}: {lastClosedDate}</span>
                            <div className="mobile:hidden">
                                <Button
                                    className={"btnSec btnRefresh"}
                                    btnName={singleAccount.refresh_button}
                                    icon={"refresh"}
                                    reverse={true}
                                    request={handleRefreshClosedPositions}
                                />
                            </div>
                            <div className="hidden mobile:flex">
                                <Button
                                    className={"btnSec btnRefresh"}
                                    icon={"refresh"}
                                    request={handleRefreshClosedPositions}
                                    reverse={true}
                                />
                            </div>
                            <Button
                                disabled={currentClosedPositions.length === 0}
                                className={"btnPrim btnDownload"}
                                btnName={singleAccount.positions.download_button}
                                icon={"download"}
                                reverse={true}
                                request={handleDownloadClosedPositions}
                            />
                        </div>
                    </div>
                    {
                        chooseRangeMobile && <MobileDateChoose
                            setSelectedMenuTab={setSelectedMenuTab}
                            setIsDateRange={setIsDateRange}
                            selectFromDate={setFromDate}
                            selectToDate={setToDate}
                            setChooseRange={setChooseRangeMobile}
                            setCustomRange={setCustomRange}
                            toDate={toDate}
                            fromDate={fromDate}
                        />
                    }
                    {
                        currentClosedPositions.length > 0 && <PositionsTable positions={currentClosedPositions}/>
                    }
                    {
                        currentClosedPositions.length > 0 && <MobileAccountsListClosed positions={currentClosedPositions}/>
                    }
                    <div className={styles.paginationContainer}>
                        {
                            currentClosedPositions.length > 0 && <span className="text-14_16 text-grey-seccondary">
                                Showing page {currentPage} of {closedCount} entries
                            </span>
                        }
                        <ReactPaginate
                            initialPage={0}
                            activeClassName={styles.activePage}
                            disabledLinkClassName={styles.disabledArrows}
                            breakClassName={styles.li}
                            pageClassName={styles.page}
                            previousClassName={styles.arrow}
                            nextClassName={styles.arrow}
                            marginPagesDisplayed={1}
                            className={styles.pagination}
                            breakLabel="..."
                            nextLabel=<ArrowRight/>
                            onPageChange={handleLoadPage}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(closedCount / offsetStep)}
                            previousLabel=<ArrowLeft/>
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default TradingAccountComp;
