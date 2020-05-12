import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableOpacity } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materialicons from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5icons from 'react-native-vector-icons/FontAwesome5';

import DonationStackScreen, { DonationUnAuthStackScreen } from '../features/donation/DonationStacks';
import HistoryStackScreen, { HistoryStackNoAuthScreen } from '../features/settings/SettingStacks';
import NewsStackScreen from '../features/news/NewsStacksScreen';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route?.name) {
              case 'News':
                return <Materialicons name="newspaper" size={size} color={color} />
              case 'Settings':
                return <Ionicons name="ios-settings" size={size} color={color} />
              case 'Donation':
                return <FA5icons name="donate" size={size} color={color} />
              default :
                return <Ionicons name="" size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen 
          options={{
            tabBarButton: props => 
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="News"
          component={NewsStackScreen}
        />
        <Tab.Screen 
          options={{
            tabBarButton: props =>
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="Donation"
          component={DonationStackScreen}
        />
        <Tab.Screen 
          options={{
            tabBarButton: props => 
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="Settings"
          component={HistoryStackScreen}
        />
      </Tab.Navigator>
  );
}
export function BottomUnAuthNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route?.name) {
              case 'News':
                return <Materialicons name="newspaper" size={size} color={color} />
              case 'Settings':
                return <Ionicons name="ios-settings" size={size} color={color} />
              case 'Donation':
                return <FA5icons name="donate" size={size} color={color} />
              default :
                return <Ionicons name="" size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen 
          options={{
            tabBarButton: props => 
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="News"
          component={NewsStackScreen}
        />
        <Tab.Screen 
          options={{
            tabBarButton: props =>
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="Donation"
          component={DonationUnAuthStackScreen}
        />
        <Tab.Screen 
          options={{
            tabBarButton: props => 
            <BorderlessButton style={props.style}>
              <TouchableOpacity activeOpacity={1} {...props} style={{...props.style, width: '100%', flex: 1}} />
            </BorderlessButton>
          }}
          name="Settings"
          component={HistoryStackNoAuthScreen}
        />
      </Tab.Navigator>
  );
}
export default BottomNavigator;