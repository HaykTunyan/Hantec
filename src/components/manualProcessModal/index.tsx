import React, { FC } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { useTranslation } from "next-i18next";

interface ManualProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

const ManualProcessModal: FC<ManualProcessModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  /**
   * ManualProcessModal Hooks.
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
                {t("modal_porcess_title")}
              </span>

              {type === "proccess" ? (
                <span
                  className={
                    "text-14_16 text-grey-seccondary tracking-[0.28px]"
                  }
                >
                   {t("modal_process_description_pricess")}
                </span>
              ) : (
                <span
                  className={
                    "text-14_16 text-grey-seccondary tracking-[0.28px]"
                  }
                >
                  {/* You will receive the login and password via email after your
                application is approved. */}
                {t("modal_process_description_checked")}
                </span>
              )}

              {/* <span
                className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}
              >
              
                You will receive the login and password via email after your
                application is approved.          
              </span> */}
            </div>
          </div>
          <div className="mt-8" />
          <button
            type="button"
            className={"btnPrim self-center"}
            onClick={handleCloseModal}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualProcessModal;
