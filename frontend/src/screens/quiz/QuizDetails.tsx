import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Assurez-vous d'avoir installé react-native-vector-icons
import { QuizControllerApi } from "../../../generated/index";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";

const QuizDetails = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("Valider");
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizApi = new QuizControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await quizApi.showQuiz(id);
        setQuizDetails(response.data);
        setStartTime(new Date());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setModalVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizDetails.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
      setErrorMessage("");
      setButtonText("Valider");
      setOptionsDisabled(false);
      setEmoji("");
    } else {
      const endTime = new Date();
      const duration = Math.floor((endTime - startTime) / 1000);
      const formattedDuration = formatDuration(duration);
      navigation.navigate("ScorePage", {
        score,
        totalQuestions: quizDetails.questions.length,
        duration: formattedDuration,
      });
    }
  };

  const handleOptionPress = (option) => {
    if (answered) return;

    setSelectedOption(option);
    setErrorMessage("");
  };

  const handleValidate = () => {
    if (!selectedOption) {
      setErrorMessage("Vous devez sélectionner une réponse.");
      return;
    }

    setAnswered(true);
    setOptionsDisabled(true);
    setButtonText("Continuer");

    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
      setEmoji("😊");
    } else {
      setEmoji("😢");
    }
  };

  const handleContinue = () => {
    handleNextQuestion();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handlePress = () => {
    navigation.goBack();
  };

  const currentQuestion = quizDetails.questions[currentQuestionIndex];
  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4,
  ].filter((option) => option);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>QuizTitle: {quizDetails.titre}</Text>
      </View>
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.questionText}>
          {currentQuestionIndex + 1}. {currentQuestion.libelle}
        </Text>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionItem,
                selectedOption === option ? styles.selectedOption : null,
                answered &&
                selectedOption === option &&
                option === currentQuestion.correctOption
                  ? styles.correctOption
                  : answered &&
                    selectedOption === option &&
                    option !== currentQuestion.correctOption
                  ? styles.incorrectOption
                  : answered && option === currentQuestion.correctOption
                  ? styles.correctOption
                  : null,
                options.length === 3 ? styles.optionItemThree : null,
              ]}
              disabled={optionsDisabled}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              buttonText === "Valider"
                ? styles.validateButton
                : styles.continueButton,
            ]}
            onPress={buttonText === "Valider" ? handleValidate : handleContinue}
          >
            <Text style={styles.buttonText}>
              {buttonText}{" "}
              {buttonText === "Continuer" && (
                <Icon name="arrow-forward" size={16} color="#fff" />
              )}
            </Text>
          </Pressable>
        </View>
        {answered && <Text style={styles.emojiText}>{emoji}</Text>}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="arrow-back" size={30} color="#000" />
            <Text style={styles.modalText}>Voulez-vous revenir au menu?</Text>
            <Text style={styles.modalSubText}>
              La progression de la série sera perdue.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Continuer la série</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonDanger]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.modalButtonText}>Retourner au menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    marginTop: StatusBar.currentHeight! + 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  titleContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: StatusBar.currentHeight + 30,
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  questionsContainer: {
    marginTop: 10,
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionItem: {
    width: "48%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  optionItemThree: {
    width: "30%",
  },
  selectedOption: {
    borderColor: "blue",
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: "green",
  },
  incorrectOption: {
    backgroundColor: "red",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "48%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  validateButton: {
    backgroundColor: "blue",
  },
  continueButton: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  emojiText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    color: "red",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonDanger: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
