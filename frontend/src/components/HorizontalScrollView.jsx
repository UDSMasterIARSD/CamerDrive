import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const data = [
  {
    id: 1,
    icon: "pluscircle",
    title: "Image 1",
  },
  {
    id: 2,
    icon: "barschart",
    title: "Image 2",
  },
  {
    id: 3,
    icon: "team",
    title: "Image 3",
  },
  {
    id: 4,
    icon: "sharealt",
    title: "Image 4",
  },
  {
    id: 5,
    icon: "sharealt",
    title: "Image 4",
  },
];

const HorizontalScrollView = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: "#fb5b5a",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 100,
        //padding: 5,
        //height: 10,
      }}
    >
      {data.map((item) => (
        <View key={item.id} style={ScrollViewStyle.container}>
          <AntDesign name={item.icon} size={24} color="black" />
          <Text style={ScrollViewStyle.text}>{item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const ScrollViewStyle = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    margin: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    position: "relative",
    marginLeft: 50,
  },
  text: {
    position: "absolute",
    bottom: -40,
    textAlign: "center",
  },
});

export default HorizontalScrollView;
