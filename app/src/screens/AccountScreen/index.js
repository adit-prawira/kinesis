import React, { useContext, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
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
import { launchImageLibrary } from "react-native-image-picker";
const dateService = new MomentDateService();
const AccountScreen = () => {
    const {
        state: { currentUser },
        signOut,
    } = useContext(AuthContext);
    const [date, setDate] = useState(moment);
    const handlePickImage = async () => {
        const result = await launchImageLibrary();
        console.log(result);
    };
    return currentUser ? (
        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.avatar}>
                    <Avatar
                        size="large"
                        source={require("../../../assets/favicon.png")}
                    />
                </View>
                <Button onPress={handlePickImage}>upload image</Button>
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
