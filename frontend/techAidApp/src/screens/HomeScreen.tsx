
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; 

const HomeScreen = () => {
  const handleFirstButtonPress = () => {
    router.push('/signup');
  };

  const handleSecondButtonPress = () => {
    router.push('/signup')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TechAid</Text>
      <TouchableOpacity style={styles.button} onPress={handleFirstButtonPress}>
        <Text style={styles.buttonText}>Donate a Device</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
        <Text style={styles.buttonText}>Apply for device</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
        <Text style={styles.buttonText}>Wifi donation</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default HomeScreen;
