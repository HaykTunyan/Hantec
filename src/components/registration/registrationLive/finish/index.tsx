import React from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";

const Finish = () => {
    const router = useRouter();

    const {t} = useTranslation("onboarding");
    const registerDone: any = t("main_event.verify_done", {returnObjects: true});

    return (
        <div className="fixed z-[11111111] top-0 left-0 right-0 bottom-0 bg-white min-h-screen w-screen flex flex-col gap-10 justify-between items-center">
            <div className="flex items-center justify-center w-full py-4">
                <img
                    onClick={() => router.push("/")}
                    src="/icons/Logo-Hantec.svg"
                    alt=""
                    className="cursor-pointer tablet:hidden"
                />
                <img
                    onClick={() => router.push("/")}
                    src="/icons/new/logoSmallRed.svg"
                    alt=""
                    className="hidden cursor-pointer tablet:block w-8 h-6"
                />
            </div>
            <div className="flex flex-col items-center gap-14 tablet:gap-10 w-[478px] mobile:w-full tablet:px-7">
                <img
                    src="/images/registration/registrationDone.png"
                    alt=""
                    className="w-[120px] h-[120px] object-contain tablet:w-[100px] tablet:h-[100px]"
                />
                <div className="flex flex-col items-center text-center gap-2.5">
                    <span className="text-48-32 tracking-wider">{registerDone.title1} <br/> {registerDone.title2}</span>
                    <span className="text-18 letterSPacing2 text-grey-seccondary">
                        {registerDone.description}
                    </span>
                </div>
                <button
                    className='btnPrim'
                    onClick={() => router.push("/dashboard")}
                >{registerDone.buttons.explore}</button>
            </div>
            <div className="h-[63px] w-full"></div>
        </div>
    );
};

export default Finish;
