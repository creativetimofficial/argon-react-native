import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";
import axios from "axios";
import { Block } from "galio-framework";
import DrugRecordCard from "../components/DrugRecordCard";
import SubTitle from "../components/SubTitle";
import { useSelector } from "react-redux"; // Redux 스토어의 상태에 접근하기 위해 사용

const { width } = Dimensions.get("screen");

function Description() {
  const [records, setRecords] = useState({
    medicineRecords: [],
    riskRecords: [],
  });

  // Redux 스토어에서 액세스 토큰 가져오기
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // 요청 헤더에 엑세스 토큰 추가
        const response = await axios.get("http://35.216.104.91:8080/record", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRecords(response.data);
      } catch (error) {
        // 오류 로그를 좀 더 상세하게 출력
        console.error(
          "Error fetching records: ",
          error.response ? error.response.data : error
        );
      }
    };

    if (accessToken) {
      fetchRecords();
    }
  }, [accessToken]); // 의존성 배열에 accessToken 추가

  return (
    <Block flex>
      <View style={{ paddingTop: 20 }}>
        <SubTitle title="복용 기록" iconName="stethoscope" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={{ marginTop: 20, width: width - 40 }}>
          {records.medicineRecords.map((record, index) => (
            <DrugRecordCard key={index} item={record} />
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
}

export default Description;
