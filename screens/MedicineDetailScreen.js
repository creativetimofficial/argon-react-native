import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

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
    // Add more HTML entities if needed
  };

  return Object.keys(entities)
    .reduce((acc, entity) => {
      const regex = new RegExp(entity, "g");
      return acc.replace(regex, entities[entity]);
    }, str)
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n"); // Decoding and handling quotes and new lines
}

const MedicineDetailScreen = ({ route }) => {
  const { itemName } = route.params;
  const [medicineDetail, setMedicineDetail] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken); // Access token from Redux store

  useEffect(() => {
    const fetchMedicineDetail = async () => {
      try {
        const response = await axios.get(
          `http://35.216.104.91:8080/record/${itemName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token in the header
            },
          }
        );
        setMedicineDetail(response.data);
      } catch (error) {
        console.log("Error fetching medicine detail:", error);
      }
    };
    fetchMedicineDetail();
  }, [itemName, accessToken]);

  if (!medicineDetail) {
    return <ActivityIndicator size="large" />;
  }

  const renderInfoSection = (title, content) => {
    if (!content) return null;
    // Use the decodeHtmlEntity function to decode HTML entities in content
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{decodeHtmlEntity(content)}</Text>
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
