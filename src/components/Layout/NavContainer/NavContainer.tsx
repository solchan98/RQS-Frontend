import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type NavigationValueType = '' | 'settings';

export const NavContainer = () => {
  const [value, setValue] = useState<NavigationValueType>('');
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%' }}>
      <div style={{ paddingBottom: 56 }}>
        <Outlet />
      </div>
      <BottomNavigation
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label='Home' value='' />
        <BottomNavigationAction label='Settings' value='settings' />
      </BottomNavigation>
    </div>
  );
};
