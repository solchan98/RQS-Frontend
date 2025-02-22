import { useCallback, useEffect } from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import useSessionStore from '../state/useSessionStore';
import useSnackbar from './useSnackbar';

export const eventEmitter = new EventEmitter();

const useGlobalSession = () => {
  const { session, clear: clearSession, setSession } = useSessionStore();
  const { on: onAlert } = useSnackbar({ screenKey: 'sign-in' });

  const handleRedirect = useCallback(() => {
    clearSession();
    onAlert('인증 정보가 만료되었습니다.');
  }, []);

  useEffect(() => {
    const eventListener = eventEmitter.addListener('redirectToLogin', handleRedirect);

    return () => {
      eventListener.remove();
    };
  }, [handleRedirect]);

  return { session, setSession, clearSession };
};

export default useGlobalSession;
