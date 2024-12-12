import React, {useEffect, useState} from "react";
import ProfileInfoRow from "@/components/profile/profileInfo/profileInfoRow";
import ProfileEmailEdit from "../profileEmailEdit";
import ProfilePhoneEdit from "@/components/profile/profileInfo/profilePhoneEdit";
import ProfilePasswordEdit from "@/components/profile/profileInfo/profilePasswordEdit";
import Button from "@/components/button";
import {updateUserInfo} from "@/api/profile/updateUserInfo";
import {IUserData} from "@/components/profile";
import {updatePassword} from "@/api/profile/updatePassword";
import {useTranslation} from "next-i18next";

interface IProfileInfoFixed {
    setIsEditModalOpened: (x: boolean) => void;
    setIsProfileInfoEditable: (x: boolean) => void;
    userData: IUserData;
    userName: string;
}

const ProfileInfoEditable = ({
                                 setIsEditModalOpened,
                                 setIsProfileInfoEditable,
                                 userData,
                                 userName
                             }: IProfileInfoFixed) => {
    const passwordMinLength = 8;
    const [email, setEMail] = useState<string>(userData.email || "");
    const [phone, setPhone] = useState<string>(userData.phone);
    const [phoneErr, setPhoneErr] = useState<boolean>(false);
    const userId = Number(localStorage.getItem("user_id"));
    const [mobileNo, setMobileNo] = useState<string>("");
    const [mobileNoArea, setMobileNoArea] = useState<string>("");
    const [phoneExistsErr, setPhoneExistsErr] = useState<boolean>(false);
    const [userExistsErr, setUserExistsErr] = useState<boolean>(false);

    const {t} = useTranslation("profile");

    const title = t("info.title");
    const description = t("info.description");
    const detailsTitle = t("info.details_title");
    const userNameLabel = t("info.user_name");
    const cancelAction = t("info.cancel_action");
    const emailTitle = t("info.edit.email_title");
    const emailDescription = t("info.edit.email_description");
    const phoneTitle = t("info.edit.phone_title");
    const phoneDescription = t("info.edit.phone_description");
    const passwordTitle = t("info.edit.phone_description");
    const passwordDescription = t("info.edit.phone_description");
    const cancelBtn = t("info.edit.buttons.cancel");
    const saveBtn = t("info.edit.buttons.save");

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    });

    const [errors, setErrors] = useState({
        emailError: false,
        phoneError: false,
        passwordError: false,
        passwordMismatch: false
    });

    useEffect(() => {
        setPhoneExistsErr(false);
    }, [phone]);

    useEffect(() => {
        const emailValid = email.includes("@");
        const phoneValid = !phoneErr;
        const passwordValid = passwords.newPassword.length >= passwordMinLength && /[a-zA-Z]/.test(passwords.newPassword) && /[0-9]/.test(passwords.newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword);
        const passwordMatch = passwords.newPassword === passwords.newPasswordConfirm;

        setErrors({
            emailError: !emailValid,
            phoneError: !phoneValid,
            passwordError: passwords.oldPassword ? !passwordValid : false,
            passwordMismatch: passwords.oldPassword ? !passwordMatch : false
        });
    }, [email, phone, passwords.newPassword, passwords.newPassword, passwords.oldPassword]);

    const handleSaveUserData = () => {
        if (userData.email !== email || userData.phone !== phone) {
            updateUserInfo({
                email,
                mobileNo,
                mobileNoArea,
                companyId: 20,
                id: userId
            }, userId)
                .then(res => {
                    if (res) {
                        //@ts-ignore
                        if (res.status === "warn") {
                            //@ts-ignore
                            if (res.msg === "ERROR_PHONE_ALREADY_EXISTS") {
                                setPhoneExistsErr(true);
                                setUserExistsErr(false);
                            }
                            //@ts-ignore
                            if (res.msg === "ERROR_USER_ALREADY_EXISTS") {
                                setUserExistsErr(true);
                                setPhoneExistsErr(false);
                            }
                        } else {
                            setIsProfileInfoEditable(false);
                        }
                    }
                });
        }

        if (passwords.oldPassword && passwords.newPassword && passwords.newPassword === passwords.newPasswordConfirm && !phoneExistsErr) {
            updatePassword(passwords.oldPassword, passwords.newPassword, passwords.newPasswordConfirm)
                .then(res => setIsProfileInfoEditable(false));
        }
    };

    const isDisabled = errors.emailError || errors.phoneError || errors.passwordError || errors.passwordMismatch;

    return (
        <>
            <div className="flex items-center gap-4">
                <div
                    className="w-18 mobile:w-12 h-18 mobile:h-12 rounded-full bg-grey-profile flex items-center justify-center">
                    <span className="text-20 text-white">{userName}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-24 font-medium">{title}</span>
                    <span className="text-16 text-grey-seccondary">{description}</span>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-start">
                <div className="flex justify-between items-end w-full">
                    <span className="text-18 font-medium">{detailsTitle}</span>
                    <span
                        onClick={() => setIsProfileInfoEditable(false)}
                        className="text-14 text-grey-seccondary cursor-pointer xl:hover:text-default transition duration-300"
                    >{cancelAction}</span>
                </div>
                <div className="flex flex-col items-start w-full gap-6">
                    <ProfileInfoRow isEditable={false} name={userNameLabel} initialValue={userData.userName}/>
                    <ProfileEmailEdit
                        name={emailTitle}
                        value={emailDescription}
                        initialValue={email}
                        action={setEMail}
                        userExistsErr={userExistsErr}
                    />
                    <ProfilePhoneEdit
                        phoneErr={phoneErr}
                        name={phoneTitle}
                        value={phoneDescription}
                        initialValue={phone}
                        action={setPhone}
                        setPhoneErr={setPhoneErr}
                        setMobileNo={setMobileNo}
                        setMobileNoArea={setMobileNoArea}
                        phoneExistsErr={phoneExistsErr}
                    />
                    <ProfilePasswordEdit
                        setPasswords={setPasswords}
                        name={passwordTitle}
                        value={passwordDescription}
                    />
                    <div className="flex gap-2">
                        <Button
                            btnName={cancelBtn}
                            className={"btnSec"}
                            setAction={setIsProfileInfoEditable}
                            actionValue={false}
                        />
                        <Button
                            btnName={saveBtn}
                            className={"btnPrim"}
                            request={handleSaveUserData}
                            disabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfoEditable;
