import { initialState, trackDetailsReducer } from "../TrackDetailsContext";
import { GET_TRACK, CLEAN_UP } from "../utils/actionTypes";
describe("Track details context test suite", () => {
    let state;
    const fetchedData = {
        userId: "619ae25a4c186316c95249a4",
        met: 7.5,
        timeRecorded: 80.47,
        name: "Cycling track",
        burnedCalories: 11.1777859375,
        locations: [
            {
                coords: {
                    latitude: 37.33546053,
                    longitude: -122.04157785,
                    altitude: 0,
                    accuracy: 10,
                    heading: 178.05,
                    speed: 7.69,
                },
                timestamp: 1637999558399.284,
                _id: "61a1e45f4a632a5a9a07c88e",
            },
            {
                coords: {
                    latitude: 37.33533974,
                    longitude: -122.04156726,
                    altitude: 0,
                    accuracy: 10,
                    heading: 176.61,
                    speed: 6.88,
                },
                timestamp: 1637999560399.076,
                _id: "61a1e45f4a632a5a9a07c88f",
            },
            {
                coords: {
                    latitude: 37.33522393,
                    longitude: -122.04155643,
                    altitude: 0,
                    accuracy: 10,
                    heading: 175.78,
                    speed: 6.56,
                },
                timestamp: 1637999562399.104,
                _id: "61a1e45f4a632a5a9a07c890",
            },
        ],
        dateCreated: "2021-11-27T07:55:11.567Z",
        dateUpdated: "2021-11-27T07:55:11.567Z",
        __v: 0,
        id: "61a1e45f4a632a5a9a07c88d",
    };

    it("tests that details will not be null when data is fetched", () => {
        const action = { type: GET_TRACK, payload: fetchedData };
        state = trackDetailsReducer(initialState, action);
        expect(state.details).not.toBeNull();
        expect(state.details.locations.length).toEqual(3);
        expect(state.details.userId).toEqual(fetchedData.userId);
        expect(state.details.met).toEqual(fetchedData.met);
        expect(state.details.timeRecorded).toEqual(fetchedData.timeRecorded);
        expect(state.details.name).toEqual(fetchedData.name);
        expect(state.details.burnedCalories).toEqual(
            fetchedData.burnedCalories
        );
    });
    it("tests that details data will be reset during unmounting", () => {
        const action = { type: CLEAN_UP };
        state = trackDetailsReducer(state, action);
        expect(state.details).toBeNull();
        expect(state).toEqual(initialState);
    });
});
