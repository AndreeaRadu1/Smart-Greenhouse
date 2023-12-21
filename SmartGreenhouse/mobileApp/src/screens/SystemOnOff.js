import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function SystemOnOff() {
    return (
    <ImageBackground source={require('../images/plants.webp')} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Text>SystemOnOff</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  
  });