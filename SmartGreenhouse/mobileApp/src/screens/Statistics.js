import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import CustomButton from '../components/customButton';
import { useForm} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
// import { callPython } from 'react-native-call-python-function';


export default function Statistics() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedValue, setSelectedValue] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const seePredictionsPressed = async () => {
    try {
      const response = await fetch('http://192.168.19.145:5000/api/7');
      if(response)
        setPrediction(response);

    } catch (error) {
      console.error('Unable to fetch predictions:', error);
    }
  };

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const options = [
    { label: 'January', value: 'january' },
    { label: 'February', value: 'february' },
    { label: 'March', value: 'march' },
    { label: 'April', value: 'april' },
    { label: 'May', value: 'may' },
    { label: 'June', value: 'june' },
    { label: 'July', value: 'july' },
    { label: 'August', value: 'august' },
    { label: 'September', value: 'september' },
    { label: 'October', value: 'october' },
    { label: 'November', value: 'november' },
    { label: 'December', value: 'december' },

  ];

  return (
    <ImageBackground source={require('../images/plants.webp')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNPickerSelect
            placeholder={placeholder}
            items={options}
            onValueChange={(value) => setSelectedValue(value)}
            value={selectedValue}
            style={{
              ...styles.pickerInput,
              placeholder: { ...styles.pickerInput.placeholder},
            }}
          />
        </View>

        <CustomButton text="See consumption prediction" onPress={handleSubmit(seePredictionsPressed)} />
        <Text>
          {selectedValue && prediction[selectedValue] && (
            <Text>Prediction: {prediction[selectedValue]}</Text>
          )}
        </Text>
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
    pickerInput: {
      inputIOS: {
        fontSize: 16,
        textAlign: 'center',
        color: '#754d17',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '700',
      },
      inputAndroid: {
        fontSize: 16,
        textAlign: 'center',
        color: '#754d17',
        marginVertical: 10, 
        fontSize: 20,
        fontWeight: '700',
      },
      placeholder: {
        fontSize: 20,
        fontWeight: '700',
        color: '#754d17',
      },
    },
    header: {
      position: 'absolute',
      top: 240,
    }
  });