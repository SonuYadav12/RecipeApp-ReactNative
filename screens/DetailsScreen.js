import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import YouTubeIframe from "react-native-youtube-iframe";

const DetailsScreen = (props) => {
  let item = props.route.params;
  const [isFavourite, setFavourite] = useState(false);
  const [meal, setMeals] = useState([]);
  const [loading, setloading] = useState(true);
  const navigation = useNavigation();

  const ingredientsIndexes = (meal) => {
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if ("strIngredient" + i) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json();

      setMeals(result.meals[0]);
      setloading(false);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const getYoutubeVideoId = (url) => {
    // Match a variety of YouTube video URL formats
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&?]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      {/* recipe image */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(); // Use navigation.goBack() to navigate back
          }}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <Ionicons name="arrow-back" size={hp(3.5)} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFavourite(!isFavourite)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <MaterialIcons
            name="favorite"
            size={24}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meal description */}
      {loading ? (
        <Loading />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strArea}
            </Text>
          </View>
          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <MaterialIcons name="watch-later" size={24} color="black" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-600"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-600"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <MaterialIcons name="people" size={24} color="black" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-600"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-600"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <MaterialIcons
                  name="local-fire-department"
                  size={24}
                  color="black"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-600"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-600"
                >
                  Calories
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <MaterialIcons name="category" size={24} color="black" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-600"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-600"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(2.5) }}
                        className="font-bold flex-1 text-neutral-700"
                      >
                        Instructions
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.6) }}
                        className="text-neutral-700"
                      >
                        {meal?.strInstructions}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* youtubevideo */}

          {meal.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YouTubeIframe
                  height={hp(30)}
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default DetailsScreen;
