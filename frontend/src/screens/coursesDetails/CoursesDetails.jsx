import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute

import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";

import DashbordStyle from "../dashbord/DashbordStyle";
//import DrawerLayoutComponent from "../defaultLayout/DrawerLayoutComponent";

const CoursesDetails = () => {
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;
  //const { toggleDrawer } = useDrawerContext();

  const route = useRoute(); // Use the hook to get the current route
  const { item } = route.params; // Destructure the item from route.params

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  return (
    <SafeAreaView>
      <View style={DashbordStyle.header}>
        <TouchableOpacity
          onPress={handlePress}
          style={DashbordStyle.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Cours Detailles
        </Text>
      </View>
      <View>
        <Text>{item.title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CoursesDetails;
