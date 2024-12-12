"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RightSidebar from "@/containers/dashboard/notificationSidebar";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import AddNewLiveAccountModal from "@/components/trading/addNewLiveAccountModal";
import DemoTurnModal from "@/components/demoTurnModal";
import DemoCreatedModal from "@/components/demoCreatedModal";
import ManualProcessModal from "@/components/manualProcessModal";
import CreateDemoModal from "@/components/createDemoModal";
import AccountCreateLimitReached from "@/components/accountCreateLimitReached";
import MiddleProcessModal from "@/components/middleProcessModal";
import { getClientInfo } from "@/api/registration/getClientInfo";

const Layout = ({ children }: any) => {
  /**
   *  Layout Hooks From Dashboard.
   */

  const router = useRouter();
  const { demo } = useDemo();
  const [accountType, setAccountType] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotifiction, setIsOpenNotifiction] = useState(false);
  const [isUserProcess, setIsUserProcess] = useState<boolean>(false);
  const [ismiddleProcess, setIsMiddleProcess] = useState<boolean>(false);
  const [isUserCheck, setIsUserCheck] = useState<boolean>(false);
  const [statusUser, setStatusUser] = useState<any>(null);
  const [isDemoAccountOpened, setIsDemoAccountOpened] =
    useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSidebarNotifiction = () =>
    setIsOpenNotifiction(!isOpenNotifiction);
  const [makeNewDemo, setMakeNewDemo] = useState<boolean>(false);

  const [isDemoTurnModalOpened, setIsDemoTurnModalOpened] =
    useState<boolean>(false);
  const [maxLimitReachedModal, setMaxLimitReachedModal] =
    useState<boolean>(false);

  const [isAddLiveAccountModalOpened, setIsAddLiveAccountModalOpened] =
    useState<boolean>(false);

  const handledOpenProcessModal = () => {

    if (statusUser?.status === "Pending" && statusUser.appType === "acc-open") {
      // setIsUserProcess(true);
      setIsMiddleProcess(true);
    } else if (
      (statusUser?.status === "Submitted" &&
        statusUser.appType === "acc-open") ||
      (statusUser?.status === "Checked" && statusUser.appType === "acc-open")
    ) {
      setIsUserCheck(true);
    } else if (statusUser?.status === "Checked" && statusUser.appType === "acc-open") {
      setIsUserCheck(true);
    }  else if (
      statusUser?.status === "Submitted" &&
      statusUser.appType === "acc-open"
    ) {
      setIsUserCheck(true);

    } else {
    }
  };

  const handleCountunesRegistration = () => {
    setIsMiddleProcess(false);
    router.push("/registration/register-live-account");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    getClientInfo().then((res) => {
      if (res) {
        const pending = res.data.data.filter(
          (i: any) => i.status === "Pending" && i.appType === "acc-open"
        );

        const submitted = res.data.data.filter(
          (i: any) => i.status === "Submitted" && i.appType === "acc-open"
        );

        const checked = res.data.data.filter(
          (i: any) => i.status === "Checked" && i.appType === "acc-open"
        );

        if (pending) {
        }

        if (submitted || checked) {
        }

        const status = res.data.data;
        setStatusUser(status[0]);
      }
    });
  }, [router]);

  useEffect(() => {
    if (statusUser?.status === "Pending" && statusUser.appType === "acc-open") {
      // setIsUserProcess(true);
    }
    if (
      (statusUser?.status === "Submitted" &&
        statusUser.appType === "acc-open") ||
      (statusUser?.status === "Checked" && statusUser.appType === "acc-open")
    ) {
      // setIsUserCheck(true);
    }
  }, [statusUser]);

  useEffect(() => {
    const refreshPage = async () => {
      try {
        await router.refresh();
      } catch (error) {}
    };

    refreshPage();
  }, [router]);

  return (
    <div className={` ${isOpen ? "" : ""} `}>
      {makeNewDemo && (
        <CreateDemoModal
          isOpen={makeNewDemo}
          onClose={() => setMakeNewDemo(false)}
        />
      )}
      {isDemoTurnModalOpened && (
        <DemoTurnModal setIsDemoTurnModalOpened={setIsDemoTurnModalOpened} />
      )}
      {isAddLiveAccountModalOpened && (
        <AddNewLiveAccountModal
          setIsEditModalOpened={setIsAddLiveAccountModalOpened}
        />
      )}
      {isUserProcess && !demo && (
        <ManualProcessModal
          isOpen={isUserProcess}
          onClose={() => setIsUserProcess(false)}
          type="proccess"
        />
      )}

      {isUserCheck && !demo && (
        <ManualProcessModal
          isOpen={isUserCheck}
          onClose={() => setIsUserCheck(false)}
          type="checked"
        />
      )}

      {ismiddleProcess && (
        <MiddleProcessModal
          isOpen={ismiddleProcess}
          onClose={() => setIsMiddleProcess(false)}
          onContinue={handleCountunesRegistration}
        />
      )}

      {isDemoAccountOpened && <DemoCreatedModal />}

      {maxLimitReachedModal && (
        <AccountCreateLimitReached
          setMaxLimitReachedModal={setMaxLimitReachedModal}
          type={accountType}
        />
      )}

      <div>
        <aside
          id="default-sidebar"
          className={`fixed  top-0 right-0 xl:right-full  h-screen transition-transform z-[3000] xl:left-0 xl:translate-x-0 transform duration-1000 ease-in-out  ${
            isOpen ? "translate-x-0" : "xl:-translate-x-full translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <Sidebar
            processIsUserProcess={handledOpenProcessModal}
            setIsDemoAccountOpened={setIsDemoAccountOpened}
            setAccountType={setAccountType}
            setMaxLimitReachedModal={setMaxLimitReachedModal}
            isMakeNewDemo={makeNewDemo}
            isSetMakeNewDemo={setMakeNewDemo}
            setIsDemoTurnModalOpened={setIsDemoTurnModalOpened}
            setIsAddLiveAccountModalOpened={setIsAddLiveAccountModalOpened}
            toggleSidebar={toggleSidebar}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            
          />
        </aside>
        {isOpen && (
          <div
            className="bg-black bg-opacity-60  z-[2500] w-full h-full absolute"
            onClick={toggleSidebar}
          />
        )}

        <div className="xl:ml-56 relative ">
          <div className="fixed-desktop">
            <Header
              processIsUserProcess={handledOpenProcessModal}
              sidebarOpen={isOpen}
              setSidebarOpen={toggleSidebar}
              notificationOpen={isOpenNotifiction}
              setNotificationOpen={toggleSidebarNotifiction}
              clientStatus={statusUser}
            />
          </div>
          <main className="flex-1 min-h-svh bg-grey-exrta-ligth-extra main-fixed">
            {children}
          </main>
          <RightSidebar
            toggleSidebarNotifiction={toggleSidebarNotifiction}
            setIsOpenNotifiction={setIsOpenNotifiction}
            isOpenNotifiction={isOpenNotifiction}
          />
          <div className="mt-auto">
            <Footer processIsUserProcess={handledOpenProcessModal} 
            clientStatus={statusUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
