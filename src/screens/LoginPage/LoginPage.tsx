import React from 'react';
import {  Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { loginSchema, LoginForm } from './validation';
import useUserStore from '../../store/zustland/authStore';
import RouteNames from 'src/navigation/RouteNames';

const { width } = Dimensions.get('window'); 

const LoginPage: React.FC = () => {
  const {  handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const navigation: any = useNavigation();
  const login = useUserStore((state) => state.login);

  const on_submit = (data: LoginForm) => {
    login(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image  source={require('../../assets/images/logo.png')} style={styles.logo}></Image>
      <Text style={styles.titleText}>Login Your Account</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue('username', text)}
        placeholder="Enter your username"
      />
      <Text style={styles.error}>{errors.username?.message}</Text>

      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setValue('password', text)}
        placeholder="Enter your password"
      />
      <Text style={styles.error}>{errors.password?.message}</Text>
      <View style={styles.sign}>
      <Text style={styles.signup_text}>Don't have an account?</Text>
      <Text style={styles.link_text} onPress={() => navigation.navigate(RouteNames.Signup)}>Sign Up</Text>
      </View>
      

      <TouchableOpacity style={styles.button} onPress={handleSubmit(on_submit)}>
        <Text style={styles.button_text}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFA500',  
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',  
    marginBottom: 20,
    alignSelf: 'center'
  },
  label: {
    color: '#333',  
    marginBottom: 10,
    alignSelf: 'center'

  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    width: width * 0.8, 
    alignSelf: 'center',
    borderRadius: 10
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center'
  },
  signup_text: {
    fontSize: 16,
    color: '#FFFFFF',  
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5
  },
  link_text: {
    color: '#333',  
    fontSize: 16
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    width: width * 0.5, 
    alignSelf: 'center'
  },
  logo: {
    width: width * 0.8, 
    height: 200,
    resizeMode: 'contain', 
    alignSelf: 'center',
    marginBottom: 20,
  },
  button_text: {
    color: '#FFFFFF',  
    fontSize: 16
  },
  sign: {
    flexDirection: 'row',  
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default LoginPage;