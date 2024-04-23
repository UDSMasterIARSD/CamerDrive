import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import SideSwipe from "react-native-sideswipe";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const { width: viewportWidth } = Dimensions.get("window");

  // Carousel items
  const carouselItems = [
    {
      imageUrl: require("../../assets/dashbordImages/image2.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image5.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image3.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image4.jpg"),
    },
  ];

  const contentOffset = (viewportWidth - 400) / 2;

  // Automatically switch images every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
      carouselRef.current?.snapToNext();
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(timer);
  }, [carouselItems.length]);

  return (
    <View>
      <SideSwipe
        index={activeIndex}
        itemWidth={400}
        style={{ width: viewportWidth }}
        data={carouselItems}
        contentOffset={contentOffset}
        onIndexChange={(index) => setActiveIndex(index)}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
          <View style={styles.imageContainer}>
            <Image source={item.imageUrl} style={styles.image} />
            {item.title && <Text style={styles.title}>{item.title}</Text>}
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {carouselItems.map((_, index) => (
          <Entypo
            key={index}
            name="dot-single"
            size={35}
            color={index === activeIndex ? "black" : "lightgray"}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 5,
  },
});

export default Carousel;
