import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
      callGoogleVisionAsync(result.base64);
    }
  };

  const callGoogleVisionAsync = async (base64) => {
    try {
      const response = await axios.post(
        "https://vision.googleapis.com/v1/images:annotate?key=MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXf+PZIO59WbGV\nCGFWZfORzURXDZJaJYGtCzcGKWHX4vMzfRLkid0PQABmR5LPpAZXGWlEKB4qKsOK\nLg/Nbrk2s0XMfnMtI1YpMO0dVy9w6II5c3hfJBj60uHsL1dtph+L6DI3MaWtd2lo\n/8+zOX+1F0dpsotG1+WFw4K6ZHibW2lRCa9xpgDemC0PvU3A1CnHwhbkOY+4OFWf\nxdoH5NxIkk/uHD9nS/6OtAY4G4HEaiCH1cigGyHi/HLOmhFk0ms2ed4syMYGbqC1\n/+BeeRrx1ehIZ/mt4iFITQ+c+PB/4AKKR80LqT551UQgCVMZyv4MFhX/xafQWn87\nAj7h8QDbAgMBAAECggEAZtcp+YcdOSXSOOCYbx5VSAnQ6MhZxPpsMZQODLs37cpp\nLHOuTfE61RnCdw0GE2BgBDXkxfltN8tTqMBFm1CRQ/j2wNnBhlN8PUkThzKBudzD\ntL4VvjWgVCbKWSfYjcO+/0numOdw/ODlJY4a5Rl2CApVcqwZilPivVypqODkq6Jp\nteuhEVAqRSYSdHKqM/PxTHyvTHqFi9laIJ5Sx1ut/59d/n+/ecGdsGM9taWYjOc3\nHdAOeS5j/a1eVurYucSSRroIsl0hykbCxWb0f/Uzv7+lXaFAuQeh7LFhA8pDsaaG\nv2xD0qUbKZe/XX1HGMIA3LwO3zU2aDIMcQPaGdEZEQKBgQD+JjlzTzUocQkCvEuR\nFkKpYm0cBP+eCd9xhuZCLwoMt+VK1z0q3I+XEgdLmW/Et5WDLBA4JdDldgfRpf4s\no+fO9p8Y1N0gMzbw2W1/v0Kaze+SF3uH05eArih/JR87395wZgIHPy6ukK8ahvJb\nbAfqibUcH6DQcq4lsBYNEaEEsQKBgQDZEZ3AhTHd6/2x6Vp19eSAswLCmtCdes4a\n4K58dSAH+Mgukc4EpWDgXigFA1TYeJBEYCloFMjxgkeM//vTCReYtPOEBoGxDU7u\n0VLEGU2xJF3/OEXnP5PubfjsLuzTnHsFejS+w6KV+oCwOmzhQkWFRWHoiGR6I9P0\nDWcFxnrxSwKBgBqGcsiOI8Ysxfv7GwfxgtOa6jhabTNZZHC825tcvXfGWbAN9txa\nWMIzp39EbF3jqz8dgjPZ/ot0XiyLXpPaJ396TfCRhuKtdbZ9eugyVglCJRbiTIpI\nky9i/ecHQNNG8jhY7S1EcuLVRvFF1FWmWM0pwjVFN8uJrJNSZXrHtD6BAoGAbsnP\n8xfIKNUuyaQpWHVk5871xK9RdF7eXNd6FumMrKTsPuCJ/tMNi9ZipJRbtJRsRYmy\n+H1LRgBRVoS8WayVT4pjk2nivaPmOnu5u36Sqau/Eej9vJY1gYa9eoZEt4hxPY1u\n6EJfdB7Dma5oLdwuMWQFIbKjXbd1kWVZxJfV3dsCgYEAgXQjxKOlhnNgoMhUOq4P\nLPHCVh0uCAjkLoxREzEwLO9Roa+7xv5/Za5wsbaV1WbiebNnPCol5seWTepHD1Z4\nS/9gtoD8P/74f3pde2y2gCfH61Z6EKTjv9uj6sXeL13zA4yKYP6kuswRy6P9UHbs\njB8R5f4mi1vN/MosheONPCw=",
        {
          requests: [
            {
              image: {
                content: base64,
              },
              features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
            },
          ],
        }
      );

      setOcrResult(response.data.responses[0].fullTextAnnotation.text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button title="카메라 롤에서 이미지 선택" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {ocrResult && <Text>{ocrResult}</Text>}
    </View>
  );
};

export default ImagePickerComponent;
