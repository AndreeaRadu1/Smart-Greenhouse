import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/customButton';


export default function CheckValues() {
    const [light, setLight] = useState(null);
    const [soilMoisture, setSoilMoisture] = useState(null);
    const [airHumidity, setAirHumidity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [pump, setPump] = useState(null);
    const [fan, setFan] = useState(null);
    
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

    const fetchSoilMoistureData = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/2');
        const data = await response.json();
        if(data.sensors.value){
          setSoilMoisture('Water detected');
        }else
          setSoilMoisture('No water detected');

      } catch (error) {
        console.error('Error fetching soil moisture data:', error);
      }
    };

    const fetchAirHumidityData = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/3');
        const data = await response.json();
        setAirHumidity(data.sensors.value);

      } catch (error) {
        console.error('Error fetching air humidity data:', error);
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

    const activatePump = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/5');
        const data = await response.json();
        if(response)
          setPump('The plants were watered');

      } catch (error) {
        console.error('Unable to activate pump:', error);
      }
    };

    const activateFan = async () => {
      try {
        const response = await fetch('http://192.168.100.109:5000/api/6');
        const data = await response.json();
        if(response)
          setFan('The plants were cooled');

      } catch (error) {
        console.error('Unable to activate fan:', error);
      }
    };

    return (
      <View style={styles.container}>
        <Text>CheckValues</Text>
        <StatusBar style="auto" />
        <Text>Light Value: {light} </Text>
        <CustomButton text="Check light" onPress={fetchLightData} />
        <Text>Soil Moisture Value: {soilMoisture} </Text>
        <CustomButton text="Check soil moisture" onPress={fetchSoilMoistureData} />
        <Text>Air Humidity Value: {airHumidity} %</Text>
        <CustomButton text="Check air humidity" onPress={fetchAirHumidityData} />
        <Text>Temperature Value: {temperature} °C</Text>
        <CustomButton text="Check temperature" onPress={fetchTemperatureData} />
        <Text>Turn on water pump: {pump}</Text>
        <CustomButton text="Turn on water pump" onPress={activatePump} />
        <Text>Turn on fan: {fan}</Text>
        <CustomButton text="Turn on fan" onPress={activateFan} />
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