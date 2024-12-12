import React, {useEffect, useState} from "react";
import {IAccountLeverage} from "@/components/trading/leverageLevels";
import {updateLeverageLevel} from "@/api/profile/updateLeverageLevel";
import DuplicatedLeverageModal from "@/components/trading/leverageLevels/duplicatedLeverageModal";
import {getTrackBackground, Range} from "react-range";
import {useTranslation} from "next-i18next";
import {useDemo} from "@/context/DemoContext";

interface IAccountLeverageComp {
    selectedAccount: IAccountLeverage;
    userId: number;
    setIsRiskModalOpened: (x: boolean) => void;
    alreadyInProcess: boolean;
}

const leverageToRiskInitial: { [key: number]: number } = {
    100: 15,
    200: 50,
    400: 83,
};

const leverage1 = 100;
const leverage2 = 200;
const leverage3 = 400;

const STEP = 1;
const MIN = 0;
const MAX = 100;

const AccountLeverage = ({selectedAccount, userId, setIsRiskModalOpened, alreadyInProcess}: IAccountLeverageComp) => {
    const initialRisk = leverageToRiskInitial[selectedAccount.leverageLevels] || 0;
    const [selectedRisk, setSelectedRisk] = useState<number>(initialRisk);
    const {demo} = useDemo();

    const [values, setValues] = useState([initialRisk]);
    const [leverageRequestSent, setLeverageUpdateRequestSent] = useState<boolean>(false);

    const {t} = useTranslation("leverage_level");

    const leverageLevel1 = 33;
    const leverageLevel2 = 68;

    useEffect(() => {
        setValues([leverageToRiskInitial[selectedAccount.leverageLevels]]);
    }, [selectedAccount.account]);

    useEffect(() => {
        setSelectedRisk(values[0]);
    }, [values]);

    const [riskAgreed, setRiskAgreed] = useState<boolean>(false);
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {
        const checkIfDisabled = () => {
            if (!riskAgreed) return true;

            if (initialRisk === 50) {
                return selectedRisk <= 68 && selectedRisk >= 33;
            } else if (initialRisk === 15) {
                return selectedRisk <= 33;
            } else if (initialRisk === 83) {
                return selectedRisk >= 68;
            }

            return true;
        };

        setDisabledButton(checkIfDisabled());
    }, [selectedRisk, riskAgreed, initialRisk]);

    const handleCancelChange = () => {
        setValues([initialRisk]);
        setSelectedRisk(initialRisk);
        setRiskAgreed(false);
    };

    const getLeverageLevel = (risk: number) => {
        if (risk <= leverageLevel1) return leverage1;
        if (risk <= leverageLevel2) return leverage2;
        return leverage3;
    };

    const handleSaveNewLeverage = () => {
        const leverageUpdateData = {
            accountCode: selectedAccount.account,
            appDate: Date.now(),
            clientUserId: userId,
            platformId: 42,
            companyId: 20,
            currentLeverage: `1:${selectedAccount.leverageLevels}`,
            leverage: `1:${getLeverageLevel(selectedRisk)}`,
            messageMappings: [
                {
                    statusId: 1,
                    messageId: "30"
                }
            ]
        };

        updateLeverageLevel(leverageUpdateData)
            .then(() => {
                setLeverageUpdateRequestSent(true);
                document.querySelector("body")?.classList.add("bodyOverflowHidden");
            });
    };

    return (
        <>
            <div
                className="flex flex-col pb-10 mobile:pb-4 pt-14 mobile:pt-8 px-16 mobile:px-4 gap-[38px] mobile:gap-[18px] bg-white">
                {
                    leverageRequestSent &&
                    <DuplicatedLeverageModal setIsEditModalOpened={setLeverageUpdateRequestSent}/>
                }
                <div className="flex items-center justify-between">
                    <span className="text-32-24-24g text-default">1:100</span>
                    <span className="text-32-24-24g text-default">1:200</span>
                    <span className="text-32-24-24g text-default">1:400</span>
                </div>
                <div className={`flex flex-col w-full ${demo ? "pointer-events-none" : ""}`}>
                    <div className="flex items-end gap-0.5 w-full h-[68px]">
                        <div
                            className={`flex justify-start items-start py-[3px] px-[5px] rounded-tr-[2px] rounded-tl-[2px] bg-info-badge-orange ${selectedRisk < leverageLevel1 ? "openedLevel32" : "closedLevel"} w-full`}>
                            <span className="text-11 text-white">{t("risks.low")}</span>
                        </div>
                        <div
                            className={`flex justify-start items-start py-[3px] px-[5px] rounded-tr-[2px] rounded-tl-[2px] bg-chart-orange ${selectedRisk >= leverageLevel1 && selectedRisk < leverageLevel2 ? "openedLevel50" : "closedLevel48"} w-full`}>
                            <span className="text-11 text-white">{t("risks.medium")}</span>
                        </div>
                        <div
                            className={`flex justify-start items-start py-[3px] px-[5px] rounded-tr-[2px] rounded-tl-[2px] bg-leverage-dark ${selectedRisk >= leverageLevel2 ? "openedLevel68" : "closedLevel72"} w-full`}>
                            <span className="text-11 text-white">{t("risks.high")}</span>
                        </div>
                    </div>
                    <Range
                        disabled={alreadyInProcess}
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(values1) => setValues(values1)}
                        renderTrack={({props, children}) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "60px",
                                    display: "flex",
                                    width: "100%",
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "4px",
                                        width: "100%",
                                        borderRadius: "100px",
                                        background: getTrackBackground({
                                            values,
                                            colors: ["#2B2A28 ", "#F5F4F2"],
                                            min: MIN,
                                            max: MAX,
                                        }),
                                        alignSelf: "center",
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({props, isDragged}) => (
                            <div
                                className={"custom-thumb"}
                                {...props}
                                key={props.key}
                                style={{
                                    ...props.style,
                                    height: "32px",
                                    width: "32px",
                                    borderRadius: "50%",
                                    backgroundColor: "#FFF",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: "0px 2px 6px #f5f4f2",
                                    border: "2px solid #F5F4F2",
                                    outline: "#2B2A28",
                                }}
                            >
                                <svg
                                    className="pointer-events-none"
                                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M6.66635 17.7109L6.66635 2.71094L7.91635 2.71094L7.91635 17.7109H6.66635ZM9.58302 17.7109L9.58302 2.71094L10.833 2.71094L10.833 17.7109H9.58302ZM12.4997 2.71094L12.4997 17.7109H13.7497L13.7497 2.71094L12.4997 2.71094Z"
                                          fill="#868583"/>
                                </svg>
                            </div>
                        )}
                    />
                    {
                        demo && <span className={"text-14_16 text-grey-seccondary mt-6"}>
                                    You&apos;re currently in demo mode. Some features, including leverage adjustment, are unavailable in this mode.
                                </span>
                    }
                </div>
            </div>
            {
                alreadyInProcess
                    ? <div
                        className={`flex flex-col pb-10 mobile:pb-4 pt-10 mobile:pt-4 px-16 mobile:px-6 gap-[24px] mobile:gap-[18px] bg-white rounded-b-8 ${demo ? "hidden" : ""}`}>
                        <span className={"text-default"}>
                            {t("request_already_in_process")}
                        </span>
                    </div>
                    : <>
                        <div className={`flex flex-col p-6 gap-4 bg-white rounded-b-8 ${demo ? "hidden" : ""}`}>
                            <div className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 object-contain flex-0-0-auto-all"
                                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M10 2.28906C5.74282 2.28906 2.29169 5.7402 2.29169 9.9974C2.29169 14.2546 5.74282 17.7057 10 17.7057C14.2572 17.7057 17.7084 14.2546 17.7084 9.9974C17.7084 5.7402 14.2572 2.28906 10 2.28906ZM1.04169 9.9974C1.04169 5.04984 5.05247 1.03906 10 1.03906C14.9476 1.03906 18.9584 5.04984 18.9584 9.9974C18.9584 14.9449 14.9476 18.9557 10 18.9557C5.05247 18.9557 1.04169 14.9449 1.04169 9.9974ZM8.75002 9.78906V8.53906H10C10.3452 8.53906 10.625 8.81888 10.625 9.16406V12.7057H11.25V13.9557H10H8.75002C8.40484 13.9557 8.12502 13.6759 8.12502 13.3307C8.12502 12.9856 8.40484 12.7057 8.75002 12.7057H9.37502V9.78906H8.75002ZM10 7.28906C10.3452 7.28906 10.625 7.00924 10.625 6.66406C10.625 6.31888 10.3452 6.03906 10 6.03906C9.65484 6.03906 9.37502 6.31888 9.37502 6.66406C9.37502 7.00924 9.65484 7.28906 10 7.28906Z"
                                          fill="#686765"/>
                                </svg>
                                <div className="flex flex-col items-start gap-1">
                                <span className="text-16-mob font-medium text-default tracking-normal">
                                    {t("risk_warning.title")},{`${" "}`}
                                </span>
                                    <span className="text-14_16 tracking-wider text-grey-seccondary">
                                    {t("risk_warning.description")},{`${" "}`}
                                        <span
                                            onClick={() => setIsRiskModalOpened(true)}
                                            className="underline custom-underline-all cursor-pointer">
                                        {t("risk_warning.sidebar_open_text")}
                                    </span>
                                </span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 object-contain opacity-0"
                                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M10 2.28906C5.74282 2.28906 2.29169 5.7402 2.29169 9.9974C2.29169 14.2546 5.74282 17.7057 10 17.7057C14.2572 17.7057 17.7084 14.2546 17.7084 9.9974C17.7084 5.7402 14.2572 2.28906 10 2.28906ZM1.04169 9.9974C1.04169 5.04984 5.05247 1.03906 10 1.03906C14.9476 1.03906 18.9584 5.04984 18.9584 9.9974C18.9584 14.9449 14.9476 18.9557 10 18.9557C5.05247 18.9557 1.04169 14.9449 1.04169 9.9974ZM8.75002 9.78906V8.53906H10C10.3452 8.53906 10.625 8.81888 10.625 9.16406V12.7057H11.25V13.9557H10H8.75002C8.40484 13.9557 8.12502 13.6759 8.12502 13.3307C8.12502 12.9856 8.40484 12.7057 8.75002 12.7057H9.37502V9.78906H8.75002ZM10 7.28906C10.3452 7.28906 10.625 7.00924 10.625 6.66406C10.625 6.31888 10.3452 6.03906 10 6.03906C9.65484 6.03906 9.37502 6.31888 9.37502 6.66406C9.37502 7.00924 9.65484 7.28906 10 7.28906Z"
                                          fill="#686765"/>
                                </svg>
                                <div
                                    className="flex items-center gap-2.5"
                                    onClick={() => setRiskAgreed(!riskAgreed)}
                                >
                                    {
                                        riskAgreed
                                            ? <svg
                                                className="w-5 h-5 object-contain cursor-pointer"
                                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z"
                                                    fill="#FF3F32"/>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M16.1554 6.78039L8.46597 14.4698L3.84473 9.84857L4.90539 8.78791L8.46597 12.3485L15.0947 5.71973L16.1554 6.78039Z"
                                                      fill="white" fillOpacity="0.8"/>
                                            </svg>
                                            : <svg
                                                className="w-5 h-5 object-contain cursor-pointer"
                                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2Z"
                                                    stroke="#E8E5E1"/>
                                            </svg>
                                    }
                                    <span
                                        className="text-14 font-medium text-default cursor-pointer"
                                    >{t("risk_warning.agreement")}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`flex items-center justify-center gap-2 mt-5 ${demo ? "hidden" : ""}`}>
                            <button
                                onClick={handleCancelChange}
                                className={"btnSec"}
                            >
                                {t("risk_warning.buttons.cancel")}
                            </button>
                            <button
                                className={"btnPrim"}
                                disabled={disabledButton}
                                onClick={handleSaveNewLeverage}
                            >
                                {t("risk_warning.buttons.save")}
                            </button>
                        </div>
                    </>
            }
        </>
    );
};

export default AccountLeverage;
