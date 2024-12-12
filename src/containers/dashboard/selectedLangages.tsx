import React, { FC, useState } from "react";

interface Option {
  value: string;
  label: string;
  image: string;
}

/**
 *  @interface SelectProps.
 */
interface SelectProps {
  options: Option[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const SelectedLangages: FC<SelectProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  /**
   * Select User Hooks.
   */

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  return (
    <div className="relative w-full flex">
      <div className="flex items-center justify-between w-full hover:bg-gray-100 cursor-pointer px-2 py-[11px] rounded"
      onClick={() => setIsOpenOption(!isOpenOption)}
      >
        <div className="flex items-center flex-row gap-1">
          <span>
            {" "}
            {selectedOption === "ENG" && (<img src="/icons/country/england.svg" alt="England" />) }
            {selectedOption === "FRA" && (<img src="/icons/country/france.svg" alt="France" />) }
          </span>
          <span className="text-sm leading-3.5 font-normal ">
            {selectedOption}
          </span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={() => setIsOpenOption(!isOpenOption)}
        >
          <img
            src="/icons/iconSmall/chevron-down-16x16.svg"
            alt="Chevron-Down-16x16"
          />
          {isOpenOption && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute flex flex-col gap-2 w-[304px] xl:w-52  -right-[16px] xl:-left-44 xl:right-0  bg-white top-8 rounded-lg p-1 border border-grey-extra z-50"
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
                    onChange(item.label);
                    setIsOpenOption(false);
                  }}
                >
                  <div className="flex flex-row gap-1">
                    <span>
                      {" "}
                      <img src={item.image} alt="england" />{" "}
                    </span>
                    <span className="text-sm leading-3.5 font-normal ">
                      {item.label}
                    </span>
                  </div>

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
  );
};

export default SelectedLangages;
