import createDataContext from "./createDataContext";
import {
    ADD_CURRENT_LOCATION,
    ADD_LOCATION,
    START_RECORDING,
    STOP_RECORDING,
    UPDATE_TRACK_NAME,
    RESET_TRACK_FORM,
    SET_MET_LEVEL,
} from "./actionTypes";
import produce from "immer";

const initialState = {
    name: "",
    met: 0,
    timeRecorded: 0,
    recording: false,
    locations: [],
    currentLocation: null,
};

const locationReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ADD_CURRENT_LOCATION:
            state.currentLocation = action.payload;
            return state;
        case START_RECORDING:
            state.recording = true;
            return state;
        case STOP_RECORDING:
            const totalTimeSeconds = action.payload;
            state.recording = false;
            state.timeRecorded = totalTimeSeconds;
            return state;
        case ADD_LOCATION:
            state.locations.push(action.payload);
            return state;
        case SET_MET_LEVEL:
            state.met = action.payload;
            return state;
        case UPDATE_TRACK_NAME:
            state.name = action.payload;
            return state;
        case RESET_TRACK_FORM:
            state = { ...initialState, currentLocation: state.currentLocation };
            return state;
        default:
            return state;
    }
});

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action that will toggle recording piece of state to true
 */
const startRecording = (dispatch) => () => {
    dispatch({ type: START_RECORDING });
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action that will toggle recording piece of state to false
 */
const stopRecording =
    (dispatch) =>
    /**
     *
     * @param {string} time a time string with form of hours:minutes:seconds
     */
    (time) => {
        const timeString = time.split(":");
        const hoursToSeconds = timeString[0] * 60 * 60;
        const minutesToSeconds = timeString[1] * 60;
        const seconds = timeString[2] * 1;
        const totalSeconds = hoursToSeconds + minutesToSeconds + seconds;

        dispatch({ type: STOP_RECORDING, payload: totalSeconds });
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action to updated the name of the track
 */
const updateTrackName =
    (dispatch) =>
    /**
     *
     * @param {string} updatedName
     */
    (updatedName) => {
        dispatch({ type: UPDATE_TRACK_NAME, payload: updatedName });
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action to add current location, and also add a location
 *          to the locations array, if the user is currently recording
 */
const addLocation =
    (dispatch) =>
    /**
     *
     * @param {object} location
     * @param {boolean} recording
     */
    (location, recording) => {
        dispatch({ type: ADD_CURRENT_LOCATION, payload: location });

        if (recording) {
            // if the user is currently recording => we want to add whatever location that is being
            // passed to the locations array
            dispatch({ type: ADD_LOCATION, payload: location });
        }
    };

const setMetLevel = (dispatch) => async (metLevel) => {
    dispatch({ type: SET_MET_LEVEL, payload: metLevel });
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action to reset the track create form
 */
const resetTrackForm = (dispatch) => () => {
    dispatch({ type: RESET_TRACK_FORM });
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    {
        startRecording,
        stopRecording,
        addLocation,
        updateTrackName,
        resetTrackForm,
        setMetLevel,
    },
    initialState
);
