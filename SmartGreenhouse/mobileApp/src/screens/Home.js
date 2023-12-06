import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/customButton';


export default function Home() {
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();
  
    const onEnableDisablePressed = () => {
      navigation.navigate('SystemOnOff');
    };

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <StatusBar style="auto" />
        <CustomButton text="Enable/Disable system" onPress={handleSubmit(onEnableDisablePressed)} />
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