import { useState } from 'react';

export interface IUseCommonAlertProps {
  active: boolean;
  message: string;
}

export const useCommonAlert = () => {
  const [timerIdState, setTimerIdState] = useState<NodeJS.Timeout>();
  const [alertState, setAlertState] = useState<IUseCommonAlertProps>({ active: false, message: '' });

  const onAlert = (message: string) => {
    clearTimeout(timerIdState);
    setAlertState((prev) => ({ ...prev, active: true, message }));

    const timerId = setTimeout(() => {
      setAlertState((prev) => ({ ...prev, active: false, message: '' }));
    }, 3000);
    setTimerIdState(timerId);
  };

  return { alertState, onAlert };
};
