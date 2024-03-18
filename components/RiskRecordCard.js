// RiskRecordCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RiskRecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{record.itemName}</Text>
      <Text style={styles.warning}>{record.warn}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffcccc", // Light red background for warning
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default RiskRecordCard;
