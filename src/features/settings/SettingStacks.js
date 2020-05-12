import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import HistoryDetailScreen from './screens/HistoryDetailScreen';
import SettingsNoAuthScreen from './screens/SettingsNoAuthScreen';

const SettingStack = createStackNavigator();

function HistoryStackScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
      <SettingStack.Screen name="History" component={HistoryScreen} />
      <SettingStack.Screen name="History Detail" component={HistoryDetailScreen} />
    </SettingStack.Navigator>
  );
}

export function HistoryStackNoAuthScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={SettingsNoAuthScreen} />
    </SettingStack.Navigator>
  );
}

export default HistoryStackScreen;