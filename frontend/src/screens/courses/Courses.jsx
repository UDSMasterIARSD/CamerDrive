import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CoursesDetails from "../coursesDetails/CoursesDetails";
import courseData from "./ courseData";
import CoursesStyle from "./CoursesStyle";

const Courses = () => {
  const navigation = useNavigation();

  const handleCoursePress = (item) => {
    navigation.navigate(CoursesDetails);
  };

  return (
    <FlatList
      data={courseData}
      style={{ backgroundColor: "#f0f8ff", borderTopRightRadius: 10 }}
      renderItem={({ item }) => (
        <View style={CoursesStyle.container}>
          <TouchableOpacity onPress={() => handleCoursePress(item)}>
            <View style={CoursesStyle.itemContainer}>
              <Image source={item.image} style={CoursesStyle.courseImage} />
              <Text style={CoursesStyle.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default Courses;
