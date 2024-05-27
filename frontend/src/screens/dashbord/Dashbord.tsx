import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { styled, useColorScheme, withExpoSnack } from "nativewind";
import { default as React, useEffect, useRef, useState } from "react";
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
import DashbordStyle from "./DashbordStyle";

declare interface CustomAlertOptions extends AlertOptions {
  alertContainerStyle?: ViewStyle;
}

interface MenuItem {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const Dashbord = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { authState } = useAuth();
  console.log("userName", authState?.user?.username);
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
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
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

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    drawer.current?.closeDrawer();
    switch (menuItem.title) {
      case "Logout":
        createTwoButtonAlert();
        break;
      case "Profile":
        navigation.navigate("Profile" as never);
        break;
      case "Statistiques":
        navigation.navigate("Statistiques" as never);
        break;
      case "About us":
        navigation.navigate("AboutUs" as never);
        break;
      case "Theme":
        toggleColorScheme();
      default:
        break;
    }
  };

  const goToProfilePage = () => {
    navigation.navigate("Profile" as never);
  };

  const navigationView = () => (
    <View style={[DashbordStyle.container, DashbordStyle.navigationContainer]}>
      <View style={DashbordStyle.navigationHeader}>
        <View style={DashbordStyle.userInfoContainer}>
          <View style={DashbordStyle.initialLetterContainer}>
            <Pressable onPress={goToProfilePage}>
              <Text style={DashbordStyle.initialLetter}>
                {authState?.user?.username.charAt(0)}
              </Text>
            </Pressable>
          </View>
          <View>
            <Text style={DashbordStyle.userName}>
              {authState?.user?.username}
            </Text>
            <Text style={DashbordStyle.userRole}>{authState?.user?.role}</Text>
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
      <View
        className="bg-slate-50 dark:bg-slate-800 border-b-slate-300 dark:border-b-slate-900"
        style={DashbordStyle.header}
      >
        <TouchableOpacity
          onPress={() => drawer.current?.openDrawer()}
          className="dark:text-slate-50"
        >
          <StyledIonicons
            name="menu"
            size={24}
            className="dark:text-slate-50"
          />
        </TouchableOpacity>

        <Text
          className="dark:text-slate-200"
          style={{ marginLeft: marginLeft }}
        >
          {renderSelectedOption()}
        </Text>
      </View>
      <View>{renderSelectedPage()}</View>
      <View
        className="dark:bg-slate-700"
        style={DashbordStyle.bottomNavigation}
      >
        <BottomNavigation
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
        />
      </View>
    </StyledDrawerLayoutAndroid>
  );
};

export default withExpoSnack(Dashbord);
