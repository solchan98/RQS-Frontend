import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

const useGesturesEnabled = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // disable swipe
    let parent = navigation.getParent();
    while (parent) {
      parent.setOptions({ gestureEnabled: false });
      parent = parent.getParent();
    }

    // re-enable swipe after going back
    return () => {
      let parentRe = navigation.getParent();
      while (parentRe) {
        parentRe.setOptions({ gestureEnabled: true });
        parentRe = parentRe.getParent();
      }
    };
  }, [navigation]);
};

export default useGesturesEnabled;
