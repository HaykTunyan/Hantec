import React, { useState, useEffect } from "react";

/**
 * @interface ClockProps.
 */

interface ClockProps {
  title: string;
  datediff: number;
}

interface TimeState {
  hours: number | string; 
  minutes: string;
}

const Clock: React.FC<ClockProps> = ({ title, datediff }) => {
  /**
   *  Clock Hooks.
   */

  const numberDeg = 6;
  const numberHourDeg = 30;
  const numberFormatTime = 10; 

  const [time, setTime] = useState<TimeState>({
    hours: "00",
    minutes: "00",
  });

  const formatTime = (timeValue: number): string => 
    // @ts-ignore.
    timeValue < numberFormatTime ? `0${timeValue}` : timeValue.toString();

  const { hours, minutes } = time;

  const minutesStyle: React.CSSProperties = {
    // @ts-ignore
    transform: `rotate(${parseInt(minutes) * numberDeg}deg)`,
  };

  const hoursStyle: React.CSSProperties = {
    // @ts-ignore
    transform: `rotate(${parseInt(hours.toString()) * numberHourDeg}deg)`,
  };

  useEffect(() => {
    const handleDate = () => {
      const date = new Date();
      date.setHours(date.getHours() + datediff);
      const hoursData = formatTime(date.getHours());
      const minutesData = formatTime(date.getMinutes());
      // @ts-ignore
      setTime({ hours :hoursData , minutes : minutesData });
    };
    // @ts-ignore
    const numberClock = 1000;
    const clockInterval = setInterval(handleDate, numberClock);
    handleDate();

    return () => clearInterval(clockInterval);
  }, [datediff]);

  return (
    <div className="clock-card card py-2 px-6 rounded-lg bg-white">
      <div className="flex flex-row justify-between">
        <p className="text-sm font-medium text-default">{title}</p>
        <p className="text-sm font-medium text-default">PM</p>
      </div>
      
      <div className={"clock"}>
        <div className="full-clock" />
        <div className={"analog-clock"}>
          <div className={"dial minutes"} style={minutesStyle} />
          <div className={"dial hours"} style={hoursStyle} />
        </div>
      </div>
      <div className="divider-extra-dark" />
      <div className="flex flex-row justify-between pt-1">
        <p className="text-sm font-normal flex items-center">
          <span className="open-icon"></span>
          <span className="text-grey-seccondary ml-1"> Open in</span>
        </p>
        <p className="text-xs font-normal text-default">
          <span className="text-grey-seccondary">13 : 02</span>
          <span className="text-grey-seccondary">H</span>
        </p>
      </div>
    </div>
  );
};

export default Clock;
