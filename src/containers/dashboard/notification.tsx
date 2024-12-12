"use client";

import React from "react";

/**
 * interface NotificationProps.
 */
interface NotificationProps {
  toggleSidebarNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({ toggleSidebarNotification }) => {
  /**
   * Notification Hooks.
   */

  return (
    <div className="bg-sidebar px-2 py-4 rounded-lg">
      <div className="px-2">
        <p className="text-lg font-medium text-default">Notification</p>
      </div>
      <div className="pt-1" />
      <div className="pt-4 pl-4 pr-4 flex flex-col  rounded group hover:bg-white hover:bg-opacity-60 hover:cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-medium">Title Notification</p>
          <span className="open-icon"></span>
        </div>
        <div className="mt-2">
          <p className="text-sm font-normal text-grey-seccondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </div>
        <div className="mt-2">
          <p className="text-xxs font-normal text-grey-seccondary">3 min ago</p>
        </div>
        <div className="mt-4">
          <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />
        </div>
      </div>
      <div className="pt-4 pl-4 pr-4 flex flex-col  rounded group hover:bg-white hover:bg-opacity-60 hover:cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm font-medium">Title Notification</p>
          <span className="open-icon"></span>
        </div>
        <div className="mt-2">
          <p className="text-sm font-normal text-grey-seccondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </div>
        <div className="mt-2">
          <p className="text-xxs font-normal text-grey-seccondary">3 min ago</p>
        </div>
        <div className="mt-4">
          <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />
        </div>
      </div>
  
      <div className="flex justify-center items-center p-3">
        <div className="">
          <button
            type="button"
            className="flex flex-row items-center p-1 gap-1.5"
            onClick={() => toggleSidebarNotification()}
          >
            <span className="text-sm font-medium text-grey-seccondary">
              View All
            </span>
            <span>
              <img src="icons/arrow-right.svg" alt="Arrow-Right" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
