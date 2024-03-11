import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { withNavigation } from "@react-navigation/compat";

const ImagePickerComponent = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);

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

  // ImagePickerComponent
  useEffect(() => {
    if (selectedImageData) {
      navigation.push("NewStackScreen", {
        selectedImageData: selectedImageData,
      });
    }
  }, [selectedImageData]);

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
        "http://34.64.161.34:8080/medicine",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 1000000000, // 10초 시간 제한 설정
        }
      );


      // Handle response from backend
      console.log(response.data);
      setSelectedImageData(response.data);

      // Open a new stack screen after image selection
      navigation.push("NewStackScreen", {
        selectedImageData: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.cameraButton, styles.greenButton]}
      onPress={pickImageAndSend}
    >
      <Text style={styles.buttonText}>이미지로</Text>
      <Text style={styles.buttonText}>분석하기</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5, // Adjust margin as needed
    borderRadius: 15, // Add border radius for rounded corners
    overflow: "hidden", // Ensure content stays within rounded borders
    elevation: 5, // Add shadow elevation
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15, // Adjust this value as needed to control the button height
    borderRadius: 15, // Make it round
    backgroundColor: "purple",
    marginVertical: 20,
    height: 100, // Fixed height for the button
  },
  greenButton: {
    backgroundColor: "#67B779"
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontFamily: "ArgonExtra",
  },
};

export default withNavigation(ImagePickerComponent);
