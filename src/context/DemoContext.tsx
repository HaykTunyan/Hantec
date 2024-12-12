"use client";

import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface DemoContextProps {
    demo: boolean;
    toggleDemo: () => void;
    handleSetToDemo: () => void;
    handleSetToLive: () => void;
}

const DemoContext = createContext<DemoContextProps | undefined>(undefined);

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error("useDemo must be used within a DemoProvider");
    }
    return context;
};

export const DemoProvider = ({children}: { children: ReactNode }) => {
    const [demo, setDemo] = useState(false);

    useEffect(() => {
        const storedDemo = localStorage.getItem("demo");
        if (storedDemo) {
            setDemo(JSON.parse(storedDemo));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("demo", JSON.stringify(demo));
    }, [demo]);

    const toggleDemo = () => {
        setDemo((prev) => !prev);
    };

    const handleSetToDemo = () => {
        setDemo(true);
    };

    const handleSetToLive = () => {
        setDemo(false);
    };

    return (
        <DemoContext.Provider value={{demo, toggleDemo, handleSetToDemo, handleSetToLive}}>
            {children}
        </DemoContext.Provider>
    );
};
