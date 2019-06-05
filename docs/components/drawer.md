# Drawer

Used for navigation purposes, this component is used to style the Drawer component of the react-navigation library.

### Usage
Example of code snippet:
```
Dashboard: {
  screen: HomeStack,
  navigationOptions: (navOpt) => ({
    drawerLabel: ({focused}) => (
      <Drawer focused={focused} screen="Home" title="Home" />
    ),
  }),
},
```

### Props

|   Prop  |  Type  | Default |                                                                  Description                                                                 |
|:-------:|:------:|:-------:|:--------------------------------------------------------------------------------------------------------------------------------------------:|
| focused |  bool  |   null  |                                                                                                                                              |
|  title  | string |   null  | You have the following options: 'Home', 'Woman', 'Man', 'Kids', 'New Collection', 'Profile', 'Settings', 'Components', 'Sign in', 'Sign up'  |

### Want to find out more?
If you'd like to know more about how this works you should totally check out the [react-navigation](https://reactnavigation.org/) library.