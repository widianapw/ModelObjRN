import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

const WidiButton = (props) => {
  return <TouchableOpacity onPress={props.onPress} style={{
    paddingHorizontal:16,
    paddingVertical:8,
    backgroundColor:"blue",
    borderRadius:8,
    marginTop:8
  }}>
    <Text style={{
      color:"white",
      textAlign:"center",
      textTransform:"uppercase"
    }}>
      {props.title}
    </Text>
  </TouchableOpacity>
}
export default function HomeScreen({navigation}){
  return <View style={{
    padding:16
  }}>
    <WidiButton
      onPress={() => {
        navigation.navigate("AnimationScreen")
      }}
      title={"Animated"}/>
    <WidiButton
      onPress={() => {
        navigation.navigate("GestureControlScreen")
      }}
      title={"Gesture Control"}/>
    <WidiButton
      onPress={() => {
        navigation.navigate("RuntimeAssetsScreen")
      }}
      title={"Runtime Assets (From URL)"}/>
  </View>
}
