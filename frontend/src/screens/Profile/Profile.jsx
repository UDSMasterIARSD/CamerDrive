import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileStyle from "./ProfileStyle";

const Profile = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const createOneButtonAlert = () =>
    Alert.alert("Confirm update", "succesfully update your information", [
      {
        text: "Ok",
        style: "ok",
      },
    ]);

  return (
    <>
      <View style={ProfileStyle.header}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Edit profile
        </Text>
      </View>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <View style={ProfileStyle.imageContainer}>
            <TouchableOpacity>
              <Image
                source={require("../../../assets/V2.jpg")}
                style={ProfileStyle.image}
              />
            </TouchableOpacity>
            {/* Icône de crayon pour éditer le profil 
          <TouchableOpacity
            style={ProfileStyle.editIconContainer}
            //onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          */}
          </View>
          <View style={ProfileStyle.itemContainer}>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput
                placeholder="vanelladzikang1@gmail.com"
                editable={false}
              />
            </View>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput placeholder="password" editable={false} />
            </View>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput placeholder="Dzikang" editable={false} />
            </View>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput placeholder="vanella dzikang" editable={false} />
            </View>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput placeholder="12/01/2003" editable={false} />
            </View>
            <View style={ProfileStyle.textInputContainer}>
              <TextInput placeholder="681916790" editable={false} />
            </View>
          </View>
          <View style={ProfileStyle.container}>
            <TouchableOpacity onPress={createOneButtonAlert}>
              <View style={ProfileStyle.updateContainer}>
                <Text style={{ color: "white" }}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
