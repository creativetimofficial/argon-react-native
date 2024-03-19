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

  // decodeHtmlEntity 함수를 적용하여 출력
const renderTextWithNewLines = (text) => {
  // 디코딩 후 앞뒤 따옴표 제거
  const formattedText = decodeHtmlEntity(text).replace(/^"|"$/g, "");
  return formattedText.split("\\n").map((line, index) => (
    <Text key={index} style={styles.warning}>
      {line}
    </Text>
  ));
};



const RiskRecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{record.itemName}</Text>
      {/* HTML 엔티티가 디코딩되고 \n으로 줄바꿈 처리된 경고 메시지를 렌더링 */}
      {renderTextWithNewLines(record.warn)}
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
