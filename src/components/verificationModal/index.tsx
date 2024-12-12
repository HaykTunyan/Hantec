// import { useRouter } from "next/navigation";
import React from "react";

interface VerificationEmailProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  isOpen,
  onClose,
}) => {
  /**
   * VerificationEmail Hooks.
   */
//   const router = useRouter();

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // localStorage.clear();
    // router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={onClose}>
      <div className="relative w-[342px] md:w-full md:max-w-[676px] max-h-full" 
       onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg px-6 py-4 shadow-lg">
          {/* Modal Close Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <img src="/icons/management/modal-close.svg" alt="Close Modal" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="mt-6 flex flex-col items-center">
            <h4 className="font-medium text-xl md:text-2xl text-default tracking-tight text-center">
              Account Opening Process!
            </h4>
            <h4 className="font-medium text-xl md:text-2xl text-default tracking-tight text-center mt-2">
              Please Verify Your Email
            </h4>

            <p className="text-sm md:text-base text-gray-600 text-center mt-4">
              We have sent a verification email to your registered email address. 
              Please check your inbox and follow the instructions to verify your email.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleSuccess}
              className="bg-orange py-[14px] px-5 rounded text-white font-medium text-sm leading-3.5 hover:bg-orange-600 transition"
            >
              Verify Email
            </button>
          </div>

          {/* Extra margin at the bottom */}
          <div className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;
