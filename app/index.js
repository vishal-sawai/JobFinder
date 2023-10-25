import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { Link, Stack, router } from 'expo-router';

export default function page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require('../assets/images/interview.png')}
        style={styles.image}
      />
      <View>
        <Text style={styles.AppName}>JOB<Text style={styles.finder}>FINDER</Text></Text>
      </View>
      <View style={styles.tagLine}>
        <Text style={styles.tagLineText}>Unlock Opportunities,
          Empower Your Future with JobFindr</Text>
      </View>
      <View style={styles.btnGroup}>
        <Link href="/signin" asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}
            >SignIn</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/Signup" asChild>
          <TouchableOpacity style={[styles.btn, styles.btnSignup]}>
            <View style={[styles.btn, styles.btnSignup]}>
              <Text style={[styles.btnText, styles.textSignup]}>SignUp</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFEFE'
  },
  image: {
    width: 250,
    height: 250,
    marginTop: '30%'
  },
  AppName: {
    fontWeight: '700',
    fontSize: 50
  },
  finder: {
    color: '#008000'
  },
  btnGroup: {
    marginTop: 20
  },
  btn: {
    backgroundColor: '#AD1EFF',
    width: 280,
    margin: 10,
    borderRadius: 50
  },
  btnText: {
    color: '#FDFEFE',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: '500'
  },
  btnSignup: {
    backgroundColor: '#FDFEFE',
    borderWidth: 1,
    borderColor: '#AD1EFF'
  },
  textSignup: {
    color: '#AD1EFF',
  },
  tagLine: {
    marginTop: 3,
    marginBottom: 10
  },
  tagLineText: {
    marginHorizontal: 30,
    textAlign: 'center',
    fontWeight: '500',
    color: '#616A6B',
    fontSize: 14
  }
});



