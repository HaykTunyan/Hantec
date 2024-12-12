"use client";

import React, {Fragment, useEffect, useState} from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SliderFeed from "./sliderFeed";
import Selector from "@/components/selector";
import {SocialFeedList} from "@/json";
import {getFBPosts} from "@/api/fbFeed/getFBPosts";
import {useTranslation} from "next-i18next";

export interface FBPosts {
    full_picture: string;
    permalink_url: string;
    message: string;
    created_time: string;
}

export interface IFBInfo {
    id: string;
    name: string;
    picture: any;
    posts: FBPosts[];
}

const SocialFeed = () => {
    const {t} = useTranslation("dashboard");
    const [feedTab, setFeedTab] = useState<string>("1");
    const [FBInfo, setFBInfo] = useState<IFBInfo>({
        id: "",
        name: "",
        picture: "",
        posts: [],
    });

    useEffect(() => {
        getFBPosts("12")
            .then((res: any) => setFBInfo(res));
    }, []);

    const handleChangeFeedTab = (newTab: any) => {
        setFeedTab(newTab);
    };

    const [selectAssets, setSelectAssets] = useState<string>("All");

    return (
        <>
            {FBInfo.posts.length > 0 && (
                <div className="social-feed bg-orange-extra-light px-1">
                    {}
                    <div className="flex flex-row md:justify-between items-center px-6">
                        <div className="flex items-center">
                            <h4 className="font-medium text-lg md:text-xl xl:text-2xl leading-5 tracking-normal">
                                {t("social_feed")}
                            </h4>
                        </div>
                        <div className="flex md:hidden w-[1px] h-4 bg-default opacity-5 mx-3"/>
                        {/* block md:hidden */}
                        <div className="hidden">
                            <Selector
                                options={SocialFeedList}
                                selectedOption={selectAssets}
                                onChange={setSelectAssets}
                                divClassStyle="justify-start"
                            />
                        </div>
                        {/* hidden md:flex flex-row items-center gap-2 */}
                        <div className="hidden">
                            <button
                                type="button"
                                className={`btn rounded px-3 py-2 w-24
                                 ${
                                    feedTab === "1"
                                        ? "bg-default text-white"
                                        : " bg-inherit text-grey-seccondary"
                                } `}
                                onClick={() => handleChangeFeedTab("1")}
                            >
                                <span className="text-xxs font-normal leading-3 tracking-wider">
                                  All
                                </span>
                            </button>
                            <button
                                type="button"
                                className={`btn  rounded px-3 py-2 w-24
                                  ${
                                    feedTab === "2"
                                        ? "bg-default text-white"
                                        : " bg-inherit text-grey-seccondary"
                                }
                                 `}
                                onClick={() => handleChangeFeedTab("2")}
                            >
                                <span className="text-xxs font-normal leading-3 tracking-wider">
                                  Facebook
                                </span>
                            </button>
                            <button
                                type="button"
                                className={`btn rounded px-3 py-2 w-24 
                                 ${
                                    feedTab === "3"
                                        ? "bg-default text-white"
                                        : " bg-inherit text-grey-seccondary"
                                }
                                 `}
                                onClick={() => handleChangeFeedTab("3")}
                            >
                                <span className="text-xxs font-normal leading-3 tracking-wider">
                                  Linkedin
                                </span>
                            </button>
                            <button
                                type="button"
                                className={`btn rounded px-2 py-3 w-24
                                     ${
                                    feedTab === "4"
                                        ? "bg-default text-white"
                                        : " bg-inherit text-grey-seccondary"
                                }
                                     `}
                                onClick={() => handleChangeFeedTab("4")}
                            >
                                <span className="text-xxs font-normal leading-3 tracking-wider">
                                  Youtube
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="pt-8"/>
                    {/* Add the Custome Style for about the SliderFeed Component */}
                    <div className="px-2 flex w-full overflow-y-auto">
                        <SliderFeed FBInfo={FBInfo}/>
                    </div>
                    <div className="pb-16"/>
                </div>
            )}
        </>
    );
};

export default SocialFeed;
