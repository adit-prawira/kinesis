import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Spacer from "./Spacer.jsx";
import { withNavigation } from "react-navigation";
const styles = StyleSheet.create({
    link: {
        textAlign: "center",
        color: "rgb(52, 235, 183)",
    },
});

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

export default withNavigation(NavLink);
