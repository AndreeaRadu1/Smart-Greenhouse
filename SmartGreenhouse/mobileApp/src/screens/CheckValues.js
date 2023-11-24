import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function CheckValues() {
    return (
      <View style={styles.container}>
        <Text>CheckValues</Text>
        <StatusBar style="auto" />
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