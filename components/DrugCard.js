import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import ModalComponent from "./ModalComponent";
import { addRecord } from "../store/actions/recordActions";

// decodeHtmlEntity 함수를 적용하여 출력
const renderTextWithNewLines = (text) => {
  const formattedText = decodeHtmlEntity(text);
  return formattedText.split("\n").map((line, index) => (
    <Text key={index} style={styles.text}>
      {line}
    </Text>
  ));
};

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


// 컴포넌트의 props에서 item을 받아오도록 수정
const DrugCard = ({ item }) => {
  const { itemName, image, efficiency, warn, sideEffect, typeName } = item; // item 객체에서 필요한 데이터 추출
  const accessToken = useSelector((state) => state.auth.accessToken); // Redux 스토어에서 accessToken 가져오기

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isTaking, setIsTaking] = useState(true);
  const [timesPerDay, setTimesPerDay] = useState(1);

  const dispatch = useDispatch();

  const onSubmit = (newRecord) => {
    // newRecord 객체 구조를 확인하고 적절히 구성해야 함
    dispatch(addRecord({ ...newRecord, accessToken })); // Redux 액션 디스패치
    setModalVisible(false);
  };

  // 모달을 열고 닫는 함수
  const toggleModal = () => setModalVisible(!modalVisible);

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
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onTakingPress={() => setIsTaking(true)}
        offTakingPress={() => setIsTaking(false)}
        onTimesPerDayChange={setTimesPerDay}
        // accessToken을 ModalComponent에 전달할 필요 없음
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
