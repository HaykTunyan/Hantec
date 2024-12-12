import React, {useState} from "react";
import LeaveModal from "@/components/registration/registrationLive/leaveButton/leaveModal";

interface ILeaveButton {
    btnName: string
}

const LeaveButton = ({btnName}: ILeaveButton) => {
    const [isLeaveModalOpened, setIsLeaveModalOpened] = useState<boolean>(false);

    const handleOpenLeaveModal = () => {
        document.querySelector("body")?.classList.add("bodyOverflowHidden");
        setIsLeaveModalOpened(true);
    };

    return (
        <>
            {
                isLeaveModalOpened && <LeaveModal
                    setIsLeaveModalOpened={setIsLeaveModalOpened}
                />
            }
            <div
                onClick={handleOpenLeaveModal}
                className="btnThird"
            >
                {btnName}
            </div>
        </>
    );
};

export default LeaveButton;
