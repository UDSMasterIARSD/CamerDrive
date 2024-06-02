import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { QuestionControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const QuestionDetailsPage = ({ id }) => {
  const [questionDetails, setQuestionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const questionApi = new QuestionControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await questionApi.showQuestion(id);
        setQuestionDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={QuestionDetailsStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={QuestionDetailsStyle.container}>
      <View style={QuestionDetailsStyle.detailsContainer}>
        <Text style={QuestionDetailsStyle.titleText}>Details Question</Text>
        <View style={QuestionDetailsStyle.sectionContainer}>
          <Text style={QuestionDetailsStyle.labelText}>ID:</Text>
          <Text style={QuestionDetailsStyle.detailText}>
            {questionDetails.id}
          </Text>
        </View>
        <View style={QuestionDetailsStyle.sectionContainer}>
          <Text style={QuestionDetailsStyle.labelText}>Libelle:</Text>
          <Text style={QuestionDetailsStyle.detailText}>
            {questionDetails.libelle}
          </Text>
        </View>
        <View style={QuestionDetailsStyle.sectionContainer}>
          <Text style={QuestionDetailsStyle.labelText}>L'option correcte:</Text>
          <Text style={QuestionDetailsStyle.detailText}>
            {questionDetails.correctOption}
          </Text>
        </View>
        <View style={QuestionDetailsStyle.optionsContainer}>
          <Text style={QuestionDetailsStyle.optionHeader}>Options:</Text>
          {questionDetails.option1 && (
            <Text style={QuestionDetailsStyle.optionText}>
              1. {questionDetails.option1}
            </Text>
          )}
          {questionDetails.option2 && (
            <Text style={QuestionDetailsStyle.optionText}>
              2. {questionDetails.option2}
            </Text>
          )}
          {questionDetails.option3 && (
            <Text style={QuestionDetailsStyle.optionText}>
              3. {questionDetails.option3}
            </Text>
          )}
          {questionDetails.option4 && (
            <Text style={QuestionDetailsStyle.optionText}>
              4. {questionDetails.option4}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default QuestionDetailsPage;

const QuestionDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    width: "100%",
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
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  sectionContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  detailText: {
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
    color: "#333",
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  optionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
  },
});
