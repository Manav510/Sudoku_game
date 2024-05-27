import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface RulesModalProps {
    isVisible: boolean;
    onClose: () => void; 
    onOutsidePress: () => void;
  }

const RulesModal: React.FC<RulesModalProps> = ({ isVisible, onClose, onOutsidePress }) => {
    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={onOutsidePress}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Game Rules:</Text>
          <Text style={styles.ruleText}>- Complete the grid so each row, column, and 3x3 box contains every digit from 1 to 9.</Text>
          <Text style={styles.gameplayHeader}>GAMEPLAY</Text>
          <Text style={styles.gameplayStep}>1. Touch an empty slot</Text>
          <Text style={styles.gameplayStep}>2. Select a number to replace it</Text>
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ruleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  gameplayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  gameplayStep: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFA500', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 15,
    width: 100
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default RulesModal;
