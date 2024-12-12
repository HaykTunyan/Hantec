export const secondsToDays = (seconds: number): number => {
    const secondsInADay = 86400;

    return Math.round(seconds / secondsInADay);
};
