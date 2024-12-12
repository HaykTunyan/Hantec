import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import DropDownComponent from "@/components/dropdown";
import InputForm from "@/components/inputForm";
import { BankLocation } from "@/json";
import { fetchWithdrawLimitValueInfo } from "@/services";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "next-i18next";

interface BankItem {
  [x: string]: any;
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

interface BanckAccountProps {
  toggleSidebarReminder: () => void;
  openModal: () => void;
  clientAccount: any;
  currencyWithdrawal: any;
  bankList: BankItem;
  setSubmitData: any;
  iframeUrl: string;
  showIframe: boolean;
}

const BanckAccount: FC<BanckAccountProps> = ({
  toggleSidebarReminder,
  openModal,
  clientAccount,
  currencyWithdrawal,
  bankList,
  setSubmitData,
  iframeUrl,
  showIframe,
}) => {
  /**
   *  Banck Accoount Hooks.
   */

  const currencyRegion = useSelector((state: RootState) => state.userRegions);
  const { t } = useTranslation("withdrawal");
  // Form Value State
  const [isAccountSelected, setIsAccountSelected] = useState<string>("");
  const [isClient, setIsClient] = useState<string>("");

  const [bankBranch, setBrankBranch] = useState<string>("");
  const [internationalBank, setInternationalBank] = useState<string>("");
  const [swiftValue, setSwiftValue] = useState<string>("");
  const [bankBalance, setBankBalance] = useState<string>("");
  const [bankCurrency, setBankCurrency] = useState<string>("");
  const [withdrawAmmout, setWithdrawAmmout] = useState<string>("");
  const [isCurrency, setIsCurrency] = useState<string>("");
  const [accountList, setAccountList] = useState<any[]>([]);
  const [userId, setUserId] = useState<any>(null);

  // Receive Currency
  const [currencyList, setCurrencyList] = useState<any>(null);
  const [receiveList, setReceiveList] = useState<any>(null);

  // Bank Information List

  const [isBankAccountSelected, setIsBankAccountSelected] =
    useState<string>("");
  const [filterBank, setFilererBank] = useState<any | null>(null);
  const [isBankClient, setisBankClient] = useState<string>("");
  const [selectedBankId, setSelectedBankId] = useState<any>("");
  const [limitValueInfo, setLimitValueInfo] = useState<any | null>(null);
  const [tradingId, setTradingId] = useState<any | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [clientRegion] = useState<any>(currencyRegion?.regions);

  const client = [{ value: userId, label: userId }];

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
  }, [userId]);

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

  useEffect(() => {
    if (currencyWithdrawal?.length) {
      const filterCurrencyItem = currencyWithdrawal.map((item: any) => ({
        id: item.parentId,
        label: item.paymentMethod,
        value: item.paymentMethod,
        companyId: item.companyId,
      }));
      setCurrencyList(filterCurrencyItem);
    }
  }, [currencyWithdrawal]);

  useEffect(() => {
    const locationCountry = isBankAccountSelected.toLocaleUpperCase();
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

      if (currencyList) {
      }
    }
  }, [isBankAccountSelected]);

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

  useEffect(() => {
    const getWithdrawalConfigValueInfo = async () => {
      const response = await fetchWithdrawLimitValueInfo({
        tradingAccountId: tradingId,
        paymentMethod: "USDTA",
        accountCode: isAccountSelected, // isAccountSelected
        accountCcy: "USD",
        region: clientRegion[0]?.region,
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
      if (
        isAccountSelected
        // &&
        // isClient &&
        // isBankAccountSelected &&
        // bankBranch &&
        // internationalBank &&
        // swiftValue &&
        // bankBalance &&
        // withdrawAmmout &&
        // isCurrency
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    isAccountSelected,
    isClient,
    isBankAccountSelected,
    // bankBranch,
    // internationalBank,
    // swiftValue,
    bankBalance,
    withdrawAmmout,
    isCurrency,
  ]);

  const handleSubmitFormField = (): void => {
    if (selectedBankId) {
    }

    if (limitValueInfo) {
    }

    setSubmitData({
      tradingAccountId: tradingId, // trading ID T[A-Za-z1-9]{33}
      accountCcy: "USD",
      withdrawalAmt: withdrawAmmout,
      maxWithdrawalAmt: bankBalance,
      bankCode: "",
      bankName: "",
      bankPrefixCode: "",
      bankSwiftCode: swiftValue,
      bankLocation: isBankAccountSelected,
      bankAccName: isBankClient,
      bankAccNo: "",
      bankAddr: bankBranch,
      bankIban: internationalBank,
      outputCcy: "",
      remarks: "",
      paymentMethod: isCurrency ? isCurrency : "PC",
      adminFees: 0,
      accountCode: isAccountSelected,
      handlingFees: 0,
      companyId: 20,
      createdWithdrawalId: 20,
      platform: 42,
      userType: "CLIENT",
      region: clientRegion[0]?.region,
    });

    openModal();
  };

  useEffect(() => {
    if (currencyList?.length) {
      const filterCurrencyItem = currencyList.filter(
        (currency: any) => currency.label !== "USDTA"
      );
      setReceiveList(filterCurrencyItem);
    }
  }, [currencyList]);

  return (
    <div className="">
      <div className="">
        <h3 className="text-xl md:text-2xl font-medium leading-7  text-default">
          {t("bank_account")}
        </h3>
      </div>
      {!showIframe ? (
        <div className="mt-8">
          {/* Select your Account */}
          <div className="">
            <DropDownComponent
              options={accountList}
              selectedOption={isAccountSelected}
              onChange={setIsAccountSelected}
              lableTitle={t("account")}
              pleacholder={t("select_account")} 
            />
          </div>
          {clientRegion[0]?.region === "AFRICA" && (
            <div className="hidden">
              <div className="mt-6 md:mt-4 grid grid-cols-1 gap-5 ">
                {/* Client Number */}
                <div className="">
                  <DropDownComponent
                    options={client}
                    selectedOption={isClient}
                    onChange={setIsClient}
                    lableTitle={t("client_number")}
                    pleacholder={t("select_client_number")}
                  />
                </div>
              </div>
              <div className="mt-6 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Location */}
                <div className="">
                  <DropDownComponent
                    options={BankLocation}
                    selectedOption={isBankAccountSelected}
                    onChange={setIsBankAccountSelected}
                    lableTitle={t("bank_location")}
                    pleacholder={t("select_bank_location")}
                  />
                </div>
                {/* Bank Name */}
                <div className="">
                  <DropDownComponent
                    options={filterBank || []}
                    selectedOption={isBankClient}
                    onChange={setisBankClient}
                    lableTitle={t("bank_name")}
                    pleacholder={t("select_bank_name")}
                  />
                </div>
                {/* Bank Name */}
                {/* <div className="">
            <InputForm
              labelTitle="Bank Name"
              value={bankName}
              block={true}
              disabled={true}
              changeValue={setBankName}
            />
          </div> */}
                {/* Bank Account */}
                {/* <div className="">
            <InputForm
              labelTitle="Bank Account"
              value={bankAccount}
              block={true}
              disabled={true}
              changeValue={setBankAccount}
            />
          </div> */}
              </div>
              <div className="mt-6 md:mt-4">
                <InputForm
                  labelTitle={t("bank_branch")}
                  value={bankBranch}
                  placeholder={t("enter_bank_branch")}
                  disabled={false}
                  changeValue={setBrankBranch}
                />
              </div>
              <div className="mt-6 md:mt-4">
                {/* International Bank Account Number (IBAN) */}
                <InputForm
                  labelTitle={t("international_bank")} 
                  value={internationalBank}
                  placeholder={t("optional")}
                  changeValue={setInternationalBank}
                />
              </div>
              <div className="mt-6 md:mt-4">
                {/* Swift Code */}
                <InputForm
                  labelTitle={t("swift_code")}
                  value={swiftValue}
                  placeholder={t("optional")}
                  changeValue={setSwiftValue}
                />
              </div>
              <div className="mt-6 md:mt-4 grid-cols-1 grid md:grid-cols-2 gap-4">
                {/* Available Balance */}
                <div className="">
                  <InputForm
                    labelTitle={t("available_balance")}
                    value={bankBalance}
                    disabled={true}
                    block={false}
                    changeValue={setBankBalance}
                  />
                </div>
                {/* Currency */}
                <div className="">
                  <InputForm
                    labelTitle={t("Currency")}
                    value={bankCurrency}
                    changeValue={setBankCurrency}
                    block={false}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="mt-6 md:mt-4 grid-cols-1 grid md:grid-cols-2 gap-4">
                {/* Withdraw Amount */}
                <div className="">
                  <InputForm
                    type="number"
                    labelTitle={t("withdraw_amount")}
                    value={withdrawAmmout}
                    placeholder={t("amount")}
                    changeValue={setWithdrawAmmout}
                  />
                </div>
                {/* Receive Currency */}
                <div className="">
                  <DropDownComponent
                    options={receiveList}
                    selectedOption={isCurrency}
                    onChange={setIsCurrency}
                    lableTitle={t("receive_currency")}
                    pleacholder={t("Currency")} // USD
                  />
                </div>
              </div>
            </div>
          )}
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
                  {t("before_proceeding_withdrawal")} {" "}
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
                className={`flex flex-row justify-center gap-1 items-center py-[14px] px-5  rounded-lg
                     
                   ${isFormValid ? "bg-default" : "bg-sidebar"}
                  
                  `}
                onClick={handleSubmitFormField}
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

export default BanckAccount;
