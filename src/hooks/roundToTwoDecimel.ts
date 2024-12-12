export function roundToTwoDecimel(number: number) {
    const divider = 100;
    return Math.round(number * divider) / divider;
}
