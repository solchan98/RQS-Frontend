import { useState } from 'react';
import { IChip } from './ChipsArray.types';

export const useChipsArray = () => {
  const [chipsState, setChipsState] = useState<IChip[]>([]);

  const onAdd = (chip: IChip) => {
    setChipsState((prev) => {
      if (prev.map((value) => value.label).includes(chip.label)) {
        return prev;
      }

      return [...prev, chip];
    });
  };

  const onDelete = (chipToDelete: IChip) => () => {
    setChipsState((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
  };

  return { chipsState, onAdd, onDelete };
};
