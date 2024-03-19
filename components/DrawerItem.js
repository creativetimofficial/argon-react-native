import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Icon from "./Icon";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {

  iconColor = "#67B779";

  renderIcon = () => {
    const { title, focused } = this.props;

    const iconColor = focused ? "white" : this.iconColor;

    switch (title) {
      case "홈":
        return (
          <Icon
            name="home"
            family="FontAwesome"
            size={14}
            color={iconColor}
          />
        );
      case "복용 기록 확인":
        return (
          <Icon
            name="history"
            family="MaterialIcons"
            size={14}
            color={iconColor}
          />
        );
      case "복용 알람":
        return (
          <Icon
            name="bell"
            family="Feather"
            size={14}
            color={iconColor}
          />
        );
      case "중독 위험도":
        return (
          <Icon
            name="warning"
            family="MaterialIcons"
            size={14}
            color={iconColor}
          />
        );
      case "프로필":
        return (
          <Icon
            name="account-circle"
            family="MaterialIcons"
            size={14}
            color={iconColor}
          />
        );
      case "Getting Started":
        return (<Icon
          name="spaceship"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : "rgba(0,0,0,0.5)"}
        />);
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == "Getting Started"
            ? Linking.openURL(
                "https://demos.creative-tim.com/argon-pro-react-native/docs/"
              ).catch(err => console.error("An error occurred", err))
            : navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: "#67B779",
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
