import React from 'react';
import { Alert } from '@mui/material';

interface IAlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export const CommonAlert = ({ type, message }: IAlertProps) => {
  return <Alert severity={type}>{message}</Alert>;
};
