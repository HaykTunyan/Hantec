"use client";

import React, {useEffect} from "react";
import {getClientInfo} from "@/api/registration/getClientInfo";
import {useDispatch, useSelector} from "react-redux";
import {setOnGoingApplication} from "@/store/slices/applicationSlice";
import {RootState} from "@/store/store";
import {useRouter} from "next/navigation";

const CheckApplicationStatus = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const onGoingApplication = useSelector((state: RootState) => state.application.onGoingApplication);
    const loginId = useSelector((state: RootState) => state.info.loginId);

    useEffect(() => {
        getClientInfo()
            .then(res => {
                if (res) {
                    const pending = res.data.data.filter((i: any) => i.status === "Pending" && i.appType === "acc-open");
                    const submitted = res.data.data.filter((i: any) => i.status === "Submitted" && i.appType === "acc-open");
                    const checked = res.data.data.filter((i: any) => i.status === "Checked" && i.appType === "acc-open");
                    if (pending.length > 0) {
                        dispatch(setOnGoingApplication(pending[0]));
                    }
                    if (submitted.length > 0) {
                        dispatch(setOnGoingApplication(submitted[0]));
                    }
                    if (checked.lenght > 0) {
                        dispatch(setOnGoingApplication(checked[0]));
                    }
                }
            });
    }, [loginId]);

    useEffect(() => {
        const handleDocumentClick = (event: any) => {
            if (
                onGoingApplication.status === "Pending" ||
                onGoingApplication.status === "Submitted" ||
                onGoingApplication.status === "Checked"
            ) {
                if (!window.location.href.includes("/register/register-live-account")) {
                    router.push("/registration/register-live-account");
                }
            }
        };

        document.addEventListener("click", handleDocumentClick, true);

        return () => {
            document.removeEventListener("click", handleDocumentClick, true);
        };
    }, [onGoingApplication.status, loginId]);

    return (
        <>
        </>
    );
};

export default CheckApplicationStatus;
