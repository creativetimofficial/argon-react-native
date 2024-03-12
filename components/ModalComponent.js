import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import RadioButton from "react-native-radio-button";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios"; // 상단에 axios import 추가

// ModalComponent 내부의 onSubmit 함수 수정
const onSubmit = () => {
  const payload = {
    medicineName: drugName,
    dailyFrequency: timesPerDay,
    duration: Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)), // 날짜 차이를 일(day) 단위로 계산
    isActive: isTaking,
    startDate: startDate.toISOString(), // ISO 문자열 형식으로 변환
    endDate: endDate.toISOString(), // ISO 문자열 형식으로 변환
  };

  axios
    .post("http://35.216.104.91:8080/medicine/save", payload)
    .then((response) => {
      console.log("Success:", response.data);
      // 성공적으로 데이터를 전송한 후 필요한 작업 수행
      // 예: 모달을 닫거나 사용자에게 성공 메시지 표시
      setModalVisible(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      // 오류 처리
      // 예: 사용자에게 오류 메시지 표시
    });
};

const ModalComponent = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>복용 정보 입력</Text>
          <Text style={styles.modalText}>{props.drugName}</Text>

          <View style={styles.datePicker}>
            <Text style={styles.modalSubtitle}>복용시작일:</Text>
            <DateTimePicker
              value={props.startDate}
              onChange={props.onStartDateChange}
            />
          </View>

          <View style={styles.datePicker}>
            <Text style={styles.modalSubtitle}>복용마감일:</Text>
            <DateTimePicker
              value={props.endDate}
              onChange={props.onEndDateChange}
            />
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.modalSubtitle}>현재 복용중 여부:</Text>
            <View style={styles.row}>
              <RadioButton
                animation={"bounceIn"}
                isSelected={props.isTaking}
                onPress={props.onTakingPress}
              />
              <Text style={styles.radioText}>Yes</Text>
              <RadioButton
                animation={"bounceIn"}
                isSelected={!props.isTaking}
                onPress={props.offTakingPress}
              />
              <Text style={styles.radioText}>No</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.modalSubtitle}>하루 복용 횟수:</Text>
            <Picker
              selectedValue={props.timesPerDay}
              onValueChange={props.onTimesPerDayChange}
              style={styles.picker}
            >
              <Picker.Item label="1회" value={1} />
              <Picker.Item label="2회" value={2} />
              <Picker.Item label="3회" value={3} />
              <Picker.Item label="4회" value={4} />
              <Picker.Item label="5회" value={5} />
            </Picker>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button title="제출" onPress={props.onSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 15,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: 100,
    fontSize: 16,
  },
});

export default ModalComponent;
