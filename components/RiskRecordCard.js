// RiskRecordCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// HTML 엔티티를 디코딩하는 함수
function decodeHtmlEntity(str) {
  const entities = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    // 필요한 추가 HTML 엔티티를 여기에 추가하세요.
  };

  return Object.keys(entities).reduce((acc, entity) => {
    const regex = new RegExp(entity, "g");
    return acc.replace(regex, entities[entity]);
  }, str);
}

const RiskRecordCard = ({ record }) => {
  // record.warn 필드에 있는 HTML 엔티티를 디코딩
  const decodedWarning = decodeHtmlEntity(record.warn);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{record.itemName}</Text>
      <Text style={styles.warning}>{decodedWarning}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffcccc", // 경고를 위한 연한 빨간색 배경
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default RiskRecordCard;
