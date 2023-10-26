// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Image } from 'react-native';
import { auth, firestore } from '../firebase';
import { router } from 'expo-router';

const Signup = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            // .console.log("Email Added")
            .then((userCredential) => {
                const user = userCredential.user;

                // Save user data to Firestore
                const userData = {
                    name: name,
                    phone: phone,
                    email: email,
                };
                firestore.collection('users').doc(user.uid).set(userData).then(() => {
                    // User is signed up and data is saved
                    user.updateProfile({ displayName: name }).then(() => {
                        // navigation.navigate('Home', { user });
                        alert("Acccount is successfully created.");
                        router.replace('/home');
                    });
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/invalid-email':
                        return alert('Email address is not valid.');
                        break;
                    case 'auth/email-already-in-use':
                        return alert('Email address is already exists use another email address.');
                        break;
                    case 'auth/weak-password':
                        return alert('min 6 characters required for password');
                        break;
                    case 'auth/network-request-failed':
                        return alert('Network error.');
                        break;
                    default:
                        return alert(errorMessage);
                }

            });
    };



    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} useRef='scroll'>
            <KeyboardAvoidingView behavior='position' style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/images/signup.png')}
                        style={styles.image}
                    />

                    <View>
                        <Text style={styles.pageHeading}>Sign Up</Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Full Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Phone No"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Button title="Signup" onPress={handleSignup} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FDFEFE'
    },
    image: {
        width: 250,
        height: 150,
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
});
