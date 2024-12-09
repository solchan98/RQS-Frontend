import { useState } from 'react';

export interface IUseCommonAlertProps {
  active: boolean;
  message: string;
}

export const useCommonAlert = () => {
  const [timerIdState, setTimerIdState] = useState<NodeJS.Timeout>();
  const [alertState, setAlertState] = useState<IUseCommonAlertProps>({ active: false, message: '' });

  const onAlert = (message: string, period = 3000) => {
    clearTimeout(timerIdState);
    setAlertState((prev) => ({ ...prev, active: true, message }));

    const timerId = setTimeout(() => {
      setAlertState((prev) => ({ ...prev, active: false, message: '' }));
    }, period);
    setTimerIdState(timerId);
  };

  return { alertState, onAlert };
};
