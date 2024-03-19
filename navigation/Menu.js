import { Block, Text, theme } from "galio-framework";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Icon } from 'react-native-vector-icons/MaterialIcons'; 

import { DrawerItem as DrawerCustomItem } from "../components";
import Images from "../constants/Images";
import React from "react";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = ["홈", "복용 기록 확인", "프로필"];
  const focusedColor = "#67B779";

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo}/>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.routeNames[state.index] === item}
                focusedColor={focusedColor}
              />
            );
          })}
          <DrawerCustomItem/>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
