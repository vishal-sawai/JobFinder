import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { router, Redirect } from 'expo-router';

export default function signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                router.replace("/home")

            }
        })
        return unsubscribe
    }, [])
    const handeleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch((error) => {
                const errorMessage = error.message;
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/invalid-email':
                        return alert('Email address is not valid.');
                        break;
                    case 'auth/user-not-found':
                        return alert('User not found.');
                        break;
                    case 'auth/network-request-failed':
                        return alert('Network error.');
                        break;
                    case 'auth/wrong-password':
                        return alert('Wrong password.');
                        break;
                    case 'auth/too-many-requests':
                        return alert('Too many requests.');
                        break;
                    case 'auth/invalid-login-credentials':
                        return alert('Invalid credentials.');
                        break;
                    default:
                        return alert(errorMessage);
                }

            });
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} useRef='scroll'>
            <KeyboardAvoidingView behavior='position' style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/images/auth.jpg')}
                        style={styles.image}
                    />
                    <View>
                        <Text style={styles.pageHeading}>Sign In</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />
                        <Button title="Login" onPress={handeleLogin} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FDFEFE'
    },
    image: {
        width: 300,
        height: 200,
        marginTop: '5%'
    },
    pageHeading: {
        fontWeight: '500',
        fontSize: 30,
        color: '#8E44AD',
        marginTop: 10
    },
    form: {
        marginTop: 25,
    },
    label: {
        fontSize: 15,
        marginBottom: 4,
        marginLeft: 8,
        color: '#566573',
        fontWeight: '400'
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginBottom: 15,
        borderRadius: 10,
        width: 300
    },
    loginBtn: {
        backgroundColor: '#8E44AD',
        padding: 8,
        borderRadius: 50,
        marginTop: 5,
        width: 180,
    },
    loginBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        textTransform: 'uppercase'
    }
})