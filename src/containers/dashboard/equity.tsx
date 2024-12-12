import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDemo } from "@/context/DemoContext";
import { useTranslation } from "next-i18next";

interface UserOverview {
  id: number;
  companyId: number;
  platformId: number;
  platformCatDesc: string;
  accountCode: string;
  status: string;
  availableMargin: number;
  availableBalance: number;
  balance: number;
  ccy: string;
  credit: number;
  leverage: number;
  netValue: number;
  accountType: number;
  platformTypeCode: string;
  openPL: number;
}

interface EquityProps {
  liveAccountData: UserOverview[];
}

const Equity: React.FC<EquityProps> = ({ liveAccountData }) => {
  /**
   * Equity Hooks.
   */

  const clientAccountSummary = useSelector(
    (state: RootState) => state.accountSummary
  );
  const { demo } = useDemo();
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    if (liveAccountData && liveAccountData.length > 0) {
      // setEquityList(liveAccountData[0])
    }
  }, [liveAccountData]);

  // if (equityList) return;
  const fixedNumber = 2;
  const [integerPart, decimalPart] = clientAccountSummary?.equity
    .toFixed(fixedNumber)
    .split(".");
  const [marginInteger, marginDecimal] = clientAccountSummary?.marginFree
    .toFixed(fixedNumber)
    .split(".");
  const [profitInteger, profitDecimal] = clientAccountSummary?.margin
    .toFixed(fixedNumber)
    .split(".");

  const [openPlfirst, openPlSeccond] = clientAccountSummary?.openPl
    .toFixed(fixedNumber)
    .split(".");

  return (
    <div>
      {/* Is Desktop version */}
      <div className="hidden xl:flex gap-1 flex-col lg:flex-row lg:h-36 ">
        <div className="w-2/6 ">
          <div
            className={` ${
              demo ? " bg-blue-20" : "bg-orange-extra-light"
            }  h-full p-6 rounded-lg relative `}
          >
            <div className="flex">
              <p
                className={`${
                  demo ? "text-chart-blue" : "text-grey-seccondary"
                } text-sm font-normal  leading-3.5 tracking-wider`}
              >
                {t("equity")}
              </p>
            </div>
            <div className="absolute bottom-6">
              <p className="text-green-extra-dark text-3.5xl leading-8 font-normal font-gaisyr">
                {"$"}
                {Number(integerPart).toLocaleString()}
                <span className="text-sm font-gaisyr">.{decimalPart}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-4/6 grid grid-flow-row  grid-cols-3 gap-1">
          <div className="w-full h-full p-6 rounded-lg bg-sidebar relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider">
                {t("profit_&_loss")}
              </p>
              <span className="text-xxs font-normal py-1 px-2.5 bg-hover-sidebar flex items-center rounded-sm">
                {demo ? (
                  <span className="demo-empty-icon mr-1"></span>
                ) : (
                  <>
                    {clientAccountSummary.openPl > 0 ? (
                      <span className="open-icon mr-1"></span>
                    ) : (
                      <span className="red-icon mr-1"> </span>
                    )}
                  </>
                )}
                <span
                  className={`font-gaisyr ${
                    clientAccountSummary.openPl > 0
                      ? "text-green-extra-dark"
                      : "text-red-dark"
                  }  `}
                >
                  {clientAccountSummary.closePlToday}
                  {"%"}
                </span>
              </span>
            </div>
            <div className="absolute bottom-6">
              <p className="text-default text-3.5xl leading-8 font-normal font-gaisyr">
                {"$"}
                {/* {profitInteger} */}
                {/* {Intl.NumberFormat().format(Number(profitInteger))}
                <span className="text-sm font-gaisyr">.{profitDecimal}</span> */}

                {/* Open Pl */}
                {Intl.NumberFormat().format(Number(openPlfirst))}
                <span className="text-sm font-gaisyr">.{openPlSeccond}</span>
              </p>
            </div>
          </div>
          <div className="w-full h-full p-6 rounded-lg bg-sidebar relative">
            <div className="flex items-center justify-between ">
              <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider">
                {t("my_performance_profitability")}
              </p>
              <span className="text-xxs font-normal py-1 px-2.5 bg-hover-sidebar flex items-center rounded-sm">
                {demo ? (
                  <span className="demo-empty-icon mr-1"></span>
                ) : (
                  <>
                    {clientAccountSummary.profitability > 0 ? (
                      <span className="open-icon mr-1"></span>
                    ) : (
                      <span className="red-icon mr-1"> </span>
                    )}
                  </>
                )}
                <span
                  className={` 
                  font-gaisyr
                  ${
                    clientAccountSummary.profitability > 0
                      ? "text-green-extra-dark"
                      : "text-red-dark"
                  } 
                  `}
                >
                  {clientAccountSummary.profitability}
                  {"%"}
                </span>
              </span>
            </div>
            <div className="absolute bottom-6">
              <p className="text-default text-3.5xl leading-8 font-normal font-gaisyr">
                {"%"}
                {clientAccountSummary.profitability}
              </p>
            </div>
          </div>
          <div className="w-full h-full p-6 rounded-lg bg-sidebar relative">
            <div className="flex  items-center justify-between ">
              <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider">
                {t("free_margins")}
              </p>
              <span className="text-xxs font-normal py-1 px-2.5 bg-hover-sidebar flex items-center rounded-sm">
                {demo ? (
                  <span className="demo-empty-icon mr-1"></span>
                ) : (
                  <span className="red-icon mr-1"> </span>
                )}
                <span className="font-gaisyr text-red-dark">
                  {clientAccountSummary.profitability}
                  {"%"}
                </span>
              </span>
            </div>
            <div className="absolute bottom-6">
              <p className="text-default text-3.5xl leading-8 font-normal font-gaisyr">
                {"$"}
                {/* {marginInteger} */}
                {Intl.NumberFormat().format(Number(marginInteger))}
                <span className="text-sm font-gaisyr">.{marginDecimal}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Is Mobile Version */}
      <div className="xl:hidden  grid grid-cols-2 md:grid-cols-4 gap-1 ">
        {/* My equity */}
        <div
          className={` ${
            demo ? "bg-blue-20" : "bg-orange-extra-light"
          }  w-full h-132 xl:h-148 xl:p-6 md:p-4 p-4 rounded-lg relative  `}
        >
          <div className="flex">
            <p
              className={`  ${
                demo ? "text-chart-blue" : "text-grey-seccondary"
              }  text-sm font-normal leading-3.5 tracking-wider  `}
            >
              {t("my_equity")}
            </p>
          </div>
          <div className="absolute bottom-6">
            <p className="text-green-extra-dark md:text-grey-seccondary  text-2xl md:text-3xl leading-6 font-normal font-gaisyr">
              {"$"}
              {Number(integerPart).toLocaleString()}
              <span className="text-sm font-gaisyr">.{decimalPart} </span>
            </p>
          </div>
        </div>
        {/* Profit & loss */}
        <div className="w-full h-132 xl:h-148 xl:p-6 md:p-4 p-4 rounded-lg bg-sidebar relative">
          <div className="flex md:items-center justify-between ">
            <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider">
              {t("profit_&_loss")}
            </p>
            <span className="text-xxs font-normal py-1 px-2.5 bg-hover-sidebar flex items-center rounded-sm">
              {demo ? (
                <span className="demo-empty-icon mr-1"></span>
              ) : (
                <>
                  {clientAccountSummary.openPl > 0 ? (
                    <span className="open-icon mr-1"></span>
                  ) : (
                    <span className="red-icon mr-1"> </span>
                  )}
                </>
              )}
              <span
                className={`font-gaisyr ${
                  clientAccountSummary.openPl > 0
                    ? "text-green-extra-dark"
                    : "text-red-dark"
                }  `}
              >
                {clientAccountSummary.closePlToday}
                {"%"}
              </span>
            </span>
          </div>
          <div className="absolute bottom-6">
            <p className="text-grey-seccondary text-2xl md:text-3xl font-normal leading-6 font-gaisyr">
              {"$"}
              {/* {profitInteger} */}
              {Intl.NumberFormat().format(Number(profitInteger))}
              <span className="text-sm font-gaisyr">.{profitDecimal}</span>
            </p>
          </div>
        </div>
        {/* Profitability */}
        <div className="w-full h-132 xl:h-148 xl:p-6 md:p-4 p-4 rounded-lg bg-sidebar relative">
          <div className="flex md:items-center justify-between ">
            <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider ">
              {t("my_performance_profitability")}
            </p>
            <span className="text-xxs font-normal py-1 px-2.5 bg-hover-sidebar flex items-center rounded-sm">
              {demo ? (
                <span className="demo-empty-icon mr-1"></span>
              ) : (
                <>
                  {clientAccountSummary.profitability > 0 ? (
                    <span className="open-icon mr-1"></span>
                  ) : (
                    <span className="red-icon mr-1"> </span>
                  )}
                </>
              )}

              <span
                className={` 
                  font-gaisyr
                  ${
                    clientAccountSummary.profitability > 0
                      ? "text-green-extra-dark"
                      : "text-red-dark"
                  } 
                  `}
              >
                {clientAccountSummary.profitability}
                {"%"}
              </span>
            </span>
          </div>
          <div className="absolute bottom-6">
            <p className="text-grey-seccondary text-2xl md:text-3xl leading-6 font-normal font-gaisyr">
              {"%"}
              {clientAccountSummary.profitability}
            </p>
          </div>
        </div>
        {/* Free margins */}
        <div className="w-full h-132 xl:h-148 xl:p-6 md:p-4 p-4 rounded-lg bg-sidebar relative">
          <div className="flex md:items-center justify-between ">
            <p className="text-sm font-normal text-grey-seccondary leading-3.5 tracking-wider">
              {t("free_margins")}
            </p>
            <span className="text-xs font-normal py-1 px-2.4 bg-hover-sidebar flex items-center rounded-sm">
              {demo ? (
                <span className="demo-empty-icon mr-1"></span>
              ) : (
                <span className="red-icon mr-1"> </span>
              )}

              <span className="font-gaisyr text-xxs text-red-dark">
                {clientAccountSummary.profitability}
                {"%"}
              </span>
            </span>
          </div>
          <div className="absolute bottom-6">
            <p className="text-grey-seccondary text-2xl md:text-3xl leading-6 font-normal font-gaisyr">
              {"$"}
              {/* {marginInteger} */}
              {Intl.NumberFormat().format(Number(marginInteger))}
              <span className="text-sm font-gaisyr">.{marginDecimal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equity;
