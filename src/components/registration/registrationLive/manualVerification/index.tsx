import React, {useEffect, useState} from "react";
import NationalIdForm from "@/components/registration/registrationLive/manualVerification/nationalIdForm";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";
import {uploadFile} from "@/api/registration/uploadFile";
import {updatePersonalInfo} from "@/api/registration/updatePersonalInfo";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {informAboutManualProcess} from "@/api/registration/informAboutManualProcess";
import {openLiveChat} from "@/hooks/openLiveChat";
import IdDuplicateModal from "@/components/registration/idDuplicateModal";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
    countriesList: any;
    accOpenId: number | undefined;
}

const idTypes = {
    "national_id": 1,
    "passport": 2,
    "driver_license": 3
} as const;

const ManualVerification = ({setSelectedTab, lineWidth, countriesList, accOpenId}: IStepsInfo) => {
    const [selectedMethod, setSelectedMethod] = useState<keyof typeof idTypes | "">("");
    const [frontSideDoc, setFrontSideDoc] = useState<File | null>(null);
    const [backSideDoc, setBackSideDoc] = useState<File | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [tinData, setTinData] = useState<any[]>([]);
    const idType = selectedMethod ? idTypes[selectedMethod] : null;
    const [isProcessing2, setIsProcessing2] = useState<boolean>(false);
    const [idDuplicateErr, setIdDuplicateErr] = useState<boolean>(false);

    const {t} = useTranslation("onboarding");
    const idManual: any = t("main_event.id_verify.id_manual", {returnObjects: true});

    // RequiredFields
    const [requiredFields, setRequiredFields] = useState<any>({
        firstName: false,
        lastName: false,
        country: false,
        dobDay: false,
        dobMonth: false,
        dobYear: false,
        idNumber: false,
        frondSide: false,
        backSide: false,
    });

    useEffect(() => {
        setTinData((prev) => [
            {
                ...prev[0],
                jurisdictionOfResidence: formData.nationality,
            }
        ]);
    }, [formData.nationality]);

    useEffect(() => {
        setTinData((prev) => [
            {
                ...prev[0],
                tin: formData.idNo,
            }
        ]);
    }, [formData.idNo]);

    useEffect(() => {
        const [firstNameInNameEng, lastNameInNameEng] = formData.nameEng?.split(" ") || ["", ""];

        const newRequiredFields = {
            firstName: !firstNameInNameEng,
            lastName: !lastNameInNameEng,
            country: !formData.nationality,
            dobDay: !formData.dobDay,
            dobMonth: !formData.dobMonth,
            dobYear: !formData.dobYear,
            idNo: !formData.idNo,
            frontSide: !frontSideDoc,
            backSide: !backSideDoc
        };

        setRequiredFields((prev: any) => ({
            ...prev,
            firstName: newRequiredFields.firstName ? prev.firstName : false,
            lastName: newRequiredFields.lastName ? prev.lastName : false,
            country: newRequiredFields.country ? prev.country : false,
            dobDay: newRequiredFields.dobDay ? prev.dobDay : false,
            dobMonth: newRequiredFields.dobMonth ? prev.dobMonth : false,
            dobYear: newRequiredFields.dobYear ? prev.dobYear : false,
            idNo: newRequiredFields.idNo ? prev.idNo : false,
            frontSide: newRequiredFields.frontSide ? prev.frontSide : false,
            backSide: newRequiredFields.backSide ? prev.backSide : false
        }));
    }, [formData.nameEng, formData.nationality, formData.dobDay, formData.dobMonth, formData.dobYear, formData.idNo, frontSideDoc, backSideDoc]);

    const handleSubmitDocumentInfo = () => {
        const [firstNameInNameEng, lastNameInNameEng] = formData.nameEng?.split(" ") || ["", ""];

        const requiredChecks: any = {
            firstName: !firstNameInNameEng,
            lastName: !lastNameInNameEng,
            country: !formData.nationality,
            dobDay: !formData.dobDay,
            dobMonth: !formData.dobMonth,
            dobYear: !formData.dobYear,
            idNo: !formData.idNo,
            frontSide: !frontSideDoc,
            backSide: !backSideDoc
        };

        const hasError = Object.values(requiredChecks).some((isError) => isError);

        if (hasError) {
            setRequiredFields(requiredChecks);
            return;
        } else {
            setRequiredFields({
                firstName: false,
                lastName: false,
                country: false,
                dobDay: false,
                dobMonth: false,
                dobYear: false,
                idNo: false,
                frontSide: false,
                backSide: false
            });
        }

        setIsProcessing2(true);
        updatePersonalInfo(formData, accOpenId, tinData)
            .then((res) => {
                if (res?.msg === "ERROR_ID_DOCUMENT_EXISTS") {
                    setIsProcessing2(false);
                    setIdDuplicateErr(true);
                    document.querySelector("body")?.classList.add("bodyOverflowHidden");
                } else {
                    informAboutManualProcess(accOpenId!);
                    return Promise.all([
                        uploadFile(frontSideDoc, "id_card_front", String(accOpenId)),
                        uploadFile(backSideDoc, "id_card_back", String(accOpenId))
                    ])
                        .then(() => Promise.resolve())
                        .then(() => {
                            // setSelectedTab("disclaimer2");
                            setIsProcessing2(false);
                        });
                }
            });
    };

    const handleOpenChat = () => {
        openLiveChat();
    };

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            {
                idDuplicateErr && <IdDuplicateModal
                    setIsDuplicateErr={setIdDuplicateErr}
                    refresh={false}
                />
            }
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={t("exit.save_exit")}/>
            </div>
            <div className="max-w-[362px] w-full mx-auto flex flex-col gap-12 tablet:mb-10 mobile:px-4">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        {t("main_event.id_verify.title")}
                    </button>
                    <span className="text-32 font-medium">
                        {t("main_event.id_verify.description1")} {t("main_event.id_verify.description2")}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-20-20 text-default font-medium">
                        {idManual.title}
                    </span>
                    <span className="text-14_16 text-grey-seccondary tracking-wider">
                        {idManual.description}
                    </span>
                </div>
                <div className={`
                flex flex-col mt-6 pb-12
                ${selectedMethod ? "border-b border-grey-extra-light" : ""}
                `}>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-1.5">
                            <span>{idManual.document_select}</span>
                            <div className="flex flex-col gap-2">
                                <div
                                    onClick={() => setSelectedMethod("national_id")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "national_id" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 font-medium tracking-wider ${selectedMethod === "national_id" ? "text-white" : ""}`}>{idManual.id}</span>
                                    {
                                        selectedMethod === "national_id" ?
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                      fill="white"/>
                                            </svg>
                                            : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                   xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                            </svg>
                                    }
                                </div>
                                <div
                                    onClick={() => setSelectedMethod("passport")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "passport" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 font-medium tracking-wider ${selectedMethod === "passport" ? "text-white" : ""}`}>{idManual.passport}</span>
                                    {
                                        selectedMethod === "passport" ?
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                      fill="white"/>
                                            </svg>
                                            : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                   xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                            </svg>
                                    }
                                </div>
                                <div
                                    onClick={() => setSelectedMethod("driver_license")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "driver_license" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 font-medium tracking-wider ${selectedMethod === "driver_license" ? "text-white" : ""}`}>{idManual.driver}</span>
                                    {
                                        selectedMethod === "driver_license" ?
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                      fill="white"/>
                                            </svg>
                                            : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                   xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                            </svg>
                                    }
                                </div>
                                <span
                                    onClick={handleOpenChat}
                                    className="text-14_16 text-grey-seccondary underline custom-underline-all self-end mt-2 cursor-pointer">
                                    {idManual.dont_have_documents}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    selectedMethod === "national_id" && <NationalIdForm
                        requiredFields={requiredFields}
                        name={idManual.document_form.document_number_id}
                        frontSideDoc={frontSideDoc}
                        backSideDoc={backSideDoc}
                        setFrontSideDoc={setFrontSideDoc}
                        setBackSideDoc={setBackSideDoc}
                        countriesList={countriesList}
                        idType={idType}
                        setFormData={setFormData}
                    />
                }
                {
                    selectedMethod === "passport" && <NationalIdForm
                        requiredFields={requiredFields}
                        name={idManual.document_form.document_number_passport}
                        frontSideDoc={frontSideDoc}
                        backSideDoc={backSideDoc}
                        setFrontSideDoc={setFrontSideDoc}
                        setBackSideDoc={setBackSideDoc}
                        countriesList={countriesList}
                        idType={idType}
                        setFormData={setFormData}
                    />
                }
                {
                    selectedMethod === "driver_license" && <NationalIdForm
                        requiredFields={requiredFields}
                        name={idManual.document_form.document_number_driver}
                        frontSideDoc={frontSideDoc}
                        backSideDoc={backSideDoc}
                        setFrontSideDoc={setFrontSideDoc}
                        setBackSideDoc={setBackSideDoc}
                        countriesList={countriesList}
                        idType={idType}
                        setFormData={setFormData}
                    />
                }
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div
                    className="py-2 px-4 flex tablet:gap-1 items-center justify-between border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    <button
                        className="btnSec btnWithoutFixedHeight"
                        onClick={() => setSelectedTab("choose-platform")}
                    >
                        {idManual.buttons.back_to_auto}
                    </button>
                    <button
                        className="btnPrim"
                        disabled={isProcessing2 || !selectedMethod}
                        onClick={handleSubmitDocumentInfo}
                    >
                        {idManual.buttons.continue_btn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualVerification;
