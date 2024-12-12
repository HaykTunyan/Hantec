import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

export type DepositProps = {
  handleWalletDialog: (open: boolean) => void;
};

export default function DepositAF(props: Readonly<DepositProps>) {
  /**
   *  DepositAF
   */

  const router = useRouter();
  const { t } = useTranslation("deposit");

  const handleOpenTether = () => {
    router.push("/management/deposit/cyrptoDeposit");
  };

  const handleOpenDeposit = () => {
    router.push("/management/deposit/create");
  };

  return (
    <div className="py-5">
      <div
        className="flex flex-col border border-hover-payment rounded-lg bg-white hover:bg-hover-payment p-8 cursor-pointer group"
        onClick={handleOpenDeposit}
      >
        <div className="flex justify-between items-center flex-shrink-0">
          <h5 className="text-sm leading-5 font-medium hover:text-white font-aeonik group-hover:text-white">
            {t("deposit_card_title")}
          </h5>
          <div className="">
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 14.3 13.8"
              xmlSpace="preserve"
              height="12px"
              width="12px"
            >
              <style type="text/css">{`.stblack{fill:#23346B;}`}</style>
              <path
                className="stblack"
                d="M7.7,13.5c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l5.3-5.3L7.2,1.6c-0.3-0.3-0.3-0.8,0-1.1 s0.8-0.3,1.1,0l5.8,5.8c0.1,0.1,0.2,0.3,0.2,0.5s-0.1,0.4-0.2,0.5l-5.8,5.8C8.1,13.4,7.9,13.5,7.7,13.5z M1.1,13.5 c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l5.3-5.3L0.5,1.6c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l5.8,5.8 c0.3,0.3,0.3,0.8,0,1.1l-5.8,5.8C1.4,13.4,1.3,13.5,1.1,13.5z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-5" />
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-1 md:gap-5">
          {/* Credit / Debit Card */}
          <div className="flex flex-row items-center gap-1  ">
            <span className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 74.3 70.1"
                height="56px"
                width="56px"
                style={{ flexShrink: 0 }}
              >
                <defs>
                  <rect
                    id="SVGID_1_"
                    x="2.9"
                    y="7.2"
                    width="68.4"
                    height="55.8"
                  />
                </defs>
                <clipPath id="clip-path">
                  <use xlinkHref="#SVGID_1_" style={{ overflow: "visible" }} />
                </clipPath>
                <g style={{ clipPath: "url(#clip-path)" }}>
                  <path
                    className="stblack"
                    d="M63.2,31.9V11.4c0-2.3-1.9-4.2-4.2-4.2H7.1c-2.3,0-4.2,1.9-4.2,4.2v39c0,2.3,1.9,4.2,4.2,4.2h33c4.6,8,14.7,10.8,22.8,6.3s10.8-14.7,6.3-22.8C67.7,35.5,65.7,33.4,63.2,31.9 M7.1,10H59c0.8,0,1.4,0.6,1.4,1.4c0,0,0,0,0,0 v8.4H5.7v-8.4C5.7,10.6,6.3,10,7.1,10L7.1,10 M7.1,51.7c-0.8,0-1.4-0.6-1.4-1.4l0,0V22.6h54.7v8c-8.6-3.2-18.2,1.2-21.4,9.9 c-1.3,3.6-1.4,7.6-0.1,11.3L7.1,51.7z M54.7,60.2c-7.7,0-13.9-6.2-13.9-13.9S47,32.4,54.7,32.4c7.7,0,13.9,6.2,13.9,13.9v0 C68.5,54,62.3,60.2,54.7,60.2"
                  />
                  <path
                    className="stblack"
                    d="M55.6,45.2c-1.4-0.5-2-0.9-2-1.4c0-0.5,0.4-0.9,1.4-0.9c0.8,0,1.7,0.2,2.4,0.6l0.5-1.9 c-0.8-0.4-1.6-0.5-2.4-0.6v-1.5h-1.6V41c-1.6,0.1-2.8,1.4-2.8,3c0,1.6,1.2,2.5,3,3.1c1.2,0.4,1.8,0.8,1.8,1.5c0,0.7-0.7,1-1.6,1 c-1,0-1.9-0.3-2.8-0.7l-0.5,2c0.9,0.4,1.9,0.7,2.9,0.7v1.6h1.6v-1.7c1.6-0.1,2.9-1.5,3-3.1C58.4,46.8,57.6,45.9,55.6,45.2"
                  />
                  <path
                    className="stblack"
                    d="M12.2,16.5h1.4c0.8,0,1.4-0.6,1.4-1.4c0-0.8-0.6-1.4-1.4-1.4h-1.4c-0.8,0-1.4,0.6-1.4,1.4 C10.8,15.9,11.4,16.5,12.2,16.5L12.2,16.5"
                  />
                  <path
                    className="stblack"
                    d="M19.5,16.5h1.4c0.8,0,1.4-0.6,1.4-1.4c0-0.8-0.6-1.4-1.4-1.4c0,0,0,0,0,0h-1.4 c-0.8,0-1.4,0.6-1.4,1.4C18.1,15.9,18.7,16.5,19.5,16.5"
                  />
                  <path
                    className="stblack"
                    d="M40.3,28.8c-0.6-0.5-1.4-0.5-2,0c0,0,0,0,0,0c-3.5,3.6-7.6,7.7-9.2,8.9 c-1.2-0.8-3.7-2.6-4.8-3.3l-0.9-0.6l-8.1,7.2c-0.6,0.5-0.6,1.4-0.1,2c0.5,0.6,1.4,0.6,2,0.1l6.5-5.8c1.5,1,4.1,2.8,4.7,3.2 c1,0.6,1.7,1,12-9.8C40.9,30.2,40.9,29.4,40.3,28.8C40.3,28.8,40.3,28.8,40.3,28.8"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm leading-3 flex flex-row items-center hover:text-white font-aeonik  group-hover:text-white">
              <span className="block lg:hidden mr-1 blue-icon group-hover:live-icon"></span>{" "}
              {t("deposit_card_title_1")}
            </span>
          </div>
          {/* Bank Transfer */}
          <div className="flex flex-row items-center gap-1">
            <span className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 74.3 70.1"
                height="56px"
                width="56px"
                style={{ flexShrink: 0 }}
                {...props}
              >
                <defs>
                  <rect id="rect1" x="7.6" y="2.5" width="59" height="66.4" />
                </defs>
                <clipPath id="clip-path1">
                  <use xlinkHref="#rect1" style={{ overflow: "visible" }} />
                </clipPath>
                <g style={{ clipPath: "url(#clip-path1)" }}>
                  <path
                    className="stblack"
                    d="M55.7,40.9V29.3h0.2c0.7,0,1.3-0.6,1.3-1.3v-3.7c0-0.7-0.6-1.3-1.3-1.3H49c-0.7,0-1.3,0.6-1.3,1.3V28c0,0.7,0.6,1.3,1.3,1.3h0.2v11.6c-5.2,1.3-9.3,5.4-10.5,10.6H8.9c-0.7,0-1.3,0.6-1.3,1.3v3.7c0,0.7,0.6,1.3,1.3,1.3h29.7c1.7,7.6,9.3,12.4,17,10.6c7.6-1.7,12.4-9.3,10.6-17C65.1,46.3,61,42.2,55.7,40.9M50.1,25.3h4.8v1.6h-4.8V25.3zM51.6,29.3h1.8v11.2c-0.3,0-0.6,0-0.9,0s-0.6,0-0.9,0L51.6,29.3zM10,55.5v-1.6h28.3c0,0.3,0,0.5,0,0.8s0,0.5,0,0.8H10zM52.5,66.5c-6.5,0-11.8-5.3-11.8-11.8c0-6.5,5.3-11.8,11.8-11.8c6.5,0,11.8,5.3,11.8,11.8c0,0,0,0,0,0C64.3,61.2,59,66.5,52.5,66.5"
                  />
                  <path
                    className="stblack"
                    d="M53.3,53.8c-1.2-0.5-1.7-0.8-1.7-1.2c0-0.4,0.3-0.8,1.2-0.8c0.7,0,1.4,0.2,2.1,0.5l0.4-1.6c-0.6-0.3-1.4-0.5-2.1-0.5v-1.3h-1.4v1.4c-1.3,0.1-2.4,1.2-2.4,2.5c0,1.4,1,2.1,2.6,2.6c1.1,0.4,1.5,0.7,1.5,1.2c0,0.6-0.6,0.9-1.4,0.9c-0.8,0-1.6-0.2-2.4-0.6l-0.4,1.7c0.8,0.4,1.6,0.6,2.4,0.6v1.4h1.4v-1.5c1.4-0.1,2.5-1.2,2.5-2.6C55.7,55.1,55,54.4,53.3,53.8"
                  />
                  <path
                    className="stblack"
                    d="M13.9,21.8h41c1.3,0,2.4-1.1,2.4-2.4c0-0.8-0.4-1.5-1-1.9L35.8,2.9c-0.8-0.6-1.9-0.6-2.8,0L12.5,17.5c-1.1,0.8-1.3,2.2-0.6,3.3C12.4,21.4,13.2,21.8,13.9,21.8M34.4,4.8L34.4,4.8l20.5,14.6h-41L34.4,4.8z"
                  />
                  <path
                    className="stblack"
                    d="M19.8,29.3c0.7,0,1.3-0.6,1.3-1.3v-3.7c0-0.7-0.6-1.3-1.3-1.3h-6.9c-0.7,0-1.3,0.6-1.3,1.3c0,0,0,0,0,0V28c0,0.7,0.6,1.3,1.3,1.3H13v14.6h-0.2c-0.7,0-1.3,0.6-1.3,1.3c0,0,0,0,0,0V49c0,0.7,0.6,1.3,1.3,1.3h6.9c0.7,0,1.3-0.6,1.3-1.3v-3.7c0-0.7-0.6-1.3-1.3-1.3h-0.2V29.3H19.8zM13.9,25.3h4.8v1.6h-4.8V25.3zM18.7,47.9h-4.8v-1.6h4.8V47.9zM17.2,43.9h-1.8V29.3h1.8V43.9z"
                  />
                  <path
                    className="stblack"
                    d="M37.8,29.3c0.7,0,1.3-0.6,1.3-1.3v-3.7c0-0.7-0.6-1.3-1.3-1.3h-6.9c-0.7,0-1.3,0.6-1.3,1.3V28c0,0.7,0.6,1.3,1.3,1.3h0.2v14.6h-0.2c-0.7,0-1.3,0.6-1.3,1.3V49c0,0.7,0.6,1.3,1.3,1.3h6.9c0.7,0,1.3-0.6,1.3-1.3v-3.7c0-0.7-0.6-1.3-1.3-1.3h-0.2V29.3H37.8zM32,25.3h4.8v1.6H32L32,25.3zM36.8,47.9H32v-1.6h4.8L36.8,47.9zM35.3,43.9h-1.8V29.3h1.8V43.9z"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm leading-3 flex flex-row items-center hover:text-white font-aeonik  group-hover:text-white">
              <span className="block lg:hidden mr-1 blue-icon group-hover:live-icon"></span>{" "}
              {t("deposti_card_title_2")}
            </span>
          </div>
          {/* Local Payment Methods */}
          <div className="flex flex-row items-center gap-1">
            <span className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 74.3 70.1"
                height="56px"
                width="56px"
                style={{ flexShrink: 0 }}
                {...props}
              >
                <defs>
                  <rect
                    id="rect1"
                    x="14.6"
                    y="3.5"
                    width="45.1"
                    height="63.1"
                  />
                </defs>
                <clipPath id="clip-path1">
                  <use xlinkHref="#rect1" style={{ overflow: "visible" }} />
                </clipPath>
                <g style={{ clipPath: "url(#clip-path1)" }}>
                  <path
                    className="stblack"
                    d="M39.5,34c-2.2-0.8-3.2-1.4-3.2-2.3c0-0.7,0.6-1.5,2.3-1.5c1.3,0,2.6,0.3,3.8,0.9l0.8-3c-1.2-0.6-2.5-0.9-3.8-0.9v-2.3h-2.6v2.5c-2.8,0.6-4.5,2.4-4.5,4.7c0,2.6,1.9,3.9,4.8,4.8c2,0.7,2.8,1.3,2.8,2.3c0,1.1-1,1.6-2.5,1.6c-1.5,0-3-0.4-4.4-1.2l-0.8,3.1c1.4,0.7,2.9,1.1,4.5,1.1v2.5h2.6v-2.7c3-0.5,4.7-2.5,4.7-4.9C43.9,36.6,42.6,35.1,39.5,34"
                  />
                  <path
                    className="stblack"
                    d="M48.2,17.6H27.8c-2.1,0-3.8,1.7-3.8,3.8V50c0,2.1,1.7,3.8,3.8,3.8h20.3c2.1,0,3.8-1.7,3.8-3.8V21.4C52,19.3,50.3,17.6,48.2,17.6M49.4,50c0,0.7-0.6,1.3-1.3,1.3c0,0,0,0,0,0H27.8c-0.7,0-1.3-0.6-1.3-1.3V21.4c0-0.7,0.6-1.3,1.3-1.3c0,0,0,0,0,0h20.3c0.7,0,1.3,0.6,1.3,1.3V50z"
                  />
                  <path
                    className="stblack"
                    d="M15.9,53.9c0.7,0,1.3-0.6,1.3-1.3V17.8c0-4,3.3-7.3,7.3-7.3h25v3l0.1,0.8l0.6,0.4c0.2,0.1,0.5,0.2,0.7,0.2c0.2,0,0.5-0.1,0.7-0.2l7.5-4.3c0.7-0.4,0.9-1.2,0.5-1.9C59.3,8.3,59.2,8.1,59,8l-7.5-4.3c-0.4-0.2-1-0.2-1.4,0l-0.7,0.5V8h-25c-5.4,0-9.8,4.4-9.8,9.8v34.8C14.6,53.3,15.2,53.9,15.9,53.9"
                  />
                  <path
                    className="stblack"
                    d="M58.4,16.3c-0.7,0-1.3,0.6-1.3,1.3V52c0,4-3.3,7.3-7.3,7.3h-25v-3l-0.1-0.8l-0.6-0.4c-0.4-0.3-1-0.3-1.4,0l-7.5,4.3c-0.7,0.4-0.9,1.3-0.5,1.9c0.1,0.2,0.3,0.4,0.5,0.5l7.5,4.3c0.4,0.2,1,0.2,1.4,0l0.7-0.5v-3.8h25c5.4,0,9.8-4.4,9.8-9.8V17.6C59.7,16.9,59.1,16.3,58.4,16.3"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm leading-3 flex flex-row items-center hover:text-white font-aeonik group-hover:text-white">
              <span className="block lg:hidden mr-1 blue-icon group-hover:live-icon"></span>{" "}
              {t("depostit_card_title_3")}
            </span>
          </div>
          {/* Mobile Money */}
          <div className="flex flex-row items-center gap-1">
            <span className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 74.3 70.1"
                height="56px"
                width="56px"
                style={{ flexShrink: 0 }}
                {...props}
              >
                <defs>
                  <rect id="rect2" x="11.6" y="4.9" width="51" height="60.2" />
                </defs>
                <clipPath id="clip-path2">
                  <use xlinkHref="#rect2" style={{ overflow: "visible" }} />
                </clipPath>
                <g style={{ clipPath: "url(#clip-path2)" }}>
                  <path
                    className="stblack"
                    d="M58.9,17H47.5V8.7c0-2.1-1.7-3.8-3.8-3.8H15.4c-2.1,0-3.8,1.7-3.8,3.8v52.7c0,2.1,1.7,3.8,3.8,3.8h28.3c2.1,0,3.8-1.7,3.8-3.8v-17h11.3c2.1,0,3.8-1.7,3.8-3.8V20.8C62.6,18.7,61,17,58.9,17 M45,61.4c0,0.7-0.6,1.3-1.3,1.3H15.4c-0.7,0-1.3-0.6-1.3-1.3V8.7c0-0.7,0.6-1.3,1.3-1.3h28.3C44.4,7.5,45,8,45,8.7V17h-1.3V8.7H15.4v49.1h28.3V44.4H45L45,61.4z M26.9,17c-2.1,0-3.8,1.7-3.8,3.8v19.8c0,1.5,0.9,2.9,2.3,3.5c-1,5.1-0.9,6.8,0.5,7.4c0.2,0.1,0.4,0.1,0.6,0.1c1.2,0,2.6-1.5,5.8-7.2h8.9v10.9H17.9V11.2h23.3V17H26.9z M60.1,40.6c0,0.7-0.6,1.3-1.3,1.3h-28l-0.4,0.7c-0.9,1.8-2,3.5-3.1,5.2c0.1-0.9,0.3-2.3,0.8-4.3l0.3-1.5h-1.6c-0.7,0-1.3-0.6-1.3-1.3V20.8c0-0.7,0.6-1.3,1.3-1.3h32c0.7,0,1.3,0.6,1.3,1.3L60.1,40.6z"
                  />
                  <path
                    className="stblack"
                    d="M43.9,29.7c-1.5-0.6-2.2-1-2.2-1.5c0-0.5,0.4-1,1.5-1c0.9,0,1.8,0.2,2.6,0.6l0.5-2c-0.8-0.4-1.7-0.6-2.6-0.6v-1.6H42v1.7c-1.9,0.4-3,1.6-3,3.2c0,1.7,1.3,2.6,3.2,3.3c1.3,0.5,1.9,0.9,1.9,1.6c0,0.7-0.7,1.1-1.7,1.1c-1,0-2.1-0.3-3-0.8l-0.5,2.1c0.9,0.5,2,0.7,3.1,0.8v1.7h1.8v-1.8c2.1-0.4,3.2-1.7,3.2-3.3C46.9,31.4,46,30.4,43.9,29.7"
                  />
                  <path
                    className="stblack"
                    d="M29.6,58.4c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6C31.2,59.1,30.5,58.4,29.6,58.4"
                  />
                </g>
              </svg>
            </span>
            <span className="text-sm leading-3 flex flex-row items-center hover:text-white font-aeonik  group-hover:text-white">
              <span className="block lg:hidden mr-1 blue-icon group-hover:live-icon"></span>{" "}
              {t("deposit_card_title_4")}
            </span>
          </div>
          {/* E-wallet  */}
          <div className="flex flex-row items-center gap-1">
            <span className="hidden lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 74.3 70.1"
                height="56px"
                width="56px"
                style={{ flexShrink: 0 }}
                {...props}
              >
                <defs>
                  <rect id="rect3" x="8.7" y="8" width="56.9" height="54.1" />
                </defs>
                <clipPath id="clip-path3">
                  <use xlinkHref="#rect3" style={{ overflow: "visible" }} />
                </clipPath>
                <g id="Group_164">
                  <g>
                    <path
                      className="stblackstroke"
                      d="M62.6,24.9h-4.8v-3.8c0-1.7-1.4-3-3-3h-9.1L35.6,8L25.5,18.1H13c-1.2,0-2.3,0.5-3.1,1.3c-0.6,0.7-1,1.5-1.1,2.5c0,0.1,0,0.1,0,0.2v35.8c0,2.4,1.9,4.3,4.3,4.3h49.6c1.7,0,3-1.4,3-3V27.9C65.6,26.2,64.2,24.9,62.6,24.9 M54.7,19.8c0.7,0,1.3,0.6,1.3,1.3v3.8h-3.6l-5.1-5.1H54.7z M44.7,19.5L44.7,19.5l5.3,5.3h-4.1l-6.4-6.4L39,19.1c-1.9,1.9-4.9,1.9-6.8,0c0,0,0,0,0,0l-0.6-0.6l-6.4,6.4h-4.1l5.3-5.3l0,0l9.1-9.1L44.7,19.5z M43.5,24.9H27.7l4-4c2.3,1.8,5.6,1.8,7.9,0L43.5,24.9z M11.1,20.6c0.5-0.5,1.1-0.8,1.8-0.8h10.8l-5.1,5.1h-5.6c-1.4,0-2.6-1-2.7-2.4C10.4,21.8,10.6,21.1,11.1,20.6 M63.9,45H43.6c-1.9,0-3.4-1.5-3.4-3.4v-2.9c0-1.9,1.5-3.4,3.4-3.4h20.3L63.9,45z M43.6,33.5c-2.9,0-5.2,2.3-5.2,5.2v2.9c0,2.9,2.3,5.2,5.2,5.2h20.3v12.4c0,0.7-0.6,1.3-1.3,1.3H13c-1.4,0-2.5-1.1-2.5-2.5V25.7c0.8,0.6,1.7,0.9,2.7,0.9h49.4c0.7,0,1.3,0.6,1.3,1.3v5.6L43.6,33.5z"
                    />
                    <path
                      className="stblackstroke"
                      d="M43.2,40.5c0,0.5,0.4,0.9,0.9,0.9h8.8c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9c0,0,0,0,0,0H44C43.6,39.6,43.2,40,43.2,40.5"
                    />
                  </g>
                  <g>
                    <path
                      className="stblack"
                      d="M32.1,44.7H22c0.4,1.9,1.9,3.1,4.2,3.1c1.4,0,2.6-0.5,3.5-1.4l1.6,1.8c-1.2,1.4-3,2.1-5.2,2.1c-4.3,0-7.1-2.8-7.1-6.6s2.8-6.6,6.6-6.6c3.7,0,6.5,2.6,6.5,6.6C32.1,44,32.1,44.4,32.1,44.7z M22,42.7h7.3c-0.2-1.8-1.7-3.1-3.6-3.1C23.7,39.6,22.3,40.8,22,42.7z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <span className="text-sm leading-3 flex flex-row items-center hover:text-white font-aeonik  group-hover:text-white">
              <span className="block lg:hidden mr-1 blue-icon group-hover:live-icon"></span>{" "}
              {t("E-wallet")}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10" />
      {/*  Tether */}
      <div
        className="flex flex-col border border-hover-payment rounded-lg bg-white hover:bg-hover-payment p-8 cursor-pointer group"
        onClick={handleOpenTether}
      >
        <div className="flex justify-between items-center flex-shrink-0">
          <h5 className="text-sm leading-5 font-medium hover:text-white font-aeonik group-hover:text-white">
            {" "}
            {t("deposit_crypto_currency")}
          </h5>
          <div>
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 14.3 13.8"
              xmlSpace="preserve"
              height="12px"
              width="12px"
              className="group-hover:fill-white"
            >
              <style type="text/css">{`.stblack{fill:#23346B;}`}</style>
              <path
                className="stblack group-hover:stblack:fill-white"
                d="M7.7,13.5c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l5.3-5.3L7.2,1.6c-0.3-0.3-0.3-0.8,0-1.1 s0.8-0.3,1.1,0l5.8,5.8c0.1,0.1,0.2,0.3,0.2,0.5s-0.1,0.4-0.2,0.5l-5.8,5.8C8.1,13.4,7.9,13.5,7.7,13.5z M1.1,13.5 c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1l5.3-5.3L0.5,1.6c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l5.8,5.8 c0.3,0.3,0.3,0.8,0,1.1l-5.8,5.8C1.4,13.4,1.3,13.5,1.1,13.5z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-5" />
        <div className="flex items-center">
          <div className="flex flex-row items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2000 2000"
              width="56px"
              height="56px"
              style={{ flexShrink: 0 }}
              {...props}
              className="group-hover:fill-white"
            >
              <style>
                {`
            .tether { fill: #53ae94; }
            .tetherstroke { fill: #fff; }
          `}
              </style>
              <path
                className="tether group-hover:tether:fill-white"
                d="M1000 0c552.26 0 1000 447.74 1000 1000s-447.76 1000-1000 1000S0 1552.38 0 1000 447.68 0 1000 0"
              />
              <path
                className="tetherstroke group-hover:tetherstroke:fill-white"
                d="M1123.42 866.76V718h340.18V491.34H537.28V718H877.5v148.64C601 879.34 393.1 934.1 393.1 999.7s208 120.36 484.4 133.14v476.5h246V1132.8c276-12.74 483.48-67.46 483.48-133s-207.48-120.26-483.48-133m0 225.64v-.12c-6.94.44-42.6 2.58-122 2.58-63.48 0-108.14-1.8-123.88-2.62v.2C633.34 1081.66 451 1039.12 451 988.22S633.36 894.84 877.62 884v166.1c16 1.1 61.76 3.8 124.92 3.8 75.86 0 114-3.16 121-3.8V884c243.8 10.86 425.72 53.44 425.72 104.16s-182 93.32-425.72 104.18"
              />
            </svg>
            <span className="text-sm leading-3 hover:text-white font-aeonik group-hover:text-white">
              {t("tether")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
