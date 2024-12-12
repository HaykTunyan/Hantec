import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import DropDownComponent from "@/components/dropdown";
import { fetchWithdrawLimitValueInfo } from "@/services";
import { useTranslation } from "next-i18next";

interface PerfectMoneyProps {
  toggleSidebarReminder: () => void;
  openModal: () => void;
  clientAccount: any;
  setSubmitData: any;
  iframeUrl: string;
  showIframe: boolean;
}

const PerfectMoney: FC<PerfectMoneyProps> = ({
  toggleSidebarReminder,
  openModal,
  clientAccount,
  setSubmitData,
  iframeUrl,
  showIframe,
}) => {
  /**
   *  Perfect Money Hooks.
   */

  const { t } = useTranslation("withdrawal");
  const [isAccountSelected, setIsAccountSelected] = useState<string>("");
  const [accountList, setAccountList] = useState<any[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
  const [bankBalance, setBankBalance] = useState<string>("");
  // const [withdrawAmmout, setWithdrawAmmout] = useState<string>("");
  const [bankCurrency, setBankCurrency] = useState<string>("");
  const [limitValueInfo, setLimitValueInfo] = useState<any | null>(null);

  const [tradingId, setTradingId] = useState<any | null>(null);

  useEffect(() => {
    const filterActiveAccount = clientAccount.accounts.filter(
      (item: { accountType: number }) => item.accountType === 0
    );

    if (clientAccount.accounts?.length) {
      const filterAccountItem = filterActiveAccount.map(
        (item: {
          id: any;
          balance: any;
          status: any;
          companyId: any;
          accountCode: any;
          platformId: any;
        }) => ({
          id: item.id,
          balance: item.balance,
          status: item.status,
          companyId: item.companyId,
          label: item.accountCode,
          value: item.accountCode,
          platformId: item.platformId,
        })
      );
      setAccountList(filterAccountItem);
    }
  }, [clientAccount]);

  useEffect(() => {
    if (accountList.length) {
      const trading = accountList.find(
        (item) => item.value === isAccountSelected
      );
      setTradingId(trading?.id);
    }
  }, [isAccountSelected]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, [userId]);

  useEffect(() => {
    const getWithdrawalConfigValueInfo = async () => {
      const response = await fetchWithdrawLimitValueInfo({
        tradingAccountId: tradingId,
        paymentMethod: "USDTA",
        accountCode: isAccountSelected, // isAccountSelected
        accountCcy: "USD",
        region: "AFRICA",
        companyId: 20,
        coCode: "HF",
        platform: 42,
        userType: "CLIENT",
      });
      if (response?.data) {
        const dataInfo = response?.data;
        setLimitValueInfo(dataInfo);
        setBankBalance(dataInfo?.max);
        setBankCurrency("USD");
      }
    };
    if (isAccountSelected) {
      getWithdrawalConfigValueInfo();
    }
  }, [isAccountSelected]);

  useEffect(() => {
    const checkFormValidity = () => {
      if (isAccountSelected) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [isAccountSelected]);

  const handleSubmitFormField = (): void => {
    if (limitValueInfo) {
    }

    if (bankCurrency) {
    }

    if (bankBalance) {
    }

    setSubmitData({
      tradingAccountId: tradingId,
      accountCcy: "USD",
      withdrawalAmt: "",
      maxWithdrawalAmt: bankBalance,
      bankCode: "",
      bankName: "",
      bankPrefixCode: "",
      bankSwiftCode: "",
      bankLocation: "",
      bankAccName: "",
      bankAccNo: "",
      bankAddr: "",
      bankIban: "",
      outputCcy: "",
      remarks: "",
      paymentMethod: "PC",
      adminFees: 0,
      accountCode: isAccountSelected,
      handlingFees: 0,
      companyId: 20,
      createdWithdrawalId: 20,
      platform: 42,
      userType: "CLIENT",
      region: "AFRICA",
    });

    openModal();
  };

  return (
    <div className="">
      <div className="">
        <h3 className="text-xl md:text-2xl font-medium leading-7 text-default">
          {t("perfect_money")}
        </h3>
      </div>
      {!showIframe ? (
        <div className="mt-8">
          <div className="">
            <DropDownComponent
              options={accountList}
              selectedOption={isAccountSelected}
              onChange={setIsAccountSelected}
              lableTitle={t("account")}
              pleacholder={t("select_account")} 
            />
          </div>
          <div className="mt-6 border-t border-grey-extra-light">
            <div className="pt-6" />
            <div className="flex flex-row gap-1 ">
              <div className="">
                <img
                  src="/icons/management/info-circle.svg"
                  alt="Info-Circle"
                  className="mr-0.5"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-default font-medium text-base leading-4">
                  {t("reminder")}
                </p>
                <div className="text-grey-seccondary font-normal text-sm leading-4">
                  {t("before_proceeding_withdrawal,")}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => toggleSidebarReminder()}
                  >
                    {t("check-out_our_reminder.")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6" />
            <div className="mt-6">
              <button
                type="button"
                className={` flex flex-row justify-center gap-1 items-center py-[14px] px-5  rounded-lg 
                  
                  ${isFormValid ? "bg-default" : "bg-sidebar"}
                  `}
                disabled={!isFormValid}
                onClick={handleSubmitFormField}
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
      ) : (
        <div className="mt-8">
          <div className="w-full h-[500px] overflow-y-auto">
            <iframe
              src={iframeUrl}
              title="Preimer Cashier"
              id="preimer-cashier-iframe"
              frameBorder="0"
              width={"100%"}
              height={"500px"}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfectMoney;
