import React, {useRef, useState} from "react";
import Button from "@/components/button";
import {forgotTradingPassword} from "@/api/trading/forgotTradingPassword";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void;
    email: string;
    tradingAccountId: number;
}

const RecoveryModal = ({setIsEditModalOpened, email, tradingAccountId}: IEditModal) => {
    const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

    const {t} = useTranslation("trading");
    const recovery: any = t("single_account.forgot_password_modal", {returnObjects: true});

    const handleRequestRecoveryPassword = () => {
        forgotTradingPassword(
            email,
            25,
            tradingAccountId,
            `${baseUrl}/reset`
        )
            .then(() => setIsRequestSent(true));
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
                {
                    isRequestSent
                        ? <div className="flex items-center justify-center text-center">
                            <span className="text-24 text-default">
                                {recovery.request_submitted.title} <br/> {recovery.request_submitted.description}
                            </span>
                        </div>
                        : <div className="flex flex-col gap-4 items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M12 4.9375C10.9557 4.9375 9.95419 5.35234 9.21577 6.09077C8.47734 6.82919 8.0625 7.83071 8.0625 8.875V9.6875V10.4375V15.875H3.4375V9.6875H6.5625V8.875C6.5625 7.43289 7.13538 6.04984 8.15511 5.03011C9.17484 4.01038 10.5579 3.4375 12 3.4375C13.4421 3.4375 14.8252 4.01038 15.8449 5.03011C16.8646 6.04984 17.4375 7.43289 17.4375 8.875V9.6875H20.5625V15.875H17.3642C17.2166 16.6235 16.8499 17.3177 16.3025 17.865C15.7552 18.4124 15.061 18.7791 14.3125 18.9267V20.1719H9.6875V16.3281H14.3125V17.3785C14.6595 17.263 14.9784 17.0678 15.2419 16.8044C15.6873 16.359 15.9375 15.7549 15.9375 15.125V9.6875V8.875C15.9375 7.83071 15.5227 6.82919 14.7842 6.09077C14.0458 5.35234 13.0443 4.9375 12 4.9375ZM17.4375 14.375V11.1875H19.0625V14.375H17.4375ZM4.9375 14.375V11.1875H6.5625V14.375H4.9375ZM11.1875 18.6719V17.8281H12.8125V18.6719H11.1875Z"
                                      fill="#2B2A28"/>
                            </svg>
                            <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                <span className="text-20 font-medium">{recovery.title}</span>
                                <span className="text-14_16 text-grey-seccondary tracking-wider">
                                    {recovery.description} <br/> {recovery.description_help}
                                </span>
                            </div>
                        </div>
                }
                {
                    isRequestSent
                        ? <div className="flex gap-2 justify-center">
                            <Button
                                className={"btnPrim"}
                                btnName={recovery.request_submitted.buttons.continue_btn}
                                setAction={setIsEditModalOpened}
                                actionValue={false}
                            />
                        </div>
                        : <div className="flex gap-2 justify-center">
                            <button
                                onClick={handleCloseModal}
                                className={"btnSec"}

                            >
                                {recovery.buttons.cancel}
                            </button>
                            <button
                                className={"btnPrim"}
                                onClick={handleRequestRecoveryPassword}
                            >
                                {recovery.buttons.send}
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

export default RecoveryModal;
