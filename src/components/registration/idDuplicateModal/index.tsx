import React from "react";
import {useTranslation} from "next-i18next";

interface IdDuplicateModal {
    refresh?: boolean;
    setIsDuplicateErr?: (isDuplicateErr: boolean) => void;
}

const IdDuplicateModal = ({refresh, setIsDuplicateErr}: IdDuplicateModal) => {
    const {t} = useTranslation("onboarding");
    const sameId: any = t("main_event.id_verify.id_manual.same_id_modal", {returnObjects: true});

    const handleRefreshPage = () => {
        if (refresh) {
            window.location.reload();
        } else {
            if (setIsDuplicateErr) {
                setIsDuplicateErr(false);
                document.querySelector("body")?.classList.remove("bodyOverflowHidden");
            }
        }
    };

    return (
        <div className="fixed top-0 bottom-0 right-0 w-[58%] bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M2.2207 4.27637H22.247V19.25H2.2207V18.5V15.5182V4.27637ZM11.4839 16.5431V17.75H3.7207V16.5431C4.93412 16.1149 6.24021 15.8816 7.60228 15.8816C8.96436 15.8816 10.2705 16.1149 11.4839 16.5431ZM7.60228 14.3816C6.25207 14.3816 4.94836 14.5852 3.7207 14.9637V5.77637H20.747V17.75H12.9839V15.5182L12.5139 15.329C10.9953 14.7177 9.33715 14.3816 7.60228 14.3816ZM18.9708 9.14478H14.7603V7.64478H18.9708V9.14478ZM14.7603 12.5132H18.9708V11.0132H14.7603V12.5132ZM6.24609 10.5009C6.24609 9.45695 7.37618 8.8045 8.28027 9.32649L8.28028 9.32649C8.69985 9.56872 8.95834 10.0164 8.95834 10.5009C8.95834 11.5448 7.82823 12.1973 6.92416 11.6753L6.92415 11.6753C6.5046 11.4331 6.24609 10.9853 6.24609 10.5009ZM4.74609 10.5009C4.74609 8.30223 7.1262 6.92813 9.03027 8.02745L9.03028 8.02745C9.91391 8.53761 10.4583 9.48045 10.4583 10.5009C10.4583 12.6995 8.07825 14.0737 6.17416 12.9744C5.29051 12.4642 4.74609 11.5213 4.74609 10.5009Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span className={"text-20 font-medium"}>{sameId.title}</span>
                        <span className="text-14 text-grey-seccondary tracking-wider">
                            {sameId.description}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        className="btnPrim"
                        onClick={handleRefreshPage}
                    >
                        {sameId.buttons.ok}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdDuplicateModal;
