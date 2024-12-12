import React, { FC, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTranslation } from "next-i18next";

interface Option {
  id: string;
  value: string;
  label: string;
  balance: string;
}

interface SelectAccountProps {
  options: Option[];
  type: string;
  selectedOption: Option | undefined;
  onChange: (option: Option) => void | undefined;
  disabled?: boolean;
}

const SelectAccount: FC<SelectAccountProps> = ({
  options,
  type,
  selectedOption,
  onChange,
  disabled,
}) => {
  /**
   * Select Account Hooks.
   */
  const { t } = useTranslation("internal_transfer");

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const drpDwnRef = useRef(null);
  const drpDwnRefExclude = useRef(null);
  useOnClickOutside(drpDwnRef, setIsOpenOption, drpDwnRefExclude);

  const selectedOptionDetails: Option | undefined =
    selectedOption ||
    // @ts-ignore
    options.find((option) => option.value === selectedOption?.value);

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col w-full pr-2 md:pr-8">
        <div
          ref={drpDwnRefExclude}
          onClick={disabled ? undefined : () => setIsOpenOption(!isOpenOption)}
          className="flex w-full justify-between items-center relative cursor-pointer"
        >
          <div className="flex">
            <span className="text-base leading-4 md:text-xl font-medium md:leading-6 text-grey-seccondary">
              {selectedOptionDetails?.label || type}
            </span>
          </div>
          <div
            className={`flex ${disabled ? "cursor-no-drop" : "cursor-pointer"}`}
          >
            {isOpenOption ? (
              <img
                src="/icons/iconSmall/Caret-Up.svg"
                alt="Caret-Up"
                className="w-4 h-4 object-contain"
              />
            ) : (
              <svg
                className="w-4 h-4 object-contain"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.995 6.50496V5.5H3.00488V6.50496L7.99993 11.5L12.995 6.50496Z"
                  fill="#2B2A28"
                />
              </svg>
            )}

            {isOpenOption && (
              <div
                ref={drpDwnRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute flex flex-col gap-2 w-44 bg-white left-0 top-8 rounded-lg p-1 border border-grey-extra z-50 max-h-60 overflow-x-auto"
              >
                {options &&
                  options?.length > 0 &&
                  options.map((item, index) => (
                    <div
                      key={index}
                      className={`
                    flex justify-between w-full px-3 py-2.5 cursor-pointer rounded 
                    ${
                      selectedOption?.value === item.value
                        ? "bg-hover-sidebar"
                        : ""
                    }
                    hover:bg-hover-sidebar relative
                  `}
                      onClick={() => {
                        onChange(item);
                        setIsOpenOption(false);
                      }}
                    >
                      <span>{item.label}</span>
                      {selectedOption?.value === item.value && (
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                            fill="#2B2A28"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="pt-2" />
        <div className="flex flex-row items-center gap-2">
          <span className="text-xxs font-normal text-grey-seccondary leading-3 tracking-wider">
            {t("balance")}
          </span>
          <span className="text-xxs font-normal text-grey-seccondary leading-3 tracking-wider">
            {selectedOptionDetails?.balance || "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectAccount;
