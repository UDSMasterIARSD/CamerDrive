import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Carousel from "../../components/Carousel";
import HorizontalScrollView from "../../components/HorizontalScrollView";
import Homestyles from "./HomeStyle";

const Home = () => {
  const styles = StyleSheet.create({
    title: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

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
            <Carousel />
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
