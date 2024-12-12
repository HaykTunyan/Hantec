import React, {FC, useRef, useState} from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface Option {
  value: string;
  label: string;
}

interface DropDownProps {
  options: Option[];
  selectedOption: string;
  onChange: (value: string) => void;
  lableTitle?: string;
  pleacholder?: string;
  disabled?: boolean;
}

const DropDownComponent: FC<DropDownProps> = ({
  lableTitle,
  pleacholder,
  options,
  selectedOption,
  onChange,
  disabled,
}) => {
  /**
   *  DropDown Components Hook.
   */

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  const drpDwnRef = useRef(null);
  const drpDwnRefExclude = useRef(null);
  useOnClickOutside(drpDwnRef, setIsOpenOption, drpDwnRefExclude);

  return (
    <div
        ref={drpDwnRefExclude}
        className="dropdown relative w-full flex flex-col "
    >
      {lableTitle && (
        <label className="font-normal text-sm  leading-3.5 text-default">
          {lableTitle}
        </label>
      )}
      <div className="mt-1" />
      <div
        className="py-3 px-[14px] w-full flex flex-row border border-grey-extra-light  gap-1 rounded bg-white cursor-pointer  "
        onClick={options?.length ? () => setIsOpenOption(!isOpenOption) : undefined}
      >
        <div className="w-4/5 flex items-center ">
          {selectedOption ? (
            <span className="w-full font-normal text-base leading-3 h-full flex items-center  verflow-hidden whitespace-nowrap truncate">
              {selectedOption}
            </span>
          ) : (
            <span className="w-full font-normal text-base leading-3 text-grey-seccondary h-full flex items-center">
              {pleacholder}
            </span>
          )}
        </div>
        <div className="w-1/5 flex justify-end">
          <div
            className={`cursor-pointer relative ${disabled ? "py-3" : ""} `}
            onClick={() => setIsOpenOption(!isOpenOption)}
          >
            {!disabled && (
              <img src="/icons/chevron-down.svg" alt="Chevron-Down" />
            )}
          </div>
        </div>
      </div>
      {isOpenOption && (
        <div
            ref={drpDwnRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute flex flex-col gap-2 w-full top-20  bg-white rounded-lg p-2 border border-grey-extra z-50 max-h-60 overflow-x-auto"
        >
          {options?.length && options.map((item, index) => (
            <div
              key={index}
              className={`
                    flex justify-between w-full px-3 py-2.5 cursor-pointer rounded 
                    ${selectedOption === item.value ? "bg-hover-sidebar" : ""}
                    hover:bg-hover-sidebar relative
                  `}
              onClick={() => {
                onChange(item.value);
                setIsOpenOption(false);
              }}
            >
              <div className="flex flex-row w-full justify-between">
                <span className="text-sm leading-3.5 font-normal ">
                  {item.label}
                </span>

                {selectedOption === item.value && (
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                        fill="#2B2A28"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownComponent;
