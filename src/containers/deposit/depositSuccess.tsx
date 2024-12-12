import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "next-i18next";

interface DepositSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositSuccess: React.FC<DepositSuccessProps> = ({
  isOpen,
  onClose,
}) => {
  /**
   * DepositSuccess Hooks.
   */

  const router = useRouter();
  const { t } = useTranslation("deposit");

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <div className=" fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 "
    onClick={onClose}
    >
      <div className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full  "
       onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg px-6 py-4  font-aeonik">
          <div className="mt-6" />
          <div className=" w-full md:mx-auto md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="mt-[16px]" />
              <div className="flex flex-col justify-center tracking-tight">
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default tracking-tight text-center">
                  {t("back")}
                </h4>
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default tracking-tight text-center">
                  {t("your_deposit_request")}
                </h4>
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default  tracking-tight text-center">
                  {t("is_processing")}
                </h4>
              </div>
            </div>
            <div className="mt-8" />
            <div className="flex justify-center px-0 md:px-18">
              <button
                type="button"
                onClick={handleSuccess}
                className="bg-orange py-[14px] px-5 rounded  text-center items-center"
              >
                <span className="font-medium text-sm leading-3.5 text-white">
                  OK
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default DepositSuccess;
