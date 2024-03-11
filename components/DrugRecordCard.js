import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const DrugRecordCard = ({ item }) => {
  const { medicineName, dailyFrequency, duration, startDate, endDate, isActive, image, typeName } = item;

  const calculateDrugIntakeDates = (startDate, duration) => {
    const intakeDates = [];
    const start = new Date(startDate);
    
    for (let day = 0; day < duration; day++) {
      const date = new Date(start);
      date.setDate(start.getDate() + day);
      
      intakeDates.push(date.toLocaleDateString("ko-KR")); 
    }

    return intakeDates;
  };

  const drugIntakeDates = calculateDrugIntakeDates(startDate, duration);

  return (
  <View style={styles.card}>
    <View style={styles.contentContainer}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>이름 {medicineName}</Text>
        <View style={styles.periodContainer}>
          <FontAwesome name="calendar" size={12} color="#6a6c6c" style={styles.calendarIcon} />
          <Text style={styles.period}> <Text style={styles.lightText}>{startDate} ~ {endDate}</Text> | <Text style={styles.boldText}>총{duration}일</Text></Text>
        </View>
        <Text style={styles.boldText}>위험 분류 {typeName}</Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    elevation: 5,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start' 
  },
  imageContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80, 
    height: 60, 
    resizeMode: "cover",
    borderRadius: 5
  },
  icon: {
    width: 68, 
    height: 19, 
    marginTop: 5
  },
  statusText: {
    marginTop: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5, 
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  calendarIcon: {
    marginRight: 5,
  },
  period: {
    fontSize: 12,
    marginBottom: 5,
  },
  lightText: {
    color: '#6a6c6c', 
    fontSize: 12,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#171717', 
  }
});

export default DrugRecordCard;