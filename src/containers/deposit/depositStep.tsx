import React, { useState, FC } from "react";
import { useTranslation } from "next-i18next";

const steps = ["Verification", "Hash/TxID", "Confirmation", "Completion"];

const DepositStep: FC = () => {
  /**
   *  Deposit Step Hooks.
   */

  const { t } = useTranslation("deposit");
  const nullCurrent = 0;
  const oneCurrent = 1;
  const twoCurrent = 2;
  // const foureCurrent = 3
  const [currentStep, setCurrentStep] = useState(nullCurrent);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-grey-seccondary border-b-2 focus:outline-none 
                ${
                  index === currentStep
                    ? "border-grey-seccondary text-grey-seccondary"
                    : "border-transparent"
                }`}
            disabled
          >
            {step}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="p-4">
        {currentStep === nullCurrent && (
            <div className="">

            </div>   
        )}
        {currentStep === oneCurrent &&  ( 
          <div className=""> 
           
          </div> 
        )}
        {currentStep === twoCurrent && (
          <div className=""> 
          
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          disabled={currentStep === 0}
        >
          {t("back")}
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default DepositStep;
