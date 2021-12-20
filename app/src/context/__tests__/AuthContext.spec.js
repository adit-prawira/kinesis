import { NODE_KINESIS_BASE_URL } from "../../../route";
import { initialState, authReducer } from "../AuthContext";
import { SIGN_IN, CLEAN_UP_AUTH_DETAILS } from "../utils/actionTypes";

describe("Track details context test suite", () => {
    let state;
    const sampleToken = {
        token: "heloIWUHFOIADJNFOIQWEUFHWEIOUGBVWOI8",
    };
    const currentUser = {
        username: "goodStudent",
        email: "student@student.com",
        age: 22,
        height: 165,
        mass: 63.5,
        dateCreated: "2021-11-22T00:20:42.655Z",
        dateUpdated: "2021-12-18T10:23:06.951Z",
        id: "619ae25a4c186316c95249a4",
        avatar: "",
    };

    it("tests that details will not be null when data is fetched", () => {
        const action = {
            type: SIGN_IN,
            payload: { token: sampleToken.token, currentUser },
        };
        state = authReducer(initialState, action);
        expect(state.currentUser).not.toBeNull();
        expect(state.currentUser.username).toEqual(currentUser.username);
        expect(state.currentUser.email).toEqual(currentUser.email);
        expect(state.currentUser.age).toEqual(currentUser.age);
        expect(state.currentUser.height).toEqual(currentUser.height);
        expect(state.currentUser.mass).toEqual(currentUser.mass);
        expect(state.currentUser.dateCreated).toEqual(currentUser.dateCreated);
        expect(state.currentUser.dateUpdated).toEqual(currentUser.dateUpdated);
        expect(state.currentUser.id).toEqual(currentUser.id);
        expect(state.currentUser.avatar).toEqual(
            `${NODE_KINESIS_BASE_URL}${currentUser.avatar}`
        );
    });

    it("tests that token is not empty", () => {
        expect(state.token).not.toBeNull();
        expect(state.token).toEqual(sampleToken.token);
    });

    it("tests that auth details will be reset during when signing out", () => {
        const action = { type: CLEAN_UP_AUTH_DETAILS };
        state = authReducer(state, action);
        expect(state.token).toBeNull();
        expect(state.currentUser).toBeNull();
        expect(state).toEqual(initialState);
    });
});
