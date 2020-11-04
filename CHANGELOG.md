## [1.6.0] 2020 - 11 - 04
### Updated dependencies
- updated `expo-asset@8.1.5` to `expo-asset@8.2.0`
- updated `expo-font@8.1.0` to `expo-font@8.3.0`
- updated `react-native-gesture-handler@1.6.0` to `react-native-gesture-handler@1.7.0`
- updated `react-native-reanimated@1.7.0` to `react-native-reanimated@1.13.0`
- updated `react-native-screens@2.2.0` to `react-native-screens@2.10.1`
- updated `react-native-safe-area-context@0.7.3` to `react-native-safe-area-context@3.1.4`
- updated `@react-native-community/maksed-view@0.1.6` to `@react-native-community/maksed-view@0.1.10`
- updated `react-native SDK@37.0.0` to `react-native SDK@39.0.0`
- updated `react@16.9.0` to `react@16.13.1`
- updated `babel-preset-expo@8.2.1` to `babel-preset-expo@8.3.0`
- updated `expo SDK@37.0.0` to `expo SDK@39.0.0`
- updated `galio-framework@0.6.3` to `galio-framework@0.7.1`
- changed the git source for react-native-modal-dropdown

### Updated files
- Profile.js - fixed elements regarding the Photo Album
- Elements.js - ScrollView fixed by adding width, PR accepted which removed a duplicate styling [#24](https://github.com/creativetimofficial/argon-react-native/pull/24)
- App.js - fixed Invariant Violation via PR [#29](https://github.com/creativetimofficial/argon-react-native/pull/29)

## [1.5.0] 2020 - 06 - 04
### Updated dependencies
- updated `expo-asset@8.0.0` to `expo-asset@8.1.5`
- updated `expo-font@8.0.0` to `expo-font@8.1.0`
- updated `react-native-gesture-handler@1.5.0` to  `react-native-gesture-handler@1.6.0`
- updated `react-native-reanimated@1.4.0` to `react-native-reanimated@1.7.0`
- updated `react-native-screens@2.0.0-alpha.12` to `react-native-screens@2.2.0`
- updated `react-native-safe-area-context@0.6.0` to `react-native-safe-area-context@0.7.3`
- updated `@react-native-community/masked-view@0.1.5` to `@react-native-community/masked-view@0.1.6`
- updated `react-native SDK@36.0.0` to `react-native SDK@37.0.0`
- updated `babel-preset-expo@7.0.0` to `babel-preset-expo@8.2.1`
- updated `Expo @36.0.0` to `Expo @37.0.0`

### Updated files
- used hooks for App.js
- moved `assets/font/argon.json` to `assets/config/argon.json` in order to make sure there wouldn't be any issue with the build for Android

## [1.4.0] 2020 - 03 - 05
### Removed dependencies
- removed `react-navigation@3.11.0`

### Added dependencies
- added `@react-navigation/compat@5.0.0`
- added `@react-navigation/drawer@5.0.0`
- added `@react-navigation/native@5.0.0`
- added `@react-navigation/stack@5.0.0`
- added `@react-native-community/masked-view@0.1.5`
- added `react-native-reanimated@1.4.0`
- added `react-native-safe-area-context@0.6.0`
- added `react-native-screeens@2.0.0-alpha.12`

### Updated dependencies
- updated `expo@35.0.0` to `expo@36.0.0`
- updated `expo-asset@7.0.0` to `expo-asset@8.0.0`
- updated `expo-font@7.0.0` to `expo-font@8.0.0`
- updated `expo-cli@2.4.0` to `expo-cli@3.11.7`
- updated `expo-linear-gradient@7.0.0` to `expo-linear-gradient@8.0.0`
- updated `react@16.8.3` to `react@16.9.0`

### Updated files
- changed the whole routing from `Screens.js` because `react-navigation@5.0.0` has a new dynamic API
- changed `Menu.js` for a new Drawer custom component
- changed `DrawerItem.js` for a new type of `<DrawerCustomItem />`
- changed props and variables so that the new `react-navigation` API could work with the following files: `Beauty.js`, `Header.js`, `Product.js`, `Gallery.js`, `Pro.js`, `Product.js`, `Settings.js`, `Register.js`, `Onboarding.js`

## [1.3.0] 2019-11-06
### Updated dependencies
- `expo@34.0.3` to `expo@35.0.0`
- `expo-font@6.0.1` to `expo-font@7.0.0`
- `expo-asset@6.0.0` to `expo-asset@7.0.0`
- `react-native SDK@34.0.0` to `react-native SDK@35.0.0`
- `galio-framework@0.6.1` to `galio-framework@0.6.3`
- `babel-preset-expo@5.0.0` to `babel-preset-expo@7.0.0`

### Updated files
- changed drawer items in order to have a similar look to the PRO version

## [1.2.0] 2019-09-18
### Updated dependencies
- `expo@33.0.0` to `expo@34.0.3`
- `expo-font@5.0.1` to `expo-font@6.0.1`
- added `expo-asset@6.0.0`
- `react-native SDK@33.0.0` to `react-native SDK@34.0.0`
- added `react-native-gesture-handler@1.3.0`
- `galio-framework@0.5.3` to `galio-framework@0.6.1`

## [1.1.0] 2019-06-21
### Updated dependencies
- `expo@32.0.0` to `expo@33.0.0`
- `galio-framework@0.5.1` to `galio-framework@0.5.3`
- `react-native SDK@32.0.0` to `react-native SDK@33.0.0`
- `react-navigation@3.8.1` to `react-navigation@3.11.0`
- `react@16.5.0` to `react@16.8.3`
- added `expo-font@5.0.1`


## [1.0.0] 2019-06-07
### Initial Release
