import React from 'react';
import { Switch, Platform } from 'react-native';

import argonTheme from '../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor = Platform.OS === 'ios' ? null :
      Platform.OS === 'android' && value ? argonTheme.COLORS.SWITCH_ON : argonTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={argonTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: argonTheme.COLORS.SWITCH_ON, true: argonTheme.COLORS.SWITCH_ON }}
        {...props}
      />
    );
  }
}

export default MkSwitch;