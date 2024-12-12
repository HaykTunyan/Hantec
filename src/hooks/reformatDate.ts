export const formatDates = (dateObjects: Date[]): string => {
    const formattedDates = dateObjects.map(dateObject => {
        const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
        return dateObject.toLocaleDateString("en-GB", options).replace(/,/g, "");
    });
    return formattedDates.join(" - ");
};
