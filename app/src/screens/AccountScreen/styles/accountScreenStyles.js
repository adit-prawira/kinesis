import { StyleSheet } from "react-native";
export const accountScreenStyles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        padding: "2%",
        backgroundColor: "rgb(45, 48, 65)",
    },
    subContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
    },
    content: {},
    calendar: { marginBottom: "5%", backgroundColor: "rgba(44, 44, 44, 0.3)" },
    avatar: {
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: 2,
        borderRadius: 50,
    },
    image: { width: 100, height: 100, borderWidth: 2, borderRadius: 50 },
    uploadButton: { marginTop: "5%" },
    divider: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: "100%",
        marginBottom: "5%",
        marginTop: "5%",
    },
    profile: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginBottom: "5%",
    },
    profileCard: {
        width: 110,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: { textAlign: "center" },
    welcomeText: { marginTop: "5%", fontSize: 23 },
    textSecondary: { color: "rgba(255, 255, 255, 0.8)" },
});
