import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";
import Link from "next/link";

interface IRegistrationHeader {
    setIsDemo?: (x: boolean) => void;
    isDemo?: boolean;
    login?: boolean;
    selectedRegistrationTab?: string;
}

const languages = ["EN", "FR"];

const RegistrationHeader = ({setIsDemo, isDemo, login, selectedRegistrationTab}: IRegistrationHeader) => {
    const {t, i18n} = useTranslation("registration");
    const router = useRouter();
    const [isDropDownOpened, setIsDropdownOpened] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");

    const handleSelectLanguage = (language: string) => {
        i18n.changeLanguage(language.toLowerCase());
        localStorage.setItem("language", language.toLowerCase());
        setSelectedLanguage(language);
        setIsDropdownOpened(false);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") as string;

        if (storedLanguage) {
            setSelectedLanguage(storedLanguage.toUpperCase());
        }
    }, []);

    return (
        <div className="flex items-center justify-between tablet:p-4 ">
            <button
                className="btnSec btnLogin relative"
                onClick={() => setIsDropdownOpened(!isDropDownOpened)}
            >
                <span>{selectedLanguage}</span>
                <svg
                    className={`w-4 h-4 object-contain ${isDropDownOpened ? "drpDwnOpened" : "drpDwnClosed"}`}
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                          fill="#2B2A28"/>
                </svg>
                {
                    isDropDownOpened && <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute flex flex-col gap-2 tablet:gap-1 w-full bg-white left-0 top-12 tablet:top-8 rounded-[8px] p-1 border border-grey-extra z-[11111111]"
                    >
                        {
                            languages.map((item, index) =>
                                <div
                                    key={index}
                                    onClick={(e) => handleSelectLanguage(item)}
                                    className={`flex items-center justify-between w-full px-3 tablet:px-1 py-2.5 tablet:py-1.5 cursor-pointer rounded ${selectedLanguage === item ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                >
                                    <span>{item}</span>
                                    {
                                        selectedLanguage === item && <svg
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
            </button>
            <img
                onClick={() => router.push("/")}
                className={"cursor-pointer tablet:hidden"}
                src="/icons/new/hantec.svg"
                alt="Hantec logo"
            />
            <img
                onClick={() => router.push("/")}
                className="hidden tablet:block w-8 object-contain"
                src="/icons/new/logoSmallRed.svg"
                alt="Hantec logo"
            />
            {
                login && selectedRegistrationTab === "start" ? <div className="flex items-center gap-2 tablet">
                        {/*<button*/}
                        {/*    onClick={() => setIsDemo(!isDemo)}*/}
                        {/*    className="tablet:hidden"*/}
                        {/*>Switch Demo*/}
                        {/*</button>*/}
                        <Link href={"/login"}>
                            <button className="btnThird btnLogin">
                                {t("login")}
                            </button>
                        </Link>
                    </div>
                    : <div style={{width: "78px"}}></div>
            }
        </div>
    );
};

export default RegistrationHeader;
