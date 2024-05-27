import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CoursControllerApi } from "../../../generated/index";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";
import CourseDetailsStyle from "./CoursesDetailsStyles";

const CourseConcepts: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const navigation = useNavigation();
  const [courseDetails, setCourseDetails] = useState<CoursResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseApi = new CoursControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await courseApi.showCours(id);
        setCourseDetails(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleConceptPress = (conceptId: number) => {
    navigation.navigate("ConceptDetails", { id: conceptId });
  };

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  if (loading) {
    return (
      <View style={CourseDetailsStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#f0f8ff",
        height: Dimensions.get("window").height,
      }}
    >
      <View style={CourseDetailsStyle.header}>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text
          style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
        >
          Concepts
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#f0f8ff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={CourseDetailsStyle.titleText}>{courseDetails?.titre}</Text>

        <FlatList
          data={courseDetails?.concepts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleConceptPress(item.id)}>
              <View style={CourseDetailsStyle.conceptContainer}>
                <Text style={CourseDetailsStyle.conceptText}>{item.titre}</Text>

                <AntDesign name="rightcircleo" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default CourseConcepts;
