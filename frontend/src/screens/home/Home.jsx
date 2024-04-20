import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import HorizontalScrollView from "../../components/HorizontalScrollView";
import Homestyles from "./HomeStyle";

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <View style={Homestyles.fstContainer}>
          <View style={Homestyles.textContainer}>
            <Image
              source={require("../../../assets/favicon.png")}
              style={Homestyles.logo}
            />
            <View>
              <Text>Welcome to CarmerDrive</Text>
              <Text>Lidelle</Text>
            </View>
          </View>
          <View>
            {/* image*/}
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../assets/dashbordImages/image4.jpg")}
                style={Homestyles.image}
              />
            </View>
            <View style={Homestyles.serviceContainer}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Our Services
              </Text>
            </View>
            <HorizontalScrollView />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
