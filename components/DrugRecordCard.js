import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DrugRecordCard = ({ item }) => {
  const { itemName, dailyFrequency, startDate, endDate, image, typeName } =
    item;

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>이름: {itemName}</Text>
          <Text style={styles.text}>일일 투여 횟수: {dailyFrequency}</Text>
          <Text style={styles.text}>시작일: {startDate}</Text>
          <Text style={styles.text}>종료일: {endDate}</Text>
          <Text style={styles.text}>분류: {typeName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
});

export default DrugRecordCard;
