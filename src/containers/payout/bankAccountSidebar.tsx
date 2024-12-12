import React, { FC } from "react";
import { useTranslation } from "next-i18next";

/**
 *  @interface BankInformationSidebarProps
 */

interface BankInformationSidebarProps {
  setIsOpen: (isOpenBar: boolean) => void;
  isOpenBar: boolean;
  isOpenEditModal: () => void;
  isOpenDeleteModal: () => void;
  typeAccount: string;
}

const BankInformationSidebar: FC<BankInformationSidebarProps> = ({
  setIsOpen,
  isOpenBar,
  isOpenEditModal,
  isOpenDeleteModal,
  typeAccount,
}) => {
  /**
   *  BankInformationSidebar  Hooks.
   */

  const {t} = useTranslation("payout");
  
  return (
    <aside
      className={`transition-box2 fixed top-0 right-0 z-[3000] w-full h-full md:w-128 transition-transform transform shadow-md  ${
        // isOpenBar ? "translate-x-0" : "translate-x-full"
        isOpenBar ? "open2" : "translate-x-full"
      } bg-gray-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full pt-5 px-4 md:pt-4 overflow-y-auto ">
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-3">
            <button
              type="button"
              onClick={() => isOpenDeleteModal()}
              className="p-4 border rounded border-default border-opacity-10  flex flex-row items-center gap-1"
            >
              <img src="/icons/management/trash.svg" alt="Trash" />
              <span className="text-sm leading-3.5 font-medium text-default">
                {" "}
                {t("delete")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => isOpenEditModal()}
              className="p-4 border rounded border-default border-opacity-10  flex flex-row items-center gap-1"
            >
              <img src="/icons/management/edit.svg" alt="edit" />
              <span className="text-sm leading-3.5 font-medium text-default">
                {" "}
                {t("edit")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-4 border rounded border-default border-opacity-10 "
            >
              <img src="/icons/iconSmall/close-x-16x16.svg" alt="Close-X" />
            </button>
          </div>
        </div>
        <div className="pt-14" />
        <div className="flex flex-row items-center  px-0 md:py-4 md:px-5 ">
          <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
            {" "}
            {typeAccount === "bank" &&   "Your Bank Information Account"}
            {typeAccount === "crypto" && "Your Crypto Wallet Account"}
            {typeAccount === "mobile" && "Your Mobile Money Account"}
            {typeAccount === "perfect" && "Your Perfect Money Account"}
          </h3>
        </div>
        <div className="mt-8 md:mt-10" />
        <div className="px-0 md:px-10 font-aeonik">
          {typeAccount === "bank" && (
            <div className="flex flex-col gap-5">
              {/* Bank Location */}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("bank_location")}
           
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}

                  England
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Bank Name*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("bank_name")}

                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Account*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("account")}

                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Bank Address*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default">
                  {" "}
                  {t("bank_address")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* International Bank Account Number (IBAN) */}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default">
                  {" "}
                  {t("international_bank")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* SWIFT Code */}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default">
                  {" "}
                  {t("swift_code")}
              
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
            </div>
          )}

          {typeAccount === "crypto" && (
            <div className="flex flex-col gap-5">
              {/* Wallet Name*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("wallet_name")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Wallet Address*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("wallet_address")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
            </div>
          )}

          {typeAccount === "mobile" && (
            <div className="flex flex-col gap-5">
              {/* Location*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("location")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Provider*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("provider")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
            </div>
          )}

          {typeAccount === "perfect" && (
            <div className="flex flex-col gap-5">
              {/* Account Holder Name*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("account_holder_name")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
              {/* Account Number*/}
              <div className="flex flex-col">
                <p className="text-sm leading-3.5 font-medium tracking-wider text-default ">
                  {" "}
                  {t("account_number")}
                </p>
                <div className="pt-1" />
                <span className="text-grey-seccondary text-xs font-normal tracking-wider">
                  {" "}
                  - - -{" "}
                </span>
                <div className="pt-3" />
                <div className="w-full h-[1px] bg-grey-extra-light" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BankInformationSidebar;
