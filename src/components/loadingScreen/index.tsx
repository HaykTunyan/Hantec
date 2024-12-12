import React from "react";

interface ILoadingScreen {
    isLoading: boolean
}

const LoadingScreen = ({isLoading}: ILoadingScreen) => {
    return (
        <>
            {
                isLoading &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-modal-backdrop z-[111111111111111] flex items-center justify-center mobile:px-4">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default LoadingScreen;
