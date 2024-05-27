/*import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const createOneButtonAlert = () =>
    Alert.alert("Confirm update", "Successfully updated your information", [
      {
        text: "Ok",
        // style: "ok",
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
const handleImagePicker = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };
import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Profile;*/

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./ProfileStyle";

import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const navigation = useNavigation();
  const { authState } = useAuth();

  const handlePress = () => {
    navigation.goBack();
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;
  const [profileImage, setProfileImage] = useState("../../../assets/V2.jpg");
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [username, setUsername] = useState("lidelle123");
  const [email, setEmail] = useState("vanella@2003");
  const [dob, setDob] = useState("2349584");
  const [status, setStatus] = useState("User");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSaveProfile = () => {
    setModalVisible(false);
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
  };

  const handleEditPassword = () => {
    setPasswordModalVisible(true);
  };

  const handleSavePassword = () => {
    setPasswordModalVisible(false);
    Alert.alert(
      "Password Updated",
      "Your password has been updated successfully."
    );
  };

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Profile
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={require("../../../assets/V2.jpg")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraIcon}>
              <Feather name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{authState?.user?.username}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{authState?.user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.value}>
                {formatDate(authState?.user?.dateNaiss)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{authState?.user?.role}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Edit Profile" onPress={handleEditProfile} />
            <Button title="Edit Password" onPress={handleEditPassword} />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>Edit Profile</Text>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.inputLabel}>Date of birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
            />

            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={handleSaveProfile} />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setModalVisible(!passwordModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>Edit Password</Text>
            <Text style={styles.inputLabel}>Ancien mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Save" onPress={handleSavePassword} />
              <Button
                title="Cancel"
                onPress={() => setPasswordModalVisible(false)}
                color="red"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(!imageModalVisible);
        }}
      >
        <View style={styles.fullScreenImageContainer}>
          <View style={styles.fullScreenImage}>
            <Image
              source={require("../../../assets/V2.jpg")}
              style={styles.fullScreenImage}
              resizeMode="cover"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfilePage;
