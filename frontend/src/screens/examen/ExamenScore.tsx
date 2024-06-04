import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExamenScore = () => {
  const route = useRoute();
  const { questions, score, totalTime } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const handlePress = () => {
    navigation.navigate("Home");
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
          Résultat
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#f0f8ff",
          height: Dimensions.get("window").height,
        }}
      >
        <View style={styles.container}>
          {questions.map((question, index) => {
            if (index % 2 === 0) {
              return (
                <View key={index} style={styles.row}>
                  <View
                    style={[
                      styles.questionContainer,
                      !question.correct && styles.incorrectQuestion,
                    ]}
                  >
                    <Text style={styles.questionText}>
                      Question {index + 1}
                    </Text>
                  </View>
                  {questions[index + 1] && (
                    <View
                      style={[
                        styles.questionContainer,
                        !questions[index + 1].correct &&
                          styles.incorrectQuestion,
                      ]}
                    >
                      <Text style={styles.questionText}>
                        Question {index + 2}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }
            return null;
          })}
          <Text style={styles.summaryText}>
            Durée totale: {totalTime} secondes
          </Text>
          <Text style={styles.summaryText}>
            Questions réussies: {score}/{questions.length}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ExamenScore;

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
    padding: 20,
    //backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  questionContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#d4edda",
    marginHorizontal: 5,
  },
  incorrectQuestion: {
    backgroundColor: "#f8d7da",
  },
  questionText: {
    fontSize: 16,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
