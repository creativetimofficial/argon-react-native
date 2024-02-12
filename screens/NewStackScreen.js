
import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

class NewStackScreen extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal  />
          <Card item={articles[3]} horizontal />
  
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default NewStackScreen;


// const NewStackScreen = ({ route }) => {
//   const { data } = route.params || {}; // 안전하게 접근

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>약물분석</Text>
//       <Card></Card>
//       {/* 여기서 data를 사용하거나 출력할 수 있음 */}
//     </View>
//   );
// };



// import React from 'react';
// import { StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Block, theme } from 'galio-framework';

// import { Card } from '../components';
// import articles from '../constants/articles';
// const { width } = Dimensions.get('screen');

// class NewStackScreen extends React.Component {
//   renderArticles = () => {
//     return (
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.articles}>
//         <Block flex>
//           <Card item={articles[0]} horizontal  />
//           <Block flex row>
//             <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
//             <Card item={articles[2]} />
//           </Block>
//           <Card item={articles[3]} horizontal />
//           <Card item={articles[4]} full />
//         </Block>
//       </ScrollView>
//     )
//   }

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderArticles()}
//       </Block>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   home: {
//     width: width,    
//   },
//   articles: {
//     width: width - theme.SIZES.BASE * 2,
//     paddingVertical: theme.SIZES.BASE,
//   },
// });

// export default NewStackScreen;


// const NewStackScreen = ({ route }) => {
//   const { data } = route.params || {}; // 안전하게 접근

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>약물분석</Text>
//       <Card></Card>
//       {/* 여기서 data를 사용하거나 출력할 수 있음 */}
//     </View>
//   );
// };


