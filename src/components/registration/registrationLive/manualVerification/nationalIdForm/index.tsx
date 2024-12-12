import React, {useEffect, useRef, useState} from "react";
import Input from "@/components/input";
import BirthdayDropDown
    from "@/components/registration/registrationLive/manualVerification/nationalIdForm/birthdayDropDown";
import FileUpload from "@/components/registration/registrationLive/manualVerification/nationalIdForm/fileUpload";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
const months = Array.from({length: 12}, (_, i) => (i + 1).toString());
const currentYear = new Date().getFullYear();
const years = Array.from({length: 100}, (_, i) => (currentYear - i).toString());

interface INationalIdForm {
    idType: number | null;
    setFormData: (x: any) => void;
    countriesList: any;
    name: string;
    frontSideDoc: File | null;
    backSideDoc: File | null;
    setFrontSideDoc: (x: File | null) => void;
    setBackSideDoc: (x: File | null) => void;
    requiredFields: any;
}

const NationalIdForm = ({
                            setFormData,
                            idType,
                            countriesList,
                            name,
                            setBackSideDoc,
                            setFrontSideDoc,
                            frontSideDoc,
                            backSideDoc,
                            requiredFields
                        }: INationalIdForm) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nationality, setNationality] = useState<string>("");
    const [idNo, setIdNo] = useState<string>("");

    const [dobDay, setDobDay] = useState<string>("");
    const [dobMonth, setDobMonth] = useState<string>("");
    const [dobYear, setDobYear] = useState<string>("");
    const [isCountryDrpDwnOpened, setIsCountryDrpDwnOpened] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    const {t} = useTranslation("onboarding");
    const documentForm: any = t("main_event.id_verify.id_manual.document_form", {returnObjects: true});

    useEffect(() => {
        setFormData({
            nameEng: firstName + " " + lastName,
            nationality,
            idNo,
            idType,
            dobDay,
            dobMonth,
            dobYear
        });
    }, [firstName, lastName, nationality, idNo, frontSideDoc, backSideDoc, dobDay, dobMonth, dobYear]);

    const countryRef = useRef<any>(null);
    const excludeCountryRef = useRef(null);
    useOnClickOutside(countryRef, setIsCountryDrpDwnOpened, excludeCountryRef);

    function capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    const handleSelectCountry = (e: any, country: any) => {
        e.stopPropagation();
        setNationality(country.value);
        setSelectedCountry(capitalizeFirstLetter(country.desc));
        setIsCountryDrpDwnOpened(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleKeyDown = (e: any) => {
        if (!isCountryDrpDwnOpened) return;

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setSearchTerm("");
        }, 500);

        if (e.key.length === 1) {
            const typedChar = e.key.toLowerCase();
            const updatedSearchTerm = searchTerm + typedChar;
            setSearchTerm(updatedSearchTerm);

            const matchingIndex = countriesList.findIndex((country: any) =>
                country.desc.toLowerCase().startsWith(updatedSearchTerm)
            );

            if (matchingIndex !== -1) {
                const dropdownItems = countryRef.current?.querySelectorAll(".dropdown-item");
                if (dropdownItems && dropdownItems[matchingIndex]) {
                    const item = dropdownItems[matchingIndex];
                    const dropdown = countryRef.current;

                    const itemHeight = item.offsetHeight;
                    const dropdownHeight = dropdown?.offsetHeight || 0;

                    const middlePosition = item.offsetTop - (dropdownHeight / 2) + (itemHeight / 2);

                    dropdown?.scrollTo({
                        top: middlePosition,
                        behavior: "smooth",
                    });
                }
            }
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-14 text-default tracking-wider">
                        {documentForm.first_name}
                    </label>
                    <Input
                        htmlFor={"firstName"}
                        currentValue={firstName}
                        handleValueChange={(e) => setFirstName(e.target.value)}
                        type={"text"}
                        placeholder="&nbsp;"
                        errorMsg={requiredFields.firstName}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-14 text-default tracking-wider">
                        {documentForm.last_name}
                    </label>
                    <Input
                        htmlFor={"lastName"}
                        currentValue={lastName}
                        handleValueChange={(e) => setLastName(e.target.value)}
                        type={"text"}
                        placeholder="&nbsp;"
                        errorMsg={requiredFields.lastName}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="country" className="text-14 text-default tracking-wider">
                        {documentForm.country}
                    </label>
                    <div
                        ref={excludeCountryRef}
                        onClick={() => setIsCountryDrpDwnOpened(!isCountryDrpDwnOpened)}
                        className={`input ${requiredFields.country ? "input-error" : ""} cursor-pointer relative flex items-center justify-between`}
                        style={{height: "52px"}}
                        tabIndex={0} // Allow div to be focusable for keydown events
                        onKeyDown={(e) => handleKeyDown(e)}
                    >
                        <span>{selectedCountry ? selectedCountry : documentForm.country_placeholder}</span>
                        <svg
                            className={`w-5 h-5 object-contain ${isCountryDrpDwnOpened ? "drpDwnOpened" : "drpDwnClosed"}`}

                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M20 9.06066L12.2198 16.8409L4.43942 9.06066L5.50008 8L12.2197 14.7196L18.9393 8L20 9.06066Z"
                                  fill="#2B2A28"/>
                        </svg>
                        {
                            isCountryDrpDwnOpened
                            && <div
                                ref={countryRef}
                                className="h-[300px] overflow-x-scroll absolute flex flex-col gap-2 tablet:gap-1 w-full bg-white left-0 top-14 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                            >
                                {
                                    countriesList.map((i: any, idx: number) =>
                                        <div
                                            key={idx}
                                            onClick={(e) => handleSelectCountry(e, i)}
                                            className={`dropdown-item flex items-center justify-between w-full px-3 py-2.5 cursor-pointer rounded ${selectedCountry === capitalizeFirstLetter(i.desc) ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                        >
                                            <span>{capitalizeFirstLetter(i.desc)}</span>
                                            {
                                                selectedCountry === capitalizeFirstLetter(i.desc) && <svg
                                                    className="w-5 h-5 tablet:w-4 tablet:h-4 object-contain"
                                                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                                                          fill="#2B2A28"/>
                                                </svg>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="birhtday" className="text-14 text-default tracking-wider">
                        {documentForm.birthday}
                    </label>
                    <div className="flex items-center w-full gap-1.5">
                        <BirthdayDropDown
                            type={"days"}
                            data={days}
                            setValue={setDobDay}
                            error={requiredFields.dobDay}
                        />
                        <BirthdayDropDown
                            type={"months"}
                            data={months}
                            setValue={setDobMonth}
                            error={requiredFields.dobMonth}
                        />
                        <BirthdayDropDown
                            type={"years"}
                            data={years}
                            setValue={setDobYear}
                            error={requiredFields.dobYear}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="nationalIdNumber" className="text-14 text-default tracking-wider">
                        {name}
                    </label>
                    <Input
                        htmlFor={"nationalIdNumber"}
                        currentValue={idNo}
                        handleValueChange={(e) => setIdNo(e.target.value)}
                        type={"text"}
                        placeholder="&nbsp;"
                        errorMsg={requiredFields.idNo}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="nationalIdNumber" className="text-14 text-default tracking-wider">
                    {documentForm.document_upload}
                </label>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <FileUpload
                            error={requiredFields.frontSide}
                            handleSelectFile={setFrontSideDoc}
                            side={documentForm.document_image_front}
                        />
                        <FileUpload
                            handleSelectFile={setBackSideDoc}
                            error={requiredFields.backSide}
                            side={documentForm.document_image_back}
                        />
                    </div>
                    <span className="text-12_14 text-grey-seccondary">
                        {documentForm.document_upload_hint}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NationalIdForm;
