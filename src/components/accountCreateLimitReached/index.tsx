import React from "react";
import {useTranslation} from "next-i18next";

interface IAccountCreateLimitReached {
    type: string;
    setMaxLimitReachedModal: (x: boolean) => void;
}

const AccountCreateLimitReached = ({type, setMaxLimitReachedModal}: IAccountCreateLimitReached) => {
    const {t} = useTranslation("trading");

    const handleCloseModal = () => {
        setMaxLimitReachedModal(false);
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
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
                        <span
                            className="text-20 text-default tracking-wider">
                            {t("add_new_live_account.limit_reached.title")} {type} {t("add_new_live_account.limit_reached.account")}. <br/> {t("add_new_live_account.limit_reached.title2")} {type} {t("add_new_live_account.limit_reached.title3")}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        className={"btnPrim"}
                        onClick={handleCloseModal}
                    >
                        {t("add_new_live_account.limit_reached.buttons.ok")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountCreateLimitReached;
