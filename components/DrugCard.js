import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import ModalComponent from "./ModalComponent"; // 모달 컴포넌트 임포트
import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";


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

const DrugCard = ({ item, accessToken }) => {
  const { itemName, efficiency, warn, sideEffect, image, typeName } = item;

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isTaking, setIsTaking] = useState(true);
  const [timesPerDay, setTimesPerDay] = useState(1);

  // 모달을 열고 닫는 함수
  const toggleModal = () => setModalVisible(!modalVisible);

  // ModalComponent 내부의 onSubmit 함수 수정
  const onSubmit = () => {
    // 여기서 item.itemName을 직접 참조하거나, 다른 방법으로 drugName 값을 설정해야 합니다.
    const drugName = itemName; // itemName이 이 컨텍스트에서 사용 가능한지 확인하세요.

    const payload = {
      medicineName: drugName,
      dailyFrequency: timesPerDay,
      duration: Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)), // 날짜 차이를 일(day) 단위로 계산
      isActive: isTaking,
      startDate: startDate.toISOString(), // ISO 문자열 형식으로 변환
      endDate: endDate.toISOString(), // ISO 문자열 형식으로 변환
    };

    axios
      .post("http://35.216.104.91:8080/medicine/save", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      <Button title="저장하기" onPress={toggleModal} />

      <ModalComponent
        modalVisible={modalVisible}
        onRequestClose={toggleModal}
        drugName={itemName}
        startDate={startDate}
        endDate={endDate}
        isTaking={isTaking}
        onSubmit={onSubmit}
        timesPerDay={timesPerDay}
        onStartDateChange={(event, date) => setStartDate(date)}
        onEndDateChange={(event, date) => setEndDate(date)}
        onTakingPress={() => setIsTaking(true)}
        offTakingPress={() => setIsTaking(false)}
        onTimesPerDayChange={(itemValue, itemIndex) =>
          setTimesPerDay(itemValue)
        }
        accessToken={accessToken} // accessToken을 prop으로 추가
      />
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
