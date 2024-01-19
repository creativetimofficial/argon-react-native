import React, { useState } from "react";
import { View, Button, Modal } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginButton = () => {
    setModalVisible(true);
  };

  function LogInProgress(data) {
    const exp = "code=";
    var condition = data.indexOf(exp);

    if (condition !== -1) {
      var request_code = data.substring(condition + exp.length);
      console.log("Authorization Code:", request_code);
      sendAuthCodeToBackend(request_code);
    }
  }

  const sendAuthCodeToBackend = async (authorizationCode) => {
    var backend_url = "http://34.64.158.243:8080/login/kakao";

    axios({
      method: "post",
      url: backend_url,
      data: {
        authorizationCode: authorizationCode,
      },
    })
      .then(function (response) {
        console.log("Backend Response:", response);
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log("Backend Error:", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="로그인" onPress={handleLoginButton} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <WebView
          originWhitelist={["*"]}
          scalesPageToFit={false}
          style={{ flex: 1 }}
          source={{
            uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9e576a8bbded1fa2161d00ee304cfc6a&redirect_uri=http://34.64.158.243:8080/login/kakao",
          }}
          injectedJavaScript={runFirst}
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          pointerEvents={modalVisible ? "auto" : "none"}
          onMessage={(event) => {
            if (
              event.nativeEvent["url"].startsWith(
                "http://34.64.158.243:8080/login/kakao"
              )
            ) {
              LogInProgress(event.nativeEvent["url"]);
              setModalVisible(false);
            }
          }}
        />
      </Modal>
    </View>
  );
};

export default KakaoLogin;
