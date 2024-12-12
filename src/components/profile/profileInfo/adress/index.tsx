import React, {useEffect, useState} from "react";
import EditModal from "@/components/profile/profileInfo/editModal";
import ProfileAddressFixed from "@/components/profile/profileInfo/adress/profileAddressFixed";
import ProfileAddressEditable from "@/components/profile/profileInfo/adress/profileAddressEditable";
import {IUserData} from "@/components/profile";

interface IProfileAddress {
    userData: IUserData;
    isProfileAddressEditable: boolean;
    setIsProfileAddressEditable: (x: boolean) => void;
    countriesList: any;
}

const ProfileAddress = ({
                            userData,
                            setIsProfileAddressEditable,
                            isProfileAddressEditable,
                            countriesList
                        }: IProfileAddress) => {
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);

    useEffect(() => {
        if (isEditModalOpened) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isEditModalOpened]);

    return (
        <div className="max-w-[602px] mobile:max-w-none mobile:px-4 mobile:pt-8 w-full flex flex-col gap-10">
            {
                isEditModalOpened && <EditModal
                    setIsEditModalOpened={setIsEditModalOpened}
                    setIsProfileInfoEditable={setIsProfileAddressEditable}
                />
            }
            {
                !isProfileAddressEditable
                    ? <ProfileAddressFixed
                        userData={userData}
                        setIsEditModalOpened={setIsEditModalOpened}
                    />
                    : <ProfileAddressEditable
                        countriesList={countriesList}
                        userData={userData}
                        setIsEditModalOpened={setIsEditModalOpened}
                        setIsProfileInfoEditable={setIsProfileAddressEditable}
                    />
            }
        </div>
    );
};

export default ProfileAddress;
