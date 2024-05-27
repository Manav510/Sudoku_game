import{ useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence, withDelay } from 'react-native-reanimated';

interface CellProps {
    value: string;
    editable: boolean;
    isSelected: boolean | null;
    onPress: () => void;
  }
  
  const Cell: React.FC<CellProps> = ({ value, editable, isSelected, onPress }) => {
    const offset = useSharedValue(0);
    const OFFSET = 10;
    const DURATION = 500;
    const DELAY_TIME = 300;
    const scale = useSharedValue(1);
    const animated_style = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value },{scale:scale.value}]
    }));

    useEffect(() => {
        scale.value = withSequence(
            withDelay(DELAY_TIME, withTiming(3, { duration: DURATION / 2 })),
            withTiming(1, { duration: DURATION / 2 })
        );
    }, [value]);
    const handle_press = () => {

        if (editable) {
            onPress(); 
            offset.value = withSequence(
                withTiming(-OFFSET, { duration: DURATION / 2 }),
                withRepeat(withTiming(OFFSET, { duration: DURATION }), 5, true),
                withTiming(0, { duration: DURATION / 2 })
            );
        }
    };

    return (
        <TouchableOpacity onPress={handle_press} activeOpacity={0.6}>
            <View style={[styles.cell,isSelected?styles.highlighted:styles.default_background]}>
                <Animated.Text style={[styles.text, animated_style, !editable && styles.non_editable]}>
                    {value}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    );
};

export default Cell;

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin:1,
    },
    text: {
        fontSize: 16,
    },
    highlighted: {
        backgroundColor: '#89CFF0',
    },
    default_background: {
        backgroundColor: 'white',
    },
    non_editable: {
        color: 'red',
    }
});