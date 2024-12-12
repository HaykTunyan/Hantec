import React, { FC, useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import {
  getGetAccOpen,
  getGetAccountSummary
} from "@/services";
import { useTranslation } from "next-i18next";
import { setAccountSummary } from "@/store/slices/accountSummarySlice";

interface BottomEquityProps {
  processIsUserProcess: () => void;
  clientStatus: any;
}

const BottomEquity: FC<BottomEquityProps> = ({ processIsUserProcess , clientStatus }) => {
  /**
   *  Bottom Equity Hook.
   */

  const { demo } = useDemo();
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isVerified = useSelector(
    (state: RootState) => state.verification.isVerified
  );
  const fixedNumber = 2;
  const clientAccountSummary = useSelector(
    (state: RootState) => state.accountSummary
  );

  const clientAccount = useSelector((state: RootState) => state.accounts);
  const clientDemo = useSelector( (state: RootState) => state.demoAccount );

  const [liveAccountExists, setLiveAccountExists] = useState<boolean>(false);
  const [isKYCPassed, setKYCPassed] = useState<boolean>(true);

  const [integerPart, decimalPart] = clientAccountSummary?.equity
    .toFixed(fixedNumber)
    .split(".");

  const overView = useSelector((state: RootState) => state.overView);

  useEffect(() => {
    if (overView.allow) {
      setLiveAccountExists(overView.liveAccounts.length > 0);
    }
  }, [overView]);

  useLayoutEffect(() => {
    // const accoundCodeSend = clientAccount?.accounts[0]?.accountCode;

    const accountCodes = demo ? clientDemo?.demoAccount?.map((item) => item.accountCode) : 
     clientAccount?.accounts?.map((item) => item.accountCode) || [];
  
    // Join without spaces
    const accountCodeToSend = accountCodes.join(",");
  
    // Create a placeholder string for platform IDs
    const accountsLength = accountCodes.length;
    const placeholderString = Array(accountsLength).fill(42).join(",");
  
    const platformIdListInStr = placeholderString;

    const accountSummaryeData = async () => {
      try {
        const res = await getGetAccountSummary(accountCodeToSend, platformIdListInStr);
        if (res) {
          const infoData = res?.data;
          // Assuming USD is the currency you care about
          // @ts-ignore
          const setTheInfoSummary = infoData?.accountSummaryToCcyMap?.USD;
          dispatch(setAccountSummary(setTheInfoSummary));
        }
      } catch (error) {
       
      }
    };
  
    if (clientAccount?.accounts?.length && accountCodes.length > 0) {
      accountSummaryeData();
    }
  }, [clientAccount, router , demo ]);

  useEffect(() => {
    getGetAccOpen().then((res: any) => {
      if (res && res.data) {
        setKYCPassed(res.data.kyc);
      } else {
        setKYCPassed(false);
      }
    });
  }, []);

  const handleOpenTrade = () => {
    router.push("/trading/trade-terminal");
  };

  const handleDisabledTrade = () => {

    processIsUserProcess();
  };

  const onRedirectDaposit = () => {
    router.push("/management/deposit");
  };

  // const handleOpenLive = () => {
  //   router.push("/registration/register-live-account");
  // };

  return (
    <div className="bottom-equity">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-sm font-normal">{t("my_equity")}</p>
          </div>
          <div className="pt-2">
            <p className="text-grey-seccondary text-lg font-normal leading-4 font-gaisyr">
              {"$"}
              {integerPart}
              <span className="text-xxs font-gaisyr">.{decimalPart} </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {/* Don't Delete this code */}
          {demo && !liveAccountExists && !isKYCPassed && (
            <button
              type="button"
              onClick={() => router.push("/registration/register-live-account")}
              // onClick={!isVerified ? handleOpenLive : () => processIsUserProcess()}
              className="  flex font-medium rounded text-sm px-2 py-2.5 w-28 justify-center focus:outline-none items-center text-default"
            >
              <span className=" ml-1 font-medium text-sm">
                {" "}
                {t("open_live")}{" "}
              </span>
            </button>
          )}

          <button
            type="button"
            // onClick={!isVerified ? handleOpenTrade : handleDisabledTrade}

            onClick={ !isVerified ? handleOpenTrade : (demo && clientStatus?.status === "Submitted") ? handleOpenTrade : (demo && clientStatus?.status === "Pending") ? handleOpenTrade :  handleDisabledTrade}
            className={`
               flex font-medium rounded-lg text-sm px-5 py-2.5  justify-center focus:outline-none items-center
               hover:border hover:border-[#2b2a2866]
                ${
                  demo
                    ? " bg-default text-white w-28"
                    : "text-default bg-white bg-inherit border w-28 border-default border-opacity-10"
                }     
              `}
          >
            {demo ? (
              <img src="/icons/Trade-ligth.svg" alt="Trade-ligth" />
            ) : (
              <img src="/icons/trade-icon.svg" alt="Trade-Icon" />
            )}
            <span className=" ml-1 font-medium text-sm">
              {" "}
              {demo ? t("trade") : t("trade")}
            </span>
          </button>

          {!demo && (
            <button
              type="button"
              onClick={
                !isVerified ? onRedirectDaposit : () => processIsUserProcess()
              }
              // disabled={isVerified}
              className={` text-white bg-orange font-medium rounded-lg flex px-5 py-2.5 w-28 justify-center  focus:outline-none items-center hover:opacity-80 
               ${isVerified ? "" : ""}
              `}
            >
              <img
                src="/icons/iconSmall/deposite-white-16x16.svg"
                alt="Deposite"
              />
              <span className="text-white ml-1 font-medium text-sm ">
                {" "}
                {t("deposit")}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomEquity;
