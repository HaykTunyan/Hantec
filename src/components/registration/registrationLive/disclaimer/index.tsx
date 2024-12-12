import React, {useState} from "react";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    forStep: number;
}

const Disclaimer = ({setSelectedTab, forStep}: IStepsInfo) => {
    const [isSkipAlertShown, setIsSkipAlertShown] = useState<boolean>(false);

    const {t} = useTranslation("onboarding");
    const addressDisclaimer: any = t("main_event.address_verify.disclaimer_modal", {returnObjects: true});
    const limit: any = t("main_event.address_verify.deposit_limit_modal", {returnObjects: true});

    const stepOne = 1;
    const stepTwo = 2;

    const handleOpenSkipAlert = () => {
        setIsSkipAlertShown(true);
    };

    return (
        <div className="w-full h-full bg-modal-backdrop flex flex-col justify-between gap-10 relative">
            <div
                className="absolute tablet:fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
                {
                    isSkipAlertShown ? <div
                            className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                            <div className="flex flex-col gap-4 items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="Credit Card Deposit">
                                        <path id="Union" fillRule="evenodd" clipRule="evenodd"
                                              d="M4.66667 8V4.66667H19.6667V8H21.3333V3H3V8H4.66667ZM6.33333 21.3333V6.33333H18V7.16667V20.5V21.3333H6.33333ZM13.8333 8V19.6667H15.5V8H13.8333ZM8.83333 18V15.5H10.5V18H8.83333Z"
                                              fill="#2B2A28"/>
                                    </g>
                                </svg>
                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span className="text-20 font-medium">{limit.title}</span>
                                    <span className="text-14_16 text-grey-seccondary">
                                        {limit.description}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => setSelectedTab("steps2")}
                                    className="btnSec"
                                >
                                    {limit.buttons.back}
                                </button>
                                <button
                                    className="btnPrim"
                                    onClick={() => setSelectedTab("steps3")}
                                >
                                    {limit.buttons.confirm}
                                </button>
                            </div>
                        </div>
                        : <div
                            className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                            <div className="flex flex-col gap-4 items-center">
                                {
                                    forStep === stepOne && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M2.21973 4.27637H22.246V19.25H2.21973V18.5V15.5182V4.27637ZM11.4829 16.5431V17.75H3.71973V16.5431C4.93315 16.1149 6.23923 15.8816 7.60131 15.8816C8.96338 15.8816 10.2695 16.1149 11.4829 16.5431ZM7.60131 14.3816C6.2511 14.3816 4.94739 14.5852 3.71973 14.9637V5.77637H20.746V17.75H12.9829V15.5182L12.513 15.329C10.9944 14.7177 9.33617 14.3816 7.60131 14.3816ZM18.9698 9.14478H14.7593V7.64478H18.9698V9.14478ZM14.7593 12.5132H18.9698V11.0132H14.7593V12.5132ZM6.24512 10.5009C6.24512 9.45695 7.37521 8.8045 8.2793 9.32649L8.2793 9.32649C8.69887 9.56872 8.95736 10.0164 8.95736 10.5009C8.95736 11.5448 7.82725 12.1973 6.92318 11.6753L6.92318 11.6753C6.50362 11.4331 6.24512 10.9853 6.24512 10.5009ZM4.74512 10.5009C4.74512 8.30223 7.12523 6.92813 9.0293 8.02745L9.0293 8.02745C9.91293 8.53761 10.4574 9.48045 10.4574 10.5009C10.4574 12.6995 8.07727 14.0737 6.17318 12.9744C5.28953 12.4642 4.74512 11.5213 4.74512 10.5009Z"
                                              fill="#2B2A28"/>
                                    </svg>
                                }
                                {
                                    forStep === stepTwo && <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M16.3188 8.76818L9.70863 2.85205L2.84863 8.99177V16.5689H11.2361V15.0689H4.34863V9.6623L9.70863 4.86509L15.3185 9.88589L16.3188 8.76818ZM12.7776 15.4777C12.7776 13.1512 14.6438 11.2502 16.9645 11.2502C19.2851 11.2502 21.1513 13.1512 21.1513 15.4777C21.1513 16.238 20.872 16.9571 20.5127 17.575C20.1506 18.1976 19.6786 18.7666 19.2248 19.2409C18.7687 19.7175 18.3153 20.1146 17.9771 20.392C17.8074 20.5311 17.6653 20.6413 17.5644 20.7176C17.5139 20.7557 17.4737 20.7855 17.4454 20.8062L17.412 20.8303L17.4024 20.8372L17.3994 20.8393L17.3984 20.84L16.9645 20.2283L16.5309 20.8403L16.5295 20.8393L16.5265 20.8372L16.5169 20.8303L16.4836 20.8062C16.4552 20.7855 16.415 20.7557 16.3645 20.7176C16.2636 20.6413 16.1215 20.5311 15.9518 20.392C15.6136 20.1146 15.1602 19.7175 14.7042 19.2409C14.2503 18.7666 13.7784 18.1976 13.4163 17.575C13.0569 16.9571 12.7776 16.238 12.7776 15.4777ZM16.5309 20.8403C16.531 20.8404 16.5312 20.8405 16.9645 20.2283C17.3977 20.8405 17.3983 20.8401 17.3984 20.84L16.9645 21.1472L16.5309 20.8403ZM16.9645 19.2822L17.0259 19.2321C17.3321 18.981 17.7379 18.6251 18.141 18.2038C18.5464 17.7802 18.9337 17.3064 19.216 16.8209C19.5011 16.3307 19.6513 15.8764 19.6513 15.4777C19.6513 13.9629 18.4401 12.7502 16.9645 12.7502C15.4888 12.7502 14.2776 13.9629 14.2776 15.4777C14.2776 15.8764 14.4279 16.3307 14.7129 16.8209C14.9953 17.3064 15.3825 17.7802 15.7879 18.2038C16.191 18.6251 16.5968 18.981 16.9031 19.2321L16.9645 19.2822ZM16.0234 14.4961H17.9053V16.378H16.0234V14.4961Z"
                                              fill="#2B2A28"/>
                                    </svg>
                                }
                                <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                    <span className="text-20 font-medium">{addressDisclaimer.title}</span>
                                    {
                                        forStep === stepOne && <span className="text-14_16 text-grey-seccondary">
                               Please be advised that this process takes longer compared to the automated verification process. Your request will be reviewed and verified by our Hantec Customer Support team. <br/>
                                We appreciate your patience and understanding as we ensure the highest standards of service and security.
                            </span>
                                    }
                                    {
                                        forStep === stepTwo && <span className="text-14_16 text-grey-seccondary">
                                        {addressDisclaimer.text1} <br/>
                                        {addressDisclaimer.text2} <br/>
                                        {addressDisclaimer.text3}
                            </span>
                                    }
                                </div>
                            </div>
                            <div className="flex gap-2 justify-center">
                                {
                                    forStep === stepOne && <button
                                        onClick={() => setSelectedTab("continue-here")}
                                        className="btnSec"
                                    >
                                        Back
                                    </button>
                                }
                                {
                                    forStep === stepTwo && <button
                                        onClick={handleOpenSkipAlert}
                                        className="btnSec"
                                    >
                                        {addressDisclaimer.buttons.skip}
                                    </button>
                                }
                                <button
                                    className="btnPrim"
                                    onClick={() => setSelectedTab(`${forStep === stepOne ? "manual-verification" : "steps2"}`)}
                                >
                                    {addressDisclaimer.buttons.continue}
                                </button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Disclaimer;
