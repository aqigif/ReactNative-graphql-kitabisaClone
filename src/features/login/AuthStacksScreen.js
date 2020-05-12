import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const AuthStack = createStackNavigator();

function AuthStacksScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStacksScreen;