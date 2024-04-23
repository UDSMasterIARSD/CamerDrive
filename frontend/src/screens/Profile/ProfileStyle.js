import { Dimensions, StatusBar, StyleSheet } from "react-native";

const ProfileStyle = StyleSheet.create({
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

  imageContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 150,
  },
  textInputContainer: {
    backgroundColor: "#f8f8ff",
    padding: 5,
    //borderWidth: 2,
    marginBottom: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.75,
    //opacity: 10,
  },
  disabledTextInput: {
    color: "black",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  updateContainer: {
    backgroundColor: "#00ced1",
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get("window").width * 0.5,
    alignItems: "center",
  },
});

export default ProfileStyle;
