import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import CustomButton from '../components/customButton';
import { useForm} from 'react-hook-form';

export default function Statistics() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const seePredictionsPressed = () => {
    
  };

  return (
    <ImageBackground source={require('../images/plants.webp')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <CustomButton text="See consumption prediction" onPress={handleSubmit(seePredictionsPressed)} />
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