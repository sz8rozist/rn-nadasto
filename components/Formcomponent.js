import React, { useState } from "react";
import { Text, TextInput, Button, FAB, Snackbar } from "react-native-paper";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import Adat from "./adatok.json";
import { LinearGradient } from "expo-linear-gradient";

const Formcomponent = ({ navigation }) => {
  const [input, setInput] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState(Adat);
  const [visible, setVisible] = useState(false);
  function handleAdd() {
    let chartArray = [...chartData];
    let exsist = chartArray.some((x) => x.postcode == input);
    let indexOfExsistItem;
    let validate = data.some((x) => x.postcode == input);
    if (!validate) {
      setVisible(true);
    } else {
      setVisible(false);
      if (!exsist) {
        chartArray.push({ postcode: input, db: 1 });
      } else {
        indexOfExsistItem = chartArray.findIndex((x) => x.postcode == input);
        chartArray[indexOfExsistItem].db++;
      }
    }
    setChartData(chartArray);
    setInput(null);
    //console.log(chartData);
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? 'padding' : 'height'}>
    <LinearGradient style={styles.container} colors={["#094d79", "#00d4ff"]}>
      <Snackbar
        style={{ zIndex: 1, backgroundColor: "red"}}
        onDismiss={() => setVisible(false)}
        duration={1500}
        visible={visible}
      >
        Hibás irányítószám!
      </Snackbar>
      <View style={styles.container}>
        <TextInput
          keyboardType="numeric"
          mode="flat"
          value={input}
          theme={{
            colors: { primary: "white", text: "white" },
          }}
          style={{ backgroundColor: "transparent" }}
          onChangeText={(value) => setInput(value)}
        />
        <Button
          onPress={handleAdd}
          mode="contained"
          icon="plus-thick"
          color="#00BFFF"
          labelStyle={{ color: "white" }}
          style={{ marginTop: 25 }}
        >
          Hozzáad
        </Button>
        <FAB
          color="white"
          style={{
            backgroundColor: "#00BFFF",
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          icon="chart-bar"
          onPress={() =>
            chartData == 0
              ? null
              : navigation.navigate("Chartcomponent", { chartData })
          }
        />
      </View>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1,
  },
});
export default Formcomponent;
