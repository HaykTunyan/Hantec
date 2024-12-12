import React, { FC, useState, useEffect } from "react";

interface InputFormProps {
  htmlFor?: string;
  labelTitle?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  block?: boolean;
  maxValue?: number | string;
  minValue?: number | string;
  maxValueLength?: number | string;
  disabled?: boolean;
  changeValue: (newValue: string) => void;
}

const InputForm: FC<InputFormProps> = ({
  htmlFor = "",
  labelTitle = "",
  placeholder = "",
  type = "text",
  value = "",
  block = false,
  maxValue,
  minValue,
  maxValueLength,
  disabled = false,
  changeValue,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Convert value and maxValue to numbers for comparison, if they exist
    const numericValue = parseFloat(value || "");
    const numericMaxValue =
      typeof maxValue === "string" ? parseFloat(maxValue) : maxValue;

    // @ts-ignore
    if (
        // @ts-ignore
      !isNaN(numericValue) &&
        // @ts-ignore
      !isNaN(numericMaxValue) &&
        // @ts-ignore
      numericValue >= numericMaxValue
    ) {
      setErrorMessage(`Value should be less than ${maxValue}`);
    } else {
      setErrorMessage(null);
    }
  }, [value, maxValue]);

  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className={`
          block font-normal text-sm leading-3.5 text-default
          ${block ? "text-label-title" : "text-default"}
        `}
      >
        {labelTitle}
      </label>
      <div className="mt-1" />
      <input
        type={type}
        id={htmlFor}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        max={maxValue}
        onChange={(e) => changeValue(e.target.value)}
        className={`
          px-3.5 py-3 block w-full text-grey-seccondary rounded border border-grey-extra-light focus-visible:border-grey-extra-light focus:border-grey-extra-light active:border-grey-extra-light outline-none
          ${block ? "bg-hover-sidebar" : ""}  placeholder-grey-seccondary
        `}
      />

      {!disabled && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}

      {block && (
        <div className="absolute bottom-6 left-4">
          <img
            src="/icons/management/Input-block-line.svg"
            alt="Input-block-line"
          />
        </div>
      )}
    </div>
  );
};

export default InputForm;
