import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Calendar } from "@ui-kitten/components";
import { Context as AuthContext } from "../context/AuthContext";
import { MomentDateService } from "@ui-kitten/moment";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgb(45, 48, 65)",
    },
    button: {
        marginRight: "5%",
        marginLeft: "5%",
    },
    content: {},
    calendar: { marginBottom: "5%", backgroundColor: "rgba(44, 44, 44, 0.3)" },
});
const dateService = new MomentDateService();
const AccountScreen = () => {
    const { signOut } = useContext(AuthContext);
    const [date, setDate] = useState(moment);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Calendar
                    dateService={dateService}
                    date={date}
                    onSelect={(nextDate) => setDate(nextDate)}
                    style={styles.calendar}
                />
                <Button
                    appearance="outline"
                    status="danger"
                    style={styles.button}
                    onPress={signOut}
                >
                    Sign Out
                </Button>
            </View>
        </View>
    );
};

export default AccountScreen;
