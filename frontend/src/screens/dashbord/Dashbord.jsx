import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styled, useColorScheme, withExpoSnack } from "nativewind";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  DrawerLayoutAndroid,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import Courses from "../courses/Courses";
import Home from "../home/Home";
import LastExam from "../lastExam/LastExam";
import Quiz from "../quiz/Quiz";
import categories from "./Category";
import DashbordStyle from "./DashbordStyle";

const Dashbord = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  const drawer = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const StyledIonicons = styled(Ionicons);
  const StyledText = styled(Text);
  const StyledDrawerLayoutAndroid = styled(DrawerLayoutAndroid);

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
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",

          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "YES" /*{ onPress: () => console.log("OK Pressed")}*/ },
      ],
      {
        alertContainerStyle: DashbordStyle.alertContainer,
      }
    );

  const menuItems = [
    { title: "Profile", iconName: "person" },
    { title: "Statistiques", iconName: "stats-chart" },
    {
      title: "About us",
      iconName: "information-circle",
    },
    { title: "Logout", iconName: "log-out" },
    {
      title: "Theme",
      iconName: colorScheme === "dark" ? "moon" : "sunny-outline",
    },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState({
    title: "Home",
    iconName: "home",
  });

  const handleDarkMode = () => {
    toggleColorScheme();
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    switch (menuItem.title) {
      case "Logout":
        drawer.current?.closeDrawer();
        {
          createTwoButtonAlert();
        }

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
      case "Theme":
        handleDarkMode();
      default:
        break;
    }
  };

  const goToProfilePage = () => {
    navigation.navigate("Profile");
  };

  const navigationView = () => (
    <View style={[DashbordStyle.container, DashbordStyle.navigationContainer]}>
      <View style={DashbordStyle.navigationHeader}>
        {/* Photo de l'utilisateur */}
        <View style={DashbordStyle.userInfoContainer}>
          <Pressable onPress={goToProfilePage}>
            <Image
              source={require("../../../assets/V2.jpg")}
              style={DashbordStyle.userPhoto}
            />
          </Pressable>

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
      <ScrollView className="dark:bg-slate-600 pt-5">
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
              <StyledIonicons
                name={menuItem.iconName}
                size={24}
                className="text-cyan-950 dark:text-cyan-50"
                // color="#ffffff"
              />
              {/* <Ionicons name={menuItem.iconName} size={24} color="#003f5c" /> */}
            </View>
            <StyledText
              className="text-cyan-950 dark:text-cyan-50 font-semibold"
              style={DashbordStyle.menuItemText}
            >
              {menuItem.title}
            </StyledText>
          </TouchableOpacity>
        ))}
        {/* Fermeture du drawer 
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
        */}
      </ScrollView>
    </View>
  );

  return (
    <StyledDrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
      // Appliquer le style d'overlay
      // className="dark:bg-white"
    >
      <View style={DashbordStyle.header}>
        <TouchableOpacity
          onPress={() => drawer.current?.openDrawer()}
          // style={DashbordStyle.iconContainer}
          className="dark:text-slate-50"
        >
          <StyledIonicons
            name="menu"
            size={24}
            className="dark:text-slate-50"
          />
        </TouchableOpacity>

        <Text style={{ marginLeft: marginLeft }}>{renderSelectedOption()}</Text>
      </View>
      <View style={DashbordStyle.contentContainer}>{renderSelectedPage()}</View>
      <View
        className="dark:bg-slate-700"
        style={DashbordStyle.bottomNavigation}
      >
        {/* Barre de navigation inférieure */}
        <BottomNavigation
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
          categories={categories}
        />
      </View>
    </StyledDrawerLayoutAndroid>
  );
};

export default withExpoSnack(Dashbord);
