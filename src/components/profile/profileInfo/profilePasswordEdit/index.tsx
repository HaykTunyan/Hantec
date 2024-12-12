import React, {ChangeEvent, useEffect, useState} from "react";
import Input from "@/components/input";
import {useTranslation} from "next-i18next";

interface IProfileInfoRow {
    name: string,
    value: string,
    isPassword?: boolean,
    setPasswords: (x: any) => void
}

const ProfilePasswordEdit = ({name, value, isPassword, setPasswords}: IProfileInfoRow) => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState<boolean>(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(false);
    const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState<boolean>(false);
    const [atLeast8Characters, setAtLeast8Characters] = useState<boolean>(false);
    const [atLeastOneLetter, setAtLeastOneLetter] = useState<boolean>(false);
    const [atLeastOneNumber, setAtLeastOneNumber] = useState<boolean>(false);
    const [atLeastOneSymbol, setAtLeastOneSymbol] = useState<boolean>(false);
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

    const passwordMinLength = 8;

    const {t} = useTranslation("profile");

    const passwordOld = t("info.edit.password_old");
    const passwordNew = t("info.edit.password_new");
    const passwordNewPlaceholder = t("info.edit.password_new_placeholder");
    const passwordRepeat = t("info.edit.password_repeat");
    const passwordRepeatPlaceholder = t("info.edit.password_repeat_placeholder");
    const passwordRequirements = t("info.edit.password_requirements");
    const dontMatchError = t("info.edit.dont_match_error");

    useEffect(() => {
        if (!newPassword || !repeatPassword) {
            setPasswordErrMsg("");
            return;
        }

        if (atLeast8Characters && atLeastOneLetter && atLeastOneNumber && oldPassword && newPassword && newPassword === repeatPassword) {
            setPasswords({oldPassword, newPassword, newPasswordConfirm: repeatPassword});
        }

        if (atLeast8Characters && atLeastOneLetter && atLeastOneSymbol && atLeastOneNumber) {
            setPasswordErrMsg("");
        } else {
            setPasswordErrMsg(passwordRequirements);
        }
    }, [oldPassword, newPassword, repeatPassword]);

    useEffect(() => {
        if(newPassword !== repeatPassword) {
            setPasswordErrMsg(dontMatchError);
        }
    }, [repeatPassword]);

    useEffect(() => {
        setAtLeast8Characters(newPassword.length >= passwordMinLength);
        setAtLeastOneLetter(/[a-zA-Z]/.test(newPassword));
        setAtLeastOneNumber(/[0-9]/.test(newPassword));
        setAtLeastOneSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    }, [newPassword]);

    const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setOldPassword(newValue);
    };

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setNewPassword(newValue);
    };

    const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setRepeatPassword(newValue);
    };

    return (
        <div className="w-full pb-4 border-b">
            <div className="w-full flex flex-col gap-4 items-start">
                <div className="flex flex-col gap-1">
                    <span className="text-16-16 font-medium">{name}</span>
                    {
                        isPassword
                            ? <div className="flex items-center gap-1">
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4.5" r="4" fill="#2B2A28"/>
                                </svg>
                            </div>
                            : <span className="text-14 font-normal text-grey-seccondary">{value}</span>
                    }
                </div>
                <div className="flex flex-col w-full gap-1.5 relative">
                    <label htmlFor="oldPassword" className="text-14 tracking-wider text-default">{passwordOld}</label>
                    <Input
                        htmlFor={"oldPassword"}
                        currentValue={oldPassword}
                        handleValueChange={handleOldPasswordChange}
                        type={`${isOldPasswordVisible ? "text" : "password"}`}
                        placeholder={passwordNewPlaceholder}
                    />
                    <svg
                        onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
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
                <div className="flex mobile:flex-col w-full gap-2 mb-2 relative">
                    <div className="flex flex-col w-full gap-1.5 relative">
                        <label htmlFor="newPassword" className="text-14 tracking-wider text-default">{passwordNew}</label>
                        <Input
                            htmlFor={"newPassword"}
                            currentValue={newPassword}
                            handleValueChange={handleNewPasswordChange}
                            type={`${isNewPasswordVisible ? "text" : "password"}`}
                            placeholder={passwordNewPlaceholder}
                            errorMsg={!!passwordErrMsg}
                        />
                        <svg
                            onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
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
                    <div className="flex flex-col w-full gap-1.5 relative">
                        <label htmlFor="repeatPassword" className="text-14 tracking-wider text-default">{passwordRepeat}</label>
                        <Input
                            htmlFor={"repeatPassword"}
                            currentValue={repeatPassword}
                            handleValueChange={handleRepeatPasswordChange}
                            type={`${isRepeatPasswordVisible ? "text" : "password"}`}
                            placeholder={passwordRepeatPlaceholder}
                            errorMsg={!!passwordErrMsg}
                        />
                        <svg
                            onClick={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)}
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
                    {
                        passwordErrMsg &&
                        <span className="absolute -bottom-3.5 left-0 text-11 text-error">{passwordErrMsg}</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePasswordEdit;
