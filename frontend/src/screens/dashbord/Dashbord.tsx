import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { styled, useColorScheme, withExpoSnack } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertOptions,
  Dimensions,
  DrawerLayoutAndroid,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import Courses from "../courses/Courses";
import Home from "../home/Home";
import LastExam from "../lastExam/LastExam";
import Quiz from "../quiz/Quiz";
import categories from "./Category";
import DashbordStyle from "./DashbordStyle";

declare interface CustomAlertOptions extends AlertOptions {
  alertContainerStyle?: ViewStyle;
}

interface MenuItem {
  title: string,
  iconName: keyof typeof Ionicons.glyphMap,
}

const Dashbord = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { authState } = useAuth();
  console.log("userName", authState?.userName);
  console.log("initialLetter", authState?.userName?.charAt(0));

  const navigationState = useNavigationState((state) => state);
  
  useEffect(() => {
    console.log("Route change detected:", navigationState);
    drawer.current?.closeDrawer();
  }, [navigationState]);

  const drawer = useRef<DrawerLayoutAndroid>(null);
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

  const { onLogout } = useAuth();

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
        {
          text: "YES",
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              console.error("onLogout function is not defined");
            }
          },
        },
      ],
      {
        alertContainerStyle: DashbordStyle.alertContainer,
      } as CustomAlertOptions
    );

  const menuItems: MenuItem[] = [
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

  const handleMenuItemClick = (menuItem: MenuItem) => {
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
        toggleColorScheme();
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
          <View style={DashbordStyle.initialLetterContainer}>
            <Pressable onPress={goToProfilePage}>
              <Text style={DashbordStyle.initialLetter}>
                {authState?.userName?.charAt(0)}
              </Text>
            </Pressable>
          </View>
          {/*{userPhoto ? (
            <Pressable onPress={goToProfilePage}>
              <Image
                source={{ uri: userPhoto }}
                style={DashbordStyle.userPhoto}
              />
            </Pressable>
          ) : (
            <View style={DashbordStyle.initialLetterContainer}>
              <Text style={DashbordStyle.initialLetter}>
                {username.charAt(0)}
              </Text>
            </View>
          )}*/}

          {/* Nom de l'utilisateur et rôle */}
          <View>
            <Text style={DashbordStyle.userName}>{authState?.userName}</Text>
            <Text style={DashbordStyle.userRole}>{authState?.role}</Text>
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
      <View className="bg-slate-50 dark:bg-slate-800 border-b-slate-300 dark:border-b-slate-900" style={DashbordStyle.header}>
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

        <Text className="dark:text-slate-200" style={{ marginLeft: marginLeft }}>{renderSelectedOption()}</Text>
      </View>
      <View>{renderSelectedPage()}</View>
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
