import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RouteNames from "src/navigation/RouteNames";

import use_game_store from 'src/store/zustland/store';

const format_time = (total_seconds: number) => {
    const minutes = Math.floor(total_seconds / 60);
    const seconds = total_seconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; 
};
  

const LooserScreen = () => {
  const difficulty_level = use_game_store((state) => state.difficulty);
  const time = use_game_store((state) => state.time);
  const mistakes = use_game_store((state) => state.mistakes);
  const navigation = useNavigation();

  const formatted_time = format_time(time);
  return (
    <LinearGradient
      colors={['#FFA500', '#FFD300']}
      style={styles.container}
    >
      <Text style={styles.header_text}>SORRY</Text>
      
      <Image
        source={require('../../assets/images/looser.png')}
        style={styles.result_image}
      />
      <Text style={styles.tagline}>YOU LOOSE</Text>

      <View style={styles.info_container}>
        <View style={styles.info_item}>
          <Image source={require('../../assets/images/difficulty.png')} style={styles.icon} />
          <View style={styles.info_text_container}>
            <Text style={styles.info_label}>Difficulty:</Text>
            <Text style={styles.info_value}>{difficulty_level}</Text>
          </View>
        </View>
        
        <View style={styles.info_item}>
          <Image source={require('../../assets/images/time.png')} style={styles.icon} />
          <View style={styles.info_text_container}>
            <Text style={styles.info_label}>Time:</Text>
            <Text style={styles.info_value}>{formatted_time}</Text>
          </View>
        </View>

        <View style={styles.info_item}>
          <Image source={require('../../assets/images/mistakes.png')} style={styles.icon} />
          <View style={styles.info_text_container}>
            <Text style={styles.info_label}>Mistakes:</Text>
            <Text style={styles.info_value}>{mistakes}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.navigate(RouteNames.Home)}>
        <Text style={styles.button_text}>Home Page</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header_text: {
    fontSize: 44,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  result_image: {
    width: 300, 
    height: 300, 
    marginBottom: 5 
  },
  tagline: {
    fontSize: 44,
    color: 'white',
    marginBottom: 20,
  },
  info_container: {
    alignItems: 'center',
    width: '100%',
  },
  info_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  info_text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
    width: '80%', 
  },
  info_label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 100
  },
  info_value: {
    fontSize: 25,
    color: 'white',
    textAlign: 'right', 
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  button_text: {
    fontSize: 16,
    color: 'white',
  },
});

export default LooserScreen;