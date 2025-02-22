import { Tabs } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import useGlobalSession from '../hooks/useGlobalSession';
import { Colors } from '../assets/colors';

const RootLayout = () => {
  useGlobalSession();

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND1 }}>
        <StatusBar />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            animation: 'fade',
          }}
        >
          <Tabs.Screen name='(1app)' options={{ headerShown: false }} />
          <Tabs.Screen name='(2auth)' />
        </Tabs>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RootLayout;
