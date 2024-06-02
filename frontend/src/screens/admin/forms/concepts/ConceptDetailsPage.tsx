import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ConceptControllerApi } from "../../../../../generated/index";
import axiosInstance from "../../../../environments/axiosInstance";
import environment from "../../../../environments/environment";

const ConceptDetailsPage = ({ id }) => {
  const [conceptDetails, setConceptDetails] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConceptDetails = async () => {
      console.log(id);
      try {
        const conceptApi = new ConceptControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await conceptApi.showConcept(id);
        setConceptDetails(response.data);
        const courseResponse = await conceptApi.getCours(id);
        setCourse(courseResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConceptDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>
          Titre du Concept: {conceptDetails.titre}
        </Text>
        <Text style={styles.contentText}>
          Contenu: {conceptDetails.contenu}
        </Text>
        <Text style={styles.courseText}>Cours: {course.titre}</Text>
      </View>
    </ScrollView>
  );
};

export default ConceptDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    marginBottom: 20,
  },
  courseText: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
  },
});
