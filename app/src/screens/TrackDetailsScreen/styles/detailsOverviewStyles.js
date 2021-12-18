import { StyleSheet } from "react-native";
export const detailsOverviewStyles = StyleSheet.create({
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
