import { useState } from 'react';

export interface IUseOptionState {
  selectedState: boolean;
  changeSelectedState: () => void;
}

export const useOptionState = () => {
  const [selectedState, setSelectedState] = useState<boolean>(false);

  const changeSelectedState = () => {
    setSelectedState((prev) => !prev);
  };

  return { selectedState, changeSelectedState };
};
