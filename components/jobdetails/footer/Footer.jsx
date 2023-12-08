import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { auth, firestore } from "../../../firebase";

const Footer = ({ url, jobId }) => {

  const saveBtn = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const db = firestore.collection("SaveJobs").doc(uid);
        db.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const savedJobs = data.savedJobs;
            if (savedJobs.includes(jobId)) {
              alert("Job already saved");
            } else {
              db.update({
                savedJobs: [...savedJobs, jobId],
              });
              alert("Job saved");
            }
          } else if (!doc.exists) {
            db.set({
              savedJobs: [jobId],
            });
            alert("Job saved");
          }
          else {
            alert("No such document!");
          }
        });
      } else {
        alert("Please login to save job");
      }
    });
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={saveBtn} style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
