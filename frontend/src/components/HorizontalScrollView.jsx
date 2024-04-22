import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const data = [
  {
    id: 1,
    icon: "filetext1", // Ensure this matches the icon you want
    title: "Mock Test",
  },
  {
    id: 2,
    icon: "car",
    title: "Driving Lessons",
  },
  {
    id: 3,
    icon: "enviromento",
    title: "Coverage Area",
  },
  {
    id: 4,
    icon: "team",
    title: "Experienced Instructors",
  },
];

const HorizontalView = () => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.iconCircle}>
            <AntDesign name={item.icon} size={24} color="black" />
          </View>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFD700", // Yellow background color
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginLeft: 30,
    borderBottomLeftRadius: 870,
    borderTopLeftRadius: 100,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "start",
    flex: 1,
    marginHorizontal: 5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    marginTop: 5,
    color: "black",
    textAlign: "center",
  },
});

export default HorizontalView;
