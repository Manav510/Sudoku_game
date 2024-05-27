import  { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import _ from 'lodash'; 
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import styles from './GamePageStyles';
import Cell from './Cells';
import NumberSelector from './NumberSelector';
import constants from '../../utils/constants'
import use_game_store from 'src/store/zustland/store';
import RouteNames from "src/navigation/RouteNames";
import RulesModal from 'src/assets/modals/RulesModal';

interface Cell {
  value: string;
  editable: boolean;
}

interface SelectedCell {
  row: number;
  col: number;
}
type SudokuPuzzle = Cell[][];

interface fetch_data_params {
  set_sudoku_puzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>;
  set_error: React.Dispatch<React.SetStateAction<Error | null>>;
  set_loading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Fetch_result_params {
  set_ans_puzzle: React.Dispatch<React.SetStateAction<string>>;
  set_error: React.Dispatch<React.SetStateAction<Error | null>>;
  set_loading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GamePage: React.FC = () => {
  const [sudoku_puzzle, set_sudoku_puzzle] = useState<SudokuPuzzle>([]);
  const [ans_puzzle, set_ans_puzzle] = useState<string>('');
  const [selected_cell, set_selected_cell] = useState<SelectedCell | null>(null);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState<Error | null>(null);
  const [time_remaining, set_time_remaining] = useState(600);
  const [mistakes, set_mistakes] = useState(0);
  const [selected_number, set_selected_number] = useState<number | null>(null);
  const [is_rules_modal_visible, set_is_rules_modal_visible] = useState(false);
  const [timer_paused, set_timer_paused] = useState(false);
  const navigation = useNavigation();

  const difficulty_level = use_game_store((state) => state.difficulty);
  const set_store_mistake = use_game_store((state) =>state.set_mistake);
  const set_store_time_left = use_game_store((state) => state.set_time_left);
  const fetch_data = async ({ set_sudoku_puzzle, set_error, set_loading }: fetch_data_params) => {
    const options = {
      method: 'GET',
      url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
      params: { difficulty: difficulty_level },
      headers: {
        'X-RapidAPI-Key': constants['X-RapidAPI-Key'],
        'X-RapidAPI-Host': constants['X-RapidAPI-Host']
      }
    };
  
    try {
      const response = await axios.request(options);
      
      set_sudoku_puzzle(parse_puzzle(response.data.puzzle));
    } catch (err) {
      set_error(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.log("question");

    } finally {
      
      set_loading(false);
    }
  }; 

  const fetch_result = async ({ set_ans_puzzle, set_error, set_loading }: Fetch_result_params) => {
    
    const current_puzzle = _.flattenDeep(sudoku_puzzle).map(cell => cell.value || '.').join('');

    console.log(current_puzzle);
    const options = {
      method: 'GET',
      url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/solve',
      params: { puzzle:  current_puzzle},
      headers: {
        'X-RapidAPI-Key': constants['X-RapidAPI-Key'],
        'X-RapidAPI-Host': constants['X-RapidAPI-Host']
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data); 
      console.log(typeof(response.data.solution));
      set_ans_puzzle(response.data.solution);
    } catch (err) {
      set_error(err instanceof Error ? err : new Error('An unknown error occurred'));
      
    } finally {
      
      set_loading(false);
    }
  }; 

  useEffect(() => {
    if (loading) {
      set_is_rules_modal_visible(true);
    }
  }, [loading]);

  useEffect(() => {
    fetch_data({ set_sudoku_puzzle: set_sudoku_puzzle, set_error: set_error, set_loading: set_loading });
  }, []);

  useEffect(() => {
  if (sudoku_puzzle.length > 0) {  
    fetch_result({ set_ans_puzzle: set_ans_puzzle, set_error: set_error, set_loading: set_loading });
  }
}, [sudoku_puzzle]);

useEffect(() => {
  let interval: NodeJS.Timeout;;

  if (!timer_paused && time_remaining > 0) {
    interval = setInterval(() => {
      set_time_remaining(time => time - 1);

      if (time_remaining === 1) {
        clearInterval(interval);
        navigation.navigate(RouteNames.Looser)
      }
    }, 1000);
  } else {
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [time_remaining, timer_paused]); 
const rules_toggle =() => {
  set_is_rules_modal_visible(!is_rules_modal_visible);
  set_timer_paused(!is_rules_modal_visible);
}
  const parse_puzzle = (puzzle_string:string) => {
    let size = 9;
    return _.chunk(puzzle_string.split(''), size).map(row =>
      row.map(cell => ({
        value: cell === '.' ? '' : cell,
        editable: cell === '.'
      }))
    );
  };

  const handle_cell_press = (row:number, col:number) => {
    set_selected_cell({ row, col });
  };

  const number_select = (selected_number: number) => {
    if (!selected_cell || !sudoku_puzzle[selected_cell.row][selected_cell.col].editable) return;
    const new_puzzle = _.cloneDeep(sudoku_puzzle);
    new_puzzle[selected_cell.row][selected_cell.col].value = selected_number.toString();
    set_sudoku_puzzle(new_puzzle);
  };

  const handle_submit = async () => {
    const current_puzzle = _.flattenDeep(sudoku_puzzle).map(cell => cell.value || '.').join('');
    set_store_time_left(time_remaining)
      if (current_puzzle === ans_puzzle) {
        navigation.navigate(RouteNames.Winner)
      } else {
        set_mistakes(prevMistakes => {
          const newMistakes = prevMistakes + 1;
          set_store_mistake(newMistakes);
          if (newMistakes === 4) {
            navigation.navigate(RouteNames.Looser);
          }
          return newMistakes;
        });
      }

  };

  if (error) return <Text>Error fetching data: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
  <ScrollView>
    <View style={styles.header}>
      <Text style={styles.title}>{difficulty_level}</Text>
      <Text style={styles.mistakes}>Mistake: {mistakes}/3</Text>
      <Text style={styles.timer}>{Math.floor(time_remaining / 60)}:{("0" + time_remaining % 60).slice(-2)}</Text>
    </View>
    {sudoku_puzzle.map((row, rowIndex) => (
      <Animated.View key={rowIndex} style={[styles.row,(rowIndex + 1) % 3 === 0 && rowIndex !== sudoku_puzzle.length - 1 ? styles.gapRow : null]} >
        {row.map((cell, colIndex) => (
          <View
          key={`${rowIndex}-${colIndex}`}
          style={[
            (colIndex + 1) % 3 === 0 && colIndex !== row.length - 1 ? styles.gapColumn : {}
          ]}
        >
          <Cell
          key={`${rowIndex}-${colIndex}`}
          value={cell.value}
          editable={cell.editable}
          isSelected={selected_cell && selected_cell.row === rowIndex && selected_cell.col === colIndex}
          onPress={() => handle_cell_press(rowIndex, colIndex)}
          />
          </View>
        ))}
      </Animated.View>
    ))}
    <View style={styles.help}>
      <Pressable onPress={rules_toggle} style={styles.help_button}>
        <Text style={{color: 'white'}}>Rules</Text>
      </Pressable>

      <Pressable onPress={() => set_timer_paused(!timer_paused)} style={styles.help_button} >
        <Text style={{ color: 'white' }}>{timer_paused?'Play':'Pause'}</Text>
      </Pressable>
    </View>
    <NumberSelector selected_number={selected_number} on_select_number={number_select} />
    <Pressable onPress={handle_submit} style={styles.submit_button}><Text style={{color:'white'}}>Submit</Text></Pressable>
  </ScrollView>
  <RulesModal
        isVisible={is_rules_modal_visible}
        onClose={rules_toggle}
        onOutsidePress={rules_toggle}
      />
</SafeAreaView>
  );
};


export default GamePage