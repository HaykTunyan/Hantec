import React, { FC } from "react";
import { useTranslation } from "next-i18next";

interface CommpletedCardProps {
  fromAccount: string;
  fromPrice: string;
  toAccount: string;
  toPrice: string;
}

const CommpletedCard: FC<CommpletedCardProps> = ({
  fromAccount,
  fromPrice,
  toAccount,
  toPrice,
}) => {
  /**
   * Commpleted Card Hooks.
   */

  const { t } = useTranslation("internal_transfer");

  return (
    <div className="bg-white rounded-lg px-3 py-7 md:py-14 md:px-16">
      <div className="flex justify-center">
        <img
          src="/icons/management/commpleted-succes.svg"
          alt="Commpleted-Succes"
        />
      </div>
      <div className="pt-4" />
      <p className="text-xl md:text-2xl leading-7 text-default text-center">
        {t("good_job")}
      </p>
      <div className="pt-1.5" />
      <p className="text-base leading-4 font-medium md:leading-5 tracking-wider text-grey-seccondary text-center">
        {t("been_completed.")}
      </p>
      <div className="pt-6 md:pt-8" />
      <div className=" border border-grey-extra-light p-3 md:p-8 flex flex-col rounded-lg ">
        {/* From Account */}
        <div className="flex flex-row w-full ">
          <div className="w-2/5 md:w-1/3 border-r border-grey-extra-light">
            <div className="flex flex-col ">
              <div className="">
                <p className=" text-lg md:text-xl font-medium  text-grey-seccondary">
                  {" "}
                  {fromAccount}{" "}
                </p>
              </div>
              <div className="pt-1 md:pt-2" />
              <div className="flex flex-row gap-1 items-center">
                <div className="text-grey-seccondary text-xxs font-normal leading-3 tracking-widest">
                  {t("balance")}
                </div>
                <div className="flex flex-row  items-center">
                  <img
                    src="/icons/management/arrow-down-red-12.svg"
                    alt="Arrow-Down-Red-12"
                  />
                  <span className="text-xxs font-normal text-red-dark leading-3">
                    {" "}
                    {fromPrice} {"$"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 md:w-2/3 gap-1 relative flex justify-end flex-row items-center">
            <p className="text-grey-seccondary text-2xl md:leading-8 md:text-3.5xl font-normal">
              0
            </p>
            <img
              src="/icons/management/$-pasive.svg"
              alt="$-Pasive"
              className="w-3 h-6 md:w-5 md:h-8"
            />
          </div>
        </div>
        {/*  */}
        <div className=" h-4 w-full relative flex justify-center">
          <div
            className={`hidden md:flex absolute w-11 h-11  justify-center bg-white border border-grey-100 border-opacity-10 rounded z-50 -bottom-4 cursor-pointer `}
          >
            <img
              src="/icons/iconSmall/arrow_down_16.svg"
              alt="Arrow_Down_16"
              width={16}
              height={16}
            />
          </div>
        </div>
        {/* To Account */}
        <div className="flex flex-row w-full ">
          <div className="w-2/5 md:w-1/3 border-r border-grey-extra-light">
            <div className="flex flex-col ">
              <div className="">
                <p className="text-lg md:text-xl font-medium  text-default">
                  {" "}
                  {toAccount}{" "}
                </p>
              </div>
              <div className="pt-1 md:pt-2" />
              <div className="flex flex-row gap-1 items-center">
                <div className="text-grey-seccondary text-xxs font-normal leading-3 tracking-widest">
                  {t("balance")}
                </div>
                <div className="flex flex-row items-center">
                  <img
                    src="/icons/management/arrow-up-green-12.svg"
                    alt="Arrow-Up-Green-12.svg"
                  />
                  <span className="text-xxs font-normal text-green-extra-dark leading-3 ">
                    {" "}
                    {toPrice} {"$"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 md:w-2/3 gap-1 flex justify-end flex-row items-center">
            <p className="text-default md:leading-8 text-2xl  md:text-3.5xl font-normal">
              {toPrice}
            </p>
            <img
              src="/icons/management/$-active.svg"
              alt="$-Active.svg"
              className="w-3 h-6 md:w-5 md:h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommpletedCard;
