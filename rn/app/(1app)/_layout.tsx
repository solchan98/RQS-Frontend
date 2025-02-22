import { Redirect, Stack } from 'expo-router';
import useGlobalSession from '../../hooks/useGlobalSession';

const AppLayout = () => {
  const { session } = useGlobalSession();

  if (!session || !session.accessToken) {
    return <Redirect href='../(2auth)' />;
  }

  return (
    <Stack
      screenOptions={{
        // headerBackVisible: true,
        // headerStyle: { backgroundColor: '#f6f7f9' },
        // headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name='(quizpacks)' options={{ headerTransparent: false }} />
      <Stack.Screen name='(creationquiz)' options={{ headerTransparent: false }} />
    </Stack>
  );
};

export default AppLayout;
