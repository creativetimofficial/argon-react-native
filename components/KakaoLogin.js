import React, { useState } from "react";
import {
  View,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/reducers/authActions";


const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLogin = ({ navigation, onLoginSuccess }) => {
  const dispatch = useDispatch();
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
    var backend_url = "http://35.216.104.91:8080/login/kakao";

    axios({
      method: "post",
      url: backend_url,
      data: {
        authorizationCode: authorizationCode,
      },
    })
      .then(function (response) {
        console.log("Backend Response:", response);
        // 여기서 액세스 토큰을 Redux 스토어에 저장합니다.
        dispatch(setAccessToken(response.data.accessToken));
        // 카카오 로그인이 성공했을 때 콜백 함수 호출
        onLoginSuccess();
      })
      .catch(function (error) {
        console.log("Backend Error:", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleLoginButton}
        style={{
          backgroundColor: "transparent",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/imgs/kakao.png")} />
      </TouchableOpacity>
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
            uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=9e576a8bbded1fa2161d00ee304cfc6a&redirect_uri=http://35.216.104.91:8080/login/kakao",
          }}
          injectedJavaScript={runFirst}
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          pointerEvents={modalVisible ? "auto" : "none"}
          onMessage={(event) => {
            if (
              event.nativeEvent["url"].startsWith(
                "http://35.216.104.91:8080/login/kakao"
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
