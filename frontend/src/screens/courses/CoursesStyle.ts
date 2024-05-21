import { Dimensions, StatusBar, StyleSheet } from "react-native";

const CoursesStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: StatusBar.currentHeight! - 10,
    borderRadius: 20,
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderRadius: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    overflow: "hidden",
    //marginRight: 10,
    //marginTop: 5,
  },
  courseImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  title: {
    width: Dimensions.get("window").width * 0.5,
    fontWeight: "bold",
  },
});
export default CoursesStyle;