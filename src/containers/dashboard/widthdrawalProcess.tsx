import React, { FC } from "react";

const WidthdrawalProcess: FC = () => {
  /**
   * Widthdrawal Process Hooks.
   */

  return (
    <div className="card bg-orange-extra-light p-6 rounded-lg">
      <div className="flex flex-col">
        <div className="mb-2">
          <span className="text-xxs rounded-sm px-1 py-0.5 text-white bg-default">
            {" "}
            Processing{" "}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center gap-4 ">
          <div className="pr-5">
            <p className="text-lg leading-5 font-medium -tracking-normal text-default">
              We&apos;re processing your Withdrawal request
            </p>
          </div>
          <div className="">
            <img src="/icons/Processing-larg.svg" alt="Processing-Larg" />
          </div>
        </div>
        <div className="mt-4" />
        <div className="">
          <p className="text-sm font-normal leading-4 text-grey-seccondary">
            Once accepted you will recive an e-mail to register on the MT5
            platform with the account details that we will provide you via
            email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WidthdrawalProcess;
