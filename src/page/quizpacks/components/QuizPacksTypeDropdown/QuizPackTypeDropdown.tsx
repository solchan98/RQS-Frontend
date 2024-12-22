import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface IQuizPackTypeDropdownProps {
  searchTypeState: 'MY' | 'ALL';
  onChangeSearchType: (searchTypeState: 'MY' | 'ALL', callback: () => void) => void;
  disabled: boolean;
}

export const QuizPacksTypeDropdown = ({
  searchTypeState,
  onChangeSearchType,
  disabled,
}: IQuizPackTypeDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        disabled={disabled}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {searchTypeState}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => onChangeSearchType('MY', () => setAnchorEl(null))}>MY</MenuItem>
        <MenuItem onClick={() => onChangeSearchType('ALL', () => setAnchorEl(null))}>ALL</MenuItem>
      </Menu>
    </div>
  );
};
