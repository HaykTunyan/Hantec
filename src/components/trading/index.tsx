"use client";

import React, {useEffect, useState} from "react";
import Button from "@/components/button";
import AccountsList from "@/components/trading/accountsList";
import AddNewLiveAccountModal from "@/components/trading/addNewLiveAccountModal";
import MobileAccountsList from "@/components/trading/mobileAccountsList";
import {useDemo} from "@/context/DemoContext";
import {createDemoAccount} from "@/api/registration/createDemoAccount";
import LoadingScreen from "@/components/loadingScreen";
import DemoCreatedModal from "@/components/demoCreatedModal";
import AccountCreateLimitReached from "@/components/accountCreateLimitReached";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export interface TradeAccount {
    accountCode: string,
    accountType: number,
    availableBalance: number,
    availableMargin: number,
    balance: number,
    ccy: string;
    companyId: number,
    credit: number,
    id: number,
    leverage: number,
    netValue: number,
    openPL: number,
    platformCatDesc: string,
    platformId: number,
    platformTypeCode: string,
    status: string,
    tradeAccount: any
}

const TradingComp = () => {
    const router = useRouter();
    const overView = useSelector((state: RootState) => state.overView);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentLiveAccounts, setCurrentLiveAccounts] = useState<TradeAccount[]>([]);
    const [currentDemoAccounts, setCurrentDemoAccounts] = useState<TradeAccount[]>([]);
    const [isAddLiveAccountModalOpened, setIsAddLiveAccountModalOpened] = useState<boolean>(false);
    const {demo} = useDemo();
    const [isDemoAccountOpened, setIsDemoAccountOpened] = useState<boolean>(false);
    const [maxLimitReachedModal, setMaxLimitReachedModal] = useState<boolean>(false);
    const [accountType, setAccountType] = useState<string>("");

    const {t} = useTranslation("trading");

    useEffect(() => {
        setCurrentLiveAccounts([...overView.liveAccounts]);
        setCurrentDemoAccounts([...overView.demoAccounts]);
    }, [overView]);

    const handleOpenNewLiveAccountModal = () => {
        if (currentLiveAccounts.length >= 5) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
            setMaxLimitReachedModal(true);
            setAccountType(t("table_headers.state_values.live"));
            return;
        }

        setIsAddLiveAccountModalOpened(true);
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
    };

    const handleOpenNewDemoAccount = () => {
        if (currentDemoAccounts.length >= 5) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
            setMaxLimitReachedModal(true);
            setAccountType(t("table_headers.state_values.demo"));
            return;
        }
        setIsProcessing(true);

        createDemoAccount({
            campaignId: 53,
        })
            .then(() => {
                setIsProcessing(false);
                setIsDemoAccountOpened(true);
            });
    };

    useEffect(() => {
        if (!demo && overView.liveAccounts.length === 0 && overView.allow) {
            const timer = setTimeout(() => {
                router.push("/dashboard");
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [demo, overView]);

    return (
        <div className="w-full flex flex-col items-start pb-14">
            <LoadingScreen isLoading={isProcessing}/>
            {
                maxLimitReachedModal && <AccountCreateLimitReached
                    setMaxLimitReachedModal={setMaxLimitReachedModal}
                    type={accountType}
                />
            }
            {
                isDemoAccountOpened && <DemoCreatedModal/>
            }
            {
                isAddLiveAccountModalOpened && <AddNewLiveAccountModal
                    setIsEditModalOpened={setIsAddLiveAccountModalOpened}
                />
            }
            <div
                className="px-8 mobile:px-4 pt-14 tablet:pt-7 pb-[62px] tablet:pb-14 mobile:pb-7 flex items-center justify-between w-full">
                <span className="text-32-24 text-default font-medium">{t("title")}</span>
                {
                    demo ? <Button
                            btnName={t("add_new_button_Demo")}
                            className={"btnSec btnAdd mobile:hidden"}
                            icon={"add"}
                            request={handleOpenNewDemoAccount}
                        />
                        : <Button
                            btnName={t("add_new_button")}
                            className={"btnSec btnAdd mobile:hidden"}
                            icon={"add"}
                            request={handleOpenNewLiveAccountModal}
                        />
                }
                {
                    demo ? <Button
                        btnName={t("add")}
                        className={"btnSec btnAddMob"}
                        icon={"add"}
                        request={handleOpenNewDemoAccount}
                    /> : <Button
                        btnName={t("add")}
                        className={"btnSec btnAddMob"}
                        icon={"add"}
                        request={handleOpenNewLiveAccountModal}
                    />
                }
            </div>
            {
                demo
                    ? <AccountsList accounts={currentDemoAccounts}/>
                    : <AccountsList accounts={currentLiveAccounts}/>
            }
            {
                demo
                    ? <MobileAccountsList accounts={currentDemoAccounts}/>
                    : <MobileAccountsList accounts={currentLiveAccounts}/>
            }
        </div>
    );
};

export default TradingComp;
