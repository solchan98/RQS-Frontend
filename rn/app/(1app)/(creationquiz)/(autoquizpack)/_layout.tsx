import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import HeaderBackButton from '../../../../components/HeaderBackButton/HeaderBackButton';

const HeaderBackButtonWrapper = () => (
  <View style={{ paddingLeft: 2 }}>
    <HeaderBackButton onPress={() => router.back()} />
  </View>
);

const QuizCreateLayout = () => (
  <Stack
    screenOptions={{
      headerStyle: { backgroundColor: '#f6f7f9' },
      headerShadowVisible: false,
      headerLeft: HeaderBackButtonWrapper,
    }}
  >
    <Stack.Screen
      name='index'
      options={{
        title: 'Auto Quiz Pack',
        headerShown: true,
        headerLeft: HeaderBackButtonWrapper,
      }}
    />
  </Stack>
);

export default QuizCreateLayout;
