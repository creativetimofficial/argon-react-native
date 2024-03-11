import React from "react";
import Header from "../components/Header";
import {
  ImageBackground,
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
import { createStackNavigator } from "@react-navigation/stack";
import NewStackScreen from "./NewStackScreen";
import { Card } from "../components";
import articles from "../constants/articles";
import { Camera } from "expo-camera";
import ImagePickerComponent from "../components/ImagePickerComponent";
const Stack = createStackNavigator();
const { width, height } = Dimensions.get("screen");

class Home extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    isCameraVisible: false,
    selectedImage: null,
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
      console.error("No photo to save.");
      return;
    }

    console.log("Photo saved:", this.state.photo.base64);

    const formData = new FormData();
    formData.append("imageFile", {
      uri: this.state.photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch("http://34.64.161.34:8080/medicine", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("Photo successfully sent to backend!", response);
        const data = await response.json();
        this.props.navigation.push("NewStackScreen", { data });
      } else {
        console.error("Failed to send photo to backend.", response);
        throw new Error("No response received from the backend.");
      }
    } catch (error) {
      console.error("Error while sending photo to backend:", error);

      // Even if backend submission fails, move to NewStackScreen with error message.
      this.props.navigation.push("NewStackScreen", {
        error: "Backend submission failed",
      });
    }

    this.setState({ photo: null, isCameraVisible: false });
  };

  retakePicture = () => {
    this.setState({ photo: null });
  };

  pickImageAndSend = async () => {
    this.props.navigation.push("NewStackScreen", { data }); 
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
                <Text style={{ fontSize: 18, color: "black" }}>다시찍기</Text>
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
        <Block flex row style={{ marginVertical: 250 }}>
          {this.state.hasPermission && (
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Block style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.cameraButton, styles.greenButton]}
                  onPress={this.openCamera}
                >
                  <Text style={styles.buttonText}>사진으로</Text>
                  <Text style={styles.buttonText}>분석하기</Text>
                </TouchableOpacity>
              </Block>
              <Block style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.cameraButton, styles.greenButton]}
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
              </Block>
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
        <Block flex style={{ marginTop: -200 }}>
          <TouchableOpacity
            style={[
              styles.cameraButton,
              styles.greenButton,
              styles.buttonContainer,
              { marginVertical: -56, marginHorizontal: 5 },
            ]}
            onPress={this.openCamera}
          >
            <Text style={[styles.buttonText]}>이 약 먹어도 될까?</Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: "단골약사",
            headerShown: false
          }}
        >
          {() => (
          <ImageBackground source={require("../assets/imgs/backg2.png")} style={{width: '100%', height: '100%'}}>
            <Block flex center style={styles.home}>
              {this.renderArticles()}
            </Block>
          </ImageBackground>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NewStackScreen"
          component={NewStackScreen}
          options={{
            title: "약물 분석 결과",
          }}
        />
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
    justifyContent: "flex-end"
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5, // Adjust margin as needed
    borderRadius: 15, // Add border radius for rounded corners
    overflow: "hidden", // Ensure content stays within rounded borders
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Add shadow elevation for Android
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15, // Adjust this value as needed to control the button height
    borderRadius: 10, // Make it round
    backgroundColor: "purple",
    marginVertical: 20,
    height: 150, // Fixed height for the button
  },
  greenButton: {
    backgroundColor: "#67B779"
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontFamily: "ArgonExtra",
  },
});

export default Home;
