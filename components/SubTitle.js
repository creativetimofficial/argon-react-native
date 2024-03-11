import { Block, Text, theme } from "galio-framework";
import {
  StyleSheet,
  View
} from "react-native";

import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

const SubTitle = ({ title, description, iconName }) => {
  return (
    <View style={styles.container}>
      {iconName && <FontAwesome name={iconName} size={30} color="black" style={styles.icon} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SubTitle;
