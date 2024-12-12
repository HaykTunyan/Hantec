import React, {useEffect, useState} from "react";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";
import ManualVerificationModal from "@/components/registration/registrationLive/manualVerificationModal";
import {getTokenForShufti} from "@/api/registration/getTokenForShufti";
import IdDuplicateModal from "@/components/registration/idDuplicateModal";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
    idDuplicateErr: string;
}

const DesktopOrMobileChoose = ({setSelectedTab, lineWidth, idDuplicateErr}: IStepsInfo) => {
    // const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);
    const [isDisclaimerOpened, setIsDisclaimerOpened] = useState<boolean>(false);
    // const disabled = !isPrivacyChecked;
    const [shutftiLink, setShutftiLink] = useState<string>("");
    const {t} = useTranslation("onboarding");
    const idAuto: any = t("main_event.id_verify.id_auto", {returnObjects: true});

    useEffect(() => {
        getTokenForShufti("id")
            .then(res => {
                if (res && res.data) {
                    setShutftiLink(res.data.data);
                }
            });
    }, []);

    const handleOpenInfoModal = () => {
        setIsDisclaimerOpened(true);
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
    };

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            {
                idDuplicateErr && <IdDuplicateModal refresh={true}/>
            }
            {
                isDisclaimerOpened
                && <ManualVerificationModal
                    setSelectedTab={setSelectedTab}
                    setIsDisclaimerOpened={setIsDisclaimerOpened}
                />
            }
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={t("exit.save_exit")}/>
            </div>
            <div className=" flex flex-col gap-6 tablet:mb-10">
                <div className="max-w-[362px] flex flex-col gap-6 w-full mx-auto mobile:px-4">
                    <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                        <button className="btnSec btnLogin">
                            {t("main_event.id_verify.title")}
                        </button>
                        <span className="text-32 font-medium">
                            {t("main_event.id_verify.description1")} {t("main_event.id_verify.description2")}
                    </span>
                    </div>
                    <span className="text-20-20 font-medium text-default">
                        {idAuto.title}
                    </span>
                    <div className="w-full p-6 tablet:px-4 flex items-center gap-3 bg-orange-extra-light rounded-[8px]">
                    <span className="text-12_14 text-grey-tertiary">
                        {idAuto.manual_text}
                        <span className="font-medium"> {idAuto.underline}</span>
                    </span>
                        <button
                            className={"btnPrim"}
                            style={{flex: "0 0 auto"}}
                            onClick={handleOpenInfoModal}
                        >
                            {idAuto.buttons.manual}
                        </button>
                    </div>
                </div>
                <div className={"mobile:px-4"}>
                    {
                        shutftiLink && <iframe
                            src={shutftiLink}
                            title="ShuftiPro" id="shuftipro-iframe" allow="camera" frameBorder="0" width="100%"
                            height="500px"></iframe>
                    }
                </div>
                {/*<div className="flex flex-col">*/}
                {/*    <div className="w-full flex items-center justify-end gap-4 py-4">*/}
                {/*        <span className="text-12 text-default">Get Help</span>*/}
                {/*        <button*/}
                {/*            className="btnSec btnLanguage"*/}
                {/*        >*/}
                {/*            <span>EN</span>*/}
                {/*            <svg*/}
                {/*                className={`w-4 h-4 object-contain`}*/}
                {/*                width="16" height="16" viewBox="0 0 16 16" fill="none"*/}
                {/*                xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path fillRule="evenodd" clipRule="evenodd"*/}
                {/*                      d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"*/}
                {/*                      fill="#2B2A28"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    <div className="w-full">*/}
                {/*        <img src="/images/onboarding/onboarding.png" className="w-full" alt=""/>*/}
                {/*    </div>*/}
                {/*    <div className="flex flex-col items-start gap-6 px-6 pt-6 pb-8">*/}
                {/*        <span>Let’s verify your identity</span>*/}
                {/*        <div*/}
                {/*            className="flex gap-2.5 items-start cursor-pointer"*/}
                {/*            onClick={() => setIsPrivacyChecked(!isPrivacyChecked)}*/}
                {/*        >*/}
                {/*            {*/}
                {/*                isPrivacyChecked*/}
                {/*                    ? <svg*/}
                {/*                        className="w-5 h-5 object-contain flex-0-0-auto-all"*/}
                {/*                        width="20" height="20" viewBox="0 0 20 20" fill="none"*/}
                {/*                        xmlns="http://www.w3.org/2000/svg">*/}
                {/*                        <path*/}
                {/*                            d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z"*/}
                {/*                            fill="#FF3F32"/>*/}
                {/*                        <path fillRule="evenodd" clipRule="evenodd"*/}
                {/*                              d="M16.1554 6.78039L8.46597 14.4698L3.84473 9.84857L4.90539 8.78791L8.46597 12.3485L15.0947 5.71973L16.1554 6.78039Z"*/}
                {/*                              fill="white" fillOpacity="0.8"/>*/}
                {/*                    </svg>*/}

                {/*                    : <svg*/}
                {/*                        className="w-5 h-5 object-contain flex-0-0-auto-all"*/}
                {/*                        width="20" height="20" viewBox="0 0 20 20" fill="none"*/}
                {/*                        xmlns="http://www.w3.org/2000/svg">*/}
                {/*                        <path*/}
                {/*                            d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2Z"*/}
                {/*                            stroke="#E8E5E1"/>*/}
                {/*                    </svg>*/}
                {/*            }*/}

                {/*            <span className="text-14_16 text-grey-seccondary">*/}
                {/*                I consent to Shufti Pro Limited using and storing my personal and biometric data, and I confirm that I’m 18 or older.&nbsp;*/}
                {/*                <span className="underline custom-underline">Privacy Policy.</span>*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="flex items-center justify-center gap-2.5">*/}
                {/*    <button*/}
                {/*        className="btnSec"*/}
                {/*        disabled={disabled}*/}
                {/*        onClick={() => setSelectedTab("continue-here")}*/}
                {/*    >*/}
                {/*        Continue here*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className="btnPrim"*/}
                {/*        disabled={disabled}*/}
                {/*    >*/}
                {/*        Use Mobile*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine bottom={"0"} lineWidth={lineWidth}/>
                {/*<div*/}
                {/*    className="py-2 px-4 flex items-center justify-between border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">*/}
                {/*    <button*/}
                {/*        onClick={() => setSelectedTab("instructions")}*/}
                {/*        className="btnSec"*/}
                {/*    >*/}
                {/*        Back*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className="btnPrim"*/}
                {/*        disabled={true}*/}
                {/*    >*/}
                {/*        Continue*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default DesktopOrMobileChoose;
