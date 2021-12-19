import { initialState, trackReducer } from "../TrackContext";
import { GET_TRACKS, CREATE_TRACK } from "../utils/actionTypes";

describe("Track context test suite", () => {
    let state;
    const tracks = [
        {
            dateCreated: "2021-11-27T07:55:11.567Z",
            dateUpdated: "2021-11-27T07:55:11.567Z",
            id: "61a1e45f4a632a5a9a07c88d",
            met: 7.5,
            name: "Cycling track",
        },
        {
            dateCreated: "2021-12-18T04:39:25.636Z",
            dateUpdated: "2021-12-18T04:39:25.636Z",
            id: "61bd65fd4e6879e64ea2fad0",
            met: 8,
            name: "Morning exercieses",
        },
    ];
    let totalTracks = tracks.length;
    it("tests that tracks list in state will not be null when being fetched", () => {
        const action = { type: GET_TRACKS, payload: tracks };
        state = trackReducer(initialState, action);
        expect(state.tracks).not.toBeNull();
        expect(state.tracks.length).toEqual(totalTracks);
    });
    it("tests that tracks list will have additional data when a new record is created", () => {
        const newTrack = {
            dateCreated: "2021-12-18T08:13:08.841Z",
            dateUpdated: "2021-12-18T08:13:08.842Z",
            id: "61bd98144e6879e64ea332b0",
            met: 7.5,
            name: "Long journey",
        };
        const action = { type: CREATE_TRACK, payload: newTrack };
        state = trackReducer(state, action);
        const dataFound = state.tracks.find(({ id }) => id === newTrack.id);
        expect(state.tracks.length).toEqual(++totalTracks);
        expect(dataFound).not.toBeUndefined();
        expect(dataFound.dateCreated).toEqual(newTrack.dateCreated);
        expect(dataFound.dateUpdated).toEqual(newTrack.dateUpdated);
        expect(dataFound.id).toEqual(newTrack.id);
        expect(dataFound.met).toEqual(newTrack.met);
        expect(dataFound.name).toEqual(newTrack.name);
    });
});
