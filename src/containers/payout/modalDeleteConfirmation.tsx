import React, { useState, ChangeEvent } from "react";
import Input from "@/components/input";
import { useTranslation } from "next-i18next";

// Delete Methods.
import {
  deletePerfectMoney,
  deleteBankSubmit,
  deleteCryptoSubmit,
  deleteMobileMoneySubmit,
} from "@/services";

interface ModalDeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  sendType: string;
  sendId: string;
}

const ModalDeleteConfirmation: React.FC<ModalDeleteConfirmationProps> = ({
  isOpen,
  onClose,
  sendType,
  sendId,
}) => {
  /**
   * ModalCondifrmPassword Hooks.
   */

  if (!isOpen) return null;

  const { t } = useTranslation("reminder");


  const title = t("confirmation.title");
  const description = t("confirmation.description");
  const currentPasswordLabel = t("info.confirm_modal.current_password");
  const passwordPlaceholder = t("info.confirm_modal.password_placeholder");
  const cancel = t("info.confirm_modal.buttons.cancel");
  const deleteBtn = t("delete.buttons.delete");

  // @ts-ignore
  const [isDeletePasswordVisible, setisDeletePasswordVisible] =
    useState<boolean>(false);
  // @ts-ignore
  const [password, setDeletePassword] = useState<string>("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;

    setDeletePassword(currentPassword);
  };

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
      if (response.success === "success") {
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      onClose();
    }
  };

  // const handleDeleteModal = async () => {
  //   if (sendType === "perfect") {

  //      const response = await deletePerfectMoney(Number(sendId));
  //     onClose();

  //     if (response.success === "success") {
  //       // onClose();
  //     }
  //   }
  //   if (sendType === "bank") {
  //     const response = await deleteBankSubmit(Number(sendId));
  //     onClose();
  //     if (response.success === "success") {
  //       onClose();
  //     }
  //   }

  //   if (sendType === "crypto") {
  //     const response = await deleteCryptoSubmit(Number(sendId));
  //     onClose();
  //     if (response.success === "success") {
  //       onClose();
  //     }
  //   }

  //   if (sendType === "mobile") {
  //     const response = await deleteMobileMoneySubmit(Number(sendId));
  //     onClose();
  //     if (response.success === "success") {
  //       onClose();
  //     }
  //   }
  // };

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
          <div className="mt-16" />
          <div className="md:mx-auto w-full md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/management/Padlock_Off_20.svg"
                  alt="Padlock_Off_20"
                />
              </div>
              <div className="mt-4" />
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-xl leading-6 text-default  tracking-tight text-center">
                  {title}
                </h4>
                <div className="mt-1" />
                <p className="font-normal text-sm leading-4 tracking-normal text-center text-grey-seccondary">
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-8" />
            <div className="px-0 md:px-14 ">
              <div className="flex flex-col mb-5 gap-1.5 relative">
                <label htmlFor="password" className="text-14 text-default">
                  {currentPasswordLabel}
                </label>
                <Input
                  htmlFor={"password"}
                  currentValue={password}
                  handleValueChange={handlePasswordChange}
                  type={`${isDeletePasswordVisible ? "text" : "password"}`}
                  placeholder={passwordPlaceholder}
                />
                <svg
                  onClick={() =>
                    setisDeletePasswordVisible(!isDeletePasswordVisible)
                  }
                  className="absolute right-3.5 top-1/2 cursor-pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66699 9.99935C1.66699 9.99935 4.6973 4.16602 10.0003 4.16602C15.3034 4.16602 18.3337 9.99935 18.3337 9.99935C18.3337 9.99935 15.3034 15.8327 10.0003 15.8327C4.6973 15.8327 1.66699 9.99935 1.66699 9.99935Z"
                    stroke="#686765"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99967 11.6673C10.9201 11.6673 11.6663 10.9211 11.6663 10.0007C11.6663 9.08018 10.9201 8.33398 9.99967 8.33398C9.0792 8.33398 8.33301 9.08018 8.33301 10.0007C8.33301 10.9211 9.0792 11.6673 9.99967 11.6673Z"
                    stroke="#686765"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-5 md:mt-10" />
            <div className="flex flex-row justify-center">
              <div className="flex w-auto justify-center flex-row gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex justify-center px-5 py-[14px] border border-grey-extra-light rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-default">
                    {cancel}
                  </span>
                </button>
                <button
                  type="button"
                  disabled={password ? false : true}
                  onClick={() => handleDeleteModal()}
                  className={`flex justify-center px-5 py-[14px] bg-default  rounded 
                    ${password  ? "cursor-pointer" : "cursor-not-allowed" }
                    `} 
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    {deleteBtn}
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

export default ModalDeleteConfirmation;
