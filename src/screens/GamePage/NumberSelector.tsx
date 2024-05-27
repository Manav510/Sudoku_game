import { View, Text, TouchableOpacity } from 'react-native';

import styles from './GamePageStyles';

interface NumberSelectorProps {
  selected_number: number | null; 
  on_select_number: (number: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ selected_number, on_select_number }) => {
  return (
    <View style={styles.number_container}>
      {Array.from({ length: 9 }, (_, index) => index + 1).map(number => (
        <TouchableOpacity
          key={number}
          style={selected_number === number ? styles.selected_number : styles.number}
          onPress={() => on_select_number(number)}
        >
          <Text style={styles.number_text}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NumberSelector;