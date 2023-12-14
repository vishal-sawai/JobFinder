import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, firestore } from '../../../firebase'

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Fresher", "Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, searchPlace, setSearchPlace, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");


  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u);
      console.log(u);
    });
    // firebase get data
    const db = firestore;
    if (user != null) {
      // Retrieve data from a specific collection and document
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data())
            console.log("Document data:", doc.data());
          }
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    }
  }, [user]);

  return (
    <View>
      {/* <View style={styles.container}>
        <Text style={styles.userName}>Hello Vishal</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View> */}

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="position"
          />
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchPlace}
            onChangeText={(text) => setSearchPlace(text)}
            placeholder="city"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Text style={{ color: 'white', fontSize: 15 }}>SEARCH</Text>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/home/search/${item} ` + (userData ? userData.position : "Loading...") + ` jobs in india`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
