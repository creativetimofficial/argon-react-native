import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Block } from "galio-framework";
import DrugRecordCard from "../components/DrugRecordCard";
import SubTitle from "../components/SubTitle";
import RiskRecordCard from "../components/RiskRecordCard";
import { fetchRecords } from "../store/actions/recordActions";

const Description = () => {
  const dispatch = useDispatch();
  // useSelector로 상태를 가져올 때 안전하게 접근하기 위해 기본값 설정
  const { riskRecords = [], medicineRecords = [] } = useSelector(
    (state) => state.records.records || {}
  );

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false}>
        {riskRecords.length > 0 && (
          <>
            <View style={{ marginVertical: 10 }}></View>
            <SubTitle title="경고" iconName="warning" />
            {riskRecords.map((record, index) => (
              <RiskRecordCard key={`risk-${index}`} record={record} />
            ))}
          </>
        )}

        <SubTitle title="복용 기록" iconName="stethoscope" />
        <Block flex style={{ marginTop: 20, alignItems: "center" }}>
          {medicineRecords.length === 0 ? (
            <View style={styles.noRecordsContainer}>
              <Text style={styles.noRecordsText}>
                저장된 약물 정보가 없습니다.
              </Text>
              <Text style={styles.noRecordsText}>
                로그인 후 약물 분석을 진행해주세요.
              </Text>
            </View>
          ) : (
            medicineRecords.map((record, index) => (
              <DrugRecordCard key={`med-${index}`} item={record} />
            ))
          )}
        </Block>
      </ScrollView>
    </Block>
  );
};

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
