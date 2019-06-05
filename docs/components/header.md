# Header

This components extends [Galio](http://galio.io)'s NavBar component.

This has the same props as the NavBar component but the whole navigation and programming logic is written inside of it. For any changes regarding routes or icons you would have to edit the component's code. This is super easy to do being the fact that our components are beautifully written.

### Usage
Simple example:
```
<Header
  search
  options
  title="Title"
  optionLeft="Option 1"
  optionRight="Option 2"
  navigation={this.props.navigation} />
```
<p align="center">
  <img src="https://raw.githubusercontent.com/creativetimofficial/material-kit-react-native/gh-pages/assets/img/docs/header.png" width="308px" height="329px">
</p>


### Props

|      Prop     |     Type     |      Default      |                          Description                          |
|:-------------:|:------------:|:-----------------:|:-------------------------------------------------------------:|
| back          | bool         | false             | Adds a back button for your navBar.                           |
| transparent   | bool         | false             | Sets the backgroundColor and borderColor to 'transparent'     |
| title         | node, string | null              | Title of the NavBar                                           |
| titleStyle    | object       | null              | Sets the styling for the title                                |
| left          | node         | null              | Left side of the NavBar                                       |
| leftStyle     | object       | null              | Sets the styling for the View wrapping the left side element. |
| leftIconColor | string       | theme.COLORS.ICON | Sets the color of the left side's icon.                       |
| onLeftPress   | function     | () => {}          | Function for the left side of the navbar                      |
| right         | node         | null              | Right side of the NavBar                                      |
| rightStyle    | object       | null              | Sets the styling for the View wrapping the left side element. |
|      optionLeft     | string | 'Categories' |             |
|     optionRight     | string | 'Best Deals' |             |
|         tabs        |  array |     null     | array of objects following the next template: {id: 'example', title: 'Example'}            |
|       tabIndex      | number |     null     |             |
|        white        |  bool  |     false    |             |
|       search        |  bool  |     false    |             |

### Header Component

For more props and information please check out the [galio NavBar section](https://galio.io/docs/#/components/navbar).