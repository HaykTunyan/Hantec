"use client";

import React from "react";
import ProgressBadge from "@/components/registration/registrationPassedSteps/progressBadge";
import {useTranslation} from "next-i18next";

interface IRegistrationPassedSteps {
    accountName: string;
    progressStep: number
}

const RegistrationPassedSteps = ({accountName, progressStep}: IRegistrationPassedSteps) => {
    const {t} = useTranslation("onboarding");
    const verifyBadge: any = t("dashboard_info", {returnObjects: true});
    const verifyPassedSteps: any = t("dashboard_info.steps", {returnObjects: true});

    return (
        <div id={"onboarding"} className="w-full bg-orange-extra-light py-8 px-6 tablet:px-0 flex flex-col items-start gap-10">
            <div className="flex flex-col gap-1 tablet:px-4">
                <span className="text-20 text-default font-medium">{verifyBadge.title}, {accountName}</span>
                <span className="text-14_16 text-grey-seccondary tracking-wider">
                    {verifyBadge.description}
                </span>
            </div>
            <div className="grid grid-cols-3 tablet:flex tablet:flex-nowrap tablet:px-4 gap-1 w-full tablet:overflow-y-hidden">
                {/*<ProgressBadge*/}
                {/*    isPassed={progressStep > 0}*/}
                {/*    icon={"mail"}*/}
                {/*    processTime={2}*/}
                {/*    title={"Email verification"}*/}
                {/*    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}*/}
                {/*/>*/}
                <ProgressBadge
                    isPassed={progressStep > 1}
                    icon={"id"}
                    processTime={5}
                    title={verifyPassedSteps[0].title}
                    description={verifyPassedSteps[0].description}
                />
                <ProgressBadge
                    isPassed={progressStep > 2}
                    icon={"addressProof"}
                    processTime={5}
                    title={verifyPassedSteps[1].title}
                    description={verifyPassedSteps[1].description}
                />
                <ProgressBadge
                    isPassed={progressStep > 3}
                    icon={"clientProcess"}
                    processTime={5}
                    title={verifyPassedSteps[2].title}
                    description={verifyPassedSteps[2].description}
                />
            </div>
        </div>
    );
};

export default RegistrationPassedSteps;
