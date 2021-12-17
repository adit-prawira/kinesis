import produce from "immer";
import createDataContext from "./createDataContext";
import trackApi from "../api/trackApi";
import {
    GET_TRACK,
    UPDATE_TRACK,
    DELETE_TRACK,
    ALERT_ERROR,
} from "./actionTypes";
const initialState = { details: null, error: null, success: null };
const trackDetailsReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case GET_TRACK:
            state.details = action.payload;
            return state;
        case UPDATE_TRACK:
            return state;
        case DELETE_TRACK:
            return state;
        case ALERT_ERROR:
            return state;
    }
});

const getTrack = (dispatch) => async (trackId) => {
    try {
        const res = await trackApi.get(`/tracks/${trackId}`);
        dispatch({ type: GET_TRACK, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

const updateTrack = (dispatch) => async (updatedFormValues) => {};
const deleteTrack = (dispatch) => async (trackId) => {};
export const { Provider, Context } = createDataContext(
    trackDetailsReducer,
    {
        getTrack,
        updateTrack,
        deleteTrack,
    },
    initialState
);
