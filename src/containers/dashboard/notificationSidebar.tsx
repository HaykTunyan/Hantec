import React, { FC } from "react";
import SliderNotification from "./sliderNotification";

/**
 *  @interface RightSidebarProps
 */

interface RightSidebarProps {
  toggleSidebarNotifiction: () => void;
  setIsOpenNotifiction: (isOpen: boolean) => void;
  isOpenNotifiction: boolean;
}

const RightSidebar: FC<RightSidebarProps> = ({
  toggleSidebarNotifiction,
  setIsOpenNotifiction,
  isOpenNotifiction,
}) => {
  /**
   *  RightSidebar Notifiaction Hooks.
   */

  // const [isTab, setIsTab] = useState<number>(0);
  // const [showTheInfo, setShowTheInfo] = useState<boolean>(false);
  //
  // const handleChangeTab = (newTab: number) => {
  //   setIsTab(newTab);
  // };
  //
  // const handleReadNotification = (newShow: boolean) => {
  //   setShowTheInfo(newShow);
  // };

  return (
    <aside
      className={`transition-box2 z-[3000] fixed top-0 right-0  w-full max-w-[324px] mobile:max-w-full overflow-y-auto h-screen transition-transform transform  ${
        // isOpenNotifiction ? "translate-x-0" : "translate-x-full"
         isOpenNotifiction ? "open2" : "close2"
      } bg-gray-50 `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col items-center gap-8">
        <div className="flex flex-row justify-end self-end">
          <div className="">
            <button
              type="button"
              className="p-[14px] border rounded border-gray-300 "
              onClick={() => setIsOpenNotifiction(false)}
            >
              <img src="/icons/iconSmall/close-x-16x16.svg" alt="Close-X" />
            </button>
          </div>
        </div>
        <SliderNotification />
      {/*  <div className="pt-10" />*/}
      {/*  {showTheInfo ? (*/}
      {/*    <div className="flex flex-row justify-between px-10">*/}
      {/*      <div className="flex flex-row items-center gap-4">*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className="border-none cursor-pointer"*/}
      {/*          onClick={() => handleReadNotification(false)}*/}
      {/*        >*/}
      {/*          <img src="/icons/arrow-left.svg" alt="Arrow-Left" />*/}
      {/*        </button>*/}
      {/*        <h3 className="text-default text-2xl font-medium leading-6">*/}
      {/*          {" "}*/}
      {/*          Title Notification{" "}*/}
      {/*        </h3>*/}
      {/*      </div>*/}
      {/*      <div className="flex align-bottom pt-3">*/}
      {/*        <p className="text-xs font-normal tracking-wider text-grey-seccondary">*/}
      {/*          {" "}*/}
      {/*          3 min ago{" "}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div className="flex flex-row justify-between px-10">*/}
      {/*      <div className="">*/}
      {/*        <h3 className="text-default text-2xl font-medium">*/}
      {/*          {" "}*/}
      {/*          Notification{" "}*/}
      {/*        </h3>*/}
      {/*      </div>*/}
      {/*      <div className="flex">*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className=""*/}
      {/*          onClick={() => handleReadNotification(true)}*/}
      {/*        >*/}
      {/*          <span className="text-xs font-medium text-default ">*/}
      {/*            {" "}*/}
      {/*            Mark as Read{" "}*/}
      {/*          </span>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}

      {/*  /!* Item Notification *!/*/}
      {/*  {showTheInfo ? (*/}
      {/*    <div className="px-10">*/}
      {/*      <div className="pt-14">*/}
      {/*        <p className="text-justify font-aeonik text-sm leading-4 font-normal tracking-wide text-grey-seccondary">*/}
      {/*          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
      {/*          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut*/}
      {/*          enim ad minim veniam, quis nostrud exercitation ullamco laboris*/}
      {/*          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor*/}
      {/*          in reprehenderit in voluptate velit esse cillum dolore eu fugiat*/}
      {/*          nulla pariatur. Excepteur sint occaecat cupidatat non proident,*/}
      {/*          sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div className="px-5 md:px-10 pt-10">*/}
      {/*      <div className="">*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className={`px-5 py-2.5 w-2/4 text-xs font-normal leading-3 tracking-merge rounded-sm  ${*/}
      {/*            isTab === 0*/}
      {/*              ? "bg-default text-white"*/}
      {/*              : "bg-gray-50 text-default border border-default border-opacity-10 "*/}
      {/*          }  `}*/}
      {/*          onClick={() => handleChangeTab(0)}*/}
      {/*        >*/}
      {/*          All*/}
      {/*        </button>*/}
      {/*        <button*/}
      {/*          type="button"*/}
      {/*          className={`px-5 py-2.5 w-2/4 text-xs font-normal  leading-3 tracking-merge rounded-sm ${*/}
      {/*            isTab === 1*/}
      {/*              ? "bg-default text-white"*/}
      {/*              : "bg-gray-50 text-default border border-default border-opacity-10"*/}
      {/*          }    `}*/}
      {/*          onClick={() => handleChangeTab(1)}*/}
      {/*        >*/}
      {/*          <span>Unread </span>*/}
      {/*          <span className="ml-1">(2)</span>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*      /!* Tabs *!/*/}
      {/*      <div className="">*/}
      {/*        {isTab === 0 ? (*/}
      {/*          <div className="p-1">*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer"*/}
      {/*              onClick={() => handleReadNotification(true)}*/}
      {/*            >*/}
      {/*              <div className="py-4 flex flex-col">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                  <span className="open-icon"></span>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer">*/}
      {/*              <div className="py-4 flex flex-col ">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer">*/}
      {/*              <div className="py-4 flex flex-col">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer">*/}
      {/*              <div className="py-4 flex flex-col ">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer"*/}
      {/*              onClick={() => handleReadNotification(true)}*/}
      {/*            >*/}
      {/*              <div className="py-4 flex flex-col ">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                  <span className="open-icon"></span>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <div className="p-1">*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer"*/}
      {/*              onClick={() => handleReadNotification(true)}*/}
      {/*            >*/}
      {/*              <div className="py-4 flex flex-col ">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                  <span className="open-icon"></span>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="card-notifiction pt-5 group hover:cursor-pointer"*/}
      {/*              onClick={() => handleReadNotification(true)}*/}
      {/*            >*/}
      {/*              <div className="py-4 flex flex-col ">*/}
      {/*                <div className="flex flex-row justify-between items-center">*/}
      {/*                  <p className="text-sm font-medium leading-3.5 tracking-wider text-default">*/}
      {/*                    Title Notification{" "}*/}
      {/*                  </p>*/}
      {/*                  <span className="open-icon"></span>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    Lorem ipsum dolor sit amet, consectetur adipiscing*/}
      {/*                    elit...*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-2">*/}
      {/*                  <p className="text-sm font-normal text-grey-seccondary">*/}
      {/*                    {" "}*/}
      {/*                    3 min ago{" "}*/}
      {/*                  </p>*/}
      {/*                </div>*/}
      {/*                <div className="mt-4">*/}
      {/*                  <div className="w-full h-[1px] bg-grey-extra-light group-hover:bg-inherit" />*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  /!* Tabs Notification *!/*/}
      </div>
      <div className="pt-4 px-4 w-full">

      </div>
    </aside>
  );
};

export default RightSidebar;
