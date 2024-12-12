export const openLiveChat = () => {
    document.querySelector("body")?.classList.remove("bodyOverflowHidden");

    if (window.LiveChatWidget) {
        window.LiveChatWidget.call("maximize");
    }
};
