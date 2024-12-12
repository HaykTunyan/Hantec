import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import DropDownComponent from "@/components/dropdown";
import InputForm from "@/components/inputForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchWithdrawLimitValueInfo, getClient } from "@/services";
import { useTranslation } from "next-i18next";

interface UsdtAccountProps {
  toggleSidebarReminder: () => void;
  openModal: () => void;
  clientAccount: any;
  setSubmitData: any;
  iframeUrl: string;
  showIframe: boolean;
}

const UsdtAccount: FC<UsdtAccountProps> = ({
  toggleSidebarReminder,
  openModal,
  clientAccount,
  setSubmitData,
  iframeUrl,
  showIframe,
}) => {
  /**
   *  Usdt Account Hooks.
   */

  const { t } = useTranslation("withdrawal");
  const currencyRegion = useSelector((state: RootState) => state.userRegions);

  const [isAccountSelected, setIsAccountSelected] = useState<string>("");
  const [isClient, setIsClient] = useState<string>("");
  const [isCypto, setIsCypto] = useState<string>("");

  const [bankBalance, setBankBalance] = useState<string>("");
  const [withdrawAmmout, setWithdrawAmmout] = useState<string>("");
  const [bankCurrency, setBankCurrency] = useState<string>("");
  const [limitValueInfo, setLimitValueInfo] = useState<any | null>(null);
  const [tradingId, setTradingId] = useState<any | null>(null);
  const [walletClient, setWalletClient] = useState<any | null>(null);
  const [accountList, setAccountList] = useState<any[]>([]);
  const [walletList, setWalletList] = useState<any>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
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
    const getClientInfo = async () => {
      try {
        const res = await getClient(Number(userId));
        // @ts-ignore
        if (res) {
          // @ts-ignore
          setWalletClient(res?.data?.cryptoWallets);
        }
      } catch (error) {}
    };
    if (userId) {
      getClientInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (accountList.length) {
      const trading = accountList.find(
        (item) => item.value === isAccountSelected
      );
      setTradingId(trading?.id);
    }
  }, [isAccountSelected]);

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
    if (walletClient?.length) {
      const filterList = walletClient.map((item: any) => {
        return {
          id: item.id,
          userId: item.userId,
          status: item.status,
          walletName: item.walletName,
          walletType: item.walletType,
          walletAddress: item.walletAddress,
          crtTime: item.crtTime,
          value: item.walletName,
          label: item.walletName,
        };
      });
      // @ts-ignore
      setWalletList(filterList);
    }
  }, [walletClient]);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        isAccountSelected &&
        isClient &&
        isCypto &&
        bankBalance &&
        bankCurrency &&
        withdrawAmmout
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
    isCypto,
    bankBalance,
    bankCurrency,
    withdrawAmmout,
  ]);

  const handleSubmitFormField = (): void => {
    if (limitValueInfo) {
    }
    setSubmitData({
      tradingAccountId: tradingId,
      accountCcy: "USD",
      withdrawalAmt: withdrawAmmout,
      maxWithdrawalAmt: bankBalance,
      cyptoWalletAddress: isCypto,
      bankCode: "",
      bankName: "USDT",
      bankPrefixCode: "",
      bankSwiftCode: "",
      bankLocation: "",
      bankAccName: "",
      bankAccNo: walletList?.walletAddress,
      bankAddr: "",
      bankIban: "",
      outputCcy: "",
      remarks: "",
      paymentMethod: "USDTA",
      adminFees: 0,
      accountCode: isAccountSelected,
      handlingFees: 0,
      companyId: 20,
      createdWithdrawalId: 20,
      platform: 42,
      userType: "CLIENT",
      region: clientRegion[0]?.region,
      typeForSend: "USDT",
    });

    openModal();
  };

  return (
    <div className="">
      <div className="">
        <h3 className="text-xl md:text-2xl font-medium leading-7  text-default">
          {t("usdt")}
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
          <div className="mt-6 md:mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-4">
            <div className="">
              <DropDownComponent
                options={client}
                selectedOption={isClient}
                onChange={setIsClient}
                lableTitle={t("client_number")}
                pleacholder={t("select_client_number")}
              />
            </div>
            <div className="">
              <DropDownComponent
                options={walletList}
                selectedOption={isCypto}
                onChange={setIsCypto}
                lableTitle={t("crypto_wallet")}
                pleacholder={t("select_crypto_wallet")}
              />
            </div>
          </div>
          <div className="mt-6 md:mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <InputForm
                labelTitle={t("available_balance")}
                value={bankBalance}
                block={false}
                disabled={true}
                changeValue={setBankBalance}
              />
            </div>
            <div className="">
              <InputForm
                labelTitle="Currency"
                value={bankCurrency}
                changeValue={setBankCurrency}
                block={false}
                disabled={true}
              />
            </div>
          </div>
          <div className="mt-6 md:mt-4">
            <InputForm
              labelTitle={t("withdraw_amount")}
              value={withdrawAmmout}
              maxValue={bankBalance}
              type="number"
              // maxValueLength={bankBalance}
              placeholder={t("amount")}
              changeValue={setWithdrawAmmout}
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
                  {t("before_proceeding_withdrawal,")}{" "}
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
                onClick={handleSubmitFormField}
                disabled={!isFormValid}
                className={`flex flex-row justify-center gap-1 items-center py-[14px] px-5  rounded-lg 
                   ${isFormValid ? "bg-default" : "bg-sidebar"}
                  
                  `}
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

export default UsdtAccount;
