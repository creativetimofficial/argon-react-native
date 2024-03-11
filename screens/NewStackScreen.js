import React, { useState, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"; 

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Button,
  View,
} from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../components/Card";
import ModalComponent from "../components/ModalComponent";
import DrugCard from "../components/DrugCard"; // DrugCard import 추가

const { width } = Dimensions.get("screen");

const NewStackScreen = () => {
  const navigation = useNavigation(); // useNavigation hook 사용
  const route = useRoute(); // useRoute hook 사용
  const selectedImageData = route.params.selectedImageData;

  const [modalVisible, setModalVisible] = useState(false);
  const [drugName, setDrugName] = useState("약물 이름");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isTaking, setIsTaking] = useState(true);
  const [timesPerDay, setTimesPerDay] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="추가" />
      ),
    });
  }, [navigation]);
const renderCards = () => {
  const data = selectedImageData || []; // selectedImageData 자체가 데이터입니다.

  // 데이터가 2차원 배열이므로, flat 메서드를 사용해 1차원 배열로 만듭니다.
  const flattenedData = data.flat();

  return flattenedData.map((item, index) => {
    // 각 아이템이 배열로 들어있는 경우에 대비해, 배열의 첫 번째 요소를 전달합니다.
    const actualItem = Array.isArray(item) ? item[0] : item;
    console.log("Item:", actualItem); // Add this line to check the item being passed
    return <DrugCard key={index} item={actualItem} />;
  });
};

  return (
    <Block flex center style={styles.home}>
      <ModalComponent
        modalVisible={modalVisible}
        drugName={drugName}
        startDate={startDate}
        endDate={endDate}
        isTaking={isTaking}
        timesPerDay={timesPerDay}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onStartDateChange={(event, date) => setStartDate(date)}
        onEndDateChange={(event, date) => setEndDate(date)}
        onTakingPress={() => setIsTaking(true)}
        offTakingPress={() => setIsTaking(false)}
        onTimesPerDayChange={(itemValue, itemIndex) =>
          setTimesPerDay(itemValue)
        }
        onSubmit={() => {
          setModalVisible(false);
          console.log({ drugName, startDate, endDate, isTaking, timesPerDay });
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>{renderCards()}</Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default NewStackScreen;
