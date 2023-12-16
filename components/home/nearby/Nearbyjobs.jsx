import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';
import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import * as Location from 'expo-location';

const Nearbyjobs = () => {


  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let addressArray = await Location.reverseGeocodeAsync(location.coords);
      setAddress(addressArray[0]); // Set the first object in the array as the address

    })();
  }, []);


  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: (address ? address?.city + " " + address?.region + " " + "India" : "Full Time Jobs In pune India"),
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity
          handleNavigate={() => { router.push(`/home/search/Jobs In `(address?.city + " " + address?.region) + ` India`) }}>
          <Text style={styles.headerBtn} onPress={() => {
            router.push(`/home/search/Jobs In ` + (address?.city + " " + address?.region) + ` India`);
          }}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/home/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
