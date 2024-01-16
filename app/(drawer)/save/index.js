import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Text, View, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { auth, firestore } from '../../../firebase'
import useFetch from '../../../hook/useFetch';
import { useState, useEffect, useCallback } from 'react';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../../components/common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';
import styles from '../../../components/home/nearby/nearbyjobs.style';

export default function SavePage() {


    const [user, setUser] = useState(null);
    const [savedJobs, setSavedJobs] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged((u) => {
            setUser(u);
            if (u != null) {
                firestore.collection('SaveJobs').doc(u.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            const data = doc.data();
                            setSavedJobs(data);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    }, []);



    return (
        <View>
            <Text>This is save page</Text>
        </View>
    );
}















// import { Drawer } from 'expo-router/drawer';
// import { DrawerToggleButton } from '@react-navigation/drawer';
// import { Text, View, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
// import { auth, firestore } from '../../../firebase'
// import useFetch from '../../../hook/useFetch';
// import { useState, useEffect, useCallback } from 'react';
// import { COLORS } from '../../../constants';
// import NearbyJobCard from '../../../components/common/cards/nearby/NearbyJobCard';
// import { useRouter } from 'expo-router';
// import styles from '../../../components/home/nearby/nearbyjobs.style';



// export default function SavePage() {
//     const [user, setUser] = useState(null);
//     const [savedJobs, setSavedJobs] = useState(null);
//     const [refreshing, setRefreshing] = useState(false);
//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         refetch()
//         setRefreshing(false)
//     }, []);

//     useEffect(() => {
//         auth.onAuthStateChanged((u) => {
//             setUser(u);
//             if (u != null) {
//                 firestore.collection('SaveJobs').doc(u.uid).get()
//                     .then((doc) => {
//                         if (doc.exists) {
//                             const data = doc.data();
//                             setSavedJobs(data);
//                         }
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             }
//         });
//     }, []);

//     const router = useRouter();
//     const { data, isLoading, error, refetch } = useFetch("search", {
//         query: "Full Time Job In India",
//         num_pages: "6",
//     });

//     const savedJobIds = savedJobs && savedJobs.savedJobs && Object.values(savedJobs.savedJobs);
//     const savedJobsData = data && savedJobIds && data.filter(job => savedJobIds.includes(job.job_id));

//     return (
//         <ScrollView showsVerticalScrollIndicator={false}
//             refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         >
//             <View style={{ backgroundColor: 'white' }}>
//                 <Drawer.Screen options={{ title: "Saved Jobs", headerShown: true, headerLeft: () => <DrawerToggleButton />, }} />
//                 <View style={styles.cardsContainer}>
//                     {isLoading ? (
//                         <ActivityIndicator size='large' color={COLORS.primary} />
//                     ) : error ? (
//                         <Text>Something went wrong</Text>
//                     ) : (
//                         savedJobsData && savedJobsData.length > 0 ? (
//                             savedJobsData.map((job) => (
//                                 <NearbyJobCard
//                                     job={job}
//                                     key={`nearby-job-${job.job_id}`}
//                                     handleNavigate={() => router.push(`/home/job-details/${job.job_id}`)}
//                                 />
//                             ))
//                         ) : (
//                             <Text style={{ textAlign: 'center' }} >No saved jobs found</Text>
//                         )
//                     )}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }