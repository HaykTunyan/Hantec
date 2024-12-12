import {
  MouseEvent,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { unverify } from "@/store/slices/verificationSlice";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import SelectedLangages from "./selectedLangages";

interface DropDownProps {
  onClickLangages: (lag: string) => void;
  buttonIsUserProcess: () => void;
}

const DropdownView: React.FC<DropDownProps> = ({
  onClickLangages,
  buttonIsUserProcess,
}) => {
  /**
   * DropdownView Hooks.
   */

  const isVerified = useSelector(
    (state: RootState) => state.verification.isVerified
  );

  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedFlag, setSelectedFlag] = useState<string>("");

  const optionLanguages = [
    { value: "ENG", label: "ENG", image: "/icons/country/england.svg" },
    { value: "FRA", label: "FRA", image: "/icons/country/france.svg" },
    // { value: "vi-VN", label: "VN", image: "/icon/country/england.svg" },
    // { value: "th-TH", label: "TH", image: "/icon/country/england.svg" },
    // { value: "zh-CN", label: "CHI", image: "/icon/country/england.svg" },
    // { value: "zh-HK", label: "HK", image: "/icon/country/england.svg" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelectedLanguages = (event: string) => {
    onClickLangages(event);
    setSelectedFlag(event);
  };

  const handleLogOut = () => {
    dispatch(unverify());

    if (typeof window !== "undefined") {
      // @ts-ignore
      localStorage.removeItem("refreshToken");
      // @ts-ignore
      localStorage.removeItem("accessToken");
      // @ts-ignore
      // localStorage.removeItem("tokenData");
      // @ts-ignore
      localStorage.removeItem("user_id");
      localStorage.removeItem("alreadyRated");
      router.push("/login");
    }
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      if(language === "fr") {
        setSelectedFlag("FRA");
      } else {
        setSelectedFlag("ENG");
      }
    }
  }, []);

  useEffect(() => {
    // @ts-ignore.
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // @ts-ignore.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button onClick={toggleDropdown} type="button">
          <img src="/icons/dots-icon.svg" alt="Dots-Icon" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top absolute bottom-11 -right-[16px] xl:-left-44 xl:right-0 mt-2  w-[304px] xl:w-52 rounded-md  bg-white">
          <div
            className="p-1 flex flex-col w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href={"/profile"}
              className={`px-2 py-[11px] rounded flex items-center ${
                isVerified ? "rounded " : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              <div
                className="text-14 font-normal flex flex-row justify-between items-center  text-gray-700 w-full"
                role="menuitem"
              >
                <span>{t("profile_settings")}</span>
                <img
                  src="/icons/iconSmall/icon-persion-16x16.svg"
                  alt="Icon-Persion-16x16"
                />
              </div>
            </Link>
            <div className="pb-2" />
            <div className="bg-inherit -inset-5pl-">
              <SelectedLangages
                options={optionLanguages}
                selectedOption={selectedFlag}
                onChange={handleSelectedLanguages}
              />
            </div>
            <div className="mt-1" />
            <div className="h-[1px] grey-extra-light " />
            <div className="mt-1" />
            <div className="px-2 py-[11px] hover:bg-gray-100 cursor-pointer rounded"
              onClick={() => handleLogOut()}
            >
              <button
                className="w-full outline-0 flex items-center  text-14 text-gray-700  flex-row justify-between"
                role="menuitem"
              >
                <span> {t("log_out")} </span>
                <img
                  src="/icons/iconSmall/log-out-16x16.svg"
                  alt="Log-Out-16x16"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownView;
