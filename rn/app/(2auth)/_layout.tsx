import { Redirect, Stack } from 'expo-router';

import useGlobalSession from '../../hooks/useGlobalSession';

const AuthLayout = () => {
  const { session } = useGlobalSession();

  if (session && session.accessToken) {
    return <Redirect href='../(1app)' />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default AuthLayout;
