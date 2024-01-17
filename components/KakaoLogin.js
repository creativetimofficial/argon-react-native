import * as AuthSession from "expo-auth-session";
import { useState, useEffect } from "react";
import { Button } from "galio-framework";
import axios from "axios";

const KakaoLogin= () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "9e576a8bbded1fa2161d00ee304cfc6a",
      redirectUri: "exp://172.30.1.13:19000",
    },
    { authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize" }
  );

useEffect(() => {
  if (response?.type === "success") {
    const { code } = response.params;

    // 인가 코드를 백엔드로 전송하는 POST 요청 보내기
    axios
      .post("http://34.64.158.243:8080/login/kakao", {
        code: code,
      })
      .then((response) => {
        // 요청이 성공적으로 처리되었을 때의 동작
        console.log(response.data);
        // 토큰 발급 등의 작업 수행
      })
      .catch((error) => {
        // 요청이 실패했을 때의 동작
        console.error(error);
      });
  }
}, [response]);

  return <Button title="카카오로 로그인하기" onPress={() => promptAsync()} />;
};

export default KakaoLogin;
