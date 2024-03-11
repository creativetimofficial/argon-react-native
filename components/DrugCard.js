import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

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

  let decodedString = Object.keys(entities).reduce((acc, entity) => {
    const regex = new RegExp(entity, "g");
    return acc.replace(regex, entities[entity]);
  }, str);

  // 문자열의 시작과 끝에 있는 따옴표 제거
  decodedString = decodedString.replace(/^"|"$/g, "");
  // 이스케이프된 줄바꿈 문자 처리
  decodedString = decodedString.replace(/\\n/g, "\n");

  return decodedString;
}

const DrugCard = ({ item }) => {
  const { itemName, efficiency, warn, sideEffect, image, typeName } = item;

  // decodeHtmlEntity 함수를 적용하여 출력
  const renderTextWithNewLines = (text) => {
    const formattedText = decodeHtmlEntity(text);
    return formattedText.split("\n").map((line, index) => (
      <Text key={index} style={styles.text}>
        {line}
      </Text>
    ));
  };

  return (
    <ScrollView style={styles.card}>
      <Text style={styles.title}>{itemName}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {efficiency && (
        <>
          <Text style={styles.subtitle}>효능</Text>
          {renderTextWithNewLines(efficiency)}
        </>
      )}
      {warn && (
        <>
          <Text style={styles.subtitle}>주의</Text>
          {renderTextWithNewLines(warn)}
        </>
      )}
      {sideEffect && (
        <>
          <Text style={styles.subtitle}>부작용</Text>
          {renderTextWithNewLines(sideEffect)}
        </>
      )}
      {typeName && (
        <>
          <Text style={styles.subtitle}>위험분류</Text>
          {renderTextWithNewLines(typeName)}
        </>
      )}
    </ScrollView>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default DrugCard;
