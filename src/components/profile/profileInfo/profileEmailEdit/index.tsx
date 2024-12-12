import React, {ChangeEvent, useState} from "react";
import Input from "@/components/input";
import {useTranslation} from "next-i18next";

interface IProfileInfoRow {
    name: string,
    value: string,
    isPassword?: boolean,
    initialValue: string
    action: (e: string) => void;
    userExistsErr: boolean
}

const ProfilePhoneEdit = ({name, value, isPassword, initialValue, action, userExistsErr}: IProfileInfoRow) => {
    const [currentValue, setCurrentValue] = useState<string>(initialValue);

    const {t} = useTranslation("profile");

    const emailLabel = t("info.edit.email_address");

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        action(newValue);
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
                <div className="flex flex-col w-full gap-1.5 mb-2 relative">
                    <label htmlFor="email" className="text-14 tracking-wider">{emailLabel}</label>
                    <Input
                        htmlFor={"email"}
                        currentValue={currentValue}
                        handleValueChange={handleValueChange}
                        type={"text"}
                        placeholder="&nbsp;"
                    />
                    {
                        userExistsErr
                        && <span className={"text-11 text-error"}>
                            User already exists. Please use a different email
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePhoneEdit;
