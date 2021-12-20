import React, { useContext, useState } from "react";
import { View, ScrollView, SafeAreaView, Platform, Image } from "react-native";
import {
    Button,
    Calendar,
    Avatar,
    Divider,
    Card,
    Text,
} from "@ui-kitten/components";
import { Context as AuthContext } from "../../context/AuthContext";
import { MomentDateService } from "@ui-kitten/moment";
import LoadSpinner from "../../components/LoadSpinner";
import moment from "moment";
import { accountScreenStyles as styles } from "./styles";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
const dateService = new MomentDateService();
const AccountScreen = () => {
    const {
        state: { currentUser },
        signOut,
        uploadProfileImage,
    } = useContext(AuthContext);
    const [date, setDate] = useState(moment);
    const handlePickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.uri) {
            if (Platform.OS === "ios") {
                result = { ...result, uri: result.uri.replace("file://", "") };
            }
            uploadProfileImage(result);
        }
    };

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
                <Button
                    onPress={handlePickImage}
                    appearance="outline"
                    size="small"
                    status="success"
                    style={styles.uploadButton}
                >
                    Upload Profile Picture
                </Button>
                <Text style={styles.welcomeText}>
                    Welcome back {currentUser.username}!
                </Text>
                <Text style={styles.textSecondary}>Here's your summary</Text>
                <Divider style={styles.divider} />

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
