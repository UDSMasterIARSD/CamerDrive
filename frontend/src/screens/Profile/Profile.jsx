import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import ProfileStyle from "./ProfileStyle";

const Profile = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;
  return (
    <View>
      <View style={ProfileStyle.header}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          My profile
        </Text>
      </View>
    </View>
  );
};

export default Profile;
