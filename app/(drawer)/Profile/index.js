import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { auth, firestore } from '../../../firebase'
import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native';


export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((u) => {
            setUser(u);
        });
    }, []);

    // firebase get data
    const db = firestore;
    if (user != null) {
        // Retrieve data from a specific collection and document
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    setUserData(doc.data())
                }
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });
    }


    return (
        <View style={{ backgroundColor: 'white' }}>
            <Drawer.Screen options={{ title: "Profile", headerShown: true, headerLeft: () => <DrawerToggleButton />, }} />
            <View>
                <View>
                    <Image
                        source={require('../../../assets/images/profile.jpg')}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.profileName}>
                    {userData ? userData.name : "Loading..."}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 125,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    profileName: {
        fontSize: 25,
        fontWeight: '300',
        color: '#641E16',
        alignSelf: 'center',
        marginBottom: 10,
    },
})