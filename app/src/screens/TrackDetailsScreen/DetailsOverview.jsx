import React from "react";
import PropTypes from "prop-types";
import { Button, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { navigate } from "../../navigationRef";
const styles = StyleSheet.create({
    container: {},
    subContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",

        marginTop: "2%",
    },
    card: {
        width: 120,
        height: 70,
        paddingTop: 10,
        display: "flex",
        alignItems: "center",
    },
    textSecondary: { color: "rgba(255, 255, 255, 0.6)" },
    button: { marginBottom: "5%" },
});
const DetailsOverview = ({
    details: {
        met,
        timeRecorded,
        burnedCalories,
        name,
        dateCreated,
        dateUpdated,
    },
}) => {
    const convertToMinuteString = (totalSeconds) => {
        var m = Math.floor(totalSeconds / 60);
        var s = Math.floor((totalSeconds % 3600) % 60);
        return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.card}>
                    <Text category="h3">{met}</Text>
                    <Text category="s2" style={styles.textSecondary}>
                        MET Level
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text category="h3">{Math.round(burnedCalories, 2)}</Text>
                    <Text category="s2" style={styles.textSecondary}>
                        Cal/min
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text category="h3">
                        {convertToMinuteString(timeRecorded)}
                    </Text>
                    <Text category="s2" style={styles.textSecondary}>
                        Minutes
                    </Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.card}>
                    <Text category="s1" style={{ textAlign: "center" }}>
                        {name}
                    </Text>
                    <Text category="c2" style={styles.textSecondary}>
                        Record Name
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text category="s1">
                        {new Date(dateCreated).toLocaleDateString()}
                    </Text>
                    <Text category="c2" style={styles.textSecondary}>
                        Date Created
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text category="s1">
                        {new Date(dateUpdated).toLocaleDateString()}
                    </Text>
                    <Text category="c2" style={styles.textSecondary}>
                        Date Updated
                    </Text>
                </View>
            </View>
            <Button
                appearance="outline"
                status="success"
                size="small"
                style={styles.button}
                onPress={() => navigate("List")}
            >
                Back To List
            </Button>
        </View>
    );
};
DetailsOverview.propTypes = {
    details: PropTypes.shape({
        id: PropTypes.string,
        userId: PropTypes.string,
        name: PropTypes.string,
        met: PropTypes.number,
        timeRecorded: PropTypes.number,
        burnedCalories: PropTypes.number,
        dateCreated: PropTypes.string,
        dateUpdated: PropTypes.string,
    }),
};

export default DetailsOverview;
