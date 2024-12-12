import React, { useState, ChangeEvent } from "react";
import Input from "@/components/input";
import { useTranslation } from "next-i18next";

interface ModalCondifrmPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  confirmed: () => void;
}

const ModalCondifrmPassword: React.FC<ModalCondifrmPasswordProps> = ({
  isOpen,
  onClose,
  confirmed,
}) => {
  /**
   * ModalCondifrmPassword Hooks.
   */

  if (!isOpen) return null;

  const { t } = useTranslation("profile");

  const title = t("info.confirm_modal.title");
  const description = t("info.confirm_modal.description");
  const currentPasswordLabel = t("info.confirm_modal.current_password");
  const passwordPlaceholder = t("info.confirm_modal.password_placeholder");
  const cancel = t("info.confirm_modal.buttons.cancel");
  const continueBtn = t("info.confirm_modal.buttons.continue");

  // @ts-ignore
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  // @ts-ignore
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;

    setPassword(currentPassword);
  };

  return (
    <div
      className=" fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden  bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full  "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg  px-6 py-4  font-aeonik">
          <div className="mt-5 md:mt-16" />
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
              <div className="flex flex-col mb-5 gap-1.5 relative ">
                <label htmlFor="password" className="text-14 text-default">
                  {currentPasswordLabel}
                </label>
                <Input
                  htmlFor={"password"}
                  currentValue={password}
                  handleValueChange={handlePasswordChange}
                  type={`${isPasswordVisible ? "text" : "password"}`}
                  placeholder={passwordPlaceholder}
                />
                <svg
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
              <div className="flex justify-between w-full md:w-auto md:justify-center flex-row gap-2">
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
                  onClick={() => confirmed()}
                  className="flex justify-center px-5 py-[14px] bg-default  rounded "
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    {continueBtn}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mb-0 md:mb-6" />
        </div>
      </div>
    </div>
  );
};

export default ModalCondifrmPassword;
