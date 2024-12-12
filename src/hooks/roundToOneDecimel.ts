export function roundToOneDecimal(number: number) {
    const divider = 10;
    return Math.round(number * divider) / divider;
}
