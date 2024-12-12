import React, { FC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import "@/styles/historyPicker.scss";
import { useTranslation } from "next-i18next";

const singleLetterWeekdays = {
  ...enGB,
  localize: {
    ...enGB.localize,
    day: (n: any) => ["S", "M", "T", "W", "T", "F", "S"][n],
  },
};

registerLocale("singleLetter", singleLetterWeekdays);

interface DatePickerHistoryProps {
  handleSearch: () => void;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const DatePickerHistory: FC<DatePickerHistoryProps> = ({
  handleSearch,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {

  /**
   * DatePickerHistory
   */

  const { t } = useTranslation("founding");

  return (
    <div className="flex flex-row items-center gap-2 history-picker">
      <div>
        <DatePicker
          locale="singleLetter"
          selected={startDate as string | any | undefined}
          onChange={(date: Date | null) =>
            setStartDate(date as string | Date | any)
          }
          selectsStart
          startDate={startDate as Date | null | any | string}
          endDate={endDate as Date | null | any | string}
          showIcon
          className="left-date"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-header">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <svg
                  className="h-4 w-4 object-contain cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Caret-Down">
                    <path
                      id="Union"
                      d="M9.99504 12.994L11 12.994L11 3.00391L9.99504 3.00391L5 7.99895L9.99504 12.994Z"
                      fill="#2B2A28"
                    />
                  </g>
                </svg>
              </button>
              <span className={"text-18 font-[700]"}>
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Caret-Down">
                    <path
                      id="Union"
                      d="M6.00495 3.00601L5 3.00601L5 12.9961L6.00496 12.9961L11 8.00105L6.00495 3.00601Z"
                      fill="#2B2A28"
                    />
                  </g>
                </svg>
              </button>
            </div>
          )}
          icon={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7083 3.95964V5.0013H13.9583V3.95964H15.8333C16.4086 3.95964 16.875 4.42601 16.875 5.0013V7.70964H3.125V5.0013C3.125 4.42601 3.59137 3.95964 4.16667 3.95964H6.04167V5.0013H7.29167V3.95964H12.7083ZM3.125 8.95964V16.668C3.125 17.2433 3.59137 17.7096 4.16667 17.7096H15.8333C16.4086 17.7096 16.875 17.2433 16.875 16.668V8.95964H3.125ZM4.16667 2.70964H6.04167V1.66797H7.29167V2.70964H12.7083V1.66797H13.9583V2.70964H15.8333C17.099 2.70964 18.125 3.73565 18.125 5.0013V16.668C18.125 17.9336 17.099 18.9596 15.8333 18.9596H4.16667C2.90101 18.9596 1.875 17.9336 1.875 16.668V5.0013C1.875 3.73565 2.90101 2.70964 4.16667 2.70964Z"
                  fill="#2B2A28"
                />
              </svg>
            </span>
          }
        />
      </div>
      <div>
        <span className="text-sm font-normal  leading-3.5 text-grey-seccondary mobile:hidden">
          To
        </span>
        <span className="hidden text-sm font-normal  leading-3.5 text-grey-seccondary mobile:block">
          /
        </span>
      </div>
      <div className={"second"}>
        <DatePicker
          locale="singleLetter"
          selected={endDate as string | any | undefined}
          onChange={(date: Date | null) =>
            setEndDate(date as string | Date | any)
          }
          selectsEnd
          startDate={startDate as Date | null | any | string}
          endDate={endDate as Date | null | any | string}
          minDate={(startDate as string | Date | any) ?? undefined}
          showIcon
          className=""
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-header">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <svg
                  className="h-4 w-4 object-contain cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Caret-Down">
                    <path
                      id="Union"
                      d="M9.99504 12.994L11 12.994L11 3.00391L9.99504 3.00391L5 7.99895L9.99504 12.994Z"
                      fill="#2B2A28"
                    />
                  </g>
                </svg>
              </button>
              <span className={"text-18 font-[700]"}>
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Caret-Down">
                    <path
                      id="Union"
                      d="M6.00495 3.00601L5 3.00601L5 12.9961L6.00496 12.9961L11 8.00105L6.00495 3.00601Z"
                      fill="#2B2A28"
                    />
                  </g>
                </svg>
              </button>
            </div>
          )}
          icon={
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7083 3.95964V5.0013H13.9583V3.95964H15.8333C16.4086 3.95964 16.875 4.42601 16.875 5.0013V7.70964H3.125V5.0013C3.125 4.42601 3.59137 3.95964 4.16667 3.95964H6.04167V5.0013H7.29167V3.95964H12.7083ZM3.125 8.95964V16.668C3.125 17.2433 3.59137 17.7096 4.16667 17.7096H15.8333C16.4086 17.7096 16.875 17.2433 16.875 16.668V8.95964H3.125ZM4.16667 2.70964H6.04167V1.66797H7.29167V2.70964H12.7083V1.66797H13.9583V2.70964H15.8333C17.099 2.70964 18.125 3.73565 18.125 5.0013V16.668C18.125 17.9336 17.099 18.9596 15.8333 18.9596H4.16667C2.90101 18.9596 1.875 17.9336 1.875 16.668V5.0013C1.875 3.73565 2.90101 2.70964 4.16667 2.70964Z"
                  fill="#2B2A28"
                />
              </svg>
            </span>
          }
        />
      </div>
      <button
        className="btnPrim flex-0-0-auto-all"
        onClick={() => handleSearch()}
      >
        <img
          src="/icons/management/search-md.svg"
          alt="search-md"
          className="w-4 h-4 object-contain"
        />
        <span className="hidden md:block text-sm leading-3.5 font-medium text-white">
          {t("search")}
        </span>
      </button>
    </div>
  );
};

export default DatePickerHistory;
