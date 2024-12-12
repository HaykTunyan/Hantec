import React, { FC, useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";

/**
 *  @interface SetUpPayoutMethodSidebarProps
 */

interface SetUpPayoutMethodSidebarProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
  handleOpenBankSidebar: () => void;
  handleOpenCryptoSidebar: () => void;
  handleOpenMoneySidebar: () => void;
  handleOpenPerfectMoneySidebar: () => void;
}

const SetUpPayoutMethodSidebar: FC<SetUpPayoutMethodSidebarProps> = ({
  setIsOpen,
  isOpenBar,
  handleOpenBankSidebar,
  handleOpenCryptoSidebar,
  handleOpenMoneySidebar,
  handleOpenPerfectMoneySidebar,
}) => {
  /**
   *  SetUpPayoutMethodSidebar Hooks.
   */

  const { t } = useTranslation("payout");
  const sidebarRef = useRef(null);
  useOnClickOutside(sidebarRef, setIsOpen);

  return (
    <div ref={sidebarRef}>
      <aside
        className={`transition-box2 fixed top-0 right-0 z-[3000] w-full md:w-128 h-full transition-transform transform shadow-md ${
          // isOpenBar ? "translate-x-0" : "translate-x-full"
          isOpenBar ? "open2" : "close2"
        } bg-gray-50`}
      >
        <div className="h-full pt-5 px-4 md:px-4 md:pt-4 overflow-y-auto ">
          <div className="flex flex-row justify-end">
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
          <div className="pt-10 md:pt-14" />

          <div className="flex flex-row items-center gap-4 md:px-5 ">
            <h3 className="text-default text-xl leading-6  md:text-2xl font-medium tracking-wider font-aeonik">
              {" "}
              {t("set_up_payout")}
            </h3>
          </div>
          <div className="mt-8 md:mt-10" />
          <div className="px-0 md:px-5 font-aeonik">
            <div className="flex flex-col gap-2">
              {/* Bank Information */}
              <div
                className={`flex flex-row flex-shrink-0 px-4 py-7 md:py-8 border rounded-lg items-center gap-4 border-dashed cursor-pointer 
                            hover:border-default hover:shadow  bg-grey-exrta-ligth-extra  border-grey-profile
                            `}
                onClick={() => handleOpenBankSidebar()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6  bg-sidebar  `}
                >
                  <img
                    src="/icons/management/Bank.svg"
                    alt="Bank"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col w-full pr-4">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("bank_information")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("bank_information_description")}
                  </div>
                </div>
              </div>
              {/* Crypto Wallet */}
              <div
                className={` flex flex-row flex-shrink-0 px-4 py-7 md:py-8 border rounded-lg items-center gap-4 border-dashed cursor-pointer
                  hover:border-default hover:shadow  bg-grey-exrta-ligth-extra  border-grey-profile
                  
                  `}
                onClick={() => handleOpenCryptoSidebar()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6 bg-sidebar`}
                >
                  <img
                    src="/icons/management/Crypto-Wallet.svg"
                    alt="Crypto-Wallet"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col w-full pr-4">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("crypto_wallet")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("crypto_wallet_description")}
                  </div>
                </div>
              </div>
              {/* Mobile Money */}
              <div
                className={`flex flex-row flex-shrink-0 px-4 py-7 md:py-8 border rounded-lg items-center gap-4 border-dashed cursor-pointer
                  hover:border-default hover:shadow bg-grey-exrta-ligth-extra  border-grey-profile 
                  
                  `}
                onClick={() => handleOpenMoneySidebar()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6 bg-sidebar  `}
                >
                  <img
                    src="/icons/management/Mobile_Money.svg"
                    alt="Mobile_Money"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col w-full pr-4">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("mobile_money")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("mobile_money_description")}
                  </div>
                </div>
              </div>
              {/* Perfect Money */}
              {/* This line comment for the new Update */}
              {/* <div className={` flex flex-row flex-shrink-0 px-4 py-7  md:py-8 border rounded-lg items-center gap-4 border-dashed cursor-pointer
                  hover:border-default hover:shadow  bg-grey-exrta-ligth-extra  border-grey-profile
                  `}
                onClick={() => handleOpenPerfectMoneySidebar()}
              >
                <div
                  className={`w-20 py-6 sm:py-5 rounded md:py-2 px-6 bg-sidebar   `}
                >
                  <img
                    src="/icons/management/Perfect_Money.svg"
                    alt="Perfect_Money"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col w-full pr-4">
                  <div className="text-lg leading-5 font-medium md:text-xl md:leading-6 text-default -tracking-noraml">
                    {t("perfect_money")}
                  </div>
                  <div className="mt-1" />
                  <div className="text-sm font-aeonik leading-4 text-grey-seccondary font-normal  tracking-wider">
                    {t("perfect_money_description")}
                  </div>
                </div>
              </div> */}
            </div>
            <div className="mt-14" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SetUpPayoutMethodSidebar;
