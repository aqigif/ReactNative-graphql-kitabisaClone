import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, ActivityIndicator, Button } from 'react-native';
import settingStyles from '../settingStyles';
import FAicons from 'react-native-vector-icons/FontAwesome';
import MUIicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView,  } from 'react-native-gesture-handler';

const SettingsNoAuthScreen = (props) => {
  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.userAvatar}>
        <FAicons name="user-circle" size={100} color={'purple'}/>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{`Guest`}</Text>
        </View>
      </View>
      <ScrollView style={{flex: 1, marginTop: 20}}>
      <TouchableHighlight onPress={() => props.navigation.push('Login')} underlayColor="#d7d7d7">
        <View style={{
          paddingVertical: 15,
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <MUIicons name="login" size={25} />
        <Text style={{
          marginLeft: 20,
          fontSize: 18
        }}>Login</Text>
        </View>
      </TouchableHighlight>
      </ScrollView>
    </View>
  )
};

export default SettingsNoAuthScreen;