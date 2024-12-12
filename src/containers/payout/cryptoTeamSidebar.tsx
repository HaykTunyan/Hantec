"use client";

import React, {FC} from "react";
import { useTranslation } from "next-i18next";

/**
 *  @interface CryptoTeamSidebarProps
 */

interface CryptoTeamSidebarProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
  acceptCrypto: () => void;
}

const CryptoTeamSidebar: FC<CryptoTeamSidebarProps> = ({
  setIsOpen,
  isOpenBar,
  acceptCrypto,
}) => {
  /**
   *  RightSidebar Notifiaction Hooks.
   */

  const { t } = useTranslation("payout");

  return (
      <aside
        className={`transition-box2 fixed top-0 right-0 z-[3000] w-full h-full md:w-128 transition-transform transform shadow-md ${
          // isOpenBar ? "translate-x-0" : "translate-x-full"
           isOpenBar ? "open2" : "close2"
        } bg-gray-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full pt-5  md:pt-4 overflow-y-auto ">
          <div className="flex flex-row justify-end px-4  md:px-3">
            <div className="">
              <button
                type="button"
                className="p-4 border rounded-sm border-gray-300 "
                onClick={() => setIsOpen(false)}
              >
                <img src="/icons/iconSmall/close-x-16x16.svg" alt="Close-X" />
              </button>
            </div>
          </div>
          <div className="pt-14" />
          <div className="flex flex-row items-center gap-4 px-5 md:px-10  md:py-4   ">
            <button
              type="button"
              className="hidden  border-none cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img src="/icons/arrow-left.svg" alt="Arrow-Left" />
            </button>
            <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
              {" "}
              {t("add_your_crypto_wallet")}
            </h3>
          </div>
          <div className="mt-6 md:mt-14" />
          <div className="px-4 md:px-10 md:mr-4  font-aeonik">
            <div className="">
              <p className="text-lg font-medium leading-5">
                {t("crypto_wallet_terms")}
              </p>
            </div>
            <div className="mt-6" />
            <div className="border rounded-lg  p-6 border-sidebar">
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("dear_costumer")},
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
              {t("terms_1")}
              </p>
              <div className="pt-6" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  01
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Purpose of Wallet Registration:
                  </span> */}
                  {t("terms_2")}
                </p>
              </div>
              <div className="mt-3" />

              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  02
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Limit on Number of Wallets:
                  </span> */}
                   {t("terms_3")}
                </p>
              </div>
              <div className="mt-3" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  03
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Ownership of Wallet:
                  </span> */}
                  {t("terms_4")}
                </p>
              </div>

              <div className="mt-3" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  04
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Accuracy of Information
                  </span> */}
                   {t("terms_5")}
                </p>
              </div>
              <div className="mt-3" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  05
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Security and Compliance:
                  </span> */}
                   {t("terms_6")}
                </p>
              </div>
              <div className="mt-3" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  06
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {/* <span className="font-medium mr-1">
                    {" "}
                    Changes and Updates:
                  </span> */}
                  {t("terms_7")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-28" />
          <div className="w-full  border-t border-sidebar bg-white fixed bottom-0 ">
            <div className="flex w-full justify-between md:justify-end px-4 py-4">
              <button
                type="button"
                className="md:hidden flex flex-row  items-center py-3.5 px-5 border border-sidebar  rounded-lg "
                onClick={() => setIsOpen(false)}
              >
                <span className="text-grey-profile font-medium text-sm leading-3.5">
                  {t("back")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => acceptCrypto()}
                className="px-5 py-[14px] text-center bg-default rounded"
              >
                <span className="text-sm leading-3.5 font-medium  text-white ">
                  {t("accept_and_continue")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
  );
};

export default CryptoTeamSidebar;
