# Button

This components extends [Galio](http://galio.io)'s Button component. 

You will find all of our restyled buttons from material-ui in src/components/Buttons.

### Usage

Simple example:
```
<Button>Press here!</Button>
```
<p align="center">
  <img src="https://raw.githubusercontent.com/creativetimofficial/material-kit-react-native/gh-pages/assets/img/docs/buttons1.png" width="244px" height="268px">
  <img src="https://raw.githubusercontent.com/creativetimofficial/material-kit-react-native/gh-pages/assets/img/docs/buttons2.png" width="275px" height="120px">
</p>

### Props

|              Prop             |     Type     |       Default      |                                              Description                                             |
|:-----------------------------:|:------------:|:------------------:|:----------------------------------------------------------------------------------------------------:|
| ...TouchableOpacity.propTypes |              |                    |                                                                                                      |
| capitalize                    |     bool     |        false       | Transforms the first character in a capital letter                                                   |
| color                         |    string    |      'primary'     |  your options are: 'primary', 'theme', 'error', 'warning', 'succes', 'transparent' or your own color |
| disabled                      |     bool     |        false       |                                          Disables the button                                         |
| icon                          | bool, string |        false       |                             pick whatever icon you want from Expo's icons                            |
| iconColor                     | bool, string | theme.COLORS.BLACK | sets the icon's color                                                                                |
| iconFamily                    | bool, string |        false       | pick whatever icon family suits the icon you chose from Expo's icons                                 |
| iconSize                      |    number    |         14         |                                         sets the icon's size                                         |
| loading                       |     bool     |        false       |                         Uses the <ActivityIndicator /> for the loading effect                        |
| loadingSize                   |    string    |       'small'      |                                  your options are: 'small', 'large'                                  |
| lowercase                     |     bool     |        false       | makes all letters lowercase                                                                          |
| onlyIcon                      |     bool     |        false       | adds specific styling for using only an icon in your button                                          |
| opacity                       |    number    |         0.8        | changes the button's opacity                                                                         |
| radius                        |    number    |          0         | changes the button's radius                                                                          |
| shadowColor                   | bool, string |        false       | the default shadowColor is based on the button's color but you can also write a specific shadowColor |
| shadowless                    |     bool     |        false       | removes shadow                                                                                       |
| size                          |    number    |       'large'      | your options are: 'large', 'small'                                                                   |
| uppercase                     |     bool     |        false       | makes all letters uppercase                                                                          |
| gradient |     bool       |      null              |         applies gradient                                                                                             |


### Galio Buttons
For more props and buttons please check out the [galio buttons section](https://galio.io/docs/#/components/button).