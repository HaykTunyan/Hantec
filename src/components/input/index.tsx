import React, {ChangeEvent} from "react";

interface IInput {
    htmlFor: string
    currentValue: string,
    handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type: string,
    placeholder: string,
    errorMsg?: boolean
}

const Input = ({currentValue, handleValueChange, type, placeholder, htmlFor, errorMsg}: IInput) => {
    return (
        <input
            id={htmlFor}
            className={`input ${errorMsg ? "input-error" : ""}`}
            placeholder={placeholder}
            type={type}
            value={currentValue}
            onChange={(e) => handleValueChange(e)}
        />
    );
};

export default Input;
