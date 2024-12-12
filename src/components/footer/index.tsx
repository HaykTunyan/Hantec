"use client";

import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import BottomEquity from "@/containers/dashboard/bottomEquity";
import { useTranslation } from "next-i18next";

interface FooterProps {
  processIsUserProcess: () => void;
  clientStatus: any;
}

const Footer: FC<FooterProps> = ({ processIsUserProcess , clientStatus  }) => {
  /**
   *  Footer Hooks.
   */

  const pathname = usePathname();
  const { t } = useTranslation("dashboard");
  const hideDisclosure = pathname === "/dashboard";

  const handleClick = () => {
    processIsUserProcess();
  };

  return (
    <footer className="bg-sidebar">
      {hideDisclosure && (
        <div className="px-4 pt-8 pb-32 md:px-8 md:pt-0 xl:pl-8 xl:pr-2 xl:py-8">
          <div className="hidden  lg:flex flex-row items-center">
            <div className="w-1/3">
              <div className="flex flex-row items-center">
                <div className="mr-4">
                  <img src="/icons/logo-footer.svg" alt="Logo-Footer" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs md:text-sm leading-3.5 text-grey-seccondary">
                    {" "}
                    {t("view_our_risk_disclosure")}
                  </span>
                  <span className="text-xxs font-normal leading-3 tracking-normal text-grey-seccondary">
                    {t("footer_reserved")}
                    {/* Hantec Group | All rights reserved */}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-2/3">
              <div className="flex flex-row justify-between items-center">
                <div className="w-52">
                  <button
                    type="button"
                    className="hidden w-full flex-row justify-center items-center rounded-sm border border-default border-opacity-10  px-10 py-2"
                  >
                    <img src="/icons/help-icon.svg" alt="Help-Icon" />
                    <span className="ml-1 text-default text-sm font-medium">
                      {t("need_help")}
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3 items-center">
                  <div className="">
                    <p className="text-sm font-medium text-default leading-3">
                      {" "}
                      {t("follow_us")}
                    </p>
                  </div>
                  <div className="text-grey-seccondary text-xs  font-medium text-center leading-3 border-r border-default border-opacity-10 pr-3">
                    <Link
                      href={"https://www.facebook.com/HantecFinancialAfrica/"}
                      target="_blank"
                    >
                      Facebook
                    </Link>
                  </div>
                  <div className="text-grey-seccondary text-xs font-medium text-center leading-3 border-r border-default border-opacity-10 pr-3">
                    <Link
                      href={
                        "https://www.linkedin.com/company/hantec-financial-africa/"
                      }
                      target="_blank"
                    >
                      Linkedin
                    </Link>
                  </div>
                  <div className="text-grey-seccondary text-xs font-medium leading-3">
                    <Link
                      href={
                        "https://www.youtube.com/channel/UCI29mKsUD14pLJlovg94uoA/"
                      }
                      target="_blank"
                    >
                      Youtube
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Version */}
          <div className="flex lg:hidden flex-row ">
            <div className="w-1/5">
              <div className="md:mr-4">
                <img src="/icons/logo-footer.svg" alt="Logo-Footer" />
              </div>
            </div>
            <div className="w-4/5 flex flex-col">
              <div className="flex flex-col">
                <span className="font-medium text-xs md:text-sm leading-3.5 text-grey-seccondary">
                  {" "}
                  {t("view_our_risk_disclosure")}
                </span>
                <span className=" text-xxs font-normal leading-3 tracking-normal text-grey-seccondary">
                  {/* hantec Group | All rights reserved */}
                  {t("footer_reserved")}
                </span>
              </div>
              <div className="pt-4" />
              <div className="grid grid-cols-4 gap-1 items-center max-w-80">
                <div className="flex">
                  <p className="text-sm font-medium text-default leading-3.5">
                    {" "}
                    {t("follow_us")}
                  </p>
                </div>
                <div className="text-grey-seccondary text-xs md:text-sm font-medium  leading-3 border-r border-default border-opacity-10 ">
                  <Link href={"https://www.facebook.com/"}>Facebook</Link>
                </div>
                <div className="text-grey-seccondary text-xs md:text-sm font-medium text-center leading-3 border-r border-default border-opacity-10">
                  <Link href={"https://www.linkedin.com/login"}>Linkedin</Link>
                </div>
                <div className="text-grey-seccondary text-xs md:text-sm font-medium text-center leading-3">
                  <Link href={"https://www.youtube.com/"}>Youtube</Link>
                </div>
              </div>
              <div className="pt-5" />
              <div className="hidden">
                <button
                  type="button"
                  className=" flex justify-center flex-row items-center rounded-md border  px-10 py-2 w-full"
                >
                  <img src="/icons/help-icon.svg" alt="Help-Icon" />
                  <span className="ml-1 text-default text-sm leading-3.5 font-medium">
                    {t("need_help")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 z-[1000] w-full border-t bg-grey-exrta-ligth-extra px-4 py-5 xl:hidden">
        <BottomEquity processIsUserProcess={handleClick}  clientStatus={clientStatus} />
      </div>
    </footer>
  );
};

export default Footer;
