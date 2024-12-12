export const useSeparateDecimal = (value: number) => {
    if (!value) {
        return;
    }
    const separator = 2;
    const valueStr = value.toFixed(separator);

    const parts = valueStr.split(".");

    const integerPart = parts[0];

    const decimalPart = `.${parts[1]}`;

    return {
        integerPart,
        decimalPart
    };
};
