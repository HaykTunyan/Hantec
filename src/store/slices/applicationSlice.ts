import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ApplicationState {
    manualOngoing: boolean;
    onGoingApplication: any;
    showAgreement: boolean;

}

const initialState: ApplicationState = {
    manualOngoing: false,
    onGoingApplication: {},
    showAgreement: false,
};

const applicationSlice = createSlice({
        name: "application",
        initialState,
        reducers: {
            setManualOngoing: (state, action: PayloadAction<boolean>) => {
                state.manualOngoing = action.payload;
            },
            setOnGoingApplication: (state, action: PayloadAction<{}>) => {
                state.onGoingApplication = {...action.payload};
            },
            setShowAgreement: (state, action: PayloadAction<boolean>) => {
                state.showAgreement = action.payload;
            }
        },
    })
;

export const {setManualOngoing, setOnGoingApplication, setShowAgreement} = applicationSlice.actions;
export default applicationSlice.reducer;
