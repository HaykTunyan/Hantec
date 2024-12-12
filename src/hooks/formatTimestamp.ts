export const formatTimestamp = (timestamp?: number): string => {
    if (!timestamp || isNaN(timestamp)) {
        return "N/A"; // Return a default value if the timestamp is invalid
    }

    const parameter = 2;
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(parameter, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(parameter, "0");
    const hours = String(date.getHours()).padStart(parameter, "0");
    const minutes = String(date.getMinutes()).padStart(parameter, "0");

    return `${year}-${month}-${day} | ${hours}:${minutes}`;
};
