import React, { FC, useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";

/**
 *  @interface RightWithdrawalReminderProps
 */

interface RightWithdrawalReminderProps {
  toggleSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpenBar: boolean;
}

const RightWithdrawalReminder: FC<RightWithdrawalReminderProps> = ({
  toggleSidebar,
  setIsOpen,
  isOpenBar,
}) => {
  /**
   *  RightSidebar Notifiaction Hooks.
   */

  const { t } = useTranslation("withdrawal");
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, setIsOpen);

  return (
    <div ref={modalRef}>
      <aside
        className={`transition-box2 fixed top-0 right-0 z-[3000] w-full md:w-128 h-full transition-transform transform shadow-md ${
          // isOpenBar ? "translate-x-0 " : "translate-x-full"
          isOpenBar ? "open2" : "close2"
        } bg-gray-50`}
      >
        <div className="h-full py-5 px-4  md:px-4 md:py-4 overflow-y-auto ">
          <div className="flex flex-row justify-end">
            <div className="">
              <button
                type="button"
                className="p-4 border rounded-sm border-gray-300 "
                onClick={() => setIsOpen(false)}
              >
                <img src="/icons/iconSmall/close-x-16x16.svg" alt="Close-X" />
              </button>
            </div>
          </div>
          <div className="pt-14" />
          <div className="flex flex-row items-center gap-4 md:px-10  ">
            <button
              type="button"
              className="hidden  border-none cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <img src="/icons/arrow-left.svg" alt="Arrow-Left" />
            </button>
            <h3 className="text-default text-xl md:text-2xl font-medium tracking-wider font-aeonik">
              {" "}
              {t("withdrawal_reminder")}
            </h3>
          </div>
          <div className="mt-8 md:mt-14" />
          <div className="px-0 md:px-10 font-aeonik">
            <div className="">
              <p className="text-lg font-medium leading-5">
                {t("terms_and_conditions")}
              </p>
            </div>
            <div className="mt-6" />
            <div className="border rounded-lg  p-6 border-sidebar">
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_1")}
              </p>
              <div className="pt-2" />

              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_2")}
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_3")}
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_4")}
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_5")}
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_6")}
              </p>
              <div className="pt-2" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_7")}
              </p>
              <div className="mt-6" />
              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  01
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {t("terms_description_8")}
                </p>
              </div>
              <div className="mt-3" />

              <div className="flex flex-row gap-3">
                <p className="text-sm leading-4 font-normal text-grey-seccondary">
                  02
                </p>
                <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                  {t("terms_description_9")}
                </p>
              </div>
              <div className="mt-6" />
              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_10")}
              </p>
              <div className="pt-2" />

              <p className="text-sm leading-4 font-normal tracking-wider text-grey-seccondary">
                {t("terms_description_11")}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RightWithdrawalReminder;
