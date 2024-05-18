import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Carousel from "../../components/Carousel";
import HorizontalView from "../../components/HorizontalView";
import { useAuth } from "../../context/AuthContext";
import Homestyles from "./HomeStyle";

const Home = () => {
  const { authState } = useAuth();

  return (
    <ScrollView>
      <View style={Homestyles.fstContainer}>
        <View style={Homestyles.textContainer}>
          <Image
            source={require("../../../assets/V2.jpg")}
            style={Homestyles.logo}
          />
          <View style={{ flex: 1 }}>
            <Text style={Homestyles.welcomeText}>Welcome to CarmerDrive</Text>
            <Text>{authState?.userName}</Text>
          </View>
        </View>
        <View>
          <Carousel />
          <View style={Homestyles.serviceContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Our Services
            </Text>
          </View>

          <HorizontalView />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
