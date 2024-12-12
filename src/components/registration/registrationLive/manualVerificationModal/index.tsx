import React from "react";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    setIsDisclaimerOpened: (x: boolean) => void;
}

const ManualVerificationModal = ({setSelectedTab, setIsDisclaimerOpened}: IStepsInfo) => {
    const {t} = useTranslation("onboarding");
    const disclaimer: any = t("main_event.id_verify.id_auto.disclaimer", {returnObjects: true});

    const handleCloseModal = () => {
        setIsDisclaimerOpened(false);
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    };

    const handleChangeTab = () => {
        setSelectedTab("manual-verification");
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    };

    return (
        <div
            className="absolute tablet:fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M2.21973 4.27637H22.246V19.25H2.21973V18.5V15.5182V4.27637ZM11.4829 16.5431V17.75H3.71973V16.5431C4.93315 16.1149 6.23923 15.8816 7.60131 15.8816C8.96338 15.8816 10.2695 16.1149 11.4829 16.5431ZM7.60131 14.3816C6.2511 14.3816 4.94739 14.5852 3.71973 14.9637V5.77637H20.746V17.75H12.9829V15.5182L12.513 15.329C10.9944 14.7177 9.33617 14.3816 7.60131 14.3816ZM18.9698 9.14478H14.7593V7.64478H18.9698V9.14478ZM14.7593 12.5132H18.9698V11.0132H14.7593V12.5132ZM6.24512 10.5009C6.24512 9.45695 7.37521 8.8045 8.2793 9.32649L8.2793 9.32649C8.69887 9.56872 8.95736 10.0164 8.95736 10.5009C8.95736 11.5448 7.82725 12.1973 6.92318 11.6753L6.92318 11.6753C6.50362 11.4331 6.24512 10.9853 6.24512 10.5009ZM4.74512 10.5009C4.74512 8.30223 7.12523 6.92813 9.0293 8.02745L9.0293 8.02745C9.91293 8.53761 10.4574 9.48045 10.4574 10.5009C10.4574 12.6995 8.07727 14.0737 6.17318 12.9744C5.28953 12.4642 4.74512 11.5213 4.74512 10.5009Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span className="text-20 font-medium">{disclaimer.title}</span>
                        <span className="text-14_16 text-grey-seccondary">
                            {disclaimer.text1} {disclaimer.text2}<br/>
                            {disclaimer.text3}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={handleCloseModal}
                        className="btnSec"
                    >
                        {disclaimer.buttons.cancel}
                    </button>
                    <button
                        className="btnPrim"
                        onClick={handleChangeTab}
                    >
                        {disclaimer.buttons.continue}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualVerificationModal;
