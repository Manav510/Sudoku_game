import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash"
import { useNavigation } from '@react-navigation/native';

import RouteNames from "src/navigation/RouteNames";
import use_game_store from "src/store/zustland/store";
import useUserStore from "src/store/zustland/authStore";

const HomePage: React.FC = () => {
  const { difficulty, set_difficulty } = use_game_store();
  const navigation = useNavigation();
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const isLoggedIn = useUserStore((state) => state.logout)
  const changeDifficulty = (direction: number) => {
    const currentIndex = difficulties.indexOf(difficulty);
    const nextIndex = (currentIndex + direction + difficulties.length) % difficulties.length;
    set_difficulty(difficulties[nextIndex]);
  };
  const logout =() => {
    isLoggedIn();
  }
  return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo}></Image>
          <Text style={styles.title}>Super Sudoku</Text>
          <View style={styles.top_section}>
                <TouchableOpacity onPress={() => changeDifficulty(-1)} style={styles.arrow_button}>
                    <Text style={styles.arrow_text}>&lt;</Text>
                </TouchableOpacity>
                <Text style={styles.difficulty_text}>{difficulty}</Text>
                <TouchableOpacity onPress={() => changeDifficulty(1)} style={styles.arrow_button}>
                    <Text style={styles.arrow_text}>&gt;</Text> 
                </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(RouteNames.Game)}>
              <Text style={styles.button_text}>PLAY</Text>
          </TouchableOpacity>
      </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFA500'

  },
  title: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  top_section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
difficulty_text: {
    fontSize: 38,
    fontWeight: 'bold',
    marginHorizontal: 10,
},
arrow_button: {
    padding: 10,
    borderRadius: 10,
},
arrow_text: {
    fontSize: 44,
    color: '#333',
},
button: {
  backgroundColor: '#333',  
  paddingVertical: 12,       
  paddingHorizontal: 24,     
  borderRadius: 50,           
  alignItems: 'center',      
  justifyContent: 'center',  
  marginBottom: 10,
  width: 200          
},
button_text: {
  color: 'white',            
  fontSize: 20,              
  fontWeight: 'bold'      
},
logoutButton: {
  position: 'absolute',
  right: 10,
  top: 10,
  padding: 8
},
logoutText: {
  fontSize: 20,
  color: 'black'
}
});