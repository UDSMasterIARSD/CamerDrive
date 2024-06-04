import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CoursControllerApi } from "../../../generated/index";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";
import CoursesStyle from "./CoursesStyle";

interface Course {
  id: number;
  courseName: string;
  imageId: number;
  imageUrl?: string;
}

const Courses: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { authState } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const AllCourses = async () => {
    try {
      const courseApi = new CoursControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await courseApi.indexCours();
      const courses = response.data.map((course: any) => ({
        id: course.id,
        courseName: course.titre,
        imageId: course.image.id,
      }));

      console.log(courses);

      const imageRequests = courses.map((course) => {
        return axios.get(`${environment.basePath}/files/${course.imageId}`, {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
          // responseType: Blob,
        });
      });

      const imageResponses = await Promise.all(imageRequests);

      const coursesWithImages = courses.map((course, index) => ({
        ...course,
        imageUrl: imageResponses[index].data,
      }));

      console.log("Cours avec images:", coursesWithImages);
      setCourses(coursesWithImages);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await AllCourses();

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCoursePress = (id: number) => {
    navigation.navigate("CourseConcepts", { id });
  };

  if (loading) {
    return (
      <View style={CoursesStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      style={{
        backgroundColor: "#f0f8ff",
        borderTopRightRadius: 10,
        marginBottom: 40,
      }}
      renderItem={({ item }) => (
        <View style={CoursesStyle.container}>
          <TouchableOpacity onPress={() => handleCoursePress(item.id)}>
            <View style={CoursesStyle.itemContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={CoursesStyle.courseImage}
              />
              <View>
                <Text style={CoursesStyle.title}>{item.courseName}</Text>
                <Text>Driving Lesson - #{item.id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default Courses;
