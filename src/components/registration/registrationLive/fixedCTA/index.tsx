import React from "react";

interface IFixedCTA {
    setIsModalOpened?: (x: boolean) => void;
}

const FixedCTA = ({setIsModalOpened}: IFixedCTA) => {

    const handleOpenModal = () => {
        if (setIsModalOpened) {
            setIsModalOpened(true);
        }
    };

    return (
        <div>
            <div
                className="py-2 px-4 flex items-center justify-end border-t border-grey-extra-light fixed bottom-0 right-0 w-[58%] bg-grey-exrta-ligth-extra">
                <button
                    onClick={handleOpenModal}
                    className="btnPrim"
                >
                    Let’s start
                </button>
            </div>
        </div>
    );
};

export default FixedCTA;
