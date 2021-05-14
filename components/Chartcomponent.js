import React, { useState, useEffect, useRef } from "react";
import { Text, Button, List, FAB, Snackbar } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import Adat from "./adatok.json";
import { PieChart } from "react-native-svg-charts";
import { captureRef } from "react-native-view-shot";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";

const Chartcomponent = ({ route }) => {
  const [state, setState] = useState(route.params.chartData);
  const [data, setData] = useState(Adat);
  const [piechartdata, setpiechartdata] = useState([]);
  const Ref = useRef();
  const [fabstate, setfabState] = useState({ open: false });
  const onStateChange = ({ open }) => setfabState({ open });
  const { open } = fabstate;
  const [visible, setVisible] = useState(false);
  //console.log(route.params.chartData)
  function sumDbvalue() {
    let sum = piechartdata.reduce(function (prev, current) {
      return prev + +current.db;
    }, 0);
    return sum;
  }
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );
  useEffect(() => {
    let array = [...piechartdata];
    state.forEach((a) => {
      data.forEach((state) => {
        if (a.postcode == state.postcode) {
          let exsist = array.some((x) => x.city == state.city);
          if (!exsist) {
            console.log(state.city + a.db);
            array.push({ city: state.city, db: a.db, color: randomColor() });
            setpiechartdata(array);
          }
        }
      });
    });
  }, []);
  const pieData = piechartdata.map((value, index) => ({
    value: parseInt(
      Math.floor(
        (parseFloat(value.db) / parseFloat(sumDbvalue())) * 100
      ).toFixed(1)
    ),
    svg: { fill: value.color, onPress: () => console.log(value.city) },
    key: `pie-${index}`,
  }));
  const saveAsImage = async () => {
    try {
      const result = await captureRef(Ref, {
        result: "tmpfile",
        quality: 1,
        format: "png",
        snapshotContentContainer: false,
      });
      MediaLibrary.saveToLibraryAsync(result);
      setVisible(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <LinearGradient style={styles.container} colors={["#094d79", "#00d4ff"]}>
        <Snackbar
          style={{ zIndex: 2, backgroundColor: "green" }}
          onDismiss={() => setVisible(false)}
          duration={1500}
          visible={visible}
        >
          Sikeres Mentés!
        </Snackbar>
        <ScrollView>
          <ViewShot ref={Ref}>
            <PieChart
              style={{ height: 300, marginTop: 100 }}
              data={pieData}
              spacing={10}
              outerRadius={"95%"}
              innerRadius={"50%"}
            />
            <List.Section>
              <List.Subheader style={{ color: "white" }}>
                Részletek
              </List.Subheader>
              {piechartdata.map((adat, index) => (
                <List.Item
                  key={index}
                  titleStyle={{ color: "white" }}
                  style={{ backgroundColor: adat.color }}
                  title={adat.city}
                  right={() => (
                    <Text>
                      {parseInt(
                        Math.floor(
                          (parseFloat(adat.db) / parseFloat(sumDbvalue())) * 100
                        )
                      ).toFixed(0)}
                      %
                    </Text>
                  )}
                />
              ))}
            </List.Section>
          </ViewShot>
        </ScrollView>
        <FAB
          color="white"
          style={{
            backgroundColor: "#00BFFF",
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
          icon="content-save-all"
          onPress={saveAsImage}
        />
      </LinearGradient>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
  },
});
export default Chartcomponent;
