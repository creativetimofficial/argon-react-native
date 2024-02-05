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
import { createStackNavigator } from "@react-navigation/stack";
import NewStackScreen from "./NewStackScreen"; // 경로를 실제 파일 경로로 변경하세요.
import ImagePickerComponent from "../components/ImagePickerComponent";
import Header from "../components/Header"; // Import the Header component

const Stack = createStackNavigator();

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
      this.setState({ photo, isCameraVisible: true });
    }
  };

  savePhoto = async () => {
    if (!this.state.photo) {
      console.error("저장할 사진이 없습니다.");
      return;
    }

    console.log("사진 저장됨:", this.state.photo.base64);

    const formData = new FormData();
    formData.append("imageFile", {
      uri: this.state.photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch("http://34.64.158.243:8080/medicine", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("사진을 성공적으로 백엔드로 전송했습니다!", response);
      } else {
        console.error("사진을 백엔드로 전송하는 데 실패했습니다.", response);
      }

      const data = await response.json();
      this.props.navigation.push("NewStackScreen", { data: data });
    } catch (error) {
      console.error("사진을 백엔드로 전송 중 오류 발생:", error);

      // 백엔드 제출이 실패하더라도 에러 메시지를 포함하여 NewStackScreen으로 이동합니다.
      this.props.navigation.push("NewStackScreen", {
        error: "백엔드 제출 실패",
      });
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
        {this.state.photo ? (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: this.state.photo.uri }} style={{ flex: 1 }} />
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity onPress={this.retakePicture}>
                <Text style={{ fontSize: 18, color: "black" }}>다시 찍기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.savePhoto}>
                <Text style={{ fontSize: 18, color: "black" }}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
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
                style={{
                  flex: 0.5,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={this.setType}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Flip
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={this.takePicture}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  SNAP
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
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
          {this.state.hasPermission && (
            <View>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={this.openCamera}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Open Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={this.pickImageAndSend}
              >
                <ImagePickerComponent
                  onImageSelected={(selectedImage) => {
                    this.setState({ selectedImage });
                    this.props.navigation.push("NewStackScreen", {
                      selectedImage,
                    });
                  }}
                />
              </TouchableOpacity>
              {this.state.selectedImage && (
                <Image
                  source={{ uri: this.state.selectedImage.uri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              {this.renderCameraModal()}
            </View>
          )}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" >
          {() => (
            <Block flex center style={styles.home}>
              {this.renderArticles()}
            </Block>
          )}
        </Stack.Screen>
        <Stack.Screen name="NewStackScreen" component={NewStackScreen} />
      </Stack.Navigator>
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
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default Home;
