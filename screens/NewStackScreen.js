import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Button,
  Modal,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../components";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButton from "react-native-radio-button";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("screen");

class NewStackScreen extends React.Component {
  state = {
    modalVisible: false,
    drugName: "약물 이름",
    startDate: new Date(),
    endDate: new Date(),
    isTaking: true,
    timesPerDay: 1,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => this.setModalVisible(true)} title="추가" />
      ),
    });
  }

  renderCards() {
    const { route } = this.props;
    const { data, error } = route.params || {};

    if (error) {
      return <Text>{error}</Text>;
    }

    return data.map((item, index) => (
      <Card key={index} item={item} horizontal />
    ));
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>복용 정보 입력</Text>
              <Text style={styles.modalText}>{this.state.drugName}</Text>

              <View style={styles.datePicker}>
                <Text style={styles.modalSubtitle}>복용시작일:</Text>
                <DateTimePicker
                  value={this.state.startDate}
                  onChange={(event, date) => this.setState({ startDate: date })}
                />
              </View>

              <View style={styles.datePicker}>
                <Text style={styles.modalSubtitle}>복용마감일:</Text>
                <DateTimePicker
                  value={this.state.endDate}
                  onChange={(event, date) => this.setState({ endDate: date })}
                />
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.modalSubtitle}>현재 복용중 여부:</Text>
                <View style={styles.row}>
                  <RadioButton
                    animation={"bounceIn"}
                    isSelected={this.state.isTaking}
                    onPress={() => this.setState({ isTaking: true })}
                  />
                  <Text style={styles.radioText}>Yes</Text>
                  <RadioButton
                    animation={"bounceIn"}
                    isSelected={!this.state.isTaking}
                    onPress={() => this.setState({ isTaking: false })}
                  />
                  <Text style={styles.radioText}>No</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.modalSubtitle}>하루 복용 횟수:</Text>
                <Picker
                  selectedValue={this.state.timesPerDay}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ timesPerDay: itemValue })
                  }
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
                <Button
                  title="제출"
                  onPress={() => {
                    this.setModalVisible(false);
                    console.log(this.state);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>{this.renderCards()}</Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30, // 모달 창과 화면 가장자리 사이의 여백 조절
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30, // 모달 창 내부의 여백 조절
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
    marginBottom: 20, // 요소들 사이의 여백 조절
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20, // 요소들 사이의 여백 조절
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
    alignItems: "center", // 이 부분이 추가되었습니다.
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
    flex: 1, // 이 부분이 추가되었습니다.
  },
  picker: {
    height: 40,
    width: 100,
    fontSize: 16,
  },
});

export default NewStackScreen;
