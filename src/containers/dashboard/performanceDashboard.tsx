import React, { FC } from "react";

interface PerformanceDashboardProps {
  toggleSidebarNotifiction: () => void;
}

const PerformanceDashboard: FC<PerformanceDashboardProps> = ({
  toggleSidebarNotifiction,
}) => {
  /**
   *  Performance Hooks.
   */

  const handleUpdateData = () => {};

  return (
    <div className="performance">
      <div className="flex justify-between">
        <div className="">
          <p className="text-default text text-lg font-medium">
            My performance
          </p>
        </div>
        <div className="flex flex-row gap-3 ">
          <div className="flex flex-row items-center">
            <span className="font-normal text-xs text-grey-seccondary">
              {" "}
              Last Updated:{" "}
            </span>
            <span className="font-normal text-xs font-aeonik text-grey-seccondary">
              {"16:52:01"}
            </span>
          </div>
          <button
            type="button"
            className="py-2 px-3 flex items-center border border-default border-opacity-20 "
            onClick={handleUpdateData}
          >
            <span className="hidden xl:block mr-1 text-default  text-base font-medium">
              Refresh Data
            </span>
            <img src="icons/refresh-icon.svg" alt="Refresh-Icon" />
          </button>
          <button
            type="button"
            className="xl:hidden"
            onClick={() => toggleSidebarNotifiction()}
          >
            <img src="icons/notification-icon.svg" alt="Notification-Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
