import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
} from "react-native";
import { Block, theme } from "galio-framework";
import ImagePicker from "../components/ImagePickerComponent";
import { Camera } from "expo-camera";

const { width, height } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    isCameraVisible: false,
  };

  componentDidMount() {
    this.getCameraPermission();
  }

  getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  openCamera = () => {
    this.setState({ isCameraVisible: true });
  };

  closeCamera = () => {
    this.setState({ isCameraVisible: false });
  };

  setType = () => {
    this.setState((prevState) => ({
      type:
        prevState.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }));
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const photo = await this.camera.takePictureAsync(options);
      this.setState({ photo, isCameraVisible: false });
    }
  };

  savePhoto = async () => {
    console.log("Saved Photo:", this.state.photo.base64);

    const formData = new FormData();
    formData.append("photo", {
      uri: this.state.photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("사진을 성공적으로 백엔드로 전송했습니다!");
      } else {
        console.error("사진을 백엔드로 전송하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("사진을 백엔드로 전송 중 오류 발생:", error);
    }

    this.setState({ photo: null, isCameraVisible: false });
  };

  retakePicture = () => {
    this.setState({ photo: null });
  };

  renderCameraModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isCameraVisible}
      >
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ flex: 0.5, alignSelf: "flex-end", alignItems: "center" }}
              onPress={this.setType}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 0.5, alignSelf: "flex-end", alignItems: "center" }}
              onPress={this.takePicture}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                SNAP
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {this.state.photo && (
          <View
            style={{
              flex: 0.2,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={this.retakePicture}>
              <Text style={{ fontSize: 18, color: "black" }}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.savePhoto}>
              <Text style={{ fontSize: 18, color: "black" }}>저장</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    );
  };

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block>
          <ImagePicker />
          {this.state.hasPermission && (
            <View>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={this.openCamera}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  카메라 열기
                </Text>
              </TouchableOpacity>
              {this.renderCameraModal()}
            </View>
          )}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  cameraButton: {
    backgroundColor: "purple",
    padding: 20,
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Home;

// import React from 'react';
// import { StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Block, theme } from 'galio-framework';
// import ImagePicker from '../components/ImagePickerComponent'
// import { Card } from '../components';
// import articles from '../constants/articles';
// const { width } = Dimensions.get('screen');

// class Home extends React.Component {
//   renderArticles = () => {
//     return (
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.articles}>
//         <Block flex>
//           <Card item={articles[0]} horizontal  />
//           <Block flex row>
//             <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
//             <Card item={articles[2]} />
//           </Block>
//           <Block>
//             <ImagePicker/>
//           </Block>
//           <Card item={articles[3]} horizontal />
//           <Card item={articles[4]} full />
//         </Block>
//       </ScrollView>
//     )
//   }

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderArticles()}
//       </Block>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   home: {
//     width: width,
//   },
//   articles: {
//     width: width - theme.SIZES.BASE * 2,
//     paddingVertical: theme.SIZES.BASE,
//   },
// });

// export default Home;
