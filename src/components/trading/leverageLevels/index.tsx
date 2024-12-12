"use client";

import React, {useEffect, useRef, useState} from "react";
import {TradeAccount} from "@/components/trading";
import AccountLeverage from "@/components/trading/leverageLevels/accountLeverage";
import SidebarRiskClosure from "@/components/trading/downloadCenter/sidebarRiskClosure";
import {getLeverageStatus} from "@/api/profile/getLeverageStatus";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import LoadingScreen from "@/components/loadingScreen";
import {useDemo} from "@/context/DemoContext";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export interface IAccountLeverage {
    account: number,
    leverageLevels: number
}

const LeverageLevelsComp = () => {
    const router = useRouter();
    const {demo} = useDemo();
    const [selectedAccount, setSelectedAccount] = useState<IAccountLeverage>();
    const [accounts, setAccounts] = useState<IAccountLeverage[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [isRiskModalOpened, setIsRiskModalOpened] = useState<boolean>(false);
    const [alreadyInProcess, setAlreadyInProcess] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const overView = useSelector((state: RootState) => state.overView);

    const {t} = useTranslation("leverage_level");

    useEffect(() => {
        if (!overView) {
            return;
        }

        const liveAccounts = overView.liveAccounts.map((account: TradeAccount) => {
            return {
                account: account.accountCode,
                leverageLevels: account.leverage
            };
        });
        const demoAccounts = overView.demoAccounts.map((account: TradeAccount) => {
            return {
                account: account.accountCode,
                leverageLevels: account.leverage
            };
        });

        if (demo) {
            if (demoAccounts.length === 0) {
                setIsProcessing(false);
            }
        } else if (liveAccounts.length === 0 && overView.allow) {
            router.push("/dashboard");
        } else {
            setIsProcessing(false);
        }

        setAccounts(demo ? [...demoAccounts] : [...liveAccounts]);
        setSelectedAccount(demo ? demoAccounts[0] : liveAccounts[0]);

        setUserId(Number(localStorage.getItem("user_id")));
    }, [demo, overView]);

    useEffect(() => {
        setIsProcessing(true);

        getLeverageStatus()
            .then(res => {
                    if (res && res.data.length > 0) {
                        const currentAccount = res.data.filter((i: any) => i.accountCode === selectedAccount?.account);

                        if (currentAccount.length > 0) {
                            if (currentAccount[0].statusStr === "Submitted" || currentAccount[0].statusStr === "Checked") {
                                setAlreadyInProcess(true);
                            }
                        } else {
                            setAlreadyInProcess(false);
                        }
                    }
                    if (selectedAccount) {
                        setIsProcessing(false);
                    }
                }
            );
    }, [selectedAccount]);

    const modalRef = useRef(null);
    useOnClickOutside(modalRef, setIsRiskModalOpened);

    return (
        <div
            className="py-[70px] tablet:flex-col tablet:gap-0 mobile:pt-10 px-8 mobile:px-0 items-center bg-grey-exrta-ligth-extra flex gap-10 tablet:pb-[136px]">
            <LoadingScreen isLoading={isProcessing}/>
            <div ref={modalRef}>
                <SidebarRiskClosure
                    isDiscoverMoreOpened={isRiskModalOpened}
                    setIsDiscoverMoreOpened={setIsRiskModalOpened}
                />
            </div>
            <div className="max-w-[717px] mobile:max-w-none w-full mx-auto gap-14 flex flex-col">
                <div className="flex flex-col gap-1.5 w-full mobile:pl-4 mobile:pr-8">
                    <span className="text-24 font-medium text-default mobileLetter0">{t("title")}</span>
                    <span className="text-16 tracking-wider text-grey-seccondary">
                        {t("description")}
                    </span>
                </div>
                <div className="flex flex-col w-full gap-1 mobile:px-1.5">
                    <div className="flex flex-col py-10 mobile:py-8 px-16 mobile:px-6 gap-6 bg-white rounded-t-8">
                        <span className="text-18-m16 font-medium text-default brHidden">
                            {t("account_select_title1")} <br/> {t("account_select_title2")}
                        </span>
                        <div className="accountBadgesForLeverage">
                            {
                                accounts.map((account, index) =>
                                    <button
                                        key={index}
                                        onClick={() => setSelectedAccount({
                                            account: account.account,
                                            leverageLevels: account.leverageLevels
                                        })}
                                        className={`${selectedAccount?.account === account.account ? "btnPrim" : "btnSec"} btnAccount`}
                                    >
                                        {`#${account.account}`}
                                        {
                                            selectedAccount?.account === account.account
                                                ? <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                       xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M9.33331 18C14.3039 18 18.3333 13.9706 18.3333 9C18.3333 4.02944 14.3039 0 9.33331 0C4.36275 0 0.333313 4.02944 0.333313 9C0.333313 13.9706 4.36275 18 9.33331 18ZM9.33331 12.375C11.1973 12.375 12.7083 10.864 12.7083 9C12.7083 7.13604 11.1973 5.625 9.33331 5.625C7.46935 5.625 5.95831 7.13604 5.95831 9C5.95831 10.864 7.46935 12.375 9.33331 12.375Z"
                                                          fill="white"/>
                                                </svg>
                                                : <svg
                                                    className="w-[18px] h-[18px] object-contain"
                                                    width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="9.66666" cy="9" r="8.55" stroke="#E8E5E1"
                                                            strokeWidth="0.9"/>
                                                </svg>

                                        }
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    {
                        selectedAccount && <AccountLeverage
                            alreadyInProcess={alreadyInProcess}
                            setIsRiskModalOpened={setIsRiskModalOpened}
                            userId={userId}
                            selectedAccount={selectedAccount}
                        />
                    }
                </div>
            </div>
            <div
                className={`transition-box4 ${isRiskModalOpened ? "open" : ""} bg-transparent h-[400px] flex-0-0-auto-all tablet:hidden`}>
                {/* Your content here */}
            </div>
        </div>
    );
};

export default LeverageLevelsComp;
