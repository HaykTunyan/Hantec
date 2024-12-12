import React from "react";
import Button from "@/components/button";
import {useTranslation} from "next-i18next";

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void
}

const DuplicatedLeverageModal = ({setIsEditModalOpened}: IEditModal) => {
    const {t} = useTranslation("leverage_level");

    const handleCloseModal = () => {
        window.location.reload();
    };

    return (
        <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-modal-backdrop z-[1111111111111] flex items-center object-top mobile:px-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span className="text-14 text-grey-seccondary tracking-wider">{t("request_submitted.description")}</span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <Button
                        btnName={t("request_submitted.buttons.confirm")}
                        className={"btnSec"}
                        setAction={handleCloseModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default DuplicatedLeverageModal;
