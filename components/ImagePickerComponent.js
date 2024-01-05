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
      type: "image/jpeg", // 이미지 타입이 다르면 변경하세요.
      name: "photo.jpg", // 파일 이름을 원하는 대로 변경하세요.
    });

    try {
      const response = await axios.post(
        "https://your-backend-url.com/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 백엔드로부터의 응답을 처리하세요.
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
      <Button title="카메라 롤에서 이미지 선택" onPress={pickImageAndSend} />
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

// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Text } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import axios from "axios";

// const ImagePickerComponent = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [ocrResult, setOcrResult] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Constants.platform.ios) {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert(
//             "죄송합니다. 이 기능을 사용하려면 카메라 롤 권한이 필요합니다!"
//           );
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.cancelled) {
//       setSelectedImage({ uri: result.uri });
//       callGoogleVisionAsync(result.base64);
//     }
//   };

//   const callGoogleVisionAsync = async (base64) => {
//     try {
//       const response = await axios.post(
//         "https://vision.googleapis.com/v1/images:annotate?key=YOUR_GOOGLE_CLOUD_VISION_API_KEY",
//         {
//           requests: [
//             {
//               image: {
//                 content: base64,
//               },
//               features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
//             },
//           ],
//         }
//       );

//       setOcrResult(response.data.responses[0].fullTextAnnotation.text);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{ backgroundColor: 'white',flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="카메라 롤에서 이미지 선택" onPress={pickImage} />
//       {selectedImage && (
//         <Image
//           source={{ uri: selectedImage.uri }}
//           style={{ width: 200, height: 200 }}
//         />
//       )}
//       {ocrResult && <Text>{ocrResult}</Text>}
//     </View>
//   );
// };

// export default ImagePickerComponent;
