import React from "react";
import ProfileInfoRow from "@/components/profile/profileInfo/profileInfoRow";
import {IUserData} from "@/components/profile";
import {useTranslation} from "next-i18next";

interface IProfileInfoFixed {
    setIsEditModalOpened: (x: boolean) => void;
    userData: IUserData;
}

const ProfileAddressFixed = ({setIsEditModalOpened, userData}: IProfileInfoFixed) => {

    const {t} = useTranslation("profile");

    return (
        <>
            <div className="flex gap-14 justify-between items-start">
                <div className="flex flex-col gap-1.5">
                    <span className="text-24 font-medium">{t("residential_address.title")}</span>
                    <span className="text-16 text-grey-seccondary">{t("residential_address.description")}</span>
                </div>
                <span
                    onClick={() => setIsEditModalOpened(true)}
                    className="text-14 text-grey-seccondary cursor-pointer mt-1 xl:hover:text-default transition duration-300"
                >{t("residential_address.edit_action")}</span>
            </div>
            <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-col items-start w-full gap-4">
                    <ProfileInfoRow isEditable={true} name={t("residential_address.country")} initialValue={userData.addrResidential1}/>
                    <ProfileInfoRow isEditable={true} name={t("residential_address.city")} initialValue={userData.addrResidential2}/>
                    <ProfileInfoRow isEditable={true} name={t("residential_address.address")} initialValue={userData.addrResidential3}/>
                    <ProfileInfoRow isEditable={true} name={t("residential_address.post_code")} initialValue={userData.addrResidentialPostalCode}/>
                </div>
            </div>
        </>
    );
};

export default ProfileAddressFixed;
