"use client";

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/inputForm";
import { useTranslation } from "next-i18next";
import { perfectMoneySend } from "@/services";

/**
 *  @interface PerfectMoneySidebarProps
 */

interface PerfectMoneySidebarProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
}

const PerfectMoneySidebar: FC<PerfectMoneySidebarProps> = ({
  setIsOpen,
  isOpenBar,
}) => {
  /**
   *  PerfectMoneySidebar Hooks.
   */

  const router = useRouter();
  const { t } = useTranslation("payout");
  const [holderName, setholderName] = useState<string>("");
  const [accountNumber, setaccountNumber] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, []);

  const handleSubmitInformation = async () => {
    const numberOfAppDate = 1723208061569;

    try {
      const response = await perfectMoneySend({
        appDate: numberOfAppDate,
        clientUserId: Number(userId),
        companyId: "20",
        accHolderName: holderName,
        accNo: accountNumber,
        messageMappings: [
          {
            statusId: 1,
            messageId: "28",
          },
        ],
      });

      if (response.status === "success") {
        setIsOpen(false);
        router.push("/management/payout/payoutOverview");
      }
    } catch (err) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const checkFormValidity = () => {
      if (holderName && accountNumber) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [holderName, accountNumber]);

  return (
    <div>
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
          <div className="pt-14" />
          <div className="flex flex-row items-center gap-4 md:px-10 ">
            <button
              type="button"
              className="hidden  border-none cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img src="/icons/arrow-left.svg" alt="Arrow-Left" />
            </button>
            <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
              {" "}
              {t("add_your_perfect_money")}
            </h3>
          </div>
          <div className="mt-8 md:mt-14" />
          <div className="px-0 md:px-10 font-aeonik">
            <div className="">
              <p className="text-lg font-medium leading-5">
                {t("registration")}
              </p>
            </div>
            <div className="mt-6" />

            <div className="flex flex-col">
              <div className="mt-4">
                <InputForm
                  labelTitle={t("account_holder_name")}
                  value={holderName}
                  placeholder={t("enter_your_holder_name")} 
                  changeValue={setholderName}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("account_number")} 
                  value={accountNumber}
                  placeholder={t("enter_your_account_number")}
                  changeValue={setaccountNumber}
                />
              </div>

              <div className="fixed w-full bottom-0  right-0 border-t border-sidebar">
                <div className="flex w-full justify-end px-4 py-4">
                  <button
                    type="button"
                    className={`flex flex-row justify-center gap-1 items-center py-[14px] px-5 rounded-lg 
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

export default PerfectMoneySidebar;
