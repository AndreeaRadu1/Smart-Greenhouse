import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import HomeButton from '../components/homeButton';


export default function Home() {
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();
  
    const onEnableDisablePressed = () => {
      navigation.navigate('SystemOnOff');
    };

    const onCheckValuesPressed = () => {
      navigation.navigate('CheckValues');
    };

    const onSeeStatisticsPressed = () => {
      navigation.navigate('Statistics');
    };

    return (
      <ImageBackground source={require('../images/plants.webp')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <HomeButton text="Enable/Disable system" onPress={handleSubmit(onEnableDisablePressed)} />
          <HomeButton text="Check values" onPress={handleSubmit(onCheckValuesPressed)} />
          <HomeButton text="See statistics" onPress={handleSubmit(onSeeStatisticsPressed)} />
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