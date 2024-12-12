"use client";

import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/inputForm";
import DropDownComponent from "@/components/dropdown";
import { OptionPayout } from "@/json";
import { useTranslation } from "next-i18next";
import { getOptionCountryCode, mobileMoneySend } from "@/services";

/**
 *  @interface MobileMoneySidebarProps
 */

interface MobileMoneySidebarProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
}

const MobileMoneySidebar: FC<MobileMoneySidebarProps> = ({
  setIsOpen,
  isOpenBar,
}) => {
  /**
   *  RightSidebar Notifiaction Hooks.
   */

  const router = useRouter();
  const { t } = useTranslation("payout");
  const valideMobile = 8;
  const [locationName, setLocationName] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>(" ");
  const [userId, setUserId] = useState<any>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [optionData, setOpetionData] = useState<any>(null);
  const [providerOption, setProviderOption] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState<any>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, []);

  useEffect(() => {
    const checkFormValidity = () => {
      if (locationName && providerName && mobileNumber.length > valideMobile) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [locationName, providerName, mobileNumber]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await getOptionCountryCode(locationName);

        if (response?.data) {
          const infoOptions = response?.data;
          setOpetionData(infoOptions);
        }
      } catch (error) {}
    };

    if (locationName) {
      getLocation();
    }
  }, [locationName]);

  useEffect(() => {
    if (optionData?.length) {
      const filterOptions = optionData.map((list: any) => {
        return {
          id: list.name,
          value: list.name,
          label: list.name,
          mobile: list.mobileCountryCode,
        };
      });
      setProviderOption(filterOptions);

      if (filterOptions.length) {
        const firstCountryCode = filterOptions[0]?.mobile;
        setCountryCode(firstCountryCode);
        setMobileNumber(`+${firstCountryCode}`); // Initialize the mobile number with country code
      }
    }
  }, [optionData]);

  const handleProviderChange = (provider: string) => {
    setProviderName(provider);
    // Find the selected provider's details from providerOption
    const selectedProvider = optionData.find(
      (option: any) => option.name === provider
    );
    setSelectedOption(selectedProvider);
  };

  const handleMobileNumberChange = (value: string) => {
    // Ensure the mobile number always starts with the country code
    if (countryCode && !value.startsWith(`+${countryCode} `)) {
      setMobileNumber(`+${countryCode} `);
    } else {
      setMobileNumber(value);
    }
  };

  const handleSubmitInformation = async () => {
    const numberOfAppDate = 1723207443887;

    try {
      const response = await mobileMoneySend({
        appDate: numberOfAppDate,
        clientUserId: Number(userId),
        companyId: "20",
        walletCcy: selectedOption?.currency,
        walletLocation: locationName,
        walletMobile: mobileNumber,
        walletProviderId: selectedOption?.id,
        walletProviderName: selectedOption?.name,
        messageMappings: [
          {
            statusId: 1,
            messageId: "28",
          },
        ],
      });

      if (response.status === "success") {
        setIsOpen(false);
        setLocationName("");
        setProviderName("");
        setSelectedOption(null);
        setMobileNumber("");
        setUserId(null);
        setOpetionData(null);
        setProviderOption(null);
        setCountryCode(null);
        setSelectedOption(null);
       
      }
      setIsOpen(false);
      router.refresh();
      router.push("/management/payout/payoutOverview");
    } catch (error) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setProviderName("");
  }, [locationName]);

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
              className="hidden border-none cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img src="/icons/arrow-left.svg" alt="Arrow-Left" />
            </button>
            <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
              {" "}
              {t("add_your_mobile_money")}
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
                <DropDownComponent
                  selectedOption={locationName}
                  lableTitle={t("location")} 
                  options={OptionPayout}
                  pleacholder={t("enter_your_location")} 
                  onChange={setLocationName}
                />
              </div>
              <div className="mt-4">
                <DropDownComponent
                  disabled={!locationName}
                  selectedOption={providerName}
                  lableTitle={t("provider")} 
                  options={providerOption}
                  pleacholder={t("enter_your_provider")}
                  onChange={handleProviderChange}
                />
              </div>
              <div className="mt-4">
                <InputForm
                  labelTitle={t("mobile_number")} 
                  value={mobileNumber}
                  placeholder={t("enter_your_number")}
                  // changeValue={setMobileNumber}

                  changeValue={handleMobileNumberChange}
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

export default MobileMoneySidebar;
