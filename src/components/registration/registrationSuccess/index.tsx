import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {createDemoAccount} from "@/api/registration/createDemoAccount";
import {useDemo} from "@/context/DemoContext";

interface IRegistrationSuccess {
    isDemo: boolean;
}

const RegistrationSuccess = ({isDemo}: IRegistrationSuccess) => {
    const {t} = useTranslation("registration");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const {demo, toggleDemo} = useDemo();

    const title = t("registration_done.title");
    const description = t("registration_done.description");
    const tradeLiveBtn = t("registration_done.buttons.trade_live");
    const laterBtn = t("registration_done.buttons.later");
    const demoBtn = t("registration_done.buttons.demo");

    const router = useRouter();

    const handleRedirectToDemo = () => {
        setIsProcessing(true);

        createDemoAccount({
            campaignId: 53,
        })
            .then(() => {
                if (!demo) {
                    toggleDemo();
                }
                router.push("/dashboard");
                setIsProcessing(false);
            })
            .catch((err) => setIsProcessing(false));
    };

    const handleRedirectOpenLiveAccount = () => {
        router.push("/registration/register-live-account");
    };

    return (
        <div className="max-w-[448px] tablet:px-6 w-full mx-auto flex flex-col gap-10 tablet:gap-20">
            <div className="flex flex-col gap-2.5 text-center tablet:px-6">
                <span className="text-48-32 font-medium text-default">{title}</span>
                <span className="text-18-16-l2 text-grey-seccondary">
                   {description}
                </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                {
                    isDemo
                        ? <button
                            disabled={isProcessing}
                            className={`btnPrim`}
                            onClick={handleRedirectToDemo}
                        >
                            {demoBtn}
                        </button>
                        : <>
                            <button
                                className={`btnPrim btnLiveTrade`}
                                onClick={handleRedirectOpenLiveAccount}
                            >
                                {tradeLiveBtn}
                            </button>
                            <Link
                                href={"/dashboard"}
                                className="text-14 text-grey-seccondary cursor-pointer"
                            >{laterBtn}</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default RegistrationSuccess;

