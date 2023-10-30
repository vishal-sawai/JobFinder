import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { auth } from '../../../firebase'
import { router } from 'expo-router';

export default function LogoutPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((u) => {
            setUser(u);
        });
    }, []);

    auth
        .signOut()
        .then(() => {
            router.replace("/signin")
        })
        .catch(error => alert(error.message))

    return (
        <View>
            <Drawer.Screen options={{ title: "Logout", headerShown: true, headerLeft: () => <DrawerToggleButton />, }} />
        </View>
    );
}
