import { StyleSheet } from "react-native";

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      paddingBottom: 25,
      color: "white",
    },
    text: {
      fontSize: 18,
      textAlign: "center",
      color: "white",
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: "100%",
      height: 280,
      marginTop: 0,
      marginBottom: 60,
      objectFit: "cover",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    button: {
      fontSize: 18,
      color: "black",
      marginTop: 10,
      marginBottom: 100,
    },
  });
};

export default dynamicStyles;
