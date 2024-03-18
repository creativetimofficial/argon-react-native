import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, Text, View } from "react-native";
import axios from "axios";
import { Block } from "galio-framework";
import DrugRecordCard from "../components/DrugRecordCard";
import SubTitle from "../components/SubTitle";
import RiskRecordCard from "../components/RiskRecordCard";
import { useSelector } from "react-redux"; // Redux 스토어의 상태에 접근하기 위해 사용

const { width } = Dimensions.get("screen");

function Description() {
  const [records, setRecords] = useState({
    medicineRecords: [],
    riskRecords: [],
  });

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://35.216.104.91:8080/record", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error(
          "Error fetching records: ",
          error.response ? error.response.data : error
        );
      }
    };

    if (accessToken) {
      fetchRecords();
    }
  }, [accessToken]);

  // Check if there are no medicine records
  const hasNoRecords = records.medicineRecords.length === 0;

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Render warning cards for risk records */}
        {records.riskRecords.length > 0 && (
          <>
            <SubTitle title="경고" iconName="warning" />
            {records.riskRecords.map((record, index) => (
              <RiskRecordCard key={`risk-${index}`} record={record} />
            ))}
          </>
        )}

        <SubTitle title="복용 기록" iconName="stethoscope" />
        </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex style={{ marginTop: 20, width: width - 40 }}>
          {hasNoRecords ? (
            <View style={styles.noRecordsContainer}>
              <Text style={styles.noRecordsText}>
                저장된 약물 정보가 없습니다.
              </Text>
              <Text style={styles.noRecordsText}>
                로그인 후 약물 분석을 진행해주세요.
              </Text>
            </View>
          ) : (
            records.medicineRecords.map((record, index) => (
              <DrugRecordCard key={index} item={record} />
            ))
          )}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  noRecordsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noRecordsText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Description;
