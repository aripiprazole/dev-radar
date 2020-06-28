import React, { useEffect, useState } from "react";

import MapView, { Marker, Callout } from "react-native-maps";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import { connect, disconnect, subscribe } from "../services/socket";
import api from "../services/api";

const Main = ({ navigation }) => {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [developers, setDevelopers] = useState([]);
    const [techs, setTechs] = useState("");
    useEffect(() => {
        async function loadIntialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }
        loadIntialPosition();
        loadDevs();
    }, []);

    function handleChangeRegion(reg) {
        setCurrentRegion(reg);
    }

    useEffect(
        () => void subscribe(dev => setDevelopers([...developers, dev]))
        , [developers]
    );

    function setupSocket() {
        disconnect();
        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs
        );
    }

    async function loadDevs() {
        if (currentRegion) {
            const { latitude, longitude } = currentRegion;

            const res = await api.get("/search", {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            })
            // console.log("Developers: ", res.data.devs);
            setDevelopers(res.data.devs);
            setupSocket();
        }
    }

    return (
        <>
            <MapView onRegionChange={handleChangeRegion} initialRegion={currentRegion} style={styles.map}>
                {developers.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.local.coordinates[1], longitude: dev.local.coordinates[0] }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => navigation.navigate("Profile", { github_username: dev.github_username })} style={styles.callout}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search devs by techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={true}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    searchForm: {
        position: "absolute",
        top: 20,
        right: 20,
        left: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        backgroundColor: "white",
        flex: 1,
        height: 50,
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            wdith: 4,
            height: 4,
        },
        elevation: 2
    },
    loadButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginLeft: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7d40e7"
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "white"
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: "#666",
        marginTop: 5,
        fontSize: 14
    },
    devTechs: {
        marginTop: 5
    }
});

export default Main;
