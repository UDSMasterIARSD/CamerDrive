import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { FichierControllerApi, UserControllerApi } from "generated/index";
import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";

import Header from "@/components/Header";
import styles from "./ProfileStyle";

const ProfilePage = () => {
  const navigation = useNavigation();
  const { authState } = useAuth();

  const maxDate = new Date(2007, 11, 31);

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  const [profileImage, setProfileImage] = useState("../../../assets/V2.jpg");
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [username, setUsername] = useState(authState?.user?.username || "");
  const [email, setEmail] = useState(authState?.user?.email || "");
  const [dob, setDob] = useState(
    new Date(authState?.user?.dateNaiss) || new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState(authState?.user?.role || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [downloadedImage, setDownloadedImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState<{
    username: string | null;
    email: string | null;
    oldPassword: string | null;
    newPassword: string | null;
  }>({
    username: null,
    email: null,
    oldPassword: null,
    newPassword: null,
  });

  const resetProfileModal = () => {
    setEmail(authState?.user?.email || "");
    setDob(new Date(authState?.user?.dateNaiss) || new Date());
    setErrorMessage({
      username: null,
      email: null,
      oldPassword: null,
      newPassword: null,
    });
    setMessage("");
    setMessageType("");
  };

  const resetPasswordModal = () => {
    setOldPassword("");
    setNewPassword("");
    setErrorMessage({
      username: null,
      email: null,
      oldPassword: null,
      newPassword: null,
    });
    setMessage("");
    setMessageType("");
  };

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    let hasError = false;
    let errorMessages = { ...errorMessage };

    if (!email) {
      errorMessages.email = "Le champ email est obligatoire.";
      hasError = true;
    } else if (!email.endsWith("@gmail.com")) {
      errorMessages.email = "Veuillez utiliser une adresse Gmail valide.";
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessages);
      return;
    }

    try {
      const userApi = new UserControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const updatedUser = await userApi.updateUser(
        {
          username,
          email,
          dateNaiss: dob.toISOString(),
          password: authState?.user?.password,
        },
        authState?.user?.id
      );
      authState!.user!.dateNaiss = dob;
      authState!.user!.email = email;
      setMessage("Profil modifie avec success.");
      setMessageType("success");
      setModalVisible(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage(
        "Erreure lors de la modification du profil: " + error.response.message
      );
      setMessageType("error");
      setModalVisible(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleEditPassword = () => {
    setPasswordModalVisible(true);
  };

  const handleSavePassword = async () => {
    let hasError = false;
    let errorMessages = { ...errorMessage };

    if (!oldPassword) {
      errorMessages.oldPassword = "Veuillez entrer votre ancien mot de passe.";
      hasError = true;
    }

    if (!newPassword) {
      errorMessages.newPassword = "Veuillez entrer votre nouveau mot de passe.";
      hasError = true;
    } else if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[!@#$%^&*]/.test(newPassword)
    ) {
      errorMessages.newPassword =
        "Le mot de passe doit comporter au moins 8 caractères, inclure au moins une lettre majuscule, un chiffre et un caractère spécial.";
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessages);
      return;
    }

    try {
      const userApi = new UserControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await userApi.modifyPassword(
        { oldPassword, newPassword },
        authState?.user?.id
      );
      setMessage("Mot de passe modifie avec success.");
      setMessageType("success");
      setPasswordModalVisible(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage(
        "Erreur lors de la modification: L'ancien mot de passe est incorrect"
      );
      setMessageType("error");
      setPasswordModalVisible(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set") {
      const currentDate = selectedDate || dob;
      setDob(currentDate);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const uri = result.assets[0].uri;
        const formData = new FormData();

        formData.append("file", {
          uri: uri,
          type: "image/jpeg",
          name: "upload.jpg",
        });
        const fileApi = new FichierControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        console.log("FormData", formData);
        //const fichier = fileApi.uploadForm(formData);
        const response = await axios.post(
          `${environment.basePath}/files/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authState?.token}`,
            },
          }
        );

        console.log(response.data);

        setMessage("Image charge avec success.");
        setMessageType("success");
        setModalVisible(false);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } catch (error) {
        console.log(error);
        setMessage(
          "erreure lors du chargement de l'image: " +
            (error.response?.message || error.message)
        );
        setMessageType("error");
        setModalVisible(false);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Header titre={"Profil"} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            {downloadedImage ? (
              <Pressable onPress={handleImagePress}>
                <Image source={{ uri: downloadedImage }} style={styles.image} />
              </Pressable>
            ) : (
              <View style={styles.initialLetterContainer}>
                <Text style={styles.initialLetter}>
                  {authState?.user?.username.charAt(0)}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <Feather name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {message && (
            <View
              style={[
                styles.messageContainer,
                messageType === "success" ? styles.success : styles.error,
              ]}
            >
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nom d'utilisateur:</Text>
              <Text style={styles.value}>{authState?.user?.username}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{authState?.user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date de naissance:</Text>
              <Text style={styles.value}>
                {formatDate(new Date(authState?.user?.dateNaiss))}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Statut:</Text>
              <Text style={styles.value}>{authState?.user?.role}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="MOdifier Profil" onPress={handleEditProfile} />
            <Button title="Modifier Password" onPress={handleEditPassword} />
          </View>
        </View>
      </ScrollView>
      <ScrollView>
        <View style={styles.container}></View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          resetProfileModal();
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>Modifier le Profil</Text>
            <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              editable={false}
            />
            {errorMessage.username && (
              <Text style={styles.errorMessage}>{errorMessage.username}</Text>
            )}
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {errorMessage.email && (
              <Text style={styles.errorMessage}>{errorMessage.email}</Text>
            )}
            <Text style={styles.inputLabel}>Date de naissance</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{formatDate(dob)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={maxDate}
              />
            )}

            <View style={styles.modalButtonContainer}>
              <Button title="Enregistrer" onPress={handleSaveProfile} />
              <Button
                title="Annuler"
                onPress={() => {
                  resetProfileModal();
                  setModalVisible(false);
                }}
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
          resetPasswordModal();
          setPasswordModalVisible(!passwordModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>Modifier le Mot de passe</Text>
            <Text style={styles.inputLabel}>Ancien mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
            />
            {errorMessage.oldPassword && (
              <Text style={styles.errorMessage}>
                {errorMessage.oldPassword}
              </Text>
            )}
            <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            {errorMessage.newPassword && (
              <Text style={styles.errorMessage}>
                {errorMessage.newPassword}
              </Text>
            )}
            <View style={styles.modalButtonContainer}>
              <Button title="Enregistrer" onPress={handleSavePassword} />
              <Button
                title="Annuler"
                onPress={() => {
                  resetPasswordModal();
                  setPasswordModalVisible(false);
                }}
                color="red"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default ProfilePage;
