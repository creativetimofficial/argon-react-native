import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import KakaoLogin from "../components/KakaoLogin";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
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
            source={require("../assets/imgs/argon-logo-onboarding.png")}
            style={styles.logo}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text color="green" size={60}>
                  My own
                </Text>
              </Block>
              <Block>
                <Text color="green" size={60}>
                  Pharmasist
                </Text>
              </Block>
              <Block style={styles.subTitle}>
                <Text color="gray" size={16}>
                  나만의 단골약사로 약물의 위험에서 벗어나세요
                </Text>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={"yellow"}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  이동버튼
                </Button>
                <KakaoLogin />
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
    backgroundColor: "white"
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: 200,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
