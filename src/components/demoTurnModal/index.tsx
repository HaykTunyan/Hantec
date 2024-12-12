import React, {useEffect, useState} from "react";
import {useDemo} from "@/context/DemoContext";
import {createDemoAccount} from "@/api/registration/createDemoAccount";
import LoadingScreen from "@/components/loadingScreen";
import {useTranslation} from "next-i18next";
import {usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

interface IDemoTurnModal {
    setIsDemoTurnModalOpened: (x: boolean) => void;
}

const DemoTurnModal = ({setIsDemoTurnModalOpened}: IDemoTurnModal) => {
        const router = useRouter();
        const pathname = usePathname();
        const pathnameParts = pathname.split("/");
        const {t} = useTranslation("demo_modal");
        const description: any = t("description", {returnObjects: true});
        const [demoAccountExists, setDemoAccountExists] = useState<boolean>(false);
        const overView = useSelector((state: RootState) => state.overView);
        const {toggleDemo} = useDemo();
        const [isProcessing, setIsProcessing] = useState(false);

        useEffect(() => {
            if (!overView) {
                return;
            }

            if (overView.allow) {
                setDemoAccountExists(overView.demoAccounts.length > 0);
            }
        }, [overView]);

        const handleCloseModal = () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
            setIsDemoTurnModalOpened(false);
        };

        const handleTurnDemo = () => {
            setIsProcessing(true);

            createDemoAccount({
                campaignId: 53,
            })
                .then(() => {
                    setIsProcessing(false);
                    toggleDemo();
                    handleCloseModal();

                    if (pathnameParts[3] && pathnameParts[2] === "trade-accounts") {
                        router.push("/trading/trade-accounts");
                    } else {
                        window.location.reload();
                    }
                });
        };

        const handleTurnToDemo = () => {
            toggleDemo();
            if (pathnameParts[3] && pathnameParts[2] === "trade-accounts") {
                router.push("/trading/trade-accounts");
            }
            handleCloseModal();
        };

        return (
            <div
                className={`fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50`}
            >
                <LoadingScreen isLoading={isProcessing}/>
                {
                    demoAccountExists && overView.allow && <div
                        className="relative w-[342px] md:w-full md:max-w-[676px] max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="relative bg-white rounded-lg px-[94px] tablet:px-6 pt-[72px] pb-[64px]  flex flex-col gap-8">
                            <div className="flex flex-col gap-4 items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8C11.25 8.41421 11.5858 8.75 12 8.75ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H10.5V11.75H11.25V15.25H10.5C10.0858 15.25 9.75 15.5858 9.75 16C9.75 16.4142 10.0858 16.75 10.5 16.75H13.5V15.25H12.75V11Z"
                                          fill="#2B2A28"/>
                                </svg>
                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span className="text-20-18 font-medium">
                                        {t("title")}
                                    </span>
                                    <span
                                        className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}
                                    >
                                    {description[0]} <br/>
                                        {description[1]} <br/>
                                        {description[2]}
                            </span>
                                </div>
                            </div>
                            <div className={"flex gap-2 items-center self-center"}>
                                <button
                                    type="button"
                                    className={"btnSec"}
                                    onClick={handleCloseModal}
                                >
                                    {t("buttons.cancel")}
                                </button>
                                <button
                                    type="button"
                                    className={"btnPrim"}
                                    onClick={handleTurnToDemo}
                                >
                                    {t("buttons.Continue")}
                                </button>

                            </div>
                        </div>
                    </div>
                }
                {
                    !demoAccountExists && overView.allow && <div
                        className="relative w-[342px] md:w-full md:max-w-[676px] max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="relative bg-white rounded-lg px-[94px] tablet:px-6 pt-[72px] pb-[64px]  flex flex-col gap-8">
                            <div className="flex flex-col gap-4 items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8C11.25 8.41421 11.5858 8.75 12 8.75ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H10.5V11.75H11.25V15.25H10.5C10.0858 15.25 9.75 15.5858 9.75 16C9.75 16.4142 10.0858 16.75 10.5 16.75H13.5V15.25H12.75V11Z"
                                          fill="#2B2A28"/>
                                </svg>
                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span className="text-20-18 font-medium">
                                        {t("no_demo_account.title1")} <br/> {t("no_demo_account.title2")}
                                    </span>
                                    <span
                                        className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}
                                    >
                                    {description[0]} <br/>
                                        {description[1]} <br/>
                                        {description[2]}
                            </span>
                                </div>
                            </div>
                            <div className={"flex gap-2 items-center self-center"}>
                                <button
                                    type="button"
                                    className={"btnSec"}
                                    onClick={handleCloseModal}
                                >
                                    {t("buttons.cancel")}
                                </button>
                                <button
                                    type="button"
                                    className={"btnPrim"}
                                    onClick={handleTurnDemo}
                                >
                                    {t("no_demo_buttons.yes")}
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
;

export default DemoTurnModal;
