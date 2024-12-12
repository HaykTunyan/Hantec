import React from "react";
import ProfileInfoRow from "@/components/profile/profileInfo/profileInfoRow";
import {IUserData} from "@/components/profile";
import {useTranslation} from "next-i18next";

interface IProfileInfoFixed {
    setIsEditModalOpened: (x: boolean) => void;
    userData: IUserData;
    userName: string
}

const ProfileInfoFixed = ({setIsEditModalOpened, userData, userName}: IProfileInfoFixed) => {
    const {t} = useTranslation("profile");

    const title = t("info.title");
    const description = t("info.description");
    const detailsTitle = t("info.details_title");
    const editAction = t("info.edit_action");
    const userNameLabel = t("info.user_name");
    const emailAddress = t("info.email_address");
    const phone = t("info.phone");
    const password = t("info.password");

    return (
        <>
            <div className="flex items-center gap-4 mobile:gap-3">
                <div
                    className="w-18 mobile:w-12 h-18 mobile:h-12 rounded-full bg-grey-profile flex items-center justify-center">
                    <span className="text-20 text-white">{userName}</span>
                </div>
                <div className="flex flex-col gap-1.5 mobile:gap-1">
                    <span className="text-24 font-medium">{title}</span>
                    <span className="text-16 text-grey-seccondary">{description}</span>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-start">
                <div className="flex justify-between items-end w-full">
                    <span className="text-18 font-medium">{detailsTitle}</span>
                    <span
                        onClick={() => setIsEditModalOpened(true)}
                        className="text-14 text-grey-seccondary cursor-pointer xl:hover:text-default transition duration-300"
                    >{editAction}</span>
                </div>
                <div className="flex flex-col items-start w-full gap-4">
                    <ProfileInfoRow isEditable={false} name={userNameLabel} initialValue={userData.userName}/>
                    <ProfileInfoRow isEditable={true} name={emailAddress} initialValue={userData.email}/>
                    <ProfileInfoRow isEditable={true} name={phone} initialValue={`+${userData.phone}`}/>
                    <ProfileInfoRow isPassword={true} isEditable={true} name={password}
                                    initialValue={"Jamal Musiala"}/>
                </div>
            </div>
        </>
    );
};

export default ProfileInfoFixed;
