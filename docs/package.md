# Packages

We find it fair to share our `package.json` with you! These are the main dependencies used inside Material Kit React Native. 

```
{
  "name": "rn-material-kit-pro",
  "main": "node_modules/expo/AppEntry.js",
  "private": true,
  "scripts": {
    "start": "cross-env REACT_EDITOR=code expo start",
    "android": "cross-env REACT_EDITOR=code expo start --android",
    "ios": "cross-env REACT_EDITOR=code expo start --ios",
    "eject": "expo eject",
    "test": "node ./node_modules/jest/bin/jedst.js --watchAll"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "dependencies": {
    "expo": "^31.0.2",
    "galio-framework": "^0.4.2",
    "react": "16.5.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-31.0.0.tar.gz",
    "react-native-modal-dropdown": "^0.6.2",
    "react-navigation": "^2.18.2"
  },
  "devDependencies": {
    "babel-preset-expo": "^5.0.0",
    "cross-env": "^5.2.0",
    "expo-cli": "^2.4.0",
    "jest-expo": "^31.0.0"
  }
}

```