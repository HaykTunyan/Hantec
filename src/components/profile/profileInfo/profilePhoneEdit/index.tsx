import React, {useState} from "react";
import {isValidPhoneNumber, parsePhoneNumber} from "react-phone-number-input/min";
import PhoneInput from "react-phone-number-input/input";
import {useTranslation} from "next-i18next";

interface IProfileInfoRow {
    name: string;
    value: string;
    isPassword?: boolean;
    initialValue: string;
    action: (x: string) => void;
    setPhoneErr: (x: boolean) => void;
    phoneErr: boolean;
    setMobileNo: (x: string) => void;
    setMobileNoArea: (x: string) => void;
    phoneExistsErr: boolean;
}

const ProfileEmailEdit = ({
                              name,
                              value,
                              isPassword,
                              initialValue,
                              action,
                              setPhoneErr,
                              phoneErr,
                              setMobileNoArea,
                              setMobileNo,
                              phoneExistsErr
                          }: IProfileInfoRow) => {
    const [currentValue, setCurrentValue] = useState<string>(initialValue);

    const {t} = useTranslation("profile");

    const phoneLabel = t("info.edit.phone");
    const phonePlaceholder = t("info.edit.phone_placeholder");
    const phoneExistsError = t("info.edit.phone_exists_error");

    const handleValueChange = (phoneValue: any) => {
        setCurrentValue(phoneValue);
        action(phoneValue);

        if (phoneValue) {
            const phoneNumber = parsePhoneNumber(phoneValue);
            if (phoneNumber && isValidPhoneNumber(phoneValue)) {
                setPhoneErr(false);
                setMobileNoArea(phoneNumber.countryCallingCode);
                setMobileNo(phoneNumber.nationalNumber);
            } else {
                setPhoneErr(true);
            }
        }
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
                    <label htmlFor="phone" className="text-14 tracking-wider">{phoneLabel}</label>
                    <PhoneInput
                        placeholder={phonePlaceholder}
                        className={`input ${phoneErr ? "input-error" : ""}`}
                        value={currentValue}
                        onChange={handleValueChange}
                    />
                    {
                        phoneExistsErr
                        && <span className={"text-11 text-error"}>
                            {phoneExistsError}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileEmailEdit;
