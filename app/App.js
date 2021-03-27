import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import CreateTrackScreen from "./src/screens/CreateTrackScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Signup: SignUpScreen,
        Signin: SignInScreen,
    }),
    mainFlow: createBottomTabNavigator({
        trackListFlow: createStackNavigator({
            List: TrackListScreen,
            Detail: TrackDetailScreen,
        }),
        Create: CreateTrackScreen,
        Account: AccountScreen,
    }),
});

export default createAppContainer(switchNavigator);
