export function getCurrentTime() {
    const parameter = 2;
    const now = new Date();
    const hours = String(now.getHours()).padStart(parameter, "0");
    const minutes = String(now.getMinutes()).padStart(parameter, "0");
    const seconds = String(now.getSeconds()).padStart(parameter, "0");

    return `${hours}:${minutes}:${seconds}`;
}
