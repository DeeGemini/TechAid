import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
//import { useAuth } from '../context/AuthContext'; // Assuming you have AuthContext

const DashboardScreen = () => {
  const { user } = useAuth();
  const [gadgetName, setGadgetName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleDonate = () => {
    // Add donation logic here
    Alert.alert('Success', 'Gadget donation submitted successfully!');
    // Reset form
    setGadgetName('');
    setDescription('');
    setCondition('');
    setLocation('');
    setImage(null);
  };

  const handleRequest = () => {
    // Navigate to request screen
    Alert.alert('Navigation', 'Navigate to Request Screen');
  };

  const handleWifiConnection = () => {
    // Navigate to WiFi connection screen
    Alert.alert('Navigation', 'Navigate to WiFi Connection Screen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, {user?.fullName || 'User'}</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]} 
          onPress={handleDonate}
        >
          <Text style={styles.navButtonText}>Donate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={handleRequest}
        >
          <Text style={styles.navButtonText}>Request</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={handleWifiConnection}
        >
          <Text style={styles.navButtonText}>WiFi</Text>
        </TouchableOpacity>
      </View>

      {/* Donation Form */}
      <ScrollView style={styles.formContainer}>
        <Text style={styles.formTitle}>Donate a Gadget</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gadget Name</Text>
          <TextInput
            style={styles.input}
            value={gadgetName}
            onChangeText={setGadgetName}
            placeholder="Enter gadget name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your gadget"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Condition</Text>
          <TextInput
            style={styles.input}
            value={condition}
            onChangeText={setCondition}
            placeholder="Enter gadget condition"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
          />
        </View>

        <TouchableOpacity style={styles.imageUploadButton}>
          <Text style={styles.imageUploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleDonate}>
          <Text style={styles.submitButtonText}>Submit Donation</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  navButton: {
    padding: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  activeNavButton: {
    backgroundColor: '#007BFF',
  },
  navButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#007BFF',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageUploadButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;