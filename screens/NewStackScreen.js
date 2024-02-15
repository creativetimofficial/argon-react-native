
// import React from 'react';
// import { StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Block, theme } from 'galio-framework';

// import { Card } from '../components';
// import articles from '../constants/articles';
// const { width } = Dimensions.get('screen');

// class NewStackScreen extends React.Component {
//   renderArticles = () => {
//     return (
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.articles}>
//         <Block flex>
//           <Card item={articles[0]} horizontal  />
//         </Block>
//       </ScrollView>
//     )
//   }

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderArticles()}
//       </Block>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   home: {
//     width: width,    
//   },
//   articles: {
//     width: width - theme.SIZES.BASE * 2,
//     paddingVertical: theme.SIZES.BASE,
//   },
// });

// export default NewStackScreen;

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
              <Text style={styles.modalText}>복용 정보 입력</Text>
              <Text>{this.state.drugName}</Text>
              <Text>복용시작일</Text>
              <DateTimePicker
                value={this.state.startDate}
                onChange={(event, date) => this.setState({ startDate: date })}
              />
              <Text>복용마감일</Text>
              <DateTimePicker
                value={this.state.endDate}
                onChange={(event, date) => this.setState({ endDate: date })}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Text>현재 복용중 여부   </Text>
        
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    animation={"bounceIn"}
                    isSelected={this.state.isTaking}
                    onPress={() => this.setState({ isTaking: true })}
                  />
                  <Text>Yes   </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    animation={"bounceIn"}
                    isSelected={!this.state.isTaking}
                    onPress={() => this.setState({ isTaking: false })}
                  />
                  <Text>No</Text>
                </View>
              </View>

              <Picker
                selectedValue={this.state.timesPerDay}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ timesPerDay: itemValue })
                }
                style={{ height: 50, width: 100 }} // 이 부분을 추가해주세요.
              >
                <Picker.Item label="1회" value={1} />
                <Picker.Item label="2회" value={2} />
                <Picker.Item label="3회" value={3} />
                <Picker.Item label="4회" value={4} />
                <Picker.Item label="5회" value={5} />
              </Picker>
              <Button
                title="제출"
                onPress={() => {
                  this.setModalVisible(false);
                  console.log(this.state);
                }}
              />
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default NewStackScreen;
