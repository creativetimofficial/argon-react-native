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
import { useSelector } from "react-redux";

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

  const onSubmit = () => {
    const payload = {
      medicineName: drugName,
      dailyFrequency: timesPerDay,
      duration: Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)),
      isActive: isTaking,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    console.log("Sending with access token:", accessToken); // Log the access token to verify

    // Include the access token in the request headers
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
        // Log detailed error information
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error data:", error.response.data);
          console.log("Error status:", error.response.status);
          console.log("Error headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message);
        }
        console.log("Error config:", error.config);
      });
  };

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
        onSubmit={onSubmit}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onStartDateChange={(event, date) => setStartDate(date)}
        onEndDateChange={(event, date) => setEndDate(date)}
        onTakingPress={() => setIsTaking(true)}
        offTakingPress={() => setIsTaking(false)}
        onTimesPerDayChange={(itemValue, itemIndex) =>
          setTimesPerDay(itemValue)
        }
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
