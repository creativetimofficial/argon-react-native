// Onboarding.js
import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import KakaoLogin from "../components/KakaoLogin";
import * as Font from "expo-font";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  handleLoginSuccess = () => {
    // 다음 화면으로 이동
    this.props.navigation.navigate("App"); // 다음 화면의 이름으로 변경하세요.
  };

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            // source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image
            source={require("../assets/imgs/logo_sub.png")}
            style={styles.logo}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block style={styles.subTitle}>
                <Text
                  style={{fontFamily: "ArgonExtra", fontWeight: "bold", textAlign: "center", marginTop: 100}}
                  color="gray"
                  size={12}
                >
                  나만의 단골 약사로 약물 위험에서 벗어나세요!
                </Text>
              </Block>
              <Block center style={{ marginTop: 40 }}>
                <Button
                  style={styles.button}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  <Text style={{ fontFamily: "ArgonExtra", color: "white",  fontSize: 18 }}> 시작하기 </Text>
                </Button>
                <KakaoLogin onLoginSuccess={this.handleLoginSuccess} />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontFamily: "ArgonExtra",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: 300,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: "#67B779",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 194,
    height: 210,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
});

export default Onboarding;
