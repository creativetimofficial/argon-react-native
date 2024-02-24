import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DrugCard = ({ item }) => {
  const { itemName, efcyQesitm, warn, sideEffect, image, typeName } = item;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>제품 명: {itemName}</Text>
      <Text>효능: {efcyQesitm}</Text>
      <Text>주의사항: {warn}</Text>
      <Text>부작용: {sideEffect}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>위험분류: {typeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default DrugCard;
