import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const handleFirstButtonPress = () => {
    console.log('First button pressed');
  };

  const handleSecondButtonPress = () => {
    console.log('Second button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TechAid</Text>
      <TouchableOpacity style={styles.button} onPress={handleFirstButtonPress}>
        <Text style={styles.buttonText}>First Button</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
        <Text style={styles.buttonText}>Second Button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});