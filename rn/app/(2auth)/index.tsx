import { Snackbar, TextInput } from '@react-native-material/core';
import { Button, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AuthIndexStyles as styles } from '@/(2auth)/index.styles';

import { useCallback } from 'react';
import useLogin from '@/(2auth)/useLogin';
import useInput from '../../hooks/useInput';
import useSnackbar from '../../hooks/useSnackbar';

const SignInScreen = () => {
  const { login } = useLogin();
  const { value: emailState, onChange: onChangeEmail } = useInput();
  const { value: passwordState, onChange: onChangePassword } = useInput();

  const { isActive: isActiveSnackbar, message: snackbarMessage, on: onAlert } = useSnackbar({ screenKey: 'sign-in' });

  const onLoginFailCallback = useCallback(
    (message: string) => {
      onAlert(message);
    },
    [onAlert],
  );

  const onPressLoginButton = useCallback(async () => {
    await login({ email: emailState, password: passwordState }, onLoginFailCallback);
  }, [emailState, login, onLoginFailCallback, passwordState]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isActiveSnackbar() && (
          <Snackbar
            message={snackbarMessage()}
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
              width: '80%',
              zIndex: 999,
            }}
          />
        )}
        <View style={styles.containerTop}>
          <Text style={styles.title}>Quiz Box</Text>
        </View>
        <View style={styles.containerMiddle}>
          <TextInput
            inputMode='email'
            autoCapitalize='none'
            label='Email'
            variant='outlined'
            value={emailState}
            onChange={onChangeEmail}
            autoFocus={false}
          />
          <TextInput
            inputMode='text'
            autoCapitalize='none'
            secureTextEntry
            label='Password'
            variant='outlined'
            value={passwordState}
            onChange={onChangePassword}
            autoFocus={false}
          />
          <Button title='Login' onPress={onPressLoginButton} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
