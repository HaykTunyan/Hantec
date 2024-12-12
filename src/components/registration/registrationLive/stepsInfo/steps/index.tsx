import React from "react";
import Step from "@/components/registration/registrationLive/stepsInfo/steps/step";

export interface IStep {
    title: string;
    description: string;
}

interface ISteps {
    btnName: string,
    steps: IStep[],
    removeLastBorder?: boolean
}

const Steps = ({btnName, steps, removeLastBorder}: ISteps) => {
    return (
        <div className="flex flex-col tablet:px-6">
            <div className="flex gap-7">
                <span className="text-24-g text-default pt-1.5 opacity-0">01</span>
                <button className="btnSec btnBadge">
                    {btnName}
                </button>
            </div>
            <div className="flex flex-col">
                {
                    steps.map((step, index) =>
                        <Step
                            key={index}
                            index={index}
                            title={step.title}
                            description={step.description}
                            removeLastBorder={removeLastBorder}
                            lastIndex={steps.length - 1}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Steps;
