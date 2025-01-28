import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { ChipDataProps } from './ChipsArray.types';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const ChipsArray = ({ chips, onDelete }: ChipDataProps) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 2,
        m: 0,
      }}
      component='ul'
    >
      {chips.map((chip) => {
        return (
          <ListItem key={chip.label}>
            <Chip label={chip.label} onDelete={onDelete(chip)} />
          </ListItem>
        );
      })}
    </Paper>
  );
};
