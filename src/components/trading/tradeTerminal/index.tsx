"use client";

import React, {useEffect, useRef, useState} from "react";
import {useDemo} from "@/context/DemoContext";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const TradeTerminal = () => {
    const router = useRouter();
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [src, setSrc] = useState<string>("");
    const {demo} = useDemo();
    const overView = useSelector((state: RootState) => state.overView);

    useEffect(() => {
        if (demo && overView.demoAccounts.length > 0 && overView.allow) {
            setSrc("https://mt5webdemo.hantecvanuatu.com:9522/terminal");
        } else if (!demo && overView.liveAccounts.length && overView.allow) {
            setSrc("https://mt5web.hantecfinancial.com:9521/terminal?mode=connect");
        } else if (overView.allow) {
            router.push("/dashboard");
        }
    }, [demo, overView]);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${isFullScreen ? "fullscreen" : ""}`}
            style={{width: "100%", height: isFullScreen ? "100vh" : "calc(100vh - 78.5px)"}}
        >
            <iframe
                src={src}
                className="w-full h-full"
                style={{height: "100%", width: "100%"}}
            ></iframe>
            <svg
                onClick={toggleFullScreen}
                className="absolute bottom-7 right-6 cursor-pointer mobile:hidden"
                width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="36" height="36" rx="18" fill="#FF3F32"/>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.502 15.5039L10.502 10.501L15.5049 10.5009L15.5049 12.0009L12.002 12.001L12.002 15.5039L10.502 15.5039Z"
                    fill="white"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5049 25.0078L10.5019 25.0078L10.5019 20.0048L12.0019 20.0048L12.0019 23.5078L15.5049 23.5078L15.5049 25.0078Z"
                    fill="white"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.0049 10.5L25.0078 10.5L25.0079 15.503L23.5079 15.503L23.5078 12L20.0049 12L20.0049 10.5Z"
                    fill="white"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.0078 20.0039L25.0078 25.0068L20.0048 25.0069L20.0048 23.5069L23.5078 23.5068L23.5078 20.0039L25.0078 20.0039Z"
                    fill="white"
                />
            </svg>
        </div>
    );
};

export default TradeTerminal;
