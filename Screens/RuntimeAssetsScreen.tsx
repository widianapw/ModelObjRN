import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import ModelView from 'react-native-gl-model-view';
import { Buffer } from 'buffer';
import axios from 'axios';

const octetStreamHeader = 'data:application/octet-stream;base64,';

const RuntimeAssetsScreen = () => {
  const [model, setModel] = useState(null);
  const [texture, setTexture] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContentFromUrl = useCallback(async (url, decode = false) => {
    try {
      const res = await axios({
        method: 'get',
        url,
        responseType: 'blob',
      });
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () =>
          resolve(decode ? new Buffer(fileReader.result, 'base64') : fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(res.data);
      });
    } catch (error) {
      console.error('Error fetching content from URL', error);
      throw error;
    }
  }, []);

  const formatContent = useCallback((uri, header) => {
    return `${header}${uri.substring(octetStreamHeader.length)}`;
  }, []);

  const fetchDemonFromNetwork = useCallback(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getContentFromUrl(
        'https://github.com/rastapasta/react-native-gl-model-view/raw/master/example/data/demon.model',
      ).then(content => formatContent(content, 'data:geometry/model;base64,')),
      getContentFromUrl(
        'https://github.com/rastapasta/react-native-gl-model-view/raw/master/example/data/demon.png',
      ),
    ])
      .then(binaries => {
        setModel(binaries[0]);
        setTexture(binaries[1]);
        setLoading(false);
      })
      .catch(e => {
        setError(e || new Error('Something unexpected has happened.'));
        setLoading(false);
      });
  }, [getContentFromUrl, formatContent]);

  const renderModel = useCallback(() => {
    const textureSrc = { uri: texture };
    const modelSrc = { uri: model };
    return (
      <ModelView
        style={{ flex: 1 }}
        model={modelSrc}
        texture={textureSrc}
        scale={0.01}
        translateZ={-2.5}
        rotateX={270}
        rotateY={0}
        rotateZ={0}
        animate
      />
    );
  }, [model, texture]);

  const renderControls = useCallback(() => {
    return (
      <View style={styles.controls}>
        {loading && <ActivityIndicator />}
        {!loading && (
          <TouchableOpacity
            style={styles.controlBox}
            disabled={loading}
            onPress={fetchDemonFromNetwork}>
            <Text style={error ? styles.controlTextError : styles.controlText}>
              {error ? 'Retry' : 'Load'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [loading, error, fetchDemonFromNetwork]);

  return <View style={styles.container}>{model && texture ? renderModel() : renderControls()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  controlTextError: {
    color: 'red',
    fontSize: 30,
  },
  controlText: {
    color: 'black',
    fontSize: 30,
  },
});

export default RuntimeAssetsScreen;
