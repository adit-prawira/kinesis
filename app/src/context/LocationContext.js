import createDataContext from "./createDataContext";
import { ADD_CURRENT_LOCATION } from "./types";
import produce from "immer";

const initialState = { recording: false, locations: [], currentLocation: null };

const locationReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ADD_CURRENT_LOCATION:
            state.currentLocation = action.payload;
            return state;
        default:
            return state;
    }
});
const startRecording = (dispatch) => () => {};
const stopRecording = (dispatch) => () => {};

const addLocation = (dispatch) => (location) => {
    dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    {
        startRecording,
        stopRecording,
        addLocation,
    },
    initialState
);
