import ApolloClient, { HttpLink, InMemoryCache } from 'apollo-boost';
import { REACT_API_URI } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage';

export const client = new ApolloClient({
  request: async(operation) => {
    const token = await AsyncStorage.getItem('@token')
    operation.setContext({
      uri: REACT_API_URI,
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

export default client;