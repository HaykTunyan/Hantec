import React from "react";
import {useTranslation} from "next-i18next";

interface IProfileSidebar {
    selectedTab: number,
    setSelectedTab: (selectedTab: number) => void,
}

const ProfileSidebar = ({selectedTab, setSelectedTab}: IProfileSidebar) => {
    const {t} = useTranslation("profile");

    const sideBarMenu = [
        t("menu.info"),
        t("menu.residential_address"),
        t("menu.mailing_address"),
        t("menu.delete_profile")
    ];

    return (
        <div className={`max-w-[199px] mobile:max-w-none w-full pt-[15px] mobile:pt-4 pb-8 mobile:pb-4 pl-7 
        mobile:pl-4 mobile:pr-4 ${selectedTab === 1 ? "mt-3" : "mt-0"} mobile:mt-0 flex flex-col mobile:flex-row gap-3 mobile:gap-1 flex-auto
        mobile:overflow-x-auto mobile:overflow-y-hidden mobile:flex-nowrap
        `}>
            {
                sideBarMenu.map((item, index) =>
                    <span
                        key={index}
                        onClick={() => setSelectedTab(index + 1)}
                        className="py-[3px] text-14 font-medium text-grey-seccondary cursor-pointer xl:hover:text-default transition duration-300 mobile:hidden"
                        style={selectedTab === index + 1 ? {color: "#2B2A28"} : undefined}
                    >{item}</span>
                )
            }
            {
                sideBarMenu.map((item, index) =>
                    <span
                        key={index}
                        onClick={() => setSelectedTab(index + 1)}
                        className={`${selectedTab === index + 1 ? "btnPrim" : "btnSec"} btnTab flex-0-0-auto md:hidden`}
                    >{item}</span>
                )
            }
        </div>
    );
};

export default ProfileSidebar;
