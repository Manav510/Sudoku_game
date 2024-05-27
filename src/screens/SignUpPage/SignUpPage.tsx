
import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, SignupForm } from './validation';
import useUserStore from '../../store/zustland/authStore';

const { width } = Dimensions.get('window'); // Get the width of the screen

const Signup: React.FC = () => {
  const { handleSubmit, setValue, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema)
  });
  const sign_up = useUserStore((state) => state.signup);

  const fields: Array<"username" | "email" | "password" | "confirm_password"> = ['username', 'email', 'password', 'confirm_password'];

  const onSubmit = async (data: SignupForm) => {
    console.log("Signup Data:", data);
    await sign_up({ username: data.username, password: data.password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.titleText}>Create Your Account</Text>

      {fields.map((field, index) => (
        <React.Fragment key={field}>
          <TextInput
            style={styles.input}
            secureTextEntry={field.includes('password')}
            onChangeText={(text) => setValue(field, text, { shouldValidate: true })}
            placeholder={`Enter your ${field.split('_').join(' ')}`}
          />
          <Text style={styles.error}>{errors[field]?.message}</Text>
        </React.Fragment>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>SIGN UP</Text>
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
    marginBottom: 15,
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
    color: '#333',
    fontSize: 12,
    alignSelf: 'center'
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  logo: {
    width: width * 0.8, 
    height: 200,
    resizeMode: 'contain', 
    alignSelf: 'center',
    marginBottom: 20,
  }
});

export default Signup;