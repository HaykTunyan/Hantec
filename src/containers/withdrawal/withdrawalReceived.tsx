import { useRouter } from "next/navigation";
import React from "react";

interface WithdrawalReceivedProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawalReceived: React.FC<WithdrawalReceivedProps> = ({
  isOpen,
  onClose,
}) => {
  /**
   * WithdrawalReceived Hooks.
   */

  const router = useRouter();

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    router.push("/management/withdrawal/withdrawalFinish");
  };

  return (
    <div className=" fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 "
    onClick={onClose}
    >
      <div className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg px-6 py-4  font-aeonik">
          <div className="flex justify-end ">
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <img src="/icons/management/modal-close.svg" alt="Modal-Close" />
            </button>
          </div>
          <div className="mt-6" />
          <div className=" w-full md:mx-auto md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="mt-[16px]" />
              <div className="flex flex-col justify-center tracking-tight">
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default  tracking-tight text-center">
                  Great Job!
                </h4>
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default  tracking-tight text-center">
                  Your withdrawal application is
                </h4>
                <h4 className="font-medium text-xl md:text-2xl leading-6 text-default  tracking-tight text-center">
                  received
                </h4>
              </div>
            </div>
            <div className="mt-8" />
            <div className="flex justify-center px-0 md:px-18">
              <button
                type="button"
                onClick={handleSuccess}
                className="bg-orange py-[14px] px-5 rounded  text-center items-center"
              >
                <span className="font-medium text-sm leading-3.5 text-white">
                  Continue
                </span>
              </button>
            </div>
          </div>
          <div className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default WithdrawalReceived;
