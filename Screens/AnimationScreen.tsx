import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModelView from "react-native-gl-model-view";

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);
export default function AnimationScreen() {
  // State hooks for non-animated values
  const [zoom, setZoom] = useState(-3);
  const [turns, setTurns] = useState(0);

  // Ref hooks for animated values
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;
  const translateZ = useRef(new Animated.Value(-20)).current;
  const uiPosition = useRef(new Animated.Value(50)).current;

  // Equivalent to componentDidMount
  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(translateZ, {
          toValue: zoom,
          useNativeDriver: true,
          duration: 3500,
          easing: Easing.elastic(1),
        }),
        Animated.timing(uiPosition, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]),
      Animated.timing(rotateX, {
        toValue: 270,
        useNativeDriver: true,
        duration: 5000,
        easing: Easing.elastic(5),
      }),
    ]).start();
  }, []); // Empty dependency array means this effect runs once on mount

  const zoomHandler = (action) => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom + action;
      Animated.timing(translateZ, {
        toValue: newZoom,
        useNativeDriver: true,
        duration: 300,
      }).start();
      return newZoom;
    });
  };

  const goCrazy = () => {
    const crazy = (value, toValue) =>
      Animated.timing(value, {
        toValue,
        useNativeDriver: true,
        duration: Math.random() * 10000,
        easing: Easing.elastic(4),
      });

    Animated.parallel([
      crazy(rotateX, Math.random() * 1000),
      crazy(translateZ, -2 - Math.random() * 3),
      crazy(rotateZ, Math.random() * 1000),
    ]).start();
  };

  const turnAround = () => {
    setTurns((prevTurns) => {
      const newTurns = prevTurns + 1;
      Animated.timing(rotateZ, {
        toValue: newTurns * 180,
        useNativeDriver: true,
        duration: 500,
      }).start();
      return newTurns;
    });
  };

  const renderButton = (label, method) => (
    <TouchableOpacity onPress={method}>
      <Text style={styles.button}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AnimatedModelView
        model={{ uri: 'demon.obj' }}
        texture={{ uri: 'demon.png' }}
        tint={{ r: 1.0, g: 1.0, b: 1.0, a: 1.0 }}
        animate
        flipTexture={false}
        scale={0.01}
        translateZ={translateZ}
        rotateX={rotateX}
        rotateZ={rotateZ}
        style={styles.view}
      />
      <Animated.View style={[styles.buttons, { transform: [{ translateY: uiPosition }] }]}>
        {renderButton('zoom in', () => zoomHandler(0.8))}
        {renderButton('zoom out', () => zoomHandler(-0.8))}
        {renderButton('turn around', turnAround)}
        {renderButton('go crazy', goCrazy)}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    height: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 12,
  },
});
