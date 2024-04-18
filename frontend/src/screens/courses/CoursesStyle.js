import { Dimensions, StyleSheet } from "react-native";

const CoursesStyle = StyleSheet.create({
  fstContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderRadius: 20,
  },
});
export default CoursesStyle;
