import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from a library

export default function HomeScreen() {
  const handleMenuPress = () => {
    console.log('Menu icon pressed');
  };

  const handleFirstButtonPress = () => {
    console.log('First button pressed');
  };

  const handleSecondButtonPress = () => {
    console.log('Second button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>TechAid</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleFirstButtonPress}>
        <Text style={styles.buttonText}>Donate Device</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
        <Text style={styles.buttonText}>Apply for Device</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSecondButtonPress}>
        <Text style={styles.buttonText}>Wifi Donation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  navbar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  navbarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 0,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
    marginTop:5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});