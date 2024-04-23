import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BottomNavigation = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          activeCategory === "Home" && styles.activeIcon,
        ]}
        onPress={() => setActiveCategory("Home")}
      >
        <Ionicons
          name="home-outline"
          size={20}
          color={activeCategory === "Home" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            activeCategory === "Home" && styles.activeText,
          ]}
        >
          Home
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          activeCategory === "Courses" && styles.activeIcon,
        ]}
        onPress={() => setActiveCategory("Courses")}
      >
        <Ionicons
          name="school-outline"
          size={20}
          color={activeCategory === "Courses" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            activeCategory === "Courses" && styles.activeText,
          ]}
        >
          Courses
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          activeCategory === "Quiz" && styles.activeIcon,
        ]}
        onPress={() => setActiveCategory("Quiz")}
      >
        <Ionicons
          name="extension-puzzle-outline"
          size={20}
          color={activeCategory === "Quiz" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            activeCategory === "Quiz" && styles.activeText,
          ]}
        >
          Quiz
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgba(0, 0, 0, 0.1)" : "transparent",
          },
          styles.categoryIcon,
          activeCategory === "Last exam" && styles.activeIcon,
        ]}
        onPress={() => setActiveCategory("Last exam")}
      >
        <AntDesign
          name="copy1"
          size={20}
          color={activeCategory === "Last exam" ? "red" : "black"}
        />
        <Text
          style={[
            styles.categoryName,
            activeCategory === "Last exam" && styles.activeText,
          ]}
        >
          Last exam
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  categoryIcon: {
    flex: 1,
    alignItems: "center",
  },
  activeIcon: {
    color: "red",
  },
  categoryName: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
  },
  activeText: {
    color: "red",
  },
});

export default BottomNavigation;
