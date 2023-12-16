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
            // console.log(u);
        });


        // firebase get data
        const db = firestore;
        if (user != null) {
            // Retrieve data from a specific collection and document
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        setUserData(doc.data())
                        // console.log("Document data:", doc.data());
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                });
        }
    }, [user]);

    return (
        <View style={{ backgroundColor: 'white' }}>
            <Drawer.Screen options={{ title: "Profile", headerShown: true, headerLeft: () => <DrawerToggleButton />, }} />
            <View>
                <View>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.profileName}>
                    {userData ? userData.name : "Loading..."}
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center', marginTop: -8, fontWeight: '300', color: 'red' }}>
                    {userData ? userData.Eduction : "Loading..."}
                </Text>

                <View style={styles.profileDataCotainer}>
                    <View style={styles.profileData}>
                        <Text style={styles.profileDataText}>
                            {userData ? userData.city : "Loading..."}, {userData ? userData.astate : "Loading..."}
                        </Text>
                    </View>
                    <View style={styles.profileData}>
                        <Text style={styles.profileDataText}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Position:</Text>   {userData ? userData.position : "Loading..."}
                        </Text>
                    </View>
                    <View style={styles.profileData}>
                        <Text style={styles.profileDataText}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>Exprience:</Text>   {userData ? (userData.exprience) > 0 ? userData.exprience + " Years" : "Fresher" : "Loading..."}
                        </Text>
                    </View>
                    <View style={styles.profileData}>
                        <Text style={styles.profileDataText}>
                            {userData ? userData.email : "Loading..."}
                        </Text>
                    </View>
                    <View style={styles.profileData}>
                        <Text style={styles.profileDataText}>
                            {userData ? userData.phone : "Loading..."}
                        </Text>
                    </View>

                </View>
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
    profileDataCotainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 15,
        height: '100%',
    },
    profileData: {
        width: '80%',
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: 'skyblue',
    },
    profileDataText: {
        fontSize: 15,
        alignSelf: 'center',
        marginVertical: 10,
        fontWeight: '100',
    },
})