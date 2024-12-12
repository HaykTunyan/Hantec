import React from "react";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
}

const Instructions = ({setSelectedTab, lineWidth}: IStepsInfo) => {
    const {t} = useTranslation("onboarding");
    const idVerify: any = t("main_event.id_verify", {returnObjects: true});

    const instructions = [
        idVerify.instructions[0],
        idVerify.instructions[1],
        idVerify.instructions[2],
        idVerify.instructions[3]
    ];

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={t("exit.save_exit")}/>
            </div>
            <div className="max-w-[356px] mobile:max-w-full w-full mx-auto flex flex-col gap-8 tablet:mb-10 mobile:px-4">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        {idVerify.title}
                    </button>
                    <span className="text-32 font-medium">
                        {idVerify.description1} {idVerify.description2}
                    </span>
                </div>
                <div className="flex flex-col gap-6 items-start">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M10 2.28906C5.74282 2.28906 2.29169 5.7402 2.29169 9.9974C2.29169 14.2546 5.74282 17.7057 10 17.7057C14.2572 17.7057 17.7084 14.2546 17.7084 9.9974C17.7084 5.7402 14.2572 2.28906 10 2.28906ZM1.04169 9.9974C1.04169 5.04984 5.05247 1.03906 10 1.03906C14.9476 1.03906 18.9584 5.04984 18.9584 9.9974C18.9584 14.9449 14.9476 18.9557 10 18.9557C5.05247 18.9557 1.04169 14.9449 1.04169 9.9974ZM8.75002 9.78906V8.53906H10C10.3452 8.53906 10.625 8.81888 10.625 9.16406V12.7057H11.25V13.9557H10H8.75002C8.40484 13.9557 8.12502 13.6759 8.12502 13.3307C8.12502 12.9856 8.40484 12.7057 8.75002 12.7057H9.37502V9.78906H8.75002ZM10 7.28906C10.3452 7.28906 10.625 7.00924 10.625 6.66406C10.625 6.31888 10.3452 6.03906 10 6.03906C9.65484 6.03906 9.37502 6.31888 9.37502 6.66406C9.37502 7.00924 9.65484 7.28906 10 7.28906Z"
                              fill="#686765"/>
                    </svg>
                    <span className="text-20-20 font-medium text-default">
                        {idVerify.instructions_title}
                    </span>
                </div>
                <div className="flex flex-col items-start gap-3 pb-4">
                    {
                        instructions.map((instruction, index) =>
                            <div key={index} className="flex items-center gap-3">
                                <svg
                                    className="w-6 h-6 object-contain"
                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                                          fill="#2B2A28"/>
                                </svg>
                                <span className="text-14_16 text-grey-seccondary">{instruction}</span>
                            </div>
                        )
                    }
                </div>
                <div className="flex pt-6 border-t border-grey-extra-light">
                    <span className="text-14_16 text-grey-seccondary">
                        * {idVerify.hint}
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div
                    className="py-2 px-4 flex items-center justify-end border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    {/*<button*/}
                    {/*    onClick={() => setSelectedTab("steps")}*/}
                    {/*    className="btnSec"*/}
                    {/*>*/}
                    {/*    Back*/}
                    {/*</button>*/}
                    <button
                        onClick={() => setSelectedTab("choose-platform")}
                        className="btnPrim"
                    >
                        {idVerify.buttons.continue}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Instructions;
