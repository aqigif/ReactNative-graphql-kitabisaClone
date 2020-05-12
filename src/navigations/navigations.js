import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator, { BottomUnAuthNavigator } from './bottomNavigations';
import AuthStacksScreen from '../features/login/AuthStacksScreen';
import Logo from '../features/login/components/Logo';
import {DefaultTheme } from '@react-navigation/native';

export const AuthContext = React.createContext();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

function SplashScreen() {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
      <Logo />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App(props) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@token');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: async() => {
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: data });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' },
          }}
        >
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.isSignout ? (
            <Stack.Screen
              name="Sign In"
              component={SignOut}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : state.userToken === null ? (
            <Stack.Screen
              name="Sign In"
              component={UnAuthStack}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
const MainStack = createStackNavigator();

export function AuthStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}>
      <MainStack.Screen name='Home' component={BottomNavigator} />
    </MainStack.Navigator>
  );
}

export function UnAuthStack() {
  
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <MainStack.Screen 
        name='Home'
        component={BottomUnAuthNavigator}
      />
      <MainStack.Screen 
        name='Login'
        component={AuthStacksScreen}
      />
    </MainStack.Navigator>
  );
}

export function SignOut() {
  
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen 
        name='Home'
        component={BottomUnAuthNavigator}
      />
      <MainStack.Screen 
        name='Login'
        component={AuthStacksScreen}
      />
    </MainStack.Navigator>
  );
}
