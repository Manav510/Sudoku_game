import create from 'zustand';

interface DifficultyState {
  time: number;
  mistakes: number;
  difficulty: string;
  set_difficulty: (difficulty: string) => void;
  set_time_left: (time: number) => void;
  set_mistake: (mistakes: number) => void;
}

const use_game_store = create<DifficultyState>((set) => ({
  difficulty: 'Easy',
  time:60000,
  mistakes: 0,
  set_difficulty: (difficulty) => set({ difficulty }),
  set_time_left: (time) => set({time}),
  set_mistake: (mistakes) =>set({mistakes}),
}));

export default use_game_store;