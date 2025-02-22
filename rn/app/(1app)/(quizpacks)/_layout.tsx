import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import HeaderBackButton from '../../../components/HeaderBackButton/HeaderBackButton';
import { Colors } from '../../../assets/colors';

const HeaderBackButtonWrapper = () => (
  <View style={{ paddingLeft: 2 }}>
    <HeaderBackButton onPress={() => router.back()} />
  </View>
);

const QuizPacksLayout = () => (
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.BACKGROUND1,
      },
      headerShadowVisible: false,
      headerLeft: HeaderBackButtonWrapper,
    }}
  >
    <Stack.Screen
      name='index'
      options={{
        title: 'Quiz Packs',
        headerShown: true,
        headerLeft: HeaderBackButtonWrapper,
      }}
    />
    <Stack.Screen
      name='(quizgame)'
      options={{
        title: 'Quiz Game',
        headerShown: false,
        headerLeft: HeaderBackButtonWrapper,
      }}
    />
  </Stack>
);

export default QuizPacksLayout;
