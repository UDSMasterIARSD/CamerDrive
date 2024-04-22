import { StatusBar, StyleSheet } from "react-native";

const StatistiqueStyle = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
});

export default StatistiqueStyle;
