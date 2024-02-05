import React from "react";
import { View, Text } from "react-native";

const NewStackScreen = ({ route }) => {
  const { data } = route.params || {}; // 안전하게 접근

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>약물분석로그</Text>
      {/* 여기서 data를 사용하거나 출력할 수 있음 */}
    </View>
  );
};

export default NewStackScreen;
