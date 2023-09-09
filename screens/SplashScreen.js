import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const SplashScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(5));
    }, 300);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  }, []);
  return (
    <View
      style={{ height: hp(100), width: wp(100) }}
      className=" flex-1 items-center justify-center  bg-amber-500"
    >
      <Animated.View
        style={{ padding: ring2padding }}
        className=" bg-orange-500 rounded-full  "
      >
        <Animated.View
          style={{ padding: ring1padding }}
          className=" bg-orange-400 rounded-full  "
        >
          <View>
            <Image
              className="items-center  justify-center rounded-full"
              source={{
                uri: "https://rb.gy/6uetw",
                width: wp(40),
                height: hp(20),
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
      <Text style={{ fontSize: hp(4) }} className=" text-white  ">
        Eat Delight
      </Text>
      <Text style={{ fontSize: hp(7) }} className=" text-white ">
        Live Delightly
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
