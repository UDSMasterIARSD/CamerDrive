import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";

const ExamenDetails = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { questions } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(30);
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const { authState } = useAuth();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      Alert.alert(
        "Attention",
        "Vous devez choisir au moins une réponse avant de continuer."
      );
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correctOption;
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      correct: isCorrect,
    };

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimer(30);
      setAnswered(false);
    } else {
      const totalTime = (questions.length - 1) * 30 + (30 - timer);
      navigation.navigate("ExamenScore", {
        questions: updatedQuestions,
        score,
        totalTime,
      });
    }
  };

  const handleOptionSelect = (option) => {
    if (answered) return;

    setSelectedOption(option);
    setAnswered(true);
  };

  const handlePress = () => {
    setModalVisible(true);
    return true;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4,
  ].filter((option) => option);

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const progress = timer / 30;

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Question {currentQuestionIndex + 1}/{questions.length}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOptionButton,
                answered &&
                  option === currentQuestion.correctOption &&
                  styles.correctOptionButton,
                answered &&
                  selectedOption === option &&
                  option !== currentQuestion.correctOption &&
                  styles.wrongOptionButton,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  answered &&
                    option === currentQuestion.correctOption &&
                    styles.correctOptionText,
                  answered &&
                    selectedOption === option &&
                    option !== currentQuestion.correctOption &&
                    styles.wrongOptionText,
                ]}
              >
                {option}
              </Text>
              <Ionicons
                name={
                  answered
                    ? option === currentQuestion.correctOption
                      ? "checkmark-circle"
                      : selectedOption === option
                      ? "close-circle"
                      : "radio-button-off"
                    : "radio-button-off"
                }
                size={24}
                color={
                  answered
                    ? option === currentQuestion.correctOption
                      ? "green"
                      : selectedOption === option
                      ? "red"
                      : "black"
                    : "black"
                }
                style={styles.radioButton}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.timerContainer}>
          <Svg height="60" width="60">
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke="grey"
              strokeWidth="5"
              fill="none"
            />
            <Circle
              cx="30"
              cy="30"
              r={radius}
              stroke="rgb(134, 65, 244)"
              strokeWidth="5"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference - progress * circumference}
            />
          </Svg>
          <Text style={styles.timerText}>{timer}s</Text>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Continuer</Text>
        </TouchableOpacity>
      </View>

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
    </>
  );
};

export default ExamenDetails;

const styles = StyleSheet.create({
  header1: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "#d0e0ff",
  },
  correctOptionButton: {
    backgroundColor: "#d4edda",
  },
  wrongOptionButton: {
    backgroundColor: "#f8d7da",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  correctOptionText: {
    color: "green",
  },
  wrongOptionText: {
    color: "red",
  },
  radioButton: {
    marginLeft: 10,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  timerText: {
    fontSize: 16,
    marginLeft: 10,
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#007AFF",
  },
  modalButtonDanger: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
