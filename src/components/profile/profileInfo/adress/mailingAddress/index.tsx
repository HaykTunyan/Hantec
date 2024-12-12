import React, {useEffect, useState} from "react";
import EditModal from "@/components/profile/profileInfo/editModal";
import {IUserData} from "@/components/profile";
import ProfileMailingEditable from "@/components/profile/profileInfo/adress/mailingAddress/profileMailingEditable";
import MailingAddressFixed from "@/components/profile/profileInfo/adress/mailingAddress/mailingAddressFixed";

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
    const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);

    useEffect(() => {
        setIsImageUploaded(false);
    }, []);

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
                    ? <MailingAddressFixed
                        userData={userData}
                        setIsEditModalOpened={setIsEditModalOpened}
                    />
                    : <ProfileMailingEditable
                        countriesList={countriesList}
                        userData={userData}
                        isImageUploaded={isImageUploaded}
                        setIsEditModalOpened={setIsEditModalOpened}
                        setIsProfileInfoEditable={setIsProfileAddressEditable}
                    />
            }
        </div>
    );
};

export default ProfileAddress;
