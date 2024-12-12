import React, { FC } from "react";
import { useTranslation } from "next-i18next";

const BankCard: FC = () => {
  /**
   * BanckCard Hooks.
   */

  const { t } = useTranslation("withdrawal");

  return (
    <div className="bank-card">
        <div className="card px-3 py-1 bg-inherit rounded-lg">
            <div className="">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="text-base">
                        {t("bank_account")} 
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BankCard;
