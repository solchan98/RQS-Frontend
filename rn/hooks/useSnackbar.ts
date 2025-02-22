import { useRef } from 'react';
import useSnackbarStore from '../state/useSnackbarStore';

export interface SnackBar {
  message: string;
  status: boolean;
}

interface UseSnackbarProps {
  screenKey: string;
}

const useSnackbar = ({ screenKey }: UseSnackbarProps) => {
  const { getByKey, setState } = useSnackbarStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const off = () => setState(screenKey, '', false);

  const on = (message: string, seconds = 2000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      off();
    }, seconds);

    setState(screenKey, message, true);
  };

  const isActive = () => {
    const state = getByKey(screenKey);
    if (!state) return false;

    return state.status;
  };

  const message = () => {
    const state = getByKey(screenKey);

    return state?.message ?? '';
  };

  return { isActive, message, on, off };
};

export default useSnackbar;
