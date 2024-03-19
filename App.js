import React, { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import store from './store/store'; // 스토어 파일의 위치에 맞게 경로를 조정하세요.

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, articles, argonTheme } from "./constants";

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];
// cache product images
articles.map((article) => assetImages.push(article.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        //Load Resources
        await _loadResourcesAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          ArgonExtra: require("./assets/font/Orbit-Regular.ttf"),
          KoPubWorldBatang_Pro_Bold: require("./assets/font/KoPubWorld_Batang_Pro_Bold.otf"),
          KoPubWorldBatang_Pro_Light: require("./assets/font/KoPubWorld_Batang_Pro_Light.otf"),
          KoPubWorldBatang_Pro_Medium: require("./assets/font/KoPubWorld_Batang_Pro_Medium.otf"),
          KoPubWorldDotum_Pro_Bold: require("./assets/font/KoPubWorld_Dotum_Pro_Bold.otf"),
          KoPubWorldDotum_Pro_Light: require("./assets/font/KoPubWorld_Dotum_Pro_Light.otf"),
          KoPubWorldDotum_Pro_Medium: require("./assets/font/KoPubWorld_Dotum_Pro_Medium.otf"),
          Gugi: require("./assets/font/Gugi-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onReady={onLayoutRootView}>
        <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    </Provider>
  );
}
