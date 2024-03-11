//galio
import { Block, Text, theme } from "galio-framework";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { FontAwesome } from '@expo/vector-icons';

import React from "react";

//argon
import { Card, Images, argonTheme, articles } from "../constants/";
import DrugRecordCard from "../components/DrugRecordCard";
import SubTitle from "../components/SubTitle";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

// 복용 날짜별로 약 데이터를 그룹화하는 함수
// const groupByIntakeDate = (articles) => {
//   const grouped = {};

//   articles.forEach((article) => {
//     const { startDate, duration } = article;
//     const start = new Date(startDate);
    
//     for (let day = 0; day < duration; day++) {
//       const date = new Date(start);
//       date.setDate(start.getDate() + day);
//       const dateString = date.toLocaleDateString("ko-KR");

//       if (!grouped[dateString]) {
//         grouped[dateString] = [];
//       }

//       grouped[dateString].push(article);
//     }
//   });
//   return grouped;
// };

class Description extends React.Component {
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text center size={14}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  renderCards = () => {
    // const groupedArticles = groupByIntakeDate(articles);

    return (
      <Block flex style={styles.group}>
        <SubTitle title="주의하세요!" description="복약 용량과 기간에 관해 주의가 필요한 약품입니다." iconName="hospital-o" />
        <Block flex style={{ marginTop: theme.SIZES.BASE / 2, marginBottom: theme.SIZES.BASE}}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
            contentContainerStyle={{
              paddingHorizontal: theme.SIZES.BASE / 2,
            }}
          >
            {/* 위험 약물로 변경 */}
            {articles &&
              articles.map((item, index) =>
                this.renderProduct(item, index)
              )}
          </ScrollView>
        </Block>

      
      {/* <SubTitle title="복용 기록" iconName="stethoscope" />
      <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            {Object.entries(groupedArticles).map(([date, articlesForDate], index) => (
              <React.Fragment key={index}>
                <Text style={{marginVertical: 8}}>{date}</Text>
                {articlesForDate.map((article, articleIndex) => (
                  <DrugRecordCard key={articleIndex} item={article} />
                ))}
              </React.Fragment>
            ))}
        </Block>
      </Block> */}
      <SubTitle title="복용 기록" iconName="stethoscope"/>
        <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              {articles.map((article, index) => (
                <DrugRecordCard key={index} item={article} horizontal />
              ))}
          </Block>
        </Block>
    </Block>
  );
};

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER,
  },
  group: {
    paddingTop: theme.SIZES.BASE,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3,
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE,
    // paddingBottom: theme.SIZES.BASE * 2,
  },
});

export default Description;