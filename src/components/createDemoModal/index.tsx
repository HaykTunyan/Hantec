import React from "react";

interface CreateDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDemoModal: React.FC<CreateDemoModalProps> = ({
  isOpen,
  onClose,
}) => {
  /**
   * ModalCondifrmPassword Hooks.
   */

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div
      className=" fixed inset-0 z-[5000] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50 "
      onClick={onClose}
    >
      <div
        className="relative w-[342px] md:w-full  md:max-w-[676px] max-h-full  "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white  rounded-lg px-6 py-4  font-aeonik">
          <div className="mt-16" />
          <div className="md:mx-auto w-full md:w-[488px]">
            <div className="flex flex-col px-0 md:px-18">
              <div className="flex justify-center items-center">
                <img src="/icons/persion-black.svg" alt="Persion-Black" />
              </div>
              <div className="mt-4" />
              <div className="flex flex-col justify-center">
                <h4 className="font-medium text-xl leading-6 text-default  tracking-tight text-center">
                  Would you like to create a demo
                </h4>
                <div className="mt-1" />
                <h4 className="font-medium text-xl leading-6 text-default  tracking-tight text-center">
                  account?
                </h4>
              </div>
            </div>
            <div className="mt-10" />
            <div className="flex flex-row justify-center">
              <div className="flex w-auto justify-center flex-row gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex justify-center px-5 py-[14px] border border-grey-extra-light rounded"
                >
                  <span className="text-sm font-medium leading-3.5 text-default">
                    Cancel
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex justify-center px-5 py-[14px] bg-default  rounded "
                >
                  <span className="text-sm font-medium leading-3.5 text-white">
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default CreateDemoModal;
