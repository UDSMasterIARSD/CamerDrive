import { Dimensions, StatusBar, StyleSheet } from "react-native";

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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  testContainer: {
    //flexDirection: "row",
    //flex: 2,
    //flexWrap: "wrap",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 20,
  },
  testItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default StatistiqueStyle;
