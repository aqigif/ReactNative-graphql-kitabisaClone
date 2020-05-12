import AsyncStorage, {useAsyncStorage} from '@react-native-community/async-storage';

const authData = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
};

export default authData;