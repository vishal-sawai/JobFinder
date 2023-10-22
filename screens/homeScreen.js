import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { auth } from '../firebase'
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const homeScreen = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");


  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View>
      <Text>HellO Guys</Text>
    </View>

    // <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    //   <Stack.Screen
    //     options={{
    //       headerStyle: { backgroundColor: COLORS.lightWhite },
    //       headerShadowVisible: false,
    //       headerLeft: () => (
    //         <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
    //       ),
    //       headerRight: () => (
    //         <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
    //       ),
    //       headerTitle: "",
    //     }}
    //   />


    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View
    //       style={{
    //         flex: 1,
    //         padding: SIZES.medium,
    //       }}
    //     >
    //       <Welcome
    //         searchTerm={searchTerm}
    //         setSearchTerm={setSearchTerm}
    //         handleClick={() => {
    //           if (searchTerm) {
    //             router.push(`/search/${searchTerm}`)
    //           }
    //         }}
    //       />

    //       <Popularjobs />
    //       <Nearbyjobs />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

  )
}

export default homeScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#0782F9',
//     width: '60%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   }
// })