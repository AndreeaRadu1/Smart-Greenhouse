import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/customButton';

export default function SystemOnOff() {
    const [systemOn, setSystemOn] = useState(null);
    const [systemOff, setSystemOff] = useState(null);
    
    const turnSystemOn = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/7');
        const data = await response.json();
        if(response)
          setSystemOn('System on');

      } catch (error) {
        console.error('Unable to turn system on:', error);
      }
    };

    const turnSystemOff = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/8');
        const data = await response.json();
        if(response)
          setSystemOff('System off');

      } catch (error) {
        console.error('Unable to turn system off:', error);
      }
    };

    return (
    <ImageBackground source={require('../images/plants.webp')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Turn System on or off</Text>
        <StatusBar style="auto" />
        <CustomButton text="Turn system on" onPress={turnSystemOn} />
        <CustomButton text="Turn system off" onPress={turnSystemOff} />
        
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
    header: {
      position: 'absolute',
      top: 240,
      fontWeight: '700',
      fontSize: 20,
      color: '#754d17',
    }
  
  });