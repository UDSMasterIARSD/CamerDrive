import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AboutUs = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          About Us
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.header1}>
          <Image
            source={require("../../assets/logo.png")} // Replace with your app's logo
            style={styles.logo}
          />
          <Text style={styles.appName}>CarmerDrive</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.aboutTitle}>About Us</Text>

          <Text style={styles.aboutText}>
            At CarmerDrive, we are passionate about empowering individuals to
            achieve their driving aspirations. We understand that the journey to
            obtaining a driver's license can be challenging, and we are
            committed to providing a comprehensive and engaging learning
            experience that simplifies the process and increases your chances of
            success.
          </Text>

          <Text style={styles.aboutTitle}>Our Mission</Text>

          <Text style={styles.aboutText}>
            Our mission is to revolutionize driver education by making it
            accessible, affordable, and effective. We believe that everyone
            deserves the opportunity to learn to drive and gain the independence
            and freedom that comes with it.
          </Text>

          <Text style={styles.aboutTitle}>Our Team</Text>

          <Text style={styles.aboutText}>
            Our team of experienced instructors, passionate about road safety
            and driver education, is dedicated to providing you with the support
            and guidance you need to excel in your driving tests. We are
            committed to staying at the forefront of driver education technology
            and methodologies to ensure you receive the most up-to-date and
            effective training.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    //textIndent: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textIndent: 20, // Indent the first line by 20 pixels
  },
});

export default AboutUs;
