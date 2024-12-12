import React, { FC, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface Option {
  value: string;
  label: string;
}

interface SelectorProps {
  options: Option[];
  selectedOption: string;
  onChange: (value: string) => void;
  classStyle?: string;
  divClassStyle?: string;
  type? : string;
}

const Selector: FC<SelectorProps> = ({
  options,
  selectedOption,
  onChange,
  classStyle,
  divClassStyle,
  type,
}) => {
  /**
   * Selector Hooks.
   */

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const drpDwnRef = useRef(null);
  const drpDwnRefExclude = useRef(null);
  useOnClickOutside(drpDwnRef, setIsOpenOption, drpDwnRefExclude);

  return (
    <div className="relative w-full flex justify-center"
    ref={drpDwnRefExclude}
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 xl:w-40 `}>
          <div className={`text-base flex  font-medium  leading-4 text-default cursor-pointer  ${divClassStyle?.length ? divClassStyle : "w-32 justify-end" }`}   onClick={() => setIsOpenOption(!isOpenOption)}>
            <span className={`pl-0 md:pl-2 ${classStyle}`}>{type === "account" &&  "#"}{selectedOption}</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setIsOpenOption(!isOpenOption)}
          >
            {isOpenOption ? (
              <img src="/icons/iconSmall/Caret-Up.svg" alt="Caret-Up" />
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
                onClick={(e) => e.stopPropagation()}
                ref={drpDwnRef}
                className={`absolute flex flex-col gap-2 w-[160px] bg-white -left-24 top-8 rounded-[8px] p-1 border border-grey-extra max-h-60 overflow-x-auto z-[11111111]`}
              >
                {options.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex justify-between w-full px-3 py-2.5 cursor-pointer rounded 
                      ${selectedOption === item.label ? "bg-hover-sidebar" : ""}
                      hover:bg-hover-sidebar relative
                    `}
                    onClick={() => {
                      onChange(item.value);
                      setIsOpenOption(false);
                    }}
                  >
                    <span>{item.label}</span>
                    {selectedOption === item.label && (
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
      </div>
    </div>
  );
};

export default Selector;
