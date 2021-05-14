import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text, Image, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Formcomponent from "./components/Formcomponent";
import Chartcomponent from "./components/Chartcomponent";
import Logo from './logo.png'
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const Stack = createStackNavigator();
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true 
      }
    ).start();
  }, [fadeAnim])
  function splashScren({navigation}){
    setTimeout(()=>{
      navigation.replace('Formcomponent') //Stack Name
    },3300);
    return (
      <LinearGradient style={styles.container}  colors={["#094d79", "#00d4ff"]}>
      <Animated.View style={{opacity: fadeAnim}}>
          <Image source={Logo} />
      </Animated.View>
      </LinearGradient>
    )
  }
  return (
    <>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{ headerTransparent: true }}
        >
          <Stack.Screen
            name="splashScren"
            component={splashScren}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              title: "Nádastó Statisztika",
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
            }}
            name="Formcomponent"
            component={Formcomponent}
          />
          <Stack.Screen
            options={{
              title: "Statisztika",
              headerTitleStyle: { color: "white" },
              headerTintColor: "white",
              headerBackTitle: "Vissza"
            }}
            name="Chartcomponent"
            component={Chartcomponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
  },
});
