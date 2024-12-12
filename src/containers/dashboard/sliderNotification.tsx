import React from "react";
import Link from "next/link";

const SliderNotification = () => {
    const bannerOrigin = "https://25db-nov.paperform.co/?utm_source=newclientcenterbanner&utm_medium=HF-AFEN-25db&utm_campaign=HF-AFEN";

    return (
        <Link href={bannerOrigin} target={"_blank"}
              className="max-w-[324px] flex flex-col rounded-8">
            <div className={"p-8 bg-black w-full  flex flex-col gap-8 rounded-t-8"}>
                <div className={"flex flex-col gap-2"}>
                    <span className={"text-white text-24 font-medium"}>25% Deposit Bonus</span>
                    <span className={"text-16 text-white80"}>Campaign date: 16/11/2024-20/12/2024</span>
                    <span className={"text-12_14 text-white80 opacity-70"}>
                        The deposit bonus will help you to trade and generate profits which is withdrawable after
                        reaching the required lot volume conditions.
                    </span>
                    <div className={"flex items-center gap-1.5"}>
                        <span className={"text-14 text-white60 font-medium"}>Know more</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3436_6601)">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M17.4985 5.49848L6.49555 5.49848L6.49555 6.99848L14.9378 6.99848L4.90445 17.0318L5.96511 18.0925L15.9985 8.05912L15.9985 16.5015L17.4985 16.5015L17.4985 5.49848Z"
                                      fill="#2B2A28"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_3436_6601">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                </div>
            </div>
            <div className={"bannerImage rounded-b-8"}></div>
        </Link>
    );
};

export default SliderNotification;
