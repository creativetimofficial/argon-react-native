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
        `http://35.216.104.91:8080/record/${itemCode}`
      );
      setMedicineDetail(response.data);
      console.log("Fetched Medicine Detail:", response.data); // Add this line to log the response
    } catch (error) {
      console.log(error);
    }
  };

  fetchMedicineDetail();
}, [itemCode]);


  if (!medicineDetail) {
    return <ActivityIndicator size="large" />;
  }

  // 정보 표시 함수
  const renderInfoSection = (title, content) => {
    if (!content) return null; // 내용이 없으면 섹션을 렌더링하지 않음

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{content}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{medicineDetail.itemName}</Text>
      {renderInfoSection("효능", medicineDetail.efficiency)}
      {renderInfoSection("주의사항", medicineDetail.warn)}
      {renderInfoSection("부작용", medicineDetail.sideEffect)}
      {renderInfoSection("분류", medicineDetail.typeName)}
      {/* 추가적으로 필요한 섹션들을 여기에 렌더링합니다. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
  },
});

export default MedicineDetailScreen;
