import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <View>
      <View className="flex-1 mx-1 flex-row items-center justify-between px-2">
        <Text className="text-xl font-medium">Categories</Text>
        <View className="w-10  ">
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      </View>
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 1,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {/* Category card */}
          {categories.map((cat, index) => {
            let isActive = cat.strCategory == activeCategory;
            let activeButtonStyle = isActive
              ? { backgroundColor: "#F59E0B" }
              : { backgroundColor: "rgba(100, 300, 200, 0.1)" };
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={{ alignItems: "center", marginVertical: 10 }}
              >
                <View
                  style={[
                    { borderRadius: 6, padding: 8, margin: 6 },
                    activeButtonStyle,
                  ]}
                >
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <Text style={{ color: "#4B5563", fontSize: 16 }}>
                  {cat.strCategory}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Categories;
