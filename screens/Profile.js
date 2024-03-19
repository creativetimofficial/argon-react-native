import React from "react";
import { connect } from "react-redux"; // Redux 스토어에 연결하기 위해 필요
import axios from "axios";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import * as Font from "expo-font";

const { width, height } = Dimensions.get("screen");

class Profile extends React.Component {
  state = {
    profileImage: "",
    nickname: "",
  };

  componentDidMount() {
    this.fetchProfileData();
    console.log("accessToken", this.props.accessToken);
  }

  fetchProfileData = async () => {
    const { accessToken } = this.props; // Redux 스토어에서 액세스 토큰을 props로 받아옵니다.

    if (!accessToken) {
      console.log("No accessToken found. User is not logged in.");
      return; // Early return if no accessToken is present
    }

    try {
      const response = await axios.get("http://35.216.104.91:8080/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 액세스 토큰 추가
        },
      });
      this.setState({
        profileImage: response.data.profileImage,
        nickname: response.data.nickname,
      });
      console.log("프로필 성공", response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  render() {
    const { profileImage, nickname } = this.state;

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: profileImage || Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}></Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text
                      bold
                      size={28}
                      color="#435334"
                      style={{ fontFamily: "KoPubWorldDotum_Pro_Bold" }}
                    >
                      {nickname || "로그인이 필요합니다"}
                    </Text>
                    <Text
                      size={12}
                      color="#435334"
                      style={{
                        marginTop: 10,
                        fontFamily: "KoPubWorldDotum_Pro_Light",
                      }}
                    >
                      나만의 단골 약사로 약물 위험에서 벗어나세요!
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle></Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderRadius: 8,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
    fontFamily: 'KoPubWorldDotum_Pro_Bold', 
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
});

// Redux 스토어의 상태를 컴포넌트의 props로 매핑하는 함수
const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});

// connect 함수를 사용해 Redux 스토어와 Profile 컴포넌트를 연결
export default connect(mapStateToProps)(Profile);
