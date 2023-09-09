import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, TextInput, Image } from "react-native";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const API = async () => {
    const url = "https://themealdb.com/api/json/v1/1/categories.php";
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json();
      setCategories(result.categories);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const APIRecipes = async (category = "Beef") => {
    const url = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = await response.json();
      setMeals(result.meals);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleChangeCategory = (category) => {
    APIRecipes(category);
    setMeals([]);
  };

  useEffect(() => {
    API();
    APIRecipes();
  }, []);

  return (
    <View className="p-4 flex-1">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className=" pt-10"
      >
        <View className="flex flex-row md:flex-row items-center justify-between ">
          <View className=" flex-1 ">
            <View className="flex-1 ">
              <Text className=" text-xl text-gray-400 font-medium">
                Hello Sonu
              </Text>
            </View>
            <View>
              <Text className="text-2xl font-extrabold ">
                What would you like
              </Text>
              <Text className="text-2xl font-semibold">to cook today?</Text>
            </View>
          </View>
          <Image
            className="items-center  justify-center rounded-full"
            source={{
              uri: "https://rb.gy/83kia",
              width: wp(20),
              height: hp(10),
            }}
          />
        </View>
        <View className="flex  gap-1 my-2 rounded-md flex-row px-1 items-center bg-gray-200 ">
          <AntDesign name="search1" size={30} color="black" />
          <TextInput
            className="text-lg p-2 bg-gray-200 rounded-full flex-1 "
            placeholder="Search any recipe"
          ></TextInput>
          <AntDesign name="menufold" size={24} color="black" />
        </View>
        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
