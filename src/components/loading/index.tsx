import React, { FC } from "react";

const LoadingComponent: FC = () => {
  /**
   *  Loading Component Hooks.
   */

  return (
    <div className="h-screen min-h-screen bg-gray-50">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center space-y-4">
          <img
            src="/icons/Logo-Hantec.svg"
            alt="Logo-Hantec"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
