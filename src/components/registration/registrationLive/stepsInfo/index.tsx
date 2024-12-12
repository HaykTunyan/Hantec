import React, {useState} from "react";
import PhoneCheckModal from "@/components/registration/registrationLive/stepsInfo/phoneCheckModal";
import Steps from "@/components/registration/registrationLive/stepsInfo/steps";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    accOpenId: number | undefined;
}

// const platformSteps = {
//     btnName: "Trading Platform",
//     steps: [
//         {
//             title: "Select which platform you want to trade on",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
//         }
//     ]
// };

const StepsInfo = ({setSelectedTab, accOpenId}: IStepsInfo) => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const {t} = useTranslation("onboarding");
    const mainEvent: any = t("main_event", {returnObjects: true});
    const verificationStepsTexts: any = t("main_event.account_verification_steps.steps", {returnObjects: true});

    const handleOpenCheckModal = () => {
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
        setIsModalOpened(true);
    };

    const verificationSteps = {
        btnName: mainEvent.account_verification_steps.account_verify,
        steps: [
            {
                title: verificationStepsTexts[0].title,
                description: verificationStepsTexts[0].description
            },
            {
                title: verificationStepsTexts[1].title,
                description: verificationStepsTexts[1].description
            },
            {
                title: verificationStepsTexts[2].title,
                description: verificationStepsTexts[2].description
            }
        ]
    };

    return (
        <div className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 relative">
            {
                isModalOpened
                && <PhoneCheckModal
                    accOpenId={accOpenId}
                    setIsEditModalOpened={setIsModalOpened}
                    setSelectedTab={setSelectedTab}
                />
            }
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={t("exit.exit")}/>
            </div>
            <div className="max-w-[477px] w-full mx-auto flex flex-col gap-10 mb-10">
                <div className="hidden tablet:flex items-center justify-start px-4">
                    <span className="text-32 font-medium">
                        {t("main_event.account_verification_steps.description1")} {t("main_event.account_verification_steps.description2")}
                    </span>
                </div>
                <Steps
                    btnName={verificationSteps.btnName}
                    steps={verificationSteps.steps}
                    removeLastBorder={true}
                />
                {/*<Steps*/}
                {/*    btnName={platformSteps.btnName}*/}
                {/*    steps={platformSteps.steps}*/}
                {/*    removeLastBorder={true}*/}
                {/*/>*/}
            </div>
            <div></div>
            <div
                className="py-2 px-4 flex items-center justify-end border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                <button
                    onClick={handleOpenCheckModal}
                    className="btnPrim"
                >
                    {mainEvent.account_verification_steps.buttons.lets_start}
                </button>
            </div>
        </div>
    );
};

export default StepsInfo;
