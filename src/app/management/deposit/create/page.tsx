"use client";

import React, {
  FC,
  useState,
  useEffect,
  useLayoutEffect,
  Fragment,
} from "react";
import Layout from "@/app/dashboard/layout";
import DropDownComponent from "@/components/dropdown";
// API && Service.
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useDemo } from "@/context/DemoContext";
import { getClient, getExchangeGeteway, getUserOverview } from "@/services";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setAccounts } from "@/store/slices/userOverview";
import { AppDispatch } from "@/store/store";
import { useTranslation } from "next-i18next";

const CreateDepositPayment: FC = () => {
  /**
   *  Deposit View Hooks.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const { t } = useTranslation("deposit");
  const dispatch = useDispatch<AppDispatch>();
  const gatewayId = 34; // payment gateway ID
  const clientAccount = useSelector((state: RootState) => state.accounts);

  const [accountList, setAccountList] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(
    accountList[0]?.value
  );
  const [userId, setUserId] = useState<any>(null);
  const [exchangeList, setExchangeList] = useState<any | null>(null);
  const [client, setClient] = useState<any>(null);
  const [showIframe, setShowIframe] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [isToken, setIsToken] = useState<any>(null);

  const postDepositPaymentCreate = async () => {
    const sendAccounst = clientAccount.accounts
      .map((item) => item.accountCode)
      .join(", ");

    try {
      const url =
        "https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v2/payment-create";

      const payload = {
        paymentGatewayName: "Premiercashier",
        cltCode: selectedAccount,
        name: client?.lastModUserName,
        idType: "P",
        id: client?.idNo,
        email: client?.email,
        mobile: `${client?.mobileNoArea}-${client?.mobileNo}`,
        ccy: "USD",
        basePath: "https://uat205.ringus-solution.com/payment-gateway",
        remarks: "",
        providerId: "",
        region: "AFRICA",
        companyId: "20",
        platformId: "42",
        cltCodeListStr: sendAccounst,
        paymentGatewayId: gatewayId,
        countryCode: client?.nationality,
      };

      const headers = {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US",
        Authorization: `Bearer ${isToken}`,
      };

      const response = await axios.post(url, payload, { headers });
      if (response?.data) {
        setShowIframe(true);

        const clientAction =
          response?.data?.data?.clientSideAction?.redirectUrl;

        setIframeUrl(clientAction);
      }
    } catch (error) {}
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localId = localStorage.getItem("user_id");
      setUserId(localId);
    }
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsToken(token);
    }
  }, [userId]);

  useEffect(() => {
    const getClientInfo = async () => {
      try {
        const res = await getClient(Number(userId));
        // @ts-ignore
        if (res) {
          const clientInfo = res?.data;
          setClient(clientInfo);
        }
      } catch (error) {}
    };
    if (userId) {
      getClientInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (clientAccount.accounts?.length) {
      const filterAccountItem = clientAccount.accounts.map(
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
    const getExchange = async () => {
      try {
        const res = await getExchangeGeteway({
          // eslint-disable-next-line camelcase
          app_id: "oiPk4h0crhF8L8FsCaJe",
          base: "USD",
        });

        if (res) {
          const exchangeRatesArray = res?.rates && Object?.entries(res?.rates);

          setExchangeList(exchangeRatesArray);
        }
      } catch (error) {}
    };
    getExchange();
  }, [selectedAccount]);

  useEffect(() => {
    const fetchUserOverview = async () => {
      try {
        const data = await getUserOverview();
        // @ts-ignore
        const allAccounts = data.data.liveAccounts;
        dispatch(setAccounts(allAccounts));
      } catch (error) {
        // @ts-ignore
        setErrorMessages(error?.message);
      }
    };

    fetchUserOverview();
  }, [router]);

  useLayoutEffect( () => {
    if(demo) {
      router.push("/dashboard");
    }
  },[demo]);

  return (
    <Layout>
      <div className="flex-1 font-aeonik bg-grey-exrta-ligth-extra">
        <div className="px-4 pt-10 pb-20  md:px-0 w-full md:w-[720px] xl:w-[980px] md:mx-auto">
          <div className="flex flex-col">
            <h2 className="text-xl leading-5  md:text-[32px] font-medium md:leading-10 text-default">
              {t("deposit")}
              {""}
            </h2>
            <div className="pt-1.5 md:pt-2" />
            <p className="font-normal text-lg leading-6 tracking-wider text-grey-seccondary">
              {t("select_deposit")}
            </p>
          </div>
          <div className="mt-10" />
          {showIframe ? (
            <div className="bg-hover-sidebar border shadow rounded p-5">
              <div className="pt-10">
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
            </div>
          ) : (
            <div className="bg-hover-sidebar border shadow rounded p-5">
              <div className="flex flex-col">
                <div className="mt-4">
                  <div className="flex flex-row  w-full items-center gap-5">
                    <DropDownComponent
                      options={accountList}
                      selectedOption={selectedAccount}
                      onChange={setSelectedAccount}
                      pleacholder={t("select_account")}
                    />
                    {selectedAccount && (
                      <button
                        type="button"
                        className="flex flex-row justify-center gap-1 items-center py-4 px-5  rounded-lg bg-default"
                        onClick={postDepositPaymentCreate}
                      >
                        <span className="text-white font-medium text-base leading-3.5">
                          {t("next")}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="font-normal text-base leading-6 tracking-wider text-grey-seccondary">
                        {t("exchange_rate")}
                      </p>
                    </div>
                    <div className="pt-10" />
                    <div className="overflow-x-auto">
                      <table className="min-w-full h-28 overflow-y-auto bg-white border border-gray-200">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">
                              {t("currency")} {""}
                            </th>
                            <th className="py-2 px-4 border-b">
                              {t("exchange_rate")} {""}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {exchangeList?.length ? (
                            <Fragment>
                              {exchangeList.map(([currency, rate]: any) => (
                                <tr key={currency}>
                                  <td className="py-2 px-4 border-b text-center">
                                    {currency}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center ">
                                    {rate}
                                  </td>
                                </tr>
                              ))}
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateDepositPayment;
