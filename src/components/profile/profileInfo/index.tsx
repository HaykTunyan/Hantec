import React, {useEffect, useState} from "react";
import EditModal from "@/components/profile/profileInfo/editModal";
import ProfileInfoFixed from "@/components/profile/profileInfo/profileInfoFixed";
import ProfileInfoEditable from "@/components/profile/profileInfo/profileInfoEditable";
import {IUserData} from "@/components/profile";

interface IProfileInfo {
    userData: IUserData;
    setIsProfileInfoEditable: (x: boolean) => void;
    isProfileInfoEditable: boolean;
}

const ProfileInfo = ({userData, setIsProfileInfoEditable, isProfileInfoEditable}: IProfileInfo) => {
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);

    const splitName = userData.userName.split(" ");

    const firstInitial = splitName[0] && /^[a-zA-Z]/.test(splitName[0][0]) ? splitName[0][0] : "";
    const secondInitial = splitName[1] && /^[a-zA-Z]/.test(splitName[1][0]) ? splitName[1][0] : "";

    const userName = firstInitial + secondInitial;

    useEffect(() => {
        if (isEditModalOpened) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isEditModalOpened]);

    return (
        <div className="max-w-[602px] mobile:max-w-none mobile:px-4 mobile:pt-8 w-full flex flex-col gap-10">
            {isEditModalOpened &&
                <EditModal
                    setIsEditModalOpened={setIsEditModalOpened}
                    setIsProfileInfoEditable={setIsProfileInfoEditable}
                />
            }
            {!isProfileInfoEditable
                ? <ProfileInfoFixed
                    userName={userName}
                    setIsEditModalOpened={setIsEditModalOpened}
                    userData={userData}
                />
                : <ProfileInfoEditable
                    userName={userName}
                    setIsEditModalOpened={setIsEditModalOpened}
                    setIsProfileInfoEditable={setIsProfileInfoEditable}
                    userData={userData}
                />
            }
        </div>
    );
};

export default ProfileInfo;
