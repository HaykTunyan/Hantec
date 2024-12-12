"use client";

import React, { FC, useEffect, useState , useLayoutEffect } from "react";
import Layout from "@/app/dashboard/layout";
import DepositAF from "@/containers/deposit/depositItem";
import LoadingScreen from "@/components/loadingScreen";
import { fetchPaymentGateways, getUserOverview } from "@/services";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useDemo } from "@/context/DemoContext";
import { AppDispatch } from "@/store/store";
import { setAccounts } from "@/store/slices/userOverview";
import { useTranslation } from "next-i18next";

const Deposit: FC = () => {
  /**
   *  Deposit View Hooks.
   */

  const { t } = useTranslation("deposit");
  const router = useRouter();
  const { demo } = useDemo();
  const dispatch = useDispatch<AppDispatch>();
  const companyId = 20; // process.env.REACT_APP_COMPANY_ID
  const [isProcessing, setIsProcessing] = useState(false);

  // const [addWalletDialog, setAddWalletDialog] = useState(false);

  const handleWalletDialog = (open: boolean) => {
    // setAddWalletDialog(open);
  };

  useEffect(() => {
    const getInfoCompany = async () => {
      try {
        const response = await fetchPaymentGateways(companyId);
        if (response) {
        }
      } catch (error) {}
    };
    getInfoCompany();
  }, []);

  useEffect(() => {
    const fetchUserOverview = async () => {
      setIsProcessing(true);
      try {
        const data = await getUserOverview();
        // @ts-ignore
        const allAccounts = data.data.liveAccounts;
        dispatch(setAccounts(allAccounts));
        setIsProcessing(false);
      } catch (error) {
        // @ts-ignore
        setErrorMessages(error?.message);
      }
    };

    fetchUserOverview();
  }, [router]);

  // useEffect(() => {
  //   const changeChatPosition = () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     if (chatWidget) {
  //       chatWidget.classList.add("custom-chat-position");
  //     }
  //   };
  //
  //   changeChatPosition();
  //
  //   return () => {
  //     const chatWidget = document.getElementById("chat-widget-container");
  //     if (chatWidget) {
  //       chatWidget.classList.remove("custom-chat-position");
  //     }
  //   };
  // }, []);

  useLayoutEffect( () => {
    if(demo) {
      router.push("/dashboard");
    }
  },[demo]);

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div className="px-4 py-10 md:py-20 md:px-0 w-full md:w-[720px] xl:w-[980px] md:mx-auto">
          <div className="flex flex-col ">
            <h2 className="text-xl leading-5  md:text-[32px] font-medium md:leading-10 text-default">
              {""} {t("deposit")}
            </h2>
            <div className="pt-1.5 md:pt-2" />
            <p className="font-normal text-lg leading-6 tracking-wider text-grey-seccondary">
              {""} {t("select_deposit")}
            </p>
          </div>
          <div className="mt-7 md:mt-12" />
          <div>
            {/* Payment Ifream Code */}
            <DepositAF handleWalletDialog={handleWalletDialog} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Deposit;
