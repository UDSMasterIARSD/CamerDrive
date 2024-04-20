import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { Image, Text, View, useColorScheme } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import dynamicStyles from "./styles";

const Onboarding = (props) => {
  const navigation = useNavigation();
  const appConfig = props.appConfig;
  const appStyles = props.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = appConfig.onboardingConfig.onboardingScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );

  const _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]}>
      <Image style={styles.image} source={item.image} size={100} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  const handleDone = () => {
    navigation.navigate("Home");
  };

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      //Handler for the done On last slide
      onDone={handleDone}
      showSkipButton={true}
      showDoneButton={true}
      showNextButton={true}
    />
  );
};

Onboarding.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default Onboarding;
