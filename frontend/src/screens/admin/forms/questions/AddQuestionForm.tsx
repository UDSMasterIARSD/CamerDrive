import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { QuestionControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const AddQuestionForm = () => {
  const [libelle, setLibelle] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [questionError, setQuestionError] = useState("");
  const [optionsError, setOptionsError] = useState("");
  const [correctOptionError, setCorrectOptionError] = useState("");
  const navigation = useNavigation();
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    setDropdownOptions([
      { label: option1, value: option1 },
      { label: option2, value: option2 },
      { label: option3, value: option3 },
      { label: option4, value: option4 },
    ]);
  }, [option1, option2, option3, option4]);

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!libelle) {
      setQuestionError("Le champ 'libelle' est obligatoire.");
      hasError = true;
    } else {
      setQuestionError("");
    }

    const filledOptions = [option1, option2, option3, option4].filter(
      (opt) => opt !== ""
    );
    if (filledOptions.length < 2) {
      setOptionsError("Vous devez remplir au moins deux options.");
      hasError = true;
    } else {
      setOptionsError("");
    }

    if (!correctOption) {
      setCorrectOptionError("Vous devez sélectionner une option correcte.");
      hasError = true;
    } else {
      setCorrectOptionError("");
    }

    if (hasError) return;

    try {
      const questionApi = new QuestionControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      await questionApi.createQuestion({
        libelle: libelle,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correctOption: correctOption,
      });
      setMessage("Question added successfully");
      setMessageType("success");
      setQuestionError("");
      setOptionsError("");
      setCorrectOptionError("");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage("Failed to add question: " + error.message);
      setMessageType("error");
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Question</Text>
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter question libelle"
              value={libelle}
              onChangeText={setLibelle}
              style={styles.textInput}
            />
            {questionError ? (
              <Text style={styles.errorText}>{questionError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter option1"
              value={option1}
              onChangeText={setOption1}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter option2"
              value={option2}
              onChangeText={setOption2}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter option3"
              value={option3}
              onChangeText={setOption3}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter option4"
              value={option4}
              onChangeText={setOption4}
              style={styles.textInput}
            />
            {optionsError ? (
              <Text style={styles.errorText}>{optionsError}</Text>
            ) : null}
          </View>
          <View style={styles.textInputContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select correct option"
              searchPlaceholder="Search..."
              value={correctOption}
              onChange={(item) => {
                setCorrectOption(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            {correctOptionError ? (
              <Text style={styles.errorText}>{correctOptionError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
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

export default AddQuestionForm;
