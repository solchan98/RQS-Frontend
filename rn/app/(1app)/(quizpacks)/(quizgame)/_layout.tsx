import { router, Tabs } from 'expo-router';
import { View } from 'react-native';
import HeaderBackButton from '../../../../components/HeaderBackButton/HeaderBackButton';

const HeaderBackButtonWrapper = () => (
  <View style={{ paddingLeft: 2 }}>
    <HeaderBackButton onPress={() => router.back()} />
  </View>
);

const QuizGameLayout = () => (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarStyle: { display: 'none' },
    }}
  >
    <Tabs.Screen
      name='index'
      options={{
        title: 'Quiz Game',
      }}
    />
  </Tabs>
);

export default QuizGameLayout;
