import React, {useEffect, useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {getClientInfo} from "@/api/registration/getClientInfo";
import {getUserOverview} from "@/services";
import {TradeAccount} from "@/components/trading";
import {subAccOpen} from "@/api/trading/subAccOpen";
import LoadingScreen from "@/components/loadingScreen";
import {useTranslation} from "next-i18next";

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void;
}

const AddNewLiveAccountModal = ({setIsEditModalOpened}: IEditModal) => {
        const [isProcessing, setIsProcessing] = useState<boolean>(true);
        const [isTradingDrpDwnOpened, setIsTradingDrpDwnOpened] = useState<boolean>(false);
        // const [isPlatformDrpDwnOpened, setIsPlatformDrpDwnOpened] = useState<boolean>(false);
        const [selectedAccount, setSelectedAccount] = useState<string>("");
        // const [selectedPlatform, setSelectedPlatform] = useState<string>("");
        const [subAccRequestExists, setSubAccRequestExists] = useState<boolean>(false);
        const [subAccOpenRequestCreated, setSubAccOpenRequestCreated] = useState<boolean>(false);
        const [userId, setUserId] = useState<number>(0);
        const [currentAccountLeverage, setCurrentAccountLeverage] = useState<string>("");
        const [accountCodes, setAccountCodes] = useState<any>([]);

        const {t} = useTranslation("trading");
        const applicationForm: any = t("add_new_live_account.application_form", {returnObjects: true});
        const stpes: any = t("add_new_live_account.application_form.texts.steps", {returnObjects: true});

        useEffect(() => {
            getClientInfo()
                .then(res => {
                    if (res) {
                        const subAcc = res.data.data.filter((i: any) => i.appType === "sub-acc-open").filter((i: any) => i.status === "Submitted");

                        if (subAcc.length > 0) {
                            setSubAccRequestExists(true);
                            setIsProcessing(false);
                        } else {
                            getUserOverview()
                                .then(resp => {
                                    if (resp && resp.data) {
                                        const liveAccounts = resp.data.liveAccounts.map((account: TradeAccount) => {
                                            return {
                                                account: account.accountCode,
                                                leverageLevels: account.leverage
                                            };
                                        });

                                        setAccountCodes(liveAccounts);

                                        const currentAccount = liveAccounts.filter((i: any) => i.account === selectedAccount);
                                        setCurrentAccountLeverage(currentAccount.leverageLevels);
                                    }
                                    setIsProcessing(false);
                                });
                        }
                    }
                });

            setUserId(Number(localStorage.getItem("user_id")));
        }, []);

        const disabled = isProcessing || !selectedAccount;

        const handleSendRequest = () => {
            const requestData = {
                accCurrency: "USD",
                accLeverage: `1:${currentAccountLeverage}`,
                accountCodeRef: selectedAccount,
                appDate: new Date(),
                clientUserId: userId,
                companyId: 20,
                platformId: 42,
                region: "AFRICA",
                "messageMappings": [
                    {
                        "statusId": 1,
                        "messageId": 29
                    },
                    {
                        "statusId": 2,
                        "messageId": 11000
                    },
                    {
                        "statusId": 3,
                        "messageId": 32
                    }
                ],
            };

            setIsProcessing(true);
            subAccOpen(requestData)
                .then(res => {
                    if (res) {
                        if (res.response.data.status === "success") {
                            setSubAccRequestExists(false);
                            setSubAccOpenRequestCreated(true);
                        }
                    }
                    setIsProcessing(false);
                });
        };

        const handleCancelRequest = () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
            setIsEditModalOpened(false);
        };

        // const handleSelectPlatform = (x: string) => {
        //     setSelectedPlatform(x);
        //     setIsPlatformDrpDwnOpened(false);
        // };

        const handleSelectTradingAccount = (x: any) => {
            setSelectedAccount(x.account);
            setCurrentAccountLeverage(x.leverageLevels);
            setIsTradingDrpDwnOpened(false);
        };

        const tradingRef = useRef(null);
        const excludeTradingRef = useRef(null);
        useOnClickOutside(tradingRef, setIsTradingDrpDwnOpened, excludeTradingRef);

        // const platformRef = useRef(null);
        // const excludePlatformRef = useRef(null);
        // useOnClickOutside(platformRef, setIsPlatformDrpDwnOpened, excludePlatformRef);

        return (
            <>
                {
                    isProcessing ? <LoadingScreen isLoading={isProcessing}/>
                        : <div
                            className={`fixed w-w-full py-20 inset-0 bg-modal-backdrop z-[11111111] flex ${subAccRequestExists || subAccOpenRequestCreated ? "items-center" : "items-start"} object-top mobile:px-4 overflow-x-scroll`}>
                            {
                                subAccRequestExists
                                    ? <div
                                        className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                                        <div className="flex flex-col gap-4 items-center relative">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M8.83755 7.38959C8.83755 5.72239 10.1891 4.37084 11.8563 4.37084C13.5235 4.37084 14.875 5.72239 14.875 7.38959C14.875 9.0568 13.5235 10.4083 11.8563 10.4083C10.1891 10.4083 8.83755 9.0568 8.83755 7.38959ZM11.8563 2.77084C9.30544 2.77084 7.23755 4.83873 7.23755 7.38959C7.23755 9.94046 9.30544 12.0083 11.8563 12.0083C14.4071 12.0083 16.475 9.94046 16.475 7.38959C16.475 4.83873 14.4071 2.77084 11.8563 2.77084ZM11.8562 13.0815C9.06556 13.0815 6.95388 13.6801 5.52657 14.2918C4.81392 14.5972 4.27357 14.9051 3.90547 15.1418C3.72141 15.2601 3.58032 15.3606 3.48217 15.4342C3.43309 15.4711 3.39473 15.5011 3.36708 15.5234C3.35325 15.5345 3.3421 15.5436 3.33363 15.5507L3.32293 15.5596L3.31908 15.5629L3.31753 15.5642L3.31623 15.5653L3.83687 16.1727C3.3204 15.5702 3.31596 15.5656 3.31622 15.5653L3.03687 15.8048V20.4096H20.6756V15.8048L20.3962 15.5653L19.8756 16.1727C20.3962 15.5653 20.3953 15.5645 20.395 15.5642L20.3934 15.5629L20.3896 15.5596L20.3789 15.5507C20.3748 15.5473 20.3702 15.5435 20.3651 15.5393C20.3592 15.5345 20.3527 15.5292 20.3454 15.5234C20.3178 15.5011 20.2794 15.4711 20.2303 15.4342C20.1322 15.3606 19.9911 15.2601 19.807 15.1418C19.4389 14.9051 18.8986 14.5972 18.1859 14.2918C16.7586 13.6801 14.6469 13.0815 11.8562 13.0815ZM4.77068 16.4876C4.72177 16.5191 4.67716 16.5486 4.63687 16.5759V18.8096H19.0756V16.5759C19.0353 16.5486 18.9907 16.5191 18.9418 16.4876C18.6416 16.2947 18.1795 16.0298 17.5556 15.7624C16.3098 15.2285 14.4118 14.6815 11.8562 14.6815C9.30067 14.6815 7.40266 15.2285 6.15684 15.7624C5.53294 16.0298 5.07087 16.2947 4.77068 16.4876Z"
                                                      fill="#2B2A28"/>
                                            </svg>
                                            <img
                                                className={"absolute -top-[7px] left-[52%] w-[29px] h-4"}
                                                src="/icons/Tag.png"
                                                alt="live tag"
                                            />
                                            <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span
                                        className="text-20-18 font-medium">{t("add_new_live_account.application_already_exists.title")}</span>
                                                <span
                                                    className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}>{t("add_new_live_account.application_already_exists.description")}</span>
                                            </div>
                                        </div>
                                        <button
                                            className={"btnPrim self-center"}
                                            onClick={handleCancelRequest}
                                        >
                                            {t("add_new_live_account.application_already_exists.buttons.cancel")}
                                        </button>
                                    </div>
                                    : subAccOpenRequestCreated ? <div
                                            className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                                            <div className="flex flex-col gap-4 items-center relative">
                                                <img
                                                    src="/images/registration/registrationDone.png"
                                                    alt="live tag"
                                                />
                                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span
                                        className="text-20-18 font-medium">{t("add_new_live_account.application_submitted.title")}</span>
                                                    <span className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}>
                                            {t("add_new_live_account.application_submitted.description")}
                                        </span>
                                                </div>
                                            </div>
                                            <button
                                                className={"btnPrim self-center"}
                                                onClick={handleCancelRequest}
                                            >
                                                {t("add_new_live_account.application_submitted.buttons.cancel")}
                                            </button>
                                        </div>
                                        : <div
                                            className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                                            <div className="flex flex-col gap-4 items-center relative">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M8.83755 7.38959C8.83755 5.72239 10.1891 4.37084 11.8563 4.37084C13.5235 4.37084 14.875 5.72239 14.875 7.38959C14.875 9.0568 13.5235 10.4083 11.8563 10.4083C10.1891 10.4083 8.83755 9.0568 8.83755 7.38959ZM11.8563 2.77084C9.30544 2.77084 7.23755 4.83873 7.23755 7.38959C7.23755 9.94046 9.30544 12.0083 11.8563 12.0083C14.4071 12.0083 16.475 9.94046 16.475 7.38959C16.475 4.83873 14.4071 2.77084 11.8563 2.77084ZM11.8562 13.0815C9.06556 13.0815 6.95388 13.6801 5.52657 14.2918C4.81392 14.5972 4.27357 14.9051 3.90547 15.1418C3.72141 15.2601 3.58032 15.3606 3.48217 15.4342C3.43309 15.4711 3.39473 15.5011 3.36708 15.5234C3.35325 15.5345 3.3421 15.5436 3.33363 15.5507L3.32293 15.5596L3.31908 15.5629L3.31753 15.5642L3.31623 15.5653L3.83687 16.1727C3.3204 15.5702 3.31596 15.5656 3.31622 15.5653L3.03687 15.8048V20.4096H20.6756V15.8048L20.3962 15.5653L19.8756 16.1727C20.3962 15.5653 20.3953 15.5645 20.395 15.5642L20.3934 15.5629L20.3896 15.5596L20.3789 15.5507C20.3748 15.5473 20.3702 15.5435 20.3651 15.5393C20.3592 15.5345 20.3527 15.5292 20.3454 15.5234C20.3178 15.5011 20.2794 15.4711 20.2303 15.4342C20.1322 15.3606 19.9911 15.2601 19.807 15.1418C19.4389 14.9051 18.8986 14.5972 18.1859 14.2918C16.7586 13.6801 14.6469 13.0815 11.8562 13.0815ZM4.77068 16.4876C4.72177 16.5191 4.67716 16.5486 4.63687 16.5759V18.8096H19.0756V16.5759C19.0353 16.5486 18.9907 16.5191 18.9418 16.4876C18.6416 16.2947 18.1795 16.0298 17.5556 15.7624C16.3098 15.2285 14.4118 14.6815 11.8562 14.6815C9.30067 14.6815 7.40266 15.2285 6.15684 15.7624C5.53294 16.0298 5.07087 16.2947 4.77068 16.4876Z"
                                                          fill="#2B2A28"/>
                                                </svg>
                                                <img
                                                    className={"absolute -top-[7px] left-[52%] w-[29px] h-4"}
                                                    src="/icons/Tag.png"
                                                    alt="live tag"
                                                />
                                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                        <span
                                            className="text-20-18 font-medium">{applicationForm.title}</span>
                                                </div>
                                                <div
                                                    className={"p-6 flex flex-col gap-6 rounded-8 border border-grey-extra-light w-full text-14_16 text-grey-seccondary tracking-[0.28px]"}>
                                                    <div className={"flex flex-col gap-2"}>
                                                        <span>{applicationForm.texts.header},</span>
                                                        <span>{applicationForm.texts.description}</span>
                                                    </div>
                                                    <div className={"flex flex-col gap-3"}>
                                                        <div className={"flex gap-3 items-start"}>
                                                            <span>01</span>
                                                            <span>
                                                            <span
                                                                className={"font-medium"}>{stpes[0].title}:</span> {stpes[0].text}
                                                            </span>
                                                        </div>
                                                        <div className={"flex gap-3 items-start"}>
                                                            <span>02</span>
                                                            <span>
                                                            <span
                                                                className={"font-medium"}>{stpes[1].title}:</span> {stpes[1].text}
                                                            </span>
                                                        </div>
                                                        <div className={"flex gap-3 items-start"}>
                                                            <span>03</span>
                                                            <span>
                                                            <span
                                                                className={"font-medium"}>{stpes[2].title}:</span> {stpes[2].text}
                                                            </span>
                                                        </div>
                                                        <div className={"flex gap-3 items-start"}>
                                                            <span>04</span>
                                                            <span>
                                                            <span
                                                                className={"font-medium"}>{stpes[3].title}:</span> {stpes[3].text}
                                                            </span>
                                                        </div>
                                                        <div className={"flex gap-3 items-start"}>
                                                            <span>05</span>
                                                            <span>
                                                            <span
                                                                className={"font-medium"}>{stpes[4].title}:</span> {stpes[4].text}
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"w-[376px] mobile:w-full mx-auto flex flex-col gap-6"}>
                                                    <div className={`w-full flex flex-col gap-1.5`}>
                                                        <span
                                                            className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}>
                                                            {t("add_new_live_account.application_form.texts.drop_down_title")}
                                                        </span>
                                                        <div
                                                            ref={excludeTradingRef}
                                                            className={`
                                                            w-full px-[14px] py-3 flex items-center justify-between border cursor-pointer 
                                                            ${isTradingDrpDwnOpened ? "border-default" : "border-grey-extra"}
                                                            ${isProcessing ? "pointer-events-none" : ""}
                                                             rounded relative
                                                             `}
                                                            onClick={() => setIsTradingDrpDwnOpened(!isTradingDrpDwnOpened)}
                                                        >
                                                            <span>{selectedAccount ? selectedAccount : "-"}</span>
                                                            <svg
                                                                className={`w-4 h-4 object-contain ${isTradingDrpDwnOpened ? "drpDwnOpened" : "drpDwnClosed"}`}
                                                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                                                                      fill="#2B2A28"/>
                                                            </svg>
                                                            {
                                                                isTradingDrpDwnOpened && <div
                                                                    ref={tradingRef}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="absolute flex flex-col gap-2 tablet:gap-1 w-full bg-white left-0 top-14 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                                                                >
                                                                    {
                                                                        accountCodes.map((item: any, index: number) =>
                                                                            <div
                                                                                key={index}
                                                                                onClick={(e) => handleSelectTradingAccount(item)}
                                                                                className={`flex items-center justify-between w-full px-3 tablet:px-1 py-2.5 tablet:py-1.5 cursor-pointer rounded ${selectedAccount === item.account ? "bg-hover-sidebar" : ""}
                                                                    xl:hover:bg-hover-sidebar relative
                                                                    `}
                                                                            >
                                                                                <span>{item.account}</span>
                                                                                {
                                                                                    selectedAccount === item.account && <svg
                                                                                        className="w-5 h-5 tablet:w-4 tablet:h-4 object-contain"
                                                                                        width="20" height="20" viewBox="0 0 20 20"
                                                                                        fill="none"
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
                                                    {/*    <div className={`w-full flex flex-col gap-1.5`}>*/}
                                                    {/*        <span className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}>*/}
                                                    {/*            Platform*/}
                                                    {/*        </span>*/}
                                                    {/*        <div*/}
                                                    {/*            ref={excludePlatformRef}*/}
                                                    {/*            className={`w-full px-[14px] py-3 flex items-center justify-between border cursor-pointer ${isPlatformDrpDwnOpened ? "border-default" : "border-grey-extra"} rounded relative`}*/}
                                                    {/*            onClick={() => setIsPlatformDrpDwnOpened(!isPlatformDrpDwnOpened)}*/}
                                                    {/*        >*/}
                                                    {/*            <span>{selectedPlatform ? selectedPlatform : "-"}</span>*/}
                                                    {/*            <svg*/}
                                                    {/*                className={`w-4 h-4 object-contain ${isPlatformDrpDwnOpened ? "drpDwnOpened" : "drpDwnClosed"}`}*/}
                                                    {/*                width="16" height="16" viewBox="0 0 16 16" fill="none"*/}
                                                    {/*                xmlns="http://www.w3.org/2000/svg">*/}
                                                    {/*                <path fillRule="evenodd" clipRule="evenodd"*/}
                                                    {/*                      d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"*/}
                                                    {/*                      fill="#2B2A28"/>*/}
                                                    {/*            </svg>*/}
                                                    {/*            {*/}
                                                    {/*                isPlatformDrpDwnOpened && <div*/}
                                                    {/*                    ref={platformRef}*/}
                                                    {/*                    onClick={(e) => e.stopPropagation()}*/}
                                                    {/*                    className="absolute flex flex-col gap-2 tablet:gap-1 w-full bg-white left-0 top-14 tablet:top-8 rounded-[8px] p-1 border border-grey-extra z-[11111111]"*/}
                                                    {/*                >*/}
                                                    {/*                    <div*/}
                                                    {/*                        onClick={(e) => handleSelectPlatform("MT5")}*/}
                                                    {/*                        className={`flex items-center justify-between w-full px-3 tablet:px-1 py-2.5 tablet:py-1.5 cursor-pointer rounded ${selectedPlatform === "MT5" ? "bg-hover-sidebar" : ""}*/}
                                                    {/*xl:hover:bg-hover-sidebar relative*/}
                                                    {/*`}*/}
                                                    {/*                    >*/}
                                                    {/*                        <span>MT5</span>*/}
                                                    {/*                        {*/}
                                                    {/*                            selectedPlatform === "MT5" && <svg*/}
                                                    {/*                                className="w-5 h-5 tablet:w-4 tablet:h-4 object-contain"*/}
                                                    {/*                                width="20" height="20" viewBox="0 0 20 20" fill="none"*/}
                                                    {/*                                xmlns="http://www.w3.org/2000/svg">*/}
                                                    {/*                                <path fillRule="evenodd" clipRule="evenodd"*/}
                                                    {/*                                      d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"*/}
                                                    {/*                                      fill="#2B2A28"/>*/}
                                                    {/*                            </svg>*/}
                                                    {/*                        }*/}
                                                    {/*                    </div>*/}
                                                    {/*                </div>*/}
                                                    {/*            }*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    disabled={isProcessing}
                                                    onClick={handleCancelRequest}
                                                    className={"btnSec"}
                                                >
                                                    {t("add_new_live_account.application_form.texts.buttons.cancel")}
                                                </button>
                                                <button
                                                    className="btnPrim"
                                                    onClick={handleSendRequest}
                                                    disabled={disabled}
                                                >
                                                    {t("add_new_live_account.application_form.texts.buttons.continue")}
                                                </button>
                                            </div>
                                        </div>
                            }
                        </div>
                }
            </>
        );
    }
;

export default AddNewLiveAccountModal;
