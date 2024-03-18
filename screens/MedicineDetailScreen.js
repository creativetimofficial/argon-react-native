// MedicineDetailScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const MedicineDetailScreen = ({ route }) => {
  const { itemName } = route.params;
  const [medicineDetail, setMedicineDetail] = useState(null);

  useEffect(() => {
    const fetchMedicineDetail = async () => {
      try {
        const response = await axios.get(
          `http://35.216.104.91:8080/record/${itemName}`
        );
        setMedicineDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicineDetail();
  }, [itemName]);

  if (!medicineDetail) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{medicineDetail.itemName}</Text>
      {/* 상세 정보 표시 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의
});

export default MedicineDetailScreen;
