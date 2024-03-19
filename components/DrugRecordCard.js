import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DefaultImage from "../assets/imgs/defaultpill.jpg"; // Adjust the path as necessary

const { width } = Dimensions.get("screen");
const DrugRecordCard = ({ item }) => {
  const navigation = useNavigation();
  const [currentImageUri, setCurrentImageUri] = useState(item.image);
  const { itemName, dailyFrequency, startDate, endDate, typeName } = item;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("MedicineDetail", { itemName: itemName })
      }
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={currentImageUri ? { uri: currentImageUri } : DefaultImage} // 이미지 URI가 있다면 네트워크 이미지를 사용하고, 그렇지 않으면 기본 이미지를 사용합니다.
            style={styles.image}
            onError={() => setCurrentImageUri(null)} // 이미지 로딩에 에러가 발생하면 기본 이미지로 변경합니다.
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>이름: {itemName}</Text>
          <Text style={styles.text}>일일 투여 횟수: {dailyFrequency}</Text>
          <Text style={styles.text}>시작일: {startDate}</Text>
          <Text style={styles.text}>종료일: {endDate}</Text>
          <Text style={styles.text}>분류: {typeName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
});

export default DrugRecordCard;
