import React from "react";
import { useTranslation } from "next-i18next";

// Delete Methods.
import {
  deletePerfectMoney,
  deleteBankSubmit,
  deleteCryptoSubmit,
  deleteMobileMoneySubmit,
} from "@/services";

interface ModalDeleteReminderProps {
  isOpen: boolean;
  onClose: () => void;
  sendType: string;
  sendId: string;
  confirmation: (type: string) => void;
}

const ModalDeleteReminder: React.FC<ModalDeleteReminderProps> = ({
  isOpen,
  onClose,
  sendType,
  sendId,
  confirmation,
}) => {
  /**
   * ModalDeleteReminder Hooks.
   */

  const { t } = useTranslation("payout");

  if (!isOpen) return null;

  const handleDeleteModal = async () => {
    const deleteFunctions = {
      perfect: deletePerfectMoney,
      bank: deleteBankSubmit,
      crypto: deleteCryptoSubmit,
      mobile: deleteMobileMoneySubmit,
    };

    // @ts-ignore
    const deleteFunction = deleteFunctions[sendType];
    if (!deleteFunction) return;

    try {
      const response = await deleteFunction(Number(sendId));
      confirmation("success");
      if (response.success === "success") {
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      onClose();
    }
  };

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
          <div className="mt-14" />
          <div className="md:mx-auto w-full md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/management/info-circle_dark.svg"
                  alt="Padlock_Off_20"
                />
              </div>
              <div className="mt-4" />
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-xl leading-6 text-default tracking-tight text-center">
                  {t("reminder")}
                </h4>
                <div className="mt-1" />
                <p className="font-normal text-sm leading-4 tracking-normal text-center text-grey-seccondary">
                  {t("confirm_delete_title")}
                  <br />
                  {sendType === "crypto"
                    ? t("crypto_wallet")
                    : sendType === "mobile"
                    ? t("mobile_money")
                    : sendType === "perfect"
                    ? t("perfect_money")
                    : t("crypto_wallet")}
                  {"  "} {t("account")}
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
                  className="flex justify-center px-5 py-[14px] border border-grey-extra-light rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-default">
                    {t("cancel")}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteModal()}
                  className={`flex justify-center px-5 py-[14px] bg-default  rounded cursor-pointer 
               
                    `}
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    {t("confirm")}
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

export default ModalDeleteReminder;
