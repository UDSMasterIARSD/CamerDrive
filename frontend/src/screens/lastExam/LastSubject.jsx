import React from "react";
import { withExpoSnack } from "nativewind";

import { Image, View, Text } from "react-native";
import { lastExamData } from "./data";

const LastSubject = () => {
  return lastExamData.map((item, key) => {
    return (
      <View
        key={key}
        className="w-1/3 items-center rounded-md mx-2 border-2 my-5 overflow-hidden"
      >
        <View>
          <Image
            source={item.image}
            className="h-28 aspect-square object-cover"
          />
        </View>
        <View>
          <Text className="text-base dark:text-cyan-50">{item.titre}</Text>
        </View>
      </View>
    );
  });
};

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application
export default withExpoSnack(LastSubject);
