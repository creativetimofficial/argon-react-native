import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DrugRecordCard = ({ item }) => {
  const { itemName, efcyQesitm, warn, image, typeName } = item;

  return (
    <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.title}> 이름 {itemName}</Text>
          <Text> 날짜 {efcyQesitm}</Text>
          <Text> 복용 여부 {warn}</Text>
          <Text> 위험 분류 {typeName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DrugRecordCard;
