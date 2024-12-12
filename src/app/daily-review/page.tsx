"use client";

import React, { FC, useEffect, useState } from "react";
import Layout from "../dashboard/layout";
import { getDailyReviewToken } from "@/api/dailyReview/getDailyReviewToken";
import { useTranslation } from "next-i18next";

const DailyReview: FC = () => {
  /**
   *  Daily Review
   */

  const { t } = useTranslation("dashboard");

  const [iframeLinkMissingPart, setIframeLinkMissingPart] =
    useState<string>("");

  useEffect(() => {
    getDailyReviewToken().then((res) => {
      if (res) {
        setIframeLinkMissingPart(encodeURIComponent(res.data.data));
      }
    });
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 flex flex-col gap-8">
        <div className="px-10 sm:px-6 lg:px-8 flex justify-start">
          <h1 className="text-32-24 text-default font-medium">
            {t("daily_review")}
          </h1>
        </div>
        <div className="px-6 mobile:px-1.5 tablet:pb-[136px]">
          {iframeLinkMissingPart && (
            <iframe
              title="tradingcentral"
              id="tradingcentral"
              allowFullScreen={true}
              frameBorder="0"
              scrolling="no"
              width="100%"
              height="1500"
              style={{ borderRadius: "10px" }}
              src={`https://site.recognia.com/hantecfinancial/serve.shtml?tkn=${iframeLinkMissingPart}`}
            ></iframe>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DailyReview;
