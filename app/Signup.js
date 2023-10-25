// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
        <View style={{ margin: 52 }}>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Signup" onPress={handleSignup} />
        </View>
    );
};

export default Signup;
