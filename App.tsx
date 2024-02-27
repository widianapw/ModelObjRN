/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import ModelView from "react-native-gl-model-view";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen.tsx";
import AnimationScreen from "./Screens/AnimationScreen.tsx";
import GestureControlScreen from "./Screens/GestureControlScreen.tsx";
import RuntimeAssetsScreen from "./Screens/RuntimeAssetsScreen.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AnimationScreen" component={AnimationScreen} />
      <Stack.Screen name={"GestureControlScreen"} component={GestureControlScreen} />
      <Stack.Screen name={"RuntimeAssetsScreen"} component={RuntimeAssetsScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
};


export default App;
