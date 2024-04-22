import { StyleSheet } from "react-native";

const Homestyles = StyleSheet.create({
  fstContainer: {
    alignSelf: "center",
    justifyContent: "center",
    //marginTop: StatusBar.currentHeight,

    backgroundColor: "#f0f0f0",
  },

  textContainer: {
    padding: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "lightgray",
  },
  logo: {
    //borderWidth: 2,
    //borderColor: "black",
    width: 50,
    height: 50,
    borderRadius: 50,
    //marginLeft: 10,
    marginRight: 20,
  },
  serviceContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
});
export default Homestyles;
