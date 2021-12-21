import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Platform, Image } from "react-native";
import { Button, Calendar, Divider, Card, Text } from "@ui-kitten/components";
import { Context as AuthContext } from "../../context/AuthContext";
import { MomentDateService } from "@ui-kitten/moment";
import LoadSpinner from "../../components/LoadSpinner";
import moment from "moment";
import { accountScreenStyles as styles } from "./styles";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import NumericInput from "react-native-numeric-input";
const initialHealthForm = {
    mass: 0,
    height: 0,
    age: 0,
};
const dateService = new MomentDateService();
const numericInputProps = {
    totalWidth: 110,
    totalHeight: 70,
    step: 1,
    valueType: "real",
    rounded: true,
    textColor: "white",
    inputStyle: { fontSize: 15 },
    iconStyle: { color: "white", fontSize: 20 },
    rightButtonBackgroundColor: "#232a43",
    leftButtonBackgroundColor: "#2c2f39",
    minValue: 0,
    borderColor: "#171b2e",
};
const AccountScreen = () => {
    const {
        state: { currentUser },
        signOut,
        uploadProfileImage,
        updateHealthProfile,
    } = useContext(AuthContext);
    const [date, setDate] = useState(moment);
    const [health, setHealth] = useState(initialHealthForm);
    const [isEditing, setIsEditing] = useState(false);
    const handleToggleEditing = () => setIsEditing(!isEditing);
    const handlePickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            presentationStyle: 0,
        });

        if (!result.cancelled && result.uri) {
            if (Platform.OS === "ios") {
                result = { ...result, uri: result.uri.replace("file://", "") };
            }
            uploadProfileImage(result);
        }
    };
    const handleChangeAge = (value) => setHealth({ ...health, age: value });
    const handleChangeMass = (value) => setHealth({ ...health, mass: value });
    const handleChangeHeight = (value) =>
        setHealth({ ...health, height: value });
    const handleUpdate = async () => {
        await updateHealthProfile(health);
        setIsEditing(false);
    };
    useEffect(() => {
        let mounted = true;
        if (currentUser && mounted) {
            setHealth({
                ...health,
                mass: currentUser.mass,
                height: currentUser.height,
                age: currentUser.age,
            });
            return () => {
                mounted = false;
            };
        }
    }, [currentUser]);
    const renderPreview = () => (
        <View style={styles.profile}>
            <Card style={styles.profileCard}>
                <Text category="h4" style={styles.text}>
                    {currentUser.age}
                </Text>
                <Text category="c1" style={styles.text}>
                    Age
                </Text>
            </Card>
            <Card style={styles.profileCard}>
                <Text category="h4" style={styles.text}>
                    {currentUser.mass}
                </Text>
                <Text category="c1" style={styles.text}>
                    Kg
                </Text>
            </Card>
            <Card style={styles.profileCard}>
                <Text category="h4" style={styles.text}>
                    {currentUser.height}
                </Text>
                <Text category="c1" style={styles.text}>
                    cm
                </Text>
            </Card>
        </View>
    );
    const renderForm = () => (
        <View style={styles.profile}>
            <View style={styles.profileCard}>
                <NumericInput
                    value={health.age}
                    onChange={handleChangeAge}
                    {...numericInputProps}
                />
                <Text category="c1" style={styles.text}>
                    Age
                </Text>
            </View>
            <View style={styles.profileCard}>
                <NumericInput
                    value={health.mass}
                    onChange={handleChangeMass}
                    {...numericInputProps}
                />
                <Text category="c1" style={styles.text}>
                    Kg
                </Text>
            </View>
            <View style={styles.profileCard}>
                <NumericInput
                    value={health.height}
                    onChange={handleChangeHeight}
                    {...numericInputProps}
                />
                <Text category="c1" style={styles.text}>
                    cm
                </Text>
            </View>
        </View>
    );
    return currentUser ? (
        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.avatar}>
                    <Image
                        style={styles.image}
                        source={
                            currentUser.avatar
                                ? { uri: currentUser.avatar }
                                : require("../../../assets/favicon.png")
                        }
                    />
                </View>

                <Text style={styles.welcomeText}>
                    Welcome back {currentUser.username}!
                </Text>
                <Text style={styles.textSecondary}>Here's your summary</Text>
                <Button
                    onPress={handlePickImage}
                    appearance="outline"
                    size="small"
                    status="success"
                    style={styles.uploadButton}
                >
                    Upload Profile Picture
                </Button>
                <Divider style={styles.divider} />
                {isEditing ? renderForm() : renderPreview()}
                <View style={styles.buttonContainer}>
                    {isEditing ? (
                        <>
                            <Button
                                onPress={handleUpdate}
                                appearance="outline"
                                size="small"
                                status="success"
                                style={{ marginBottom: "2%" }}
                            >
                                Submit
                            </Button>
                            <Button
                                onPress={handleToggleEditing}
                                appearance="outline"
                                size="small"
                                status="danger"
                                style={{ marginBottom: "2%" }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            onPress={handleToggleEditing}
                            appearance="outline"
                            size="small"
                            status="primary"
                            style={{ marginBottom: "2%" }}
                        >
                            Edit Health Profile
                        </Button>
                    )}
                </View>
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
        </ScrollView>
    ) : (
        <SafeAreaView style={styles.container}>
            <LoadSpinner />
        </SafeAreaView>
    );
};

export default AccountScreen;
