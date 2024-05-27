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
      <View
        style={Homestyles.fstContainer}
        className="bg-zinc-200 dark:bg-cyan-950"
      >
        <View
          className="bg-white dark:bg-slate-700"
          style={Homestyles.textContainer}
        >
          <Image
            source={require("../../../assets/V2.jpg")}
            style={Homestyles.logo}
          />
          <View style={{ flex: 1 }}>
            <Text
              className="text-gray-700 dark:text-gray-50"
              style={Homestyles.welcomeText}
            >
              Welcome to CarmerDrive
            </Text>
            <Text className="text-gray-900 dark:text-gray-200">
              {authState?.user?.username}
            </Text>
          </View>
        </View>
        <View>
          <Carousel />
          <View style={Homestyles.serviceContainer}>
            <Text className="" style={{ fontSize: 20, fontWeight: "bold" }}>
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
