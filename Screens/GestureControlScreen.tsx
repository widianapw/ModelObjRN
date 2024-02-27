import React, { useState, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import ModelView from 'react-native-gl-model-view';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

const GestureControlScreen = () => {
  const [rotateX, setRotateX] = useState(new Animated.Value(-90));
  const [rotateZ, setRotateZ] = useState(new Animated.Value(0));
  const [fromXY, setFromXY] = useState(undefined);
  const valueXY = useRef([0, 0]).current; // Using useRef to persist value across renders

  const onMoveEnd = () => {
    setFromXY(undefined);
  };

  const onMove = (e) => {
    let { pageX, pageY } = e.nativeEvent;
    if (!fromXY) {
      setFromXY([pageX, pageY]);
      valueXY[0] = rotateZ.__getValue();
      valueXY[1] = rotateX.__getValue();
    } else {
      rotateZ.setValue(valueXY[0] + (pageX - fromXY[0]) / 2);
      rotateX.setValue(valueXY[1] + (pageY - fromXY[1]) / 2);
    }
  };

  return (
    <AnimatedModelView
      model={{
        uri: 'demon.model',
      }}
      texture={{
        uri: 'demon.png',
      }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={onMoveEnd}
      onResponderMove={onMove}
      animate={!!fromXY}
      tint={{ r: 1.0, g: 1.0, b: 1.0, a: 1.0 }}
      scale={0.01}
      rotateX={rotateX}
      rotateZ={rotateZ}
      translateZ={-4}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default GestureControlScreen;
