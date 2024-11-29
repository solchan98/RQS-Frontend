import { useState } from 'react';

export const useOptionState = () => {
  const [selectedState, setSelectedState] = useState<boolean>(false);

  const changeSelectedState = () => {
    setSelectedState((prev) => !prev);
  };

  return { selectedState, changeSelectedState };
};
