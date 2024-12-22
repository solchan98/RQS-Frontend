import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

interface IQuizPacksSearchBarProps {
  searchInputState: string;
  onChangeSearchInputState: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (callback: () => void) => void;
  disabled: boolean;
}

export const QuizPacksSearchBar = ({
  searchInputState,
  onChangeSearchInputState,
  onSearch,
  disabled,
}: IQuizPacksSearchBarProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(searchInputState);
  };

  return (
    <Paper
      component='form'
      style={{ borderRadius: '18px' }}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        disabled={disabled}
        value={searchInputState}
        onChange={onChangeSearchInputState}
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Quiz packs with title'
      />
      <IconButton
        disabled={disabled}
        type='button'
        sx={{ p: '10px' }}
        aria-label='search'
        onClick={(e) => onSearch(() => onClick(e))}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
