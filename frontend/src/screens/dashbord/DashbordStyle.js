import { StatusBar, StyleSheet } from "react-native";

const DashbordStyle = StyleSheet.create({
  container: {
    flex: 1,
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
  navigationHeader: {
    backgroundColor: "#003f5c",
    //alignItems: "center",
    paddingVertical: 60,
    marginBottom: 20,
    width: "auto",
  },
  userInfoContainer: {
    flexDirection: "row",
    //alignItems: "center", // Alignement vertical du texte par rapport à l'image
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 30,
    marginRight: 20, // Marge à droite de l'image pour séparer l'image du nom
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userRole: {
    fontSize: 10,
    color: "white",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemContainer: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    width: "95%",
    marginBottom: 30,
  },
  menuItemIconContainer: {
    padding: 10,
    marginLeft: 20,
  },
  menuItemText: {
    color: "#003f5c",
    fontSize: 15,
    marginLeft: 10,
  },
  selectedMenuItem: {
    //backgroundColor: "#fb5b5a",
  },
  closeBtn: {
    width: "50%",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fb5b5a",
    borderRadius: 50,
  },

  line: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
    width: 150,
    marginTop: 50,
  },
  textLeft: {
    position: "absolute",
    left: 0,
    top: 60, // Ajustez la position verticale selon vos besoins
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  textRight: {
    position: "absolute",
    right: 0,
    top: 100, // Ajustez la position verticale selon vos besoins
    color: "white",
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0, // Place la bottom navigation au bas du conteneur parent
    left: 0,
    right: 0,
  },
});

export default DashbordStyle;
