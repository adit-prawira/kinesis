import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { Provider as TrackDetailsProvider } from "./src/context/TrackDetailsContext";
import AccountScreen from "./src/screens/AccountScreen.jsx";
import SignInScreen from "./src/screens/SignInScreen.jsx";
import SignUpScreen from "./src/screens/SignUpScreen.jsx";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import TrackListScreen from "./src/screens/TrackListScreen.jsx";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen.jsx";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import { View, StatusBar, Platform, SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AppStatusBar = ({ backgroundColor, ...props }) => (
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
);

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
    }),
    mainFlow: createMaterialTopTabNavigator(
        {
            Tracks: {
                screen: createStackNavigator({
                    List: TrackListScreen,
                    Detail: TrackDetailsScreen,
                }),
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <View>
                            <MaterialIcons
                                name="directions-run"
                                color={tintColor}
                                size={24}
                            />
                        </View>
                    ),
                },
            },
            Create: {
                screen: TrackCreateScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <View>
                            <MaterialIcons
                                name="add-location-alt"
                                color={tintColor}
                                size={24}
                            />
                        </View>
                    ),
                },
            },
            Account: {
                screen: AccountScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                        <View>
                            <MaterialIcons
                                name="account-box"
                                color={tintColor}
                                size={24}
                            />
                        </View>
                    ),
                },
            },
        },
        {
            tabBarOptions: {
                activeTintColor: "white",

                showIcon: true,
                style: {
                    backgroundColor: "rgb(33, 34, 48)",
                },
            },
        }
    ),
});

const App = createAppContainer(switchNavigator);

const MainApp = () => {
    return (
        <TrackProvider>
            <TrackDetailsProvider>
                <LocationProvider>
                    <AuthProvider>
                        <ApplicationProvider {...eva} theme={eva.dark}>
                            <SafeAreaView
                                style={{
                                    flex: 1,
                                    backgroundColor: "rgb(33, 34, 48)",
                                }}
                            >
                                <AppStatusBar barStyle="light-content" />
                                <View
                                    style={{
                                        flex: 1,
                                        paddingTop:
                                            Platform.OS === "android"
                                                ? StatusBar.currentHeight
                                                : 0,
                                    }}
                                >
                                    <App
                                        ref={(navigator) => {
                                            setNavigator(navigator);
                                        }}
                                    />
                                </View>
                            </SafeAreaView>
                        </ApplicationProvider>
                    </AuthProvider>
                </LocationProvider>
            </TrackDetailsProvider>
        </TrackProvider>
    );
};

export default MainApp;
