import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator size={100} color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Loading;
