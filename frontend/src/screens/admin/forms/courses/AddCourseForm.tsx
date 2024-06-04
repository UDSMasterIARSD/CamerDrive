import Header from "@/components/Header";
import SelectImage from "@/components/SelectImage";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import environment from "../../../../environments/environment";

const AddCourseForm = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { authState } = useAuth();

  const handleSubmit = async () => {
    let hasError = false;

    if (!titre) {
      setTitleError("Le champ 'titre' est obligatoire.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!description) {
      setDescriptionError("entrer une description");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (hasError) return;

    try {
      setLoading(true);

      if (imageUri) {
        const formData = new FormData();

        formData.append("file", {
          uri: imageUri,
          type: "image/jpeg",
          name: "upload.jpg",
        });
        console.log("FormData", formData);
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
        const result = response.data;

        const formDataf = new FormData();
        formDataf.append("titre", titre);
        formDataf.append("description", description);
        formDataf.append("fichier", {
          uri: imageUri,
          type: "image/jpeg",
          name: "upload.jpg",
        });

        const responsef = await axios.post(
          `${environment.basePath}/cours/`,
          formDataf,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authState?.token}`,
            },
          }
        );
        console.log(responsef.data);
      }
      setMessage("Cours Ajoute avec success");
      setMessageType("success");
      setTitleError("");
      setDescriptionError("");
      setTitre("");
      setDescription("");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage("Erreur d'ajout: " + error.message);
      setMessageType("error");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <>
      <Header titre={"Ajouter un Cours"} />
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <SelectImage onImagePicked={setImageUri} />
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Entrer le titre du cours"
              value={titre}
              onChangeText={setTitre}
              style={styles.textInput}
            />
            {titleError ? (
              <Text style={styles.errorText}>{titleError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Entrer la description"
              value={description}
              onChangeText={setDescription}
              style={styles.textInput}
            />
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Ajouter</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginLeft: "20%",
    fontSize: 15,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: "#ffffff",
  },
  formContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    backgroundColor: "#f8f8ff",
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  textInput: {
    paddingVertical: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#00ced1",
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get("window").width * 0.5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
  },
  success: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
    color: "#155724",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    color: "#721c24",
  },
  messageText: {
    color: "white",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#f8f8ff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default AddCourseForm;
