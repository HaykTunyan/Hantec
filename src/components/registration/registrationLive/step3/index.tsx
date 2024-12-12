import React, {useEffect, useState} from "react";
import Source from "@/components/registration/registrationLive/step3/source";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";
import {submitAccount} from "@/api/registration/sumbitAccount";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {updatePersonalInfoAddress} from "@/api/registration/updatePersonalInfoAddress";
import DropDown from "@/components/registration/registrationLive/step3/dropDown";
import Input from "@/components/input";
import {getAccountOpen} from "@/api/registration/getAccountOpen";
import CheckboxPrivacy from "@/components/registration/registrationLive/step3/checkboxPrivacy";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    lineWidth: number;
    accOpenId: number | undefined;
    setSelectedTab: (x: string) => void;
}

const OnboardingStep3 = ({lineWidth, accOpenId, setSelectedTab}: IStepsInfo) => {
    const {t} = useTranslation("onboarding");
    const netWorthInfo: any = t("main_event.net_worth_verify", {returnObjects: true});

    const leverageLevels = ["1:100", "1:200", "1:400"];
    const annualIncome = ["<= 10.000", "10.001 - 30.000", "30.001 - 50.000", "50.001 - 70.000", "> 70.000"];
    const netWorth = ["<= 10.000", "10.001 - 30.000", "30.001 - 50.000", "50.001 - 70.000", "> 70.000"];
    const occupation = [...netWorthInfo.occupations];
    const experience = [...netWorthInfo.experiences];
    const averageSize = ["0-50", "5-150", "150-300", ">300"];
    const averageAmount = ["< 5000", "5000 - 100.000", "> 100.000"];
    const tradingStyle = [...netWorthInfo.styles];
    const citizen = [netWorthInfo.us_citizen.yes, netWorthInfo.us_citizen.no];

    const arrayToObject = (arr: string[]) => {
        return arr.reduce((acc, curr, index) => {
            acc[curr] = index + 1;
            return acc;
        }, {} as Record<string, number>);
    };

    const annualIncomeMap = arrayToObject(annualIncome);
    const netWorthMap = arrayToObject(netWorth);
    const occupationMap = arrayToObject(occupation);
    const experienceMap = arrayToObject(experience);
    const averageSizeMap = arrayToObject(averageSize);
    const averageAmountMap = arrayToObject(averageAmount);
    const tradingStyleMap = arrayToObject(tradingStyle);

    const [leverageLevel, setLeverageLevel] = useState<string>("");
    const [selectedAnnualIncome, setSelectedAnnualIncome] = useState<string>("");
    const [selectedNetWorth, setSelectedNetWorth] = useState<string>("");
    const [selectedOccupation, setSelectedOccupation] = useState<string>("");
    const [selectedExperience, setSelectedExperience] = useState<string>("");
    const [selectedAvgSize, setSelectedAvgSize] = useState<string>("");
    const [selectedAvgAmount, setSelectedAvgAmount] = useState<string>("");
    const [selectedStyle, setSelectedStyle] = useState<string>("");
    const [selectedCitizen, setSelectedCitizen] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [tin, setTIN] = useState<string>("");
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [nationality, setNationality] = useState<string>("");

    const [updateRequest, setUpdateRequest] = useState<any>({
        personalInfo: {},
        bankInfo: {},
        investmentInfo: {},
        referralInfo: {},
        selfCertifications: [],
        tradingAccounts: [],
    });

    const handleSetTin = (e: any) => {
        setTIN(e.target.value);

        setUpdateRequest((prevState: any) => {
            const newSelfVerify = {
                jurisdictionOfResidence: nationality,
                tin: e.target.value || tin,
            };

            return {
                ...prevState,
                selfCertifications: [newSelfVerify]
            };
        });
    };

    useEffect(() => {
        getAccountOpen(accOpenId!)
            .then((data) => {
                if (data && data?.data?.data?.personalInfo?.idNo) {
                    setNationality(data?.data.data.personalInfo.nationality);
                }
            });
    }, []);

    const handleSelectLeverageLevel = (level: string) => {
        setLeverageLevel(level);

        setUpdateRequest((prevState: any) => {
            const newAccount = {
                platformCode: "MT5_UAT",
                accCurrency: "USD",
                accLeverage: level
            };

            return {
                ...prevState,
                tradingAccounts: [newAccount]
            };
        });
    };

    const handleSelectAnnual = (level: string) => {
        setSelectedAnnualIncome(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                annualIncome: annualIncomeMap[level]
            }
        }));
    };

    const handleSelectExperience = (level: string) => {
        setSelectedExperience(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                investExp: experienceMap[level]
            }
        }));
    };

    const handleSelectAvarageSize = (level: string) => {
        setSelectedAvgSize(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                investAvgNo: averageSizeMap[level]
            }
        }));
    };

    const handleSelectAvarageAmount = (level: string) => {
        setSelectedAvgAmount(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                investAvgAmt: averageAmountMap[level]
            }
        }));
    };

    const handleSelectTradingStyle = (level: string) => {
        setSelectedStyle(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                investStyle: tradingStyleMap[level]
            }
        }));
    };

    const handleSelectCitizen = (level: string) => {
        setSelectedCitizen(level);
    };

    const handleSelectNetWorth = (level: string) => {
        setSelectedNetWorth(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                netWorth: netWorthMap[level]
            }
        }));
    };

    const handleSelectOccupation = (level: string) => {
        setSelectedOccupation(level);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                employStatus: occupationMap[level]
            }
        }));
    };

    const [sources, setSources] = useState([
        {value: netWorthInfo.sources[0], isChecked: false},
        {value: netWorthInfo.sources[1], isChecked: false},
        {value: netWorthInfo.sources[2], isChecked: false},
        {value: netWorthInfo.sources[3], isChecked: false},
        {value: netWorthInfo.sources[4], isChecked: false},
    ]);

    const handleToggle = (index: number) => {
        const newSources = [...sources];
        newSources[index].isChecked = !newSources[index].isChecked;
        setSources(newSources);

        const updatedInvestmentInfo = newSources.reduce((acc, source) => {
            const key = `src${source.value.replace(/ /g, "")}`;
            acc[key] = source.isChecked;
            return acc;
        }, {} as Record<string, boolean>);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            investmentInfo: {
                ...prevState.investmentInfo,
                ...updatedInvestmentInfo,
            }
        }));
    };

    const disabled = !leverageLevel
        || !selectedAnnualIncome
        || !selectedNetWorth
        || !selectedOccupation
        || !selectedAvgSize
        || !selectedAvgAmount
        || !selectedStyle
        || !selectedExperience
        || !selectedCitizen
        || selectedCitizen === netWorthInfo.us_citizen.yes
        || !isAgreed
        || !sources.some(source => source.isChecked)
        || isProcessing;

    const handleSubmitAccount = () => {
        setIsProcessing(true);

        updatePersonalInfoAddress(updateRequest, accOpenId)
            .then(() => {
                submitAccount(accOpenId)
                    .then(() => {
                        setSelectedTab("finish");
                        setIsProcessing(false);
                    });
            });
    };

    const handleAgree = () => {
        setIsAgreed(!isAgreed);
    };

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={"Save and exit"}/>
            </div>
            <div className="max-w-[362px] mobile:max-w-full w-full mx-auto flex flex-col gap-6 tablet:mb-10 mobile:px-4">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        Account Verification
                    </button>
                    <span className="text-32 font-medium">
                        Know your client process
                    </span>
                </div>
                <span className="text-20-20 text-default font-medium">
                    {netWorthInfo.title}
                </span>
                <div className="flex flex-col gap-1.5">
                    <span className="text-14_16 text-grey-seccondary tracking-wider">
                        {netWorthInfo.platform_inform}
                    </span>
                    <div
                        className={`
                    flex items-center bg-default w-full justify-between rounded border border-grey-extra-light p-6
                    transition duration-500
                    `}
                    >
                    <span
                        className={`text-14 text-white tracking-wider font-medium`}>MT5</span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                  fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <DropDown
                        label={netWorthInfo.leverage_label}
                        data={leverageLevels}
                        handleSelectItem={handleSelectLeverageLevel}
                        selectedValue={leverageLevel}
                    />
                    {
                        leverageLevel === "1:400" && <span className={"text-12_14 text-error"}>
                        {netWorthInfo.leverage_warning}
                        </span>
                    }
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <span className="text-20 text-default font-medium">
                        {netWorthInfo.investment_title}
                    </span>
                    <DropDown
                        label={netWorthInfo.income_label}
                        data={annualIncome}
                        handleSelectItem={handleSelectAnnual}
                        selectedValue={selectedAnnualIncome}
                    />
                    <DropDown
                        label={netWorthInfo.net_worth_label}
                        data={netWorth}
                        handleSelectItem={handleSelectNetWorth}
                        selectedValue={selectedNetWorth}
                    />
                    <DropDown
                        label={netWorthInfo.occupation_label}
                        data={occupation}
                        handleSelectItem={handleSelectOccupation}
                        selectedValue={selectedOccupation}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-14 text-default tracking-wider">{netWorthInfo.source}</span>
                    <div className="flex flex-col py-2 gap-1.5">
                        {sources.map((source, index) => (
                            <Source
                                key={index}
                                value={source.value}
                                isChecked={source.isChecked}
                                onToggle={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <DropDown
                        label={"Trading Experience of Leveraged Financial Product"}
                        data={experience}
                        handleSelectItem={handleSelectExperience}
                        selectedValue={selectedExperience}
                    />
                    <DropDown
                        label={"Average Transaction Size"}
                        data={averageSize}
                        handleSelectItem={handleSelectAvarageSize}
                        selectedValue={selectedAvgSize}
                    />
                    <DropDown
                        label={"Average Transaction Amount"}
                        data={averageAmount}
                        handleSelectItem={handleSelectAvarageAmount}
                        selectedValue={selectedAvgAmount}
                    />
                    <DropDown
                        label={"Trading Style"}
                        data={tradingStyle}
                        handleSelectItem={handleSelectTradingStyle}
                        selectedValue={selectedStyle}
                    />
                </div>
                <div className={"flex flex-col gap-6"}>
                    <span className={"text-20 font-medium"}>{netWorthInfo.self_declaration}</span>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex flex-col gap-1"}>
                            <DropDown
                                label={netWorthInfo.us_citizen.title}
                                data={citizen}
                                handleSelectItem={handleSelectCitizen}
                                selectedValue={selectedCitizen}
                            />
                            {
                                selectedCitizen === netWorthInfo.us_citizen.yes && <span className={"text-12_14 text-error"}>
                                    {netWorthInfo.us_citizen.no_us_citizen}
                                </span>
                            }
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <span
                                className="text-14 text-default tracking-wider">{netWorthInfo.tin}</span>
                            <Input
                                htmlFor={""}
                                currentValue={tin}
                                handleValueChange={handleSetTin}
                                type={"text"}
                                placeholder={""}
                            />
                            <span className={"text-12_14 text-grey-seccondary self-end"}>{netWorthInfo.optional}</span>
                        </div>
                    </div>
                </div>
                <CheckboxPrivacy
                    fontWeight={"normal"}
                    valueColor={"grey-tertiary"}
                    position={"start"}
                    onToggle={() => handleAgree()}
                    isChecked={isAgreed}
                />
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div
                    className="py-2 px-4 flex items-center justify-end border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    <button
                        disabled={disabled}
                        className="btnPrim"
                        onClick={handleSubmitAccount}
                    >
                        {netWorthInfo.buttons.continue_btn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep3;
