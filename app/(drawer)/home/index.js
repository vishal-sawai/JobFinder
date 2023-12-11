import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { COLORS, icons, images, SIZES } from "../../../constants";
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../../../components";

export default function Page() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
    const [searchPlace, setSearchPlace] = useState("");


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Drawer.Screen
                options={{
                    title: "",
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerLeft: () => <DrawerToggleButton style={{ backgroundColor: COLORS.lightWhite }} iconUrl={images.profile} />,
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchPlace={searchPlace}
                        setSearchPlace={setSearchPlace}
                        handleClick={() => {
                            if (searchTerm && searchPlace) {
                                router.push(`/home/search/${searchTerm} in ${searchPlace}`)
                            }
                        }}
                    />

                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
})