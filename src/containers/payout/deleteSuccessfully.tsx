import React from "react";
import { useTranslation } from "next-i18next";

interface DeleteSuccessfullyProps {
  isOpen: boolean;
  onClose: () => void;
  sendType: string;
}

const DeleteSuccessfully: React.FC<DeleteSuccessfullyProps> = ({
  isOpen,
  onClose,
  sendType,
}) => {
  /**
   * DeleteSuccessfully Hooks.
   */

  if (!isOpen) return null;

  const { t } = useTranslation("payout");

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full  "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg px-6 py-4  font-aeonik">
          <div className="flex justify-end ">
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <img src="/icons/management/modal-close.svg" alt="Modal-Close" />
            </button>
          </div>
          <div className="mt-6" />
          <div className="md:mx-auto w-full md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="mt-4" />
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-2xl leading-7 text-default tracking-tight text-center">
                  {t("delete_succesfully")} !
                </h4>
                <div className="mt-1" />
                <div className="mt-1" />
                <p className="font-normal text-sm leading-4 tracking-normal text-center text-grey-seccondary ">
                  <br />
                  {t("the")}{" "}
                  {sendType === "crypto"
                    ? t("crypto_wallet")
                    : sendType === "mobile"
                    ? t("mobile_money")
                    : sendType === "perfect"
                    ? t("perfect_money")
                    : t("crypto_wallet")}
                  {/* {"  "} {t("account")}  */}
                  <span className="lowercase">
                    {" "}
                    {t("is")} {"  "}
                    {t("removed")}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-8" />
            <div className="mt-5 md:mt-8" />
            <div className="flex flex-row justify-center">
              <div className="flex w-auto justify-center flex-row gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex justify-center px-5 py-[14px] bg-orange rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    {t("continue")}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccessfully;
