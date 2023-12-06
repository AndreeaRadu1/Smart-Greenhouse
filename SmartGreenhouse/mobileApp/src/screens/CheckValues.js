import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/customButton';


export default function CheckValues() {
    const [temperature, setTemperature] = useState(null);
    const [light, setLight] = useState(null);
    
    const fetchLightData = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/1');
        const data = await response.json();
        if(data.sensors.value == 0){
          setLight('It\' light');
        }else
          setLight('It\' dark');

      } catch (error) {
        console.error('Error fetching light data:', error);
      }
    };

    const fetchTemperatureData = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/4');
        const data = await response.json();
        setTemperature(data.sensors.value);

      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    return (
      <View style={styles.container}>
        <Text>CheckValues</Text>
        <StatusBar style="auto" />
        <Text>Temperature Value: {temperature} °C</Text>
        <CustomButton text="Check temperature" onPress={fetchTemperatureData} />
        <Text>Light Value: {light} </Text>
        <CustomButton text="Check light" onPress={fetchLightData} />
      </View>
      
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });