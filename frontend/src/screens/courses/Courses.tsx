import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { CoursControllerApi } from "../../../generated/index";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../environments/axiosInstance";
import environment from "../../environments/environment";
import CoursesStyle from "./CoursesStyle";

interface Course {
  id: number;
  courseName: string;
  // image: string;
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
      const response = await courseApi.indesCours();
      const courses = response.data.map((course: any) => ({
        id: course.id,
        courseName: course.titre,
        // image: course.image,
      }));
      setCourses(courses);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllCourses();
  }, []);

  const handleCoursePress = (id: number) => {
    navigation.navigate("CourseConcepts", { id });
  };

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
              {/* <Image source={{ uri: item.image }} style={CoursesStyle.courseImage} /> */}
              <View>
                <Text style={CoursesStyle.title}>{item.courseName}</Text>
                <Text>Driving Lesson - #{item.id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      ListFooterComponent={loading ? <Text>Loading...</Text> : null}
    />
  );
};

export default Courses;
