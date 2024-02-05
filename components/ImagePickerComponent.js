import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { withNavigation } from "@react-navigation/compat";

const ImagePickerComponent = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "죄송합니다. 이 기능을 사용하려면 카메라 롤 권한이 필요합니다!"
          );
        }
      }
    })();
  }, []);

  const pickImageAndSend = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
      sendImageToBackend(result.uri);
    }
  };

  const sendImageToBackend = async (imageUri) => {
    const formData = new FormData();
    formData.append("imageFile", {
      uri: imageUri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await axios.post(
        "http://34.64.158.243:8080/medicine",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 백엔드로부터의 응답을 처리하세요.
      console.log(response.data);

      // 이미지 선택 후에 새로운 스택창을 띄웁니다.
      navigation.push("NewStackScreen", { selectedImage });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button
        title="이미지 선택"
        style={{ fontSize: 18, color: "white" }}
        onPress={pickImageAndSend}
      />
    </View>
  );
};

export default withNavigation(ImagePickerComponent);
