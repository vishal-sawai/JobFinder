import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { auth, firestore } from "../../../firebase";
import { useState, useEffect } from "react";

const Footer = ({ url, jobId }) => {
  const [addSave, setAddSave] = useState(0);

  useEffect(() => {
    // Check if jobId exists in the db and update addSave accordingly
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const db = firestore.collection("SaveJobs").doc(uid);
        db.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const savedJobs = data.savedJobs;
            if (savedJobs.includes(jobId)) {
              setAddSave(1); // Job is saved
            }
          }
        });
      }
    });
  }, [jobId]);

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
              // Job is already saved, so unsave it
              const updatedJobs = savedJobs.filter((id) => id !== jobId);
              db.update({
                savedJobs: updatedJobs,
              });
              setAddSave(addSave - 1); // Decrement addSave by one
              alert("Job unsaved");
            } else {
              // Job is not saved, so save it
              db.update({
                savedJobs: [...savedJobs, jobId],
              });
              setAddSave(addSave + 1); // Increment addSave by one
              alert("Job saved");
            }
          } else {
            // User document doesn't exist, create a new one
            db.set({
              savedJobs: [jobId],
            });
            setAddSave(addSave + 1); // Increment addSave by one
            alert("Job saved");
          }
        });
      }
    });
  };

  // console.log(addSave);c

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={saveBtn} style={styles.likeBtn}>
        <Image
          source={addSave > 0 ? icons.heart : icons.heartOutline}
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
