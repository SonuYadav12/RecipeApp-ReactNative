import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text } from "react-native";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ categories, meals }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="mx-1 space-y-2">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600 "
      >
        Recipes
      </Text>
      <View className="flex-1">
        {categories.length === 0 || meals.length === 0 ? (
          <Loading />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecipeCard item={item} index={index}  navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Recipes;
