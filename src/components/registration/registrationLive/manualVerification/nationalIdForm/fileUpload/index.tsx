import React, {useRef, useState} from "react";

interface IFileUpload {
    side: string;
    address?: boolean;
    handleSelectFile: (file: File | null) => void;
    error: boolean
}

const FileUpload = ({side, address, handleSelectFile, error}: IFileUpload) => {
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setIsFileSelected(!!file);
        handleSelectFile(file);
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onClick={handleDivClick}
            className={`
        py-5 px-4 w-full flex items-center justify-between gap-2 rounded cursor-pointer
        ${isFileSelected ? "bg-orange-extra-light" : "bg-white"}
        ${error ? "input-error" : ""}
        `}>
            {
                address
                    ?
                    <span className="text-16-16 text-default min-w-[200px] tablet:min-w-0 tablet:max-w-[140px] w-full">{side}</span>
                    : <span className="text-16-16 text-default min-w-[200px] tablet:min-w-0 tablet:max-w-[140px] w-full">{side}</span>
            }
            <div className="flex items-center gap-1.5">
                {
                    isFileSelected &&
                    <span className="text-11 text-grey-seccondary break-all">
                            {selectedFile?.name}
                    </span>
                }
                {
                    isFileSelected
                        ? <svg
                            className="w-6 h-6 object-contain flex-0-0-auto-all"
                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                                  fill="#2B2A28"/>
                        </svg>
                        :
                        <svg
                            className="w-6 h-6 object-contain flex-0-0-auto-all"
                            width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.00098 4V10.9531H8.00098V4H9.00098Z"
                                  fill="#2B2A28"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M8.50008 3.49609L11.5509 6.54695L10.8438 7.25406L8.50008 4.91031L6.15633 7.25406L5.44922 6.54695L8.50008 3.49609Z"
                                  fill="#2B2A28"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M3.1416 9.95312V11.2344C3.1416 11.5162 3.25354 11.7864 3.4528 11.9857C3.65206 12.1849 3.92231 12.2969 4.2041 12.2969H12.7979C13.0796 12.2969 13.3499 12.1849 13.5492 11.9857C13.7484 11.7864 13.8604 11.5162 13.8604 11.2344V9.95312H14.8604V11.2344C14.8604 11.7814 14.6431 12.306 14.2563 12.6928C13.8695 13.0796 13.3449 13.2969 12.7979 13.2969H4.2041C3.65709 13.2969 3.13249 13.0796 2.74569 12.6928C2.3589 12.306 2.1416 11.7814 2.1416 11.2344V9.95312H3.1416Z"
                                  fill="#2B2A28"/>
                        </svg>
                }
                <div className="sr-only">
                    <input
                        type="file"
                        accept=".jpeg,.png,.pdf"
                        className="hidden"
                        id={`file-input-${side}`}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <label htmlFor={`file-input-${side}`} className="cursor-pointer">
                        <span className="sr-only">Choose file</span>
                    </label>
                </div>

            </div>
        </div>
    );
};

export default FileUpload;
