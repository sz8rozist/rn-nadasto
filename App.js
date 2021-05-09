import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";
import Formcomponent from "./components/Formcomponent";
import Chartcomponent from "./components/Chartcomponent";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Kezdőlap"
          screenOptions={{ headerTransparent: true }}
        >
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
            }}
            name="Chartcomponent"
            component={Chartcomponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
