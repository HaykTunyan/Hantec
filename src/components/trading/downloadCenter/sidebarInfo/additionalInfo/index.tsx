import React from "react";
import AdditionalInfoRow from "@/components/trading/downloadCenter/sidebarInfo/additionalInfo/additionalInfoRow";
import Button from "@/components/button";

interface IAdditionalInfo {
    title: string;
    description?: string;
    instructions: string[],
    button?: boolean
}

const AdditionalInfo = ({title, description, instructions, button}: IAdditionalInfo) => {
    return (
        <div className="flex flex-col gap-10 rounded-[8px] bg-orange-extra-light py-12 px-6">
            <div className="flex flex-col gap-1">
                <span className="text-24 font-medium text-default">{title}</span>
                {
                    description && <span className="text-14 tracking-wider text-grey-seccondary">{description}</span>
                }
            </div>
            <div className="flex flex-col">
                {
                    instructions.map((instruction, index) =>
                        <AdditionalInfoRow
                            key={index}
                            instruction={instruction}
                            index={index}
                            length={instructions.length}
                            button={button}
                        />
                    )
                }
            </div>
            {
                button && <div className="flex self-end">
                    <Button
                        className={"btnPrim"}
                        btnName={"Login to Trading Central"}
                        href={"/trading/trade-terminal"}
                        target={"_blank"}
                        backGround={"#FF3F32"}
                    />
                </div>
            }
        </div>
    );
};

export default AdditionalInfo;
