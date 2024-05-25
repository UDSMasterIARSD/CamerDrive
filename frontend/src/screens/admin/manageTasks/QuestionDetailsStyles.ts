import { StatusBar, StyleSheet } from "react-native";

const QuestionDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight + 30,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row: {
    height: 90,
    backgroundColor: "#E7E6E1",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
  textCenter: {
    margin: 6,
    textAlign: "center",
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
  },
  dataWrapper: {
    marginTop: -1,
  },
});

export default QuestionDetailsStyle;
