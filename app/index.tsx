import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '@/services/login_service';
import { useUser } from '@/services/user_context';
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
  const { setUser } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(phoneNumber, password);
      setUser(user);
      Alert.alert('Pomyślnie zalogowano', `Witaj ${user.first_name}`);
      const userType = user.type;
      const url = userType === 'senior' ? '/elder' : '/volunteer';
      router.replace(url);
    } catch (error) {
      Alert.alert('Logowanie nie powiodło się', 'Nieprawidłowe dane logowania');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>Ktoś dla Ciebie</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Numer telefonu"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Zaloguj" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  icon: {
    marginRight: 0,
  },
});

export default LoginScreen;