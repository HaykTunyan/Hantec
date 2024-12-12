import React, {ChangeEvent, useState} from "react";
import FileUpload from "@/components/registration/registrationLive/manualVerification/nationalIdForm/fileUpload";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";
import {uploadFile} from "@/api/registration/uploadFile";
import LeaveButton from "@/components/registration/registrationLive/leaveButton";
import {informAboutManualProcess} from "@/api/registration/informAboutManualProcess";
import {updatePersonalInfoAddress} from "@/api/registration/updatePersonalInfoAddress";
import {useTranslation} from "next-i18next";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
    accOpenId: number | undefined;
}

const ManualVerificationStep2 = ({setSelectedTab, lineWidth, accOpenId}: IStepsInfo) => {
    const [residentialAddress, setResidentialAddress] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const {t} = useTranslation("onboarding");
    const addessManual: any = t("main_event.address_verify.address_manual", {returnObjects: true});

    const [updateRequest, setUpdateRequest] = useState<any>({
        personalInfo: {},
        bankInfo: {},
        investmentInfo: {},
        referralInfo: {},
        selfCertifications: [],
        tradingAccounts: [],
    });

    const handleAddressChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setResidentialAddress(event.target.value);

        setUpdateRequest((prevState: any) => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                addrResidential1: residentialAddress,
                addrResidential2: "",
                addrResidential3: ""
            },
        }));
    };

    const handleSubmitDocumentInfo = () => {
        setIsProcessing(true);

        updatePersonalInfoAddress(updateRequest, accOpenId)
            .then(() => {
                return informAboutManualProcess(accOpenId!);
            })
            .then(() => {
                return uploadFile(selectedFile, "id_card_front", String(accOpenId));
            })
            .then(() => {
                setSelectedTab("steps3");
            });
    };

    const disabled = !residentialAddress || !selectedFile || isProcessing;

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <LeaveButton btnName={t("exit.save_exit")}/>
            </div>
            <div className="max-w-[362px] w-full mx-auto flex flex-col gap-12 tablet:mb-10 mobile:px-4">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        {t("main_event.address_verify.title")}
                    </button>
                    <span className="text-32 font-medium">
                        {t("main_event.address_verify.description1")} {t("main_event.address_verify.description2")}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-20-20 text-default font-medium">
                        {addessManual.title}
                    </span>
                    <span className="text-14_16 text-grey-seccondary tracking-wider">
                        {addessManual.description}
                    </span>
                </div>
                <div className="flex flex-col mt-6 pb-12 gap-12">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="residentialAddress" className="text-14 text-default tracking-wider">
                                {addessManual.label}
                            </label>
                            <textarea
                                name="residentialAddress"
                                id="residentialAddress"
                                rows={5}
                                className={"input textInput"}
                                value={residentialAddress}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="uploadFile" className="text-14 text-default tracking-wider">
                            {addessManual.upload_document}
                        </label>
                        <div className="flex flex-col gap-4">
                            <FileUpload
                                handleSelectFile={setSelectedFile}
                                address={true}
                                side={addessManual.upload_document_placeholder}
                                error={false}
                            />
                            <span className="text-12_14 text-grey-seccondary">
                                {addessManual.hint}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div
                    className="py-2 px-4 flex tablet:gap-1 items-center justify-between border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    <button
                        className="btnSec btnWithoutFixedHeight"
                        onClick={() => setSelectedTab("steps2")}
                    >
                        {addessManual.buttons.back}
                    </button>
                    <button
                        disabled={disabled}
                        className="btnPrim"
                        onClick={handleSubmitDocumentInfo}
                    >
                        {addessManual.buttons.continue}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualVerificationStep2;
