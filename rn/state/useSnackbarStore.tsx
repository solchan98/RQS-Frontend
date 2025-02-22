import { create } from 'zustand';
import { SnackBar } from '../hooks/useSnackbar';

interface SharedSnackBar {
  key: string;
  snackBar: SnackBar;
}

const useSnackbarStore = create<{
  states: SharedSnackBar[];
  setState: (key: string, message: string, status: boolean) => void;
  getByKey: (key: string) => SnackBar | undefined;
}>((set, get) => ({
  states: [] as SharedSnackBar[],
  setState: (key: string, message: string, status: boolean) => {
    set((value) => {
      const prev = value.states.filter((v) => v.key !== key);

      return { states: [...prev, { key, snackBar: { message, status } }] };
    });
  },
  getByKey: (key: string) => get().states.find((state) => state.key === key)?.snackBar,
}));

export default useSnackbarStore;
