import React, {useState} from "react";
import Input from "@/components/input";

interface IProfileInfoRow {
    isEditable: boolean,
    name: string,
    value: string,
    isPassword?: boolean
}

const ProfileAddressRowEdit = ({isEditable, name, value, isPassword}: IProfileInfoRow) => {
    const [addressValue, setAddressValue] = useState<string>("");
    const [postCodeValue, setPostCodeValue] = useState<string>("");

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentAddress = e.target.value;

        setAddressValue(currentAddress);
    };

    const handlePostCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentAddress = e.target.value;

        setPostCodeValue(currentAddress);
    };

    return (
        <div className="w-full pb-6 border-b">
            <div className="w-full flex flex-col gap-6 justify-between items-start">
                <div className="flex flex-col gap-1.5 w-full">
                    <span className="text-14 tracking-wider text-default">{name}</span>
                    <Input
                        htmlFor={""}
                        currentValue={addressValue}
                        handleValueChange={handleAddressChange}
                        type={"text"}
                        placeholder={""}
                    />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <span className="text-14 tracking-wider text-default">Post code</span>
                    <Input
                        htmlFor={""}
                        currentValue={postCodeValue}
                        handleValueChange={handlePostCodeChange}
                        type={"text"}
                        placeholder={""}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileAddressRowEdit;
