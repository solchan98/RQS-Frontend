import { useState } from 'react';

export interface IUseCommonAlertProps {
  active: boolean;
  message: string;
}

export const useCommonAlert = () => {
  const [alertState, setAlertState] = useState<IUseCommonAlertProps>({ active: false, message: '' });

  const onAlert = (message: string) => {
    setAlertState((prev) => ({ ...prev, active: true, message }));

    setTimeout(() => {
      setAlertState((prev) => ({ ...prev, active: false, message: '' }));
    }, 3000);
  };

  return { alertState, onAlert };
};
