"use client";

import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const WithdrawalCard: FC = () => {
  /**
   * WithdrawalCard Hooks.
   *
   */

  const router = useRouter();

  useEffect(() => {
    const currentPath = "/dashboard";
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set("processing", "withdrawal");

    const newUrl = `${currentPath}?${queryParams.toString()}`;

    // router.replace(newUrl);
    const timeForWorking = 5000;

    const timer = setTimeout(() => {
      router.replace(newUrl);
      // @ts-ignore
    }, timeForWorking);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="pt-10 pb-20 md:pt-20 px-4 w-full md:w-[602px] md:mx-auto">
      <div className="flex flex-col">
        <div className="">
          <h2 className="text-xl md:text-[32px] font-medium leading-9 text-default">
            Withdrawal
          </h2>
        </div>
        <div className="mt-6" />
        <div className="card bg-orange-extra-light p-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-xxs rounded-sm px-1 py-0.5 text-white bg-default">
                {" "}
                Processing{" "}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center ">
              <div className="">
                <p className="text-lg leading-5 font-normal text-default">
                  We&apos;re processing your Withdrawal request
                </p>
              </div>
              <div className="">
                <img src="/icons/processing.svg" alt="Processing" />
              </div>
            </div>
            <div className="mt-8" />
            <div className="flex flex-row justify-between py-3 border-b border-grey-seccondary ">
              <div className="">
                <p className="text-sm font-normal leading-4 text-grey-seccondary">
                  Withdrawal Number
                </p>
              </div>
              <div className="">
                <p className="text-sm font-normal leading-4 text-default">
                  XXX12345
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between py-3 border-b border-grey-seccondary ">
              <div className="">
                <p className="text-sm font-normal leading-4 text-grey-seccondary">
                  Requested Date
                </p>
              </div>
              <div className="">
                <p className="text-sm font-normal leading-4 text-default">
                  January 1, 2024
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between py-3 border-b border-grey-seccondary ">
              <div className="">
                <p className="text-sm font-normal leading-4 text-grey-seccondary">
                  Estimated Processing Time
                </p>
              </div>
              <div className="">
                <p className="text-sm font-normal leading-4 text-default">
                  1 day | 3 h
                </p>
              </div>
            </div>
            <div className="mt-8" />
            <div className="">
              <p className="text-sm font-normal leading-4 text-grey-seccondary">
                Please note that until your current withdrawal request is
                processed, you will not be able to request a new withdrawal. We
                appreciate your patience and understanding.
              </p>
            </div>
            <div className="mt-8" />
            <div className="flex">
              <button
                type="button"
                className="flex flex-row items-center px-1.5 py-3 border border-default border-opacity-5 "
              >
                <img
                  src="/icons/iconSmall/info-circle.svg"
                  alt="Info-Circle"
                  className="mr-0.5"
                />
                <span className="text-default font-medium text-xs leading-3 rounded-sm">
                  Contact support{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalCard;
