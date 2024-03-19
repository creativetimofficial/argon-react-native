import React, { useState, useLayoutEffect, useEffect } from "react";
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
import { useSelector } from "react-redux"; // Import useSelector
import ModalComponent from "../components/ModalComponent";
import DrugCard from "../components/DrugCard";
import axios from "axios";

const { width } = Dimensions.get("screen");

const NewStackScreen = () => {
  const accessToken = useSelector((state) => state.auth.accessToken); // Access token from Redux store
  const navigation = useNavigation();
  const route = useRoute();
  const selectedImageData = route.params.selectedImageData;

  const [modalVisible, setModalVisible] = useState(false);
  const [drugName, setDrugName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isTaking, setIsTaking] = useState(true);
  const [timesPerDay, setTimesPerDay] = useState(1);

   
  const renderCards = () => {
    const data = selectedImageData || []; // selectedImageData 자체가 데이터입니다.

    // 데이터가 2차원 배열이므로, flat 메서드를 사용해 1차원 배열로 만듭니다.
    const flattenedData = data.flat();

    // NewStackScreen 컴포넌트 내에서 DrugCard 렌더링 부분
    return flattenedData.map((item, index) => {
      const actualItem = Array.isArray(item) ? item[0] : item;
      return (
        <DrugCard key={index} item={actualItem} accessToken={accessToken} />
      ); // accessToken을 prop으로 추가
    });
  };

  return (
    <Block flex center style={styles.home}>
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
