"use client";

import React, {useEffect, useState} from "react";
import {getUserOverview} from "@/services";
import {setAllow, setDemoAccounts, setLiveAccounts} from "@/store/slices/overView";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "@/components/loadingScreen";
import {RootState} from "@/store/store";
import {usePathname} from "next/navigation";
import {useDemo} from "@/context/DemoContext";

const OverView = () => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const overView = useSelector((state: RootState) => state.overView);
    const {handleSetToLive} = useDemo();

    useEffect(() => {
        if (typeof window !== undefined) {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                return;
            }

            if (overView?.liveAccounts.length === 0 && overView?.demoAccounts.length === 0) {
                setIsProcessing(true);
            }

            getUserOverview()
                .then(res => {
                    if (res) {
                        dispatch(setLiveAccounts(res?.data?.liveAccounts || []));
                        dispatch(setDemoAccounts(res?.data?.demoAccounts || []));
                        dispatch(setAllow(true));
                    }

                    setIsProcessing(false);
                })
                .catch(() => {
                    setIsProcessing(false);
                    dispatch(setLiveAccounts([]));
                    dispatch(setDemoAccounts([]));
                    dispatch(setAllow(true));
                    handleSetToLive();
                });
        }
    }, [pathName]);

    return (
        <>
            <LoadingScreen isLoading={isProcessing}/>
        </>
    );
};

export default OverView;
