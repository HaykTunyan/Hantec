import React, {useRef} from "react";
import Button from "@/components/button";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {openLiveChat} from "@/hooks/openLiveChat";
import {useTranslation} from "next-i18next";

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void;
}

const DeleteModal = ({setIsEditModalOpened}: IEditModal) => {
    const {t} = useTranslation("profile");

    const handleOpenChat = () => {
        setIsEditModalOpened(false);
        openLiveChat();
    };

    const handleCloseModal = () => {
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        setIsEditModalOpened(false);
    };

    const modalRef = useRef(null);
    useOnClickOutside(modalRef, setIsEditModalOpened);

    return (
        <div className="fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                ref={modalRef}
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12 4.9375C10.9557 4.9375 9.95419 5.35234 9.21577 6.09077C8.47734 6.82919 8.0625 7.83071 8.0625 8.875V9.6875V10.4375V15.875H3.4375V9.6875H6.5625V8.875C6.5625 7.43289 7.13538 6.04984 8.15511 5.03011C9.17484 4.01038 10.5579 3.4375 12 3.4375C13.4421 3.4375 14.8252 4.01038 15.8449 5.03011C16.8646 6.04984 17.4375 7.43289 17.4375 8.875V9.6875H20.5625V15.875H17.3642C17.2166 16.6235 16.8499 17.3177 16.3025 17.865C15.7552 18.4124 15.061 18.7791 14.3125 18.9267V20.1719H9.6875V16.3281H14.3125V17.3785C14.6595 17.263 14.9784 17.0678 15.2419 16.8044C15.6873 16.359 15.9375 15.7549 15.9375 15.125V9.6875V8.875C15.9375 7.83071 15.5227 6.82919 14.7842 6.09077C14.0458 5.35234 13.0443 4.9375 12 4.9375ZM17.4375 14.375V11.1875H19.0625V14.375H17.4375ZM4.9375 14.375V11.1875H6.5625V14.375H4.9375ZM11.1875 18.6719V17.8281H12.8125V18.6719H11.1875Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span className="text-20 font-medium">{t("delete.delete_modal.title")}</span>
                        <span className="text-14_16 text-grey-seccondary">
                            {t("delete.delete_modal.description")}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        className={"btnSec"}
                        onClick={handleCloseModal}
                    >
                        {t("delete.delete_modal.buttons.cancel")}
                    </button>
                    <Button
                        btnName={t("delete.delete_modal.buttons.continue")}
                        className={"btnPrim"}
                        href={""}
                        request={handleOpenChat}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
