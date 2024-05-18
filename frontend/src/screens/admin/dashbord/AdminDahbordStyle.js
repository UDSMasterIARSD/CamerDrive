import { Dimensions, StatusBar, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const AdminDashbordStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginTop: StatusBar.currentHeight + 50,
  },
  textBelowLine: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003f5c",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  tasksContainer: {
    marginTop: 16,
  },
  tasksRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tasksIconContainer: {
    alignItems: "center",
    width: "45%",
    backgroundColor: "#1C202F",
    borderRadius: 10,
    padding: 16,
    marginBottom: 48,
    height: "100%",
  },
  tasksIcon: {
    alignItems: "center",
  },
  tasksText: {
    textAlign: "center",
    color: "white",
    fontSize: 12,
    marginTop: 15,
  },
});

export default AdminDashbordStyle;
