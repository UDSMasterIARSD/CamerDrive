import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  DrawerLayoutAndroid,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation"; // Assurez-vous que le chemin d'importation est correct
import Courses from "../courses/Courses";
import Home from "../home/Home";
import LastExam from "../lastExam/LastExam";
import Quiz from "../quiz/Quiz";
import categories from "./Category";
import DashbordStyle from "./DashbordStyle";

const Dashbord = () => {
  const navigation = useNavigation();

  const drawer = useRef(null); // Utilisez useRef() pour créer une référence
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const [selectedCategory, setSelectedCategory] = useState("Home");

  const renderSelectedOption = () => {
    switch (selectedCategory) {
      case "Courses":
        return "List of courses";
      case "Quiz":
        return "quiz";
      case "Last exam":
        return "Last exam";
      default:
        return "Home";
    }
  };

  const renderSelectedPage = () => {
    switch (selectedCategory) {
      case "Courses":
        return <Courses />; // Affiche la page des cours lorsque "Courses" est sélectionné
      case "Quiz":
        return <Quiz />; // Affiche la page du quiz lorsque "Quiz" est sélectionné
      case "Last exam":
        return <LastExam />; // Affiche la page du dernier examen lorsque "Last exam" est sélectionné
      default:
        return <Home />; // Par défaut, affiche le contenu de la page d'accueil
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",

        //onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "YES" /*{ onPress: () => console.log("OK Pressed")}*/ },
    ]);

  const menuItems = [
    { title: "Profile", iconName: "person" },
    { title: "Statistiques", iconName: "stats-chart" },
    {
      title: "About us",
      iconName: "information-circle",
    },
    { title: "Logout", iconName: "log-out" },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState({
    title: "Home",
    iconName: "home",
  });

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    switch (menuItem.title) {
      case "Logout":
        {
          createTwoButtonAlert();
        }
        drawer.current?.closeDrawer();

        break;
      case "Profile":
        drawer.current?.closeDrawer();
        navigation.navigate("Profile");
        // Handle "Home" case
        break;
      case "Statistiques":
        drawer.current?.closeDrawer();
        navigation.navigate("Statistiques");
        break;
      case "About us":
        drawer.current?.closeDrawer();
        navigation.navigate("AboutUs");
        // Handle "About us" case
        break;
      default:
        break;
    }
  };

  const navigationView = () => (
    <View style={[DashbordStyle.container, DashbordStyle.navigationContainer]}>
      <View style={DashbordStyle.navigationHeader}>
        {/* Photo de l'utilisateur */}
        <View style={DashbordStyle.userInfoContainer}>
          <Image
            source={require("../../../assets/V2.jpg")}
            style={DashbordStyle.userPhoto}
          />
          {/* Nom de l'utilisateur et rôle */}
          <View>
            <Text style={DashbordStyle.userName}>Lidelle</Text>
            <Text style={DashbordStyle.userRole}>Candidat</Text>
            {/* Ligne foncée */}
            <View style={DashbordStyle.line}></View>
            {/* Texte "Camer" à gauche de la ligne */}
            <Text style={DashbordStyle.textLeft}>Camer</Text>
            {/* Texte "Drive" à droite de la ligne */}
            <Text style={DashbordStyle.textRight}>Drive</Text>
          </View>
        </View>
      </View>
      {/* Menu des services */}
      <ScrollView>
        {menuItems.map((menuItem) => (
          <TouchableOpacity
            key={menuItem.title}
            style={[
              DashbordStyle.menuItem,
              DashbordStyle.menuItemContainer,
              selectedMenuItem.title === menuItem.title &&
                DashbordStyle.selectedMenuItem,
            ]}
            onPress={() => handleMenuItemClick(menuItem)}
          >
            <View style={DashbordStyle.menuItemIconContainer}>
              <Ionicons name={menuItem.iconName} size={24} color="#003f5c" />
            </View>
            <Text style={DashbordStyle.menuItemText}>{menuItem.title}</Text>
          </TouchableOpacity>
        ))}
        {/* Fermeture du drawer */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={DashbordStyle.closeBtn}
            onPress={() => drawer.current?.closeDrawer()}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
      // Appliquer le style d'overlay
    >
      <View style={DashbordStyle.header}>
        <TouchableOpacity
          onPress={() => drawer.current?.openDrawer()}
          style={DashbordStyle.iconContainer}
        >
          <Ionicons name="menu" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={{ marginLeft: marginLeft }}>{renderSelectedOption()}</Text>
      </View>
      <View style={DashbordStyle.contentContainer}>{renderSelectedPage()}</View>
      <View style={DashbordStyle.bottomNavigation}>
        {/* Barre de navigation inférieure */}
        <BottomNavigation
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
          categories={categories}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Dashbord;
