# Switch

This component extends React Native's native Switch component. All props are available.

### Usage
Simple example:
```

toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

<Switch
  value={this.state['switch-1']}
  onValueChange={() => this.toggleSwitch('switch-1')}
/>
```
<p align="center">
  <img src="https://raw.githubusercontent.com/creativetimofficial/material-kit-react-native/gh-pages/assets/img/docs/switch.png" width="424.2px" height="107.8px">
</p>


### Props

|         Prop        | Type | Default | Description |
|:-------------------:|:----:|:-------:|:-----------:|
|        value        | bool |   null  |             |
| [...Switch.propTypes](https://facebook.github.io/react-native/docs/switch#docsNav)                             |

### Switch
This was built using React Native's Switch component on which you can find more about clicking [here](https://facebook.github.io/react-native/docs/switch).