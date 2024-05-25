import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { styled, useColorScheme, withExpoSnack } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  DrawerLayoutAndroid,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../context/AuthContext";
import Courses from "../courses/Courses";
import Home from "../home/Home";
import LastExam from "../lastExam/LastExam";
import Quiz from "../quiz/Quiz";
import categories from "./Category";
import DashbordStyle from "./DashbordStyle";

const Dashbord = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { authState } = useAuth();
  const navigationState = useNavigationState((state) => state);

  const drawer = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;

  const StyledIonicons = styled(Ionicons);
  const StyledText = styled(Text);
  const StyledDrawerLayoutAndroid = styled(DrawerLayoutAndroid);

  const [selectedCategory, setSelectedCategory] = useState("Home");

  useEffect(() => {
    console.log("Route change detected:", navigationState);
    drawer.current?.closeDrawer();
  }, [navigationState]);

  const renderSelectedOption = () => {
    switch (selectedCategory) {
      case "Courses":
        return "List of courses";
      case "Quiz":
        return "Quiz";
      case "LastExam":
        return "Last exam";
      default:
        return "Home";
    }
  };

  const renderSelectedPage = () => {
    console.log(`Selected category: ${selectedCategory}`);
    switch (selectedCategory) {
      case "Courses":
        return <Courses />;
      case "Quiz":
        console.log("Rendering Quiz page");
        return <Quiz />;

      case "LastExam":
        return <LastExam />;
      default:
        return <Home />;
    }
  };

  const { onLogout } = useAuth();

  const createTwoButtonAlert = () =>
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "YES", onPress: () => onLogout() },
    ]);

  const menuItems = [
    { title: "Profile", iconName: "person" },
    { title: "Statistiques", iconName: "stats-chart" },
    { title: "About us", iconName: "information-circle" },
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
    drawer.current?.closeDrawer();
    switch (menuItem.title) {
      case "Logout":
        createTwoButtonAlert();
        break;
      case "Profile":
        navigation.navigate("Profile");
        break;
      case "Statistiques":
        navigation.navigate("Statistiques");
        break;
      case "About us":
        navigation.navigate("AboutUs");
        break;
      case "Theme":
        handleDarkMode();
        break;
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
        <View style={DashbordStyle.userInfoContainer}>
          <View style={DashbordStyle.initialLetterContainer}>
            <Pressable onPress={goToProfilePage}>
              <Text style={DashbordStyle.initialLetter}>
                {authState?.userName?.charAt(0)}
              </Text>
            </Pressable>
          </View>
          <View>
            <Text style={DashbordStyle.userName}>{authState?.userName}</Text>
            <Text style={DashbordStyle.userRole}>{authState?.role}</Text>
            <View style={DashbordStyle.line}></View>
            <Text style={DashbordStyle.textLeft}>Camer</Text>
            <Text style={DashbordStyle.textRight}>Drive</Text>
          </View>
        </View>
      </View>
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
              />
            </View>
            <StyledText
              className="text-cyan-950 dark:text-cyan-50 font-semibold"
              style={DashbordStyle.menuItemText}
            >
              {menuItem.title}
            </StyledText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <StyledDrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={DashbordStyle.header}>
        <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
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
