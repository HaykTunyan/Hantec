export const formatTimestampDateOnly = (timestamp: Date): string => {
    const parameter = 2;
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(parameter, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(parameter, "0");

    return `${year}-${month}-${day}`;
};
