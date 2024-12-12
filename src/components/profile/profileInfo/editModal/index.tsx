import React, {ChangeEvent, useRef, useState} from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import {confirmUserPassword} from "@/api/profile/confirmUserPassword";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void
    setIsProfileInfoEditable: (x: boolean) => void
}

const EditModal = ({setIsEditModalOpened, setIsProfileInfoEditable}: IEditModal) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const {t} = useTranslation("profile");

    const title = t("info.confirm_modal.title");
    const description = t("info.confirm_modal.description");
    const currentPasswordLabel = t("info.confirm_modal.current_password");
    const passwordPlaceholder = t("info.confirm_modal.password_placeholder");
    const cancel = t("info.confirm_modal.buttons.cancel");
    const continueBtn = t("info.confirm_modal.buttons.continue");

    const disabled = isProcessing || !password;

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        const currentPassword = e.target.value;

        setPassword(currentPassword);
    };

    const handleCheckUserPassword = () => {
        setIsProcessing(true);
        confirmUserPassword(password)
            .then(res => {
                if (res && res.data && res.data.data) {
                    setIsEditModalOpened(false);
                    setIsProfileInfoEditable(true);
                } else {
                    setPasswordConfirmError(true);
                }
                setIsProcessing(false);
            });
    };

    const modalRef = useRef(null);
    useOnClickOutside(modalRef, setIsEditModalOpened);

    return (
        <div className="fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                ref={modalRef}
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M11.5637 3.75C9.65713 3.75 8.11157 5.29555 8.11157 7.20208V10.6542H15.0157V7.20208C15.0157 5.29556 13.4702 3.75 11.5637 3.75ZM6.61157 7.20208V10.6542H3.25V22.2392H19.8775V10.6542H16.5157V7.20208C16.5157 4.46712 14.2986 2.25 11.5637 2.25C8.8287 2.25 6.61157 4.46713 6.61157 7.20208ZM4.75 12.1542V20.7392H18.3775V12.1542H4.75ZM10.8137 14.7658V18.1275H12.3137V14.7658H10.8137Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span className="text-20-18 font-medium">{title}</span>
                        <span className="text-14 text-grey-seccondary tracking-wider">{description}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-5 relative">
                    <label htmlFor="password" className="text-14 tracking-wider text-default">{currentPasswordLabel}</label>
                    <Input
                        htmlFor={"password"}
                        currentValue={password}
                        handleValueChange={handlePasswordInput}
                        type={`${isPasswordVisible ? "text" : "password"}`}
                        placeholder={passwordPlaceholder}
                        errorMsg={passwordConfirmError}
                    />
                    <svg
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3.5 top-1/2 cursor-pointer"
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.66699 9.99935C1.66699 9.99935 4.6973 4.16602 10.0003 4.16602C15.3034 4.16602 18.3337 9.99935 18.3337 9.99935C18.3337 9.99935 15.3034 15.8327 10.0003 15.8327C4.6973 15.8327 1.66699 9.99935 1.66699 9.99935Z"
                            stroke="#686765" strokeWidth="1.25" strokeLinejoin="round"/>
                        <path
                            d="M9.99967 11.6673C10.9201 11.6673 11.6663 10.9211 11.6663 10.0007C11.6663 9.08018 10.9201 8.33398 9.99967 8.33398C9.0792 8.33398 8.33301 9.08018 8.33301 10.0007C8.33301 10.9211 9.0792 11.6673 9.99967 11.6673Z"
                            stroke="#686765" strokeWidth="1.25" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="flex gap-2 justify-center">
                    <Button
                        btnName={cancel}
                        className={"btnSec"}
                        setAction={setIsEditModalOpened}
                        actionValue={false}
                    />
                    <button
                        className="btnPrim"
                        onClick={handleCheckUserPassword}
                        disabled={disabled}
                    >
                        {continueBtn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
