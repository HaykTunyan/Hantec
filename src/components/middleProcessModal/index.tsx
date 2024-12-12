import React, { FC } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { useTranslation } from "next-i18next";

interface MiddleProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  type?: string;
}

const MiddleProcessModal: FC<MiddleProcessModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  type,
}) => {
  /**
   * MiddleProcessModal Hooks.
   */

  const { t } = useTranslation("dashboard");

  if (!isOpen) return null;  

  const handleCloseModal = () => {
    document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50`}
      onClick={onClose}
    >
      <div
        className="relative w-[342px] md:w-full md:max-w-[676px] max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg px-[94px] pt-[72px] pb-[64px]  flex flex-col">
          <div className="flex flex-col gap-4 items-center relative">
            <FadeLoader
              color={"black"}
              loading={true}
              width={2}
              height={7}
              aria-label="Loading Spinner"
              data-testid="loader"
              margin={-3}
              cssOverride={{ transform: "translateX(8px)" }}
            />
            <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
              <span className="text-20-18 font-medium">
                {t("middle_process_title")}
                {/* Complete Account Registration... */}
              </span>
              <span
                className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}
              >
                {t("middle_process_description")}
                {/* Please continue to complete the account registration process. */}
              </span>
            </div>
          </div>
          <div className="mt-8" />
          <div className="flex flex-row justify-center">
            <div className="flex justify-between w-full md:w-auto md:justify-center flex-row gap-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex justify-center px-5 py-[14px] border border-grey-extra-light rounded"
              >
                <span className="text-sm font-medium leading-3.5 text-default">
                  {t("cancel_btn")}
                </span>
              </button>
              <button
                type="button"
                onClick={onContinue}
                className="flex justify-center px-5 py-[14px] bg-default  rounded "
              >
                <span className="text-sm font-medium leading-3.5 text-white">
                  {t("continue_btn")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleProcessModal;
