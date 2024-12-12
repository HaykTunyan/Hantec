import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useDemo} from "@/context/DemoContext";
import {useTranslation} from "next-i18next";

interface ILeaveModal {
    setIsLeaveModalOpened: (x: boolean) => void;
}

const LeaveModal = ({setIsLeaveModalOpened}: ILeaveModal) => {
    const router = useRouter();
    const [isLeaving, setIsLeaving] = useState<boolean>(false);
    const {toggleDemo, demo} = useDemo();

    const {t} = useTranslation("onboarding");

    const handleContinueRegister = () => {
        setIsLeaveModalOpened(false);
    };

    const handleLeaving = () => {
        setIsLeaving(true);
        if (demo) {
            toggleDemo();
        }

        const timeoutTime = 3000;
        setTimeout(() => {
            router.push("/dashboard");
        }, timeoutTime);
    };

    useEffect(() => {
        return () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        };
    }, []);

    return (
        <div className="fixed w-[58%] right-0 top-0 bottom-0 tablet:inset-0 tablet:w-full bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8C11.25 8.41421 11.5858 8.75 12 8.75ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H10.5V11.75H11.25V15.25H10.5C10.0858 15.25 9.75 15.5858 9.75 16C9.75 16.4142 10.0858 16.75 10.5 16.75H13.5V15.25H12.75V11Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        {
                            isLeaving
                                ? <>
                                    <span className={"text-20 font-medium"}>
                                        {t("exit.leaving.title")}
                                    </span>
                                    <span className="text-14 text-grey-seccondary tracking-wider">
                                        {t("exit.leaving.title")}
                                    </span>
                                </>
                                : <span className={"text-20 font-medium"}>
                                        {t("exit.title")}
                                </span>
                        }
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    {
                        isLeaving ? <Link
                                href={"/dashboard"}
                                className="btnPrim"
                            >
                                {t("exit.button.continue")}
                            </Link>
                            :
                            <>
                                <button
                                    className="btnSec"
                                    onClick={handleLeaving}
                                >
                                    {t("exit.button.leave")}
                                </button>
                                <button
                                    className="btnPrim"
                                    onClick={handleContinueRegister}
                                >
                                    {t("exit.button.continue")}
                                </button>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default LeaveModal;
