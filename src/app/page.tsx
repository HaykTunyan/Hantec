"use client";

import LoginPage from "./login/page";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    }, [router]);

    return (
        <>
            <LoginPage/>
        </>
    );
}
