import React, {useRef, useState} from "react";
import Input from "@/components/input";
import {IUserData} from "@/components/profile";
import {updateUserInfo} from "@/api/profile/updateUserInfo";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

interface IProfileInfoFixed {
    isImageUploaded: boolean;
    setIsEditModalOpened: (x: boolean) => void;
    setIsProfileInfoEditable: (x: boolean) => void;
    userData: IUserData;
    countriesList: any;
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const ProfileMailingEditable = ({
                                    isImageUploaded,
                                    setIsEditModalOpened,
                                    setIsProfileInfoEditable,
                                    userData,
                                    countriesList
                                }: IProfileInfoFixed) => {
    const [addrMail1, setAddrMail1] = useState(userData.addrMail1);
    const [addrMail2, setAddrMail2] = useState(userData.addrMail2);
    const [addrMail3, setAddrMail3] = useState(userData.addrMail3);
    const [addrMailPostalCode, setAddrMailPostalCode] = useState(userData.addrMailPostalCode);
    const userId = Number(localStorage.getItem("user_id"));
    const [isCountryDrpDwnOpened, setIsCountryDrpDwnOpened] = useState<boolean>(false);
    const countryRef = useRef(null);
    const excludeCountryRef = useRef(null);
    useOnClickOutside(countryRef, setIsCountryDrpDwnOpened, excludeCountryRef);

    const {t} = useTranslation("profile");

    const disabled = userData.addrMail1 === addrMail1 &&
        userData.addrMail2 === addrMail2 &&
        userData.addrMail3 === addrMail3 &&
        userData.addrResidentialPostalCode === addrMailPostalCode;

    const handleSaveUserData = () => {
        updateUserInfo({
            addrMail1,
            addrMail2,
            addrMail3,
            addrMailPostalCode,
            companyId: 20,
            id: userId
        }, userId)
            .then(res => {
                setIsProfileInfoEditable(false);
            });
    };

    const handleSelectCountry = (e: any, country: any) => {
        e.stopPropagation();
        setAddrMail1(capitalizeFirstLetter(country.desc));
        setIsCountryDrpDwnOpened(false);
    };

    return (
        <>
            <div className="flex gap-14 justify-between items-start">
                <div className="flex flex-col gap-1.5">
                    <span className="text-24 font-medium">{t("mailing_address.title")}</span>
                    <span className="text-16 text-grey-seccondary">{t("mailing_address.description")}</span>
                </div>
                <span
                    onClick={() => setIsProfileInfoEditable(false)}
                    className="text-14 text-grey-seccondary cursor-pointer mt-1 xl:hover:text-default transition duration-300"
                >{t("mailing_address.cancel_action")}</span>
            </div>
            <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-col items-start w-full gap-6">
                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-14 tracking-wider text-default">{t("mailing_address.country")}</span>
                        <div
                            ref={excludeCountryRef}
                            onClick={() => setIsCountryDrpDwnOpened(!isCountryDrpDwnOpened)}
                            className={"input cursor-pointer relative flex items-center justify-between"}
                            style={{height: "52px"}}
                        >
                            <span>{addrMail1 ? addrMail1 : "-"}</span>
                            <svg
                                className={`w-5 h-5 object-contain ${isCountryDrpDwnOpened ? "drpDwnOpened" : "drpDwnClosed"}`}

                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M20 9.06066L12.2198 16.8409L4.43942 9.06066L5.50008 8L12.2197 14.7196L18.9393 8L20 9.06066Z"
                                      fill="#2B2A28"/>
                            </svg>
                            {
                                isCountryDrpDwnOpened
                                && <div
                                    ref={countryRef}
                                    className="h-[300px] overflow-x-scroll absolute flex flex-col gap-2 tablet:gap-1 w-full bg-white left-0 top-14 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                                >
                                    {
                                        countriesList.map((i: any, idx: number) =>
                                            <div
                                                key={idx}
                                                onClick={(e) => handleSelectCountry(e, i)}
                                                className={`flex items-center justify-between w-full px-3 tablet:px-1 py-2.5 tablet:py-1.5 cursor-pointer rounded ${addrMail1 === capitalizeFirstLetter(i.desc) ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                            >
                                                <span>{capitalizeFirstLetter(i.desc)}</span>
                                                {
                                                    addrMail1 === capitalizeFirstLetter(i.desc) && <svg
                                                        className="w-5 h-5 tablet:w-4 tablet:h-4 object-contain"
                                                        width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                                                              fill="#2B2A28"/>
                                                    </svg>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <hr className={"addressBtmLine"}/>
                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-14 tracking-wider text-default">{t("mailing_address.city")}</span>
                        <Input
                            htmlFor={""}
                            currentValue={addrMail2}
                            handleValueChange={(e) => setAddrMail2(e.target.value)}
                            type={"text"}
                            placeholder={""}
                        />
                    </div>
                    <hr className={"addressBtmLine"}/>
                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-14 tracking-wider text-default">{t("mailing_address.address")}</span>
                        <Input
                            htmlFor={""}
                            currentValue={addrMail3}
                            handleValueChange={(e) => setAddrMail3(e.target.value)}
                            type={"text"}
                            placeholder={""}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-14 tracking-wider text-default">{t("mailing_address.post_code")}</span>
                        <Input
                            htmlFor={""}
                            currentValue={addrMailPostalCode}
                            handleValueChange={(e) => setAddrMailPostalCode(e.target.value)}
                            type={"text"}
                            placeholder={""}
                        />
                    </div>
                    <hr className={"addressBtmLine"}/>
                </div>
                <div className="flex gap-2">
                    <button
                        className={"btnSec"}
                        onClick={() => setIsProfileInfoEditable(false)}
                    >
                        {t("mailing_address.buttons.cancel")}
                    </button>
                    <button
                        className={"btnPrim"}
                        onClick={handleSaveUserData}
                        disabled={disabled}
                    >
                        {t("mailing_address.buttons.save")}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfileMailingEditable;
