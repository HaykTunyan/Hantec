import React, {useState} from "react";

interface IProfileInfoRow {
    isEditable: boolean,
    name: string,
    initialValue: string,
    isPassword?: boolean,
    data: string[]
}

const ProfileAddressDropDown = ({isEditable, name, initialValue, isPassword, data}: IProfileInfoRow) => {
    const [selectedValue, setSelectedValue] = useState<string>(initialValue);
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);

    const handleToggleDropDown = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDropDownOpened(!isDropDownOpened);
    };

    const handleSelectValue = (e: any, item: string) => {
        e.stopPropagation();
        setSelectedValue(item);
        setIsDropDownOpened(false);
    };

    return (
        <div className="w-full pb-6 border-b">
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col gap-1.5 w-full">
                    <span className="text-14 tracking-wider text-default">{name}</span>
                    <div
                        onClick={(e) => handleToggleDropDown(e)}
                        className={`w-full py-[15px] px-3.5 border ${isDropDownOpened ? "border-default" : "border-grey-extra"} rounded text-16 leading-4 bg-white relative xl:hover:border-default
                        `}
                    >
                        <span className="text-16 text-default">{selectedValue}</span>
                        <svg
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M20 9.06066L12.2198 16.8409L4.43942 9.06066L5.50008 8L12.2197 14.7196L18.9393 8L20 9.06066Z"
                                  fill="#2B2A28"/>
                        </svg>
                        {
                            isDropDownOpened && <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute flex flex-col gap-4 w-full bg-white left-0 top-14 rounded p-2 border border-grey-extra z-[11111111]"
                            >
                                {
                                    data.map((item, index) =>
                                        <div
                                            key={index}
                                            onClick={(e) => handleSelectValue(e, item)}
                                            className={`flex justify-between w-full px-3 py-2.5 cursor-pointer rounded ${selectedValue === item ? "bg-hover-sidebar" : ""}
                                    xl:hover:bg-hover-sidebar relative
                                    `}
                                        >
                                            <span>{item}</span>
                                            {
                                                selectedValue === item && <svg
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 object-contain"
                                                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M17.5 5.88388L7.68313 15.7008L2.03285 10.0506L2.91673 9.16666L7.68312 13.933L16.6161 5L17.5 5.88388Z"
                                                          fill="#2B2A28"/>
                                                </svg>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAddressDropDown;
