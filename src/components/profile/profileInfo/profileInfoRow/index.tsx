import React from "react";
import {useTranslation} from "next-i18next";

interface IProfileInfoRow {
    isEditable: boolean,
    name: string,
    isPassword?: boolean
    initialValue: string
}

const ProfileAddressRowEdit = ({isEditable, name, isPassword, initialValue}: IProfileInfoRow) => {
    const {t} = useTranslation("profile");

    const unEditable = t("info.uneditable");

    return (
        <div className="w-full pb-4 border-b">
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col gap-1.5">
                    <span className="text-14 font-medium">{name}</span>
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
                            :
                            <span className="text-14 font-normal text-grey-seccondary">{initialValue || ""}&nbsp;</span>
                    }
                </div>
                {
                    !isEditable &&
                    <div className={"flex items-center justify-center rounded-[2px] bg-default px-1 h-[16px]"}>
                        <span className={"text-11-percent"}>{unEditable}</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileAddressRowEdit;
