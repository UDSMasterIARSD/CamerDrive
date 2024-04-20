import { Dimensions, StatusBar, StyleSheet } from "react-native";

const Homestyles = StyleSheet.create({
  fstContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight + 15,
    //alignItems: "baseline",
    //marginTop: 15,
    //marginRight: 25,
    //marginLeft: 25,
    //borderRadius: 30,
    backgroundColor: "#f0f0f0",
  },
  image: {
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderRadius: 20,
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
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
    marginRight: 20, // Marge à droite de l'image pour séparer l'image du nom
  },
  serviceContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
});
export default Homestyles;
