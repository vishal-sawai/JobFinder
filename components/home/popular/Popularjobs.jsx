import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import { auth, firestore } from '../../../firebase'

const Popularjobs = () => {

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

  const [selectedJob, setSelectedJob] = useState();
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: ((userData ? userData.position : "Popular jobs in india") + ` Popular jobs in india`),
    num_pages: "1",
  });

  const handleCardPress = (item) => {
    router.push(`/home/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} onPress={() => {
            router.push(`/home/search/` + (userData ? userData.position : "Popular jobs in india") + ` Popular jobs in india`);
          }}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
