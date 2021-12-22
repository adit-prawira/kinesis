import createDataContext from "./utils/createDataContext";
import trackApi from "../api/trackApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    SIGN_IN,
    AUTH_ERROR,
    CLEAR_ERROR_MESSAGE,
    CLEAN_UP_AUTH_DETAILS,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_HEALTH_PROFILE,
} from "./utils/actionTypes";
import { navigate } from "../navigationRef";
import produce from "immer";
import { NODE_KINESIS_BASE_URL } from "../../route";

export const initialState = {
    token: null,
    errorMessage: "",
    currentUser: null,
};

// authReducer
export const authReducer = produce((state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            state.errorMessage = "";
            state.token = action.payload.token;
            state.currentUser = { ...action.payload.currentUser };
            state.currentUser = {
                ...state.currentUser,
                avatar: `${NODE_KINESIS_BASE_URL}${state.currentUser.avatar}`,
            };
            return state;
        case AUTH_ERROR:
            state.errorMessage = action.payload;
            return state;
        case CLEAR_ERROR_MESSAGE:
            state.errorMessage = "";
            return state;
        case CLEAN_UP_AUTH_DETAILS:
            state = initialState;
            return state;
        case UPLOAD_PROFILE_IMAGE:
            if (state.currentUser) {
                state.currentUser = {
                    ...state.currentUser,
                    avatar: action.payload,
                };
            }
            return state;
        case UPLOAD_HEALTH_PROFILE:
            const { age, mass, height } = action.payload;
            state.currentUser = { ...state.currentUser, age, mass, height };
            return state;
        default:
            return state;
    }
});

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch a sign up action by setting auth token as its payload
 *          otherwise dispatch authentication error action and set error message as its payload
 */
const signUp =
    (dispatch) =>
    /**
     * Will create a request on accessing auth token by giving an existing and valid credentials
     * in the database
     * @param {string} email
     * @param {string} password
     */
    async ({ username, email, password }) => {
        try {
            // API request to sign up
            const res = await trackApi.post("/api/users/signup", {
                username,
                email,
                password,
            });
            const token = res.data.token;

            // If signed up => modify the state that the user is authenticated => store tosken in storage
            await AsyncStorage.setItem("token", token);

            // dispatch to reducer
            dispatch({ type: SIGN_IN, payload: token });
            navigate("List");
        } catch (err) {
            // if fails => reflect an error message

            dispatch({
                type: AUTH_ERROR,
                payload: "Something went wrong during sign up",
            });
        }
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch a sign in action by setting auth token as its payload
 *          otherwise dispatch authentication error action and set error message as its payload
 */
const signIn =
    (dispatch) =>
    /**
     * Will create a request on creating new user profile to the database
     * @param {string} email
     * @param {string} password
     */
    async ({ email, password }) => {
        try {
            // API request to sign in
            const res = await trackApi.post("/api/users/signin", {
                email,
                password,
            });
            const token = res.data.token;

            // If signed in => modify the state that the user is authenticated
            await AsyncStorage.setItem("token", token);

            // if fails => reflect an error message
            dispatch({ type: SIGN_IN, payload: token });
            navigate("List");
        } catch (err) {
            // dispatch to reducer
            dispatch({
                type: AUTH_ERROR,
                payload: "Something went wrong during sign in",
            });
        }
    };

/**
 *
 * @param {Function} dispatch
 * @returns a function that will remove stored auth token from the AsyncStorage and navigate user
 *          to Authentication screen
 */
const signOut = (dispatch) => async () => {
    // API request to sign out, might destroy jwt token
    await AsyncStorage.removeItem("token");
    dispatch({ type: CLEAN_UP_AUTH_DETAILS });
    navigate("SignUp");
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action on to sign in automatically by getting an existing token
 *          in AsyncStorage
 */
const autoLocalSignIn = (dispatch) => async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await trackApi.get("/api/users/currentuser");
        const currentUser = res.data.currentUser;

        if (token) {
            dispatch({ type: SIGN_IN, payload: { token, currentUser } });
            navigate("List");
        } else {
            navigate("SignUp");
        }
    } catch (err) {
        navigate("SignUp");
    }
};

/**
 *
 * @param {Function} dispatch
 * @returns a function that will dispatch an action to reset/remove error messages
 */
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
};

const uploadProfileImage = (dispatch) => async (photo) => {
    const formData = new FormData();
    const localUri = photo.uri;
    const fileName = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(fileName);
    let type = match ? `image/${match[1]}` : `image`;
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    formData.append("image", { uri: localUri, name: fileName, type });
    const res = await trackApi.post(
        "/api/users/account/profile-picture",
        formData,
        config
    );
    const avatarPath = res.data.imagePath;
    dispatch({
        type: UPLOAD_PROFILE_IMAGE,
        payload: `${NODE_KINESIS_BASE_URL}${avatarPath}`,
    });
};

const updateHealthProfile = (dispatch) => async (formValues) => {
    await trackApi.put("/api/users/health-profile/update", formValues);
    dispatch({ type: UPLOAD_HEALTH_PROFILE, payload: formValues });
};

export const { Provider, Context } = createDataContext(
    authReducer, // reducer
    {
        signUp,
        signIn,
        signOut,
        clearErrorMessage,
        autoLocalSignIn,
        uploadProfileImage,
        updateHealthProfile,
    }, // action functions
    initialState // initial state or default value
);
