import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface IQuizGameRadioTypeProps {
  radioState: 'SEQUENCE_PICK' | 'RANDOM_PICK';
  setRadioState: (radioState: 'SEQUENCE_PICK' | 'RANDOM_PICK') => void;
}

export const QuizGameRadioType = ({ radioState, setRadioState }: IQuizGameRadioTypeProps) => {
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>Game Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={radioState}
        onChange={(e) => setRadioState((e.target as HTMLInputElement).value as 'SEQUENCE_PICK' | 'RANDOM_PICK')}
      >
        <FormControlLabel value='SEQUENCE_PICK' control={<Radio />} label='Sequence' />
        <FormControlLabel value='RANDOM_PICK' control={<Radio />} label='Random' />
      </RadioGroup>
    </FormControl>
  );
};
