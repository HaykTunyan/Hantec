"use client";

import React, {useEffect, useState} from "react";
import ProfileSidebar from "@/components/profile/profileSidebar";
import ProfileInfo from "@/components/profile/profileInfo";
import ProfileAddress from "@/components/profile/profileInfo/adress";
import ProfileDelete from "@/components/profile/profileInfo/delete";
import {useRouter} from "next/navigation";
import {getUserInfo} from "@/api/profile/getUserInfo";
import MailingAddress from "@/components/profile/profileInfo/adress/mailingAddress";
import {getData} from "@/api/registration/getData";
import LoadingScreen from "@/components/loadingScreen";
import {useTranslation} from "next-i18next";

export interface IUserData {
    userName: string;
    email: string;
    phone: string;
    addrMail1: string;
    addrMail2: string;
    addrMail3: string;
    addrMailPostalCode: string;
    addrResidential1: string;
    addrResidential2: string;
    addrResidential3: string;
    addrResidentialPostalCode: string;
}

const ProfileComponent = () => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [profileId, setProfileId] = useState<number | null>(null);
    const [isProfileInfoEditable, setIsProfileInfoEditable] = useState<boolean>(false);
    const [isProfileAddressEditable, setIsProfileAddressEditable] = useState<boolean>(false);
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [countriesList, setCountriesList] = useState<any>([]);
    const resAddressTab = 2;
    const mailAddressTab = 3;
    const deleteTab = 4;

    const {t} = useTranslation("profile");

    const [userData, setUserData] = useState<IUserData>({
        userName: "",
        email: "",
        phone: "",
        addrMail1: "",
        addrMail2: "",
        addrMail3: "",
        addrMailPostalCode: "",
        addrResidential1: "",
        addrResidential2: "",
        addrResidential3: "",
        addrResidentialPostalCode: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const id = Number(localStorage.getItem("user_id"));
            setProfileId(id);
        }
    }, []);

    useEffect(() => {
        setIsProcessing(true);
        if (!profileId) {
            setIsProcessing(false);
            return;
        }

        getUserInfo(profileId)
            .then((res) => {
                if (res) {
                    setUserData(res);
                    setIsProcessing(false);
                } else {
                    setIsProcessing(false);
                }
            });
    }, [isProfileInfoEditable, isProfileAddressEditable, profileId]);

    useEffect(() => {
        setIsProfileInfoEditable(false);
        setIsProfileAddressEditable(false);
    }, [selectedTab]);

    useEffect(() => {
        getData()
            .then(res => {
                if (res) {
                    setCountriesList(res.data.data
                        .filter((i: any) => i.type === "N")
                        .sort((a: any, b: any) => a.desc.localeCompare(b.desc))
                    );
                }
            });
    }, []);

    return (
        <div
            className={`${selectedTab === 1 ? "pt-[120px]" : "pt-[132px]"} px-7 mobile:px-0 pb-14 bg-[#F8F8F7] mobile:pt-0 tablet:pb-[136px]`}>
            <LoadingScreen isLoading={isProcessing}/>
            <div className="font-aeonik max-w-[807px] w-full mx-auto my-0 flex mobile:flex-col">
                <div
                    className="hidden mobile:flex items-center gap-5 pl-4 py-6 border-b border-b-[rgba(43, 42, 40, 0.08)]">
                    <svg
                        onClick={() => router.back()}
                        className="w-6 h-6 object-contain"
                        width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3 12.2803L10.7802 20.0606L11.8409 18.9999L5.87132 13.0303L20.0606 13.0303V11.5303L5.8713 11.5303L11.8409 5.56065L10.7802 4.5L3 12.2803Z"
                              fill="#2B2A28"/>
                    </svg>
                    <span className="text-16-mob">{t("menu.settings")}</span>
                </div>
                <ProfileSidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
                {
                    selectedTab === 1 && <ProfileInfo
                        userData={userData}
                        isProfileInfoEditable={isProfileInfoEditable}
                        setIsProfileInfoEditable={setIsProfileInfoEditable}
                    />
                }
                {
                    selectedTab === resAddressTab && <ProfileAddress
                        countriesList={countriesList}
                        userData={userData}
                        isProfileAddressEditable={isProfileAddressEditable}
                        setIsProfileAddressEditable={setIsProfileAddressEditable}
                    />
                }
                {
                    selectedTab === mailAddressTab && <MailingAddress
                        countriesList={countriesList}
                        userData={userData}
                        isProfileAddressEditable={isProfileAddressEditable}
                        setIsProfileAddressEditable={setIsProfileAddressEditable}
                    />
                }
                {
                    selectedTab === deleteTab && <ProfileDelete/>
                }
            </div>
        </div>
    );
};

export default ProfileComponent;
