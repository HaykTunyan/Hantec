import React, {useEffect, useState} from "react";
import DeleteModal from "@/components/profile/profileInfo/delete/deleteModal";
import Button from "@/components/button";
import {useTranslation} from "next-i18next";

const ProfileDelete = () => {
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);

    const {t} = useTranslation("profile");

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
                isEditModalOpened && <DeleteModal
                    setIsEditModalOpened={setIsEditModalOpened}
                />
            }
            <div className="flex flex-col gap-10 items-start">
                <div className="flex flex-col gap-1.5">
                    <span className="text-24 font-medium">{t("delete.title")}</span>
                    <span className="text-16 text-grey-seccondary max-w-[503px] w-full">
                        {t("delete.description")}
                    </span>
                </div>
                <Button btnName={t("delete.buttons.delete")} className={"btnDelete tablet:self-center"} actionValue={true} setAction={setIsEditModalOpened}/>
            </div>
        </div>
    );
};

export default ProfileDelete;
