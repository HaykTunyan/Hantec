// ClockCard.tsx
import { useEffect, useRef } from "react";
import moment from "moment-timezone";
import "@/styles/clock.scss"

interface ClockCardProps {
  city: string;
  timezone: string;
  format24Hour: boolean;
}

const ClockCard: React.FC<ClockCardProps> = ({
  city,
  timezone,
  format24Hour,
}) => {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);

  const size = 100;
  const angleMain = ((0 - 90) * Math.PI) / 180;

  useEffect(() => {
    const ctx1 = canvasRef1.current?.getContext("2d");
    const ctx2 = canvasRef2.current?.getContext("2d");

    if (ctx1 && ctx2 && canvasRef1.current && canvasRef2.current) {
      const drawClock = () => {
        const now = moment().tz(timezone);
        const hours = now.hours();
        const minutes = now.minutes();
        const seconds = now.seconds();

        ctx1.clearRect(0, 0, size, size);
        ctx2.clearRect(0, 0, size, size);

        drawClockBackground(ctx1);
        drawClockHands(ctx2, hours, minutes);
        updateClockText(now);
      };

      const drawClockBackground = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#e7e7e7";
        ctx.setLineDash([2, 2]);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      const drawClockHands = (
        ctx: CanvasRenderingContext2D,
        hours: number,
        minutes: number
      ) => {
        // Hours
        const hourAngle =
          angleMain +
          (hours % 12) * (Math.PI / 6) +
          (minutes / 60) * (Math.PI / 6);

        const minuteAngle = angleMain + (minutes * Math.PI) / 30;

        //   drawHand(ctx, hourAngle, 88, '#ffffff', '#292929', 0.3 );

        // drawHand(ctx, minuteAngle, 88,'#ffffff', '#292929' , 0.2);

        // Old version

        const widthHand = 1.53;
        const redRatioHand = 0.3
        drawHand(ctx, hourAngle, 40,  "#292929", widthHand, redRatioHand);
        drawHand(ctx, minuteAngle, 60, "#292929", widthHand, redRatioHand);
      };

      const drawHand = (
        ctx: CanvasRenderingContext2D,
        angle: number,
        length: number,
        colorOne: string,
        // colorTwo: String,
        width: number,
        redRatio: number 
      ) => {

        ctx.beginPath();
        ctx.moveTo(size / 2, size / 2);
        ctx.lineTo(
          size / 2 + Math.cos(angle) * length,
          size / 2 + Math.sin(angle) * length
        );
        ctx.strokeStyle = colorOne;
        ctx.lineWidth = width;
        ctx.stroke();  
    
      };

      const updateClockText = (now: moment.Moment) => {
        if (timeRef.current) {
          timeRef.current.innerText = now.format(
            format24Hour ? "HH:mm" : "hh:mm A"
          );
        }
      };

      drawClock();
      const intervalId = setInterval(drawClock, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timezone, format24Hour]);

  return (
    <div className="clock-card card py-2 px-6 bg-white rounded-lg h-56 w-full">
      <div className="flex flex-row items-center justify-between mt-2 text-sm text-gray-800">
        <p className="text-sm font-normal leading-3.5 text-default">
          {city}
        </p>
        <p className="text-sm font-normal leading-3.5 text-default">PM</p>
      </div>
      <div className="relative w-full h-[150px] px-8 py-4 mt-1 flex items-center justify-center">
        <canvas
          ref={canvasRef1}
          width={size}
          height={size}
          className="absolute w-24 h-24"
        ></canvas>
        <canvas
          ref={canvasRef2}
          width={size}
          height={size}
          className="absolute w-24 h-24"
        ></canvas>
        <div className="w-3 h-3 bg-green rounded-full absolute bottom-[68px]" />
      </div>

      <div className="divider-extra-dark" />
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm font-normal flex items-center">
          <span className="open-icon"></span>
          <span className="text-grey-seccondary ml-1 text-xxs leading-3 ">
            {" "}
            Open in
          </span>
        </p>
        <p className="text-xs font-normal text-default">
          <span
            className="text-grey-seccondary text-xxs leading-3"
            ref={timeRef}
          >
            --:--
          </span>
        </p>
      </div>
    </div>
  );
};

export default ClockCard;
