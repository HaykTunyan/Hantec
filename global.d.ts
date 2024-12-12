declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        LiveChatWidget: {
            call: (method: string) => void;
        };
    }
}

export {};
