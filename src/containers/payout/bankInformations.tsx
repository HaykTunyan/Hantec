"use client";

import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import DropDownComponent from "@/components/dropdown";
import InputForm from "@/components/inputForm";
import { useRouter } from "next/navigation";
// Json
import { BankLocation } from "@/json";
import { bankInfoSend, bankInfoSubmit } from "@/services";
import { useTranslation } from "next-i18next";

/**
 *  @interface RightBankInformationProps
 *  @property {function} setIsOpen - Function to toggle the sidebar visibility.
 *  @property {boolean} isOpenBar - Boolean to check if the sidebar is open.
 */

interface BankItem {
  [x: string]: any;
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

interface RightBankInformationProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
  bankList: BankItem;
}

const RightBankInformation: FC<RightBankInformationProps> = ({
  setIsOpen,
  isOpenBar,
  bankList,
}) => {
  /**
   *  RightSidebar Notification Hooks.
   */

  const router = useRouter();
  const { t } = useTranslation("payout");

  const [isAccountSelected, setIsAccountSelected] = useState<string>("");
  const [isBankClient, setisBankClient] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankAddress, setbankAddress] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [filterBank, setFilererBank] = useState<any | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<any>("");
  const [userId, setUserId] = useState<any>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, []);

  const handleSubmitInformation = async () => {
    const numberOfAppDate = 1723198187660;
    try {
      const response = await bankInfoSend({
        bankAccNo: accountNumber,
        autoApprove: true,
        appDate: numberOfAppDate,
        bankAddr: bankAddress,
        bankCode: selectedBankId?.code,
        iban: iban,
        clientUserId: Number(userId), // clientUserId as a number
        companyId: "20",
        swiftCode: swiftCode,
        messageMappings: [
          {
            statusId: 1,
            messageId: "28",
          },
        ],
      });

      if (response.status === "success") {
        const sendId = response.id;

        if (response.id) {
          const resSend = await bankInfoSubmit(sendId);
          if (resSend) {
          }

          setIsOpen(false);
          router.push("/management/payout/payoutOverview");
        }
      }
    } catch (err) {
      setIsOpen(false);
      router.push("/management/payout/payoutOverview");
    }
  };

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        isAccountSelected &&
        isBankClient &&
        accountNumber &&
        bankAddress &&
        iban &&
        swiftCode
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    isAccountSelected,
    isBankClient,
    accountNumber,
    bankAddress,
    iban,
    swiftCode,
  ]);

  useEffect(() => {
    const locationCountry = isAccountSelected.toLocaleUpperCase();
    const newArray = bankList;
    if (newArray?.length) {
      const bankLocationList = newArray.filter(
        (item: { location: string }) => item.location === locationCountry
      );

      const optionBanks = bankLocationList.map(
        (list: { id: any; code: any; name: any; location: any }) => {
          return {
            id: list.id,
            code: list.code,
            label: list.name,
            value: list.name,
            location: list.location,
          };
        }
      );
      setFilererBank(optionBanks);
    }
  }, [isAccountSelected]);

  useEffect(() => {
    if (isAccountSelected) {
      setisBankClient("");
    }
  }, [isAccountSelected]);

  useEffect(() => {
    if (isBankClient) {
      if (filterBank.length) {
        const findeCodeItem = filterBank.find(
          (item: { value: string }) => item.value === isBankClient
        );
        setSelectedBankId(findeCodeItem);
      }
    }
  }, [isBankClient]);

  return (
    <aside
      className={`transition-box2 fixed top-0 right-0 z-[3000] w-full h-full md:w-128 transition-transform transform shadow-md  ${
        // isOpenBar ? "translate-x-0" : "translate-x-full"
        isOpenBar ? "open2" : "close2"
      } bg-gray-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full py-5 px-4 md:px-3 md:py-4 overflow-y-auto  ">
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
        <div className="flex flex-row items-center gap-4 md:px-10  md:border-none">
          <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
            {t("add_bank_information")}
          </h3>
        </div>
        <div className="mt-10" />
        <div className="px-0 md:px-10 font-aeonik">
          <form className="form">
            <div className="flex flex-col">
              <div className="">
                <DropDownComponent
                  options={BankLocation}
                  selectedOption={isAccountSelected}
                  onChange={setIsAccountSelected}
                  lableTitle={t("bank_location")} 
                />
              </div>
              <div className="mt-4">
                <DropDownComponent
                  options={filterBank || []}
                  selectedOption={isBankClient}
                  onChange={setisBankClient}
                  lableTitle={t("bank_name")}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("account")}
                  value={accountNumber}
                  placeholder={t("enter_your_account_number")}
                  changeValue={setAccountNumber}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("bank_address")}
                  value={bankAddress}
                  placeholder={t("enter_your_bank_address")}
                  changeValue={setbankAddress}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("international_bank")}
                  value={iban}
                  placeholder={t("enter_your_IBAN")} 
                  changeValue={setIban}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("swift_Code")} 
                  value={swiftCode}
                  placeholder={t("enter_your_SWIFT_code")} 
                  changeValue={setSwiftCode}
                />
              </div>
              <div className="fixed bottom-5 right-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={isFormValid ? handleSubmitInformation : undefined}
                    className={`flex flex-row justify-center gap-1 items-center py-[14px] px-5 rounded-lg 
                        ${isFormValid ? "bg-default" : "bg-sidebar"}`}
                    disabled={!isFormValid}
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
          </form>
        </div>
      </div>
    </aside>
  );
};

export default RightBankInformation;
