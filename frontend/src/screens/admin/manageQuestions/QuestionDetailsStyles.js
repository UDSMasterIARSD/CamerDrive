import { Dimensions, StatusBar, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const QuestionDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 20,
    backgroundColor: "#fff",
    padding: 10,
  },
  titleHeader: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
  },

  dataWrapper: { marginTop: -1 },
  row: {
    height: 70, // Hauteur des cases
    backgroundColor: "#E7E6E1",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default QuestionDetailsStyle;
