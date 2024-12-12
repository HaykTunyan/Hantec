"use client";

import React, { FC, useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/inputForm";
import { useTranslation } from "next-i18next";
import { cryptoInfoSend } from "@/services";
import useOnClickOutside from "@/hooks/useOnClickOutside";

/**
 *  @interface CryptoSendSidebarProps
 */

interface CryptoSendSidebarProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
}

const CryptoSendSidebar: FC<CryptoSendSidebarProps> = ({
  setIsOpen,
  isOpenBar,
}) => {
  /**
   *  CryptoSendSidebar  Hooks.
   */

  const router = useRouter();
  const { t } = useTranslation("payout");
  const [walletName, setWalletName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, []);

  const handleSubmitInformation = async () => {
    const walletType = "TRC20-USDT";

    const numberOfAppDate = 1723198187660;

    try {
      const response = await cryptoInfoSend({
        appDate: numberOfAppDate,
        autoApprove: true,
        clientUserId: Number(userId),
        walletAddress: walletAddress,
        walletName: walletName,
        walletType: walletType,
        companyId: "20",
        messageMappings: [
          {
            statusId: 1,
            messageId: "26",
          },
        ],
      });

      if (response.status === "success") {
        setIsOpen(false);
        setWalletName("");
        setWalletAddress("");
        setUserId(null);
        router.push("/management/payout/payoutOverview");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const checkFormValidity = () => {
      if (walletName && walletAddress) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [walletName, walletAddress]);

  const sidebarRef = useRef(null);
  useOnClickOutside(sidebarRef, setIsOpen);

  return (
    <div ref={sidebarRef}>
      <aside
        className={`transition-box2 fixed top-0 right-0 z-[3000] w-full h-full md:w-128 transition-transform transform shadow-md ${
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
          <div className="pt-14" />
          <div className="flex flex-row items-center gap-4 md:px-10  ">
            <button
              type="button"
              className="md:hidden block border-none cursor-pointer"
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
          <div className="px-0 md:px-10 font-aeonik">
            <div className="">
              <p className="text-lg font-medium leading-5 tracking-wider font-aeonik">
                {t("registration")}
              </p>
            </div>
            <div className="mt-6" />

            <div className="flex flex-col">
              <div className="mt-4">
                <InputForm
                  labelTitle={t("wallet_name")}
                  value={walletName}
                  placeholder={t("enter_your_wallet_name")}
                  changeValue={setWalletName}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("wallet_address")} 
                  value={walletAddress}
                  placeholder={t("enter_your_wallet_address")}
                  changeValue={setWalletAddress}
                />
              </div>

              <div className="fixed w-full bottom-0  right-0 border-t border-sidebar">
                <div className="flex w-full justify-between px-4 py-4">
                  <button
                    type="button"
                    className="flex flex-row  items-center py-3.5 px-5 border border-sidebar  rounded-lg "
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-default font-medium text-sm leading-3.5">
                      {t("cancel")}
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-row justify-center gap-1 items-center py-3.5 px-5 rounded-lg 
                          ${isFormValid ? "bg-default" : "bg-sidebar"}`}
                    disabled={!isFormValid}
                    onClick={isFormValid ? handleSubmitInformation : undefined}
                  >
                    {isFormValid ? (
                      <img
                        src="/icons/management/Padlock_Off_ligth.svg"
                        alt="Padlock_Off_Ligth"
                      />
                    ) : (
                      <img
                        src="/icons/management/Padlock_Off.svg"
                        alt="Padlock_Off"
                      />
                    )}
                    <span
                      className={` font-medium text-sm leading-3.5 *:first-letter:
                          ${isFormValid ? "text-white" : "text-grey-tertiary"}
                         
                         `}
                    >
                      {t("submit")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CryptoSendSidebar;
