import React from "react";
import { View, Text } from "react-native";

const NewStackScreen = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>{JSON.stringify(data)}</Text>{" "} */}
      {/* Or however you want to display the data */}
      <Text>약물분석로그</Text>
    </View>
  );
};

export default NewStackScreen;
