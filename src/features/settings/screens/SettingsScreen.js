import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, ActivityIndicator, Button } from 'react-native';
import settingStyles from '../settingStyles';
import FAicons from 'react-native-vector-icons/FontAwesome';
import MUIicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView,  } from 'react-native-gesture-handler';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_USER_BY_ID } from '../queries';
import AsyncStorage, { useAsyncStorage } from '@react-native-community/async-storage';
import { AuthContext } from '../../../navigations/navigations';

const SettingsScreen = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [
    loadUser, {
    loading,
    data,
    error,
    called
  }] = useLazyQuery(GET_USER_BY_ID);
  useEffect(()=>{
    getUser()
  },[]);
  const getUser = async() => {
    const id = await AsyncStorage.getItem('@id');
    loadUser({variables: {id: id}});
  }
  const onLogout = () => {
    AsyncStorage.clear()
    signOut();
  }
  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.userAvatar}>
        <FAicons name="user-circle" size={100} color={'purple'}/>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{data?.user?.firstName} {data?.user?.lastName}</Text>
          <Text style={{fontSize: 16}}>{data?.user?.email}</Text>
          <Text style={{fontSize: 16}}>{data?.user?.phoneNumber}</Text>
        </View>
      </View>
      <ScrollView style={{flex: 1, marginTop: 20}}>
        <TouchableHighlight
          underlayColor="#d7d7d7"
          onPress={() => props.navigation.push('History')}
        >
          <View style={{
            paddingVertical: 15,
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <FAicons name="history" size={25} />
          <Text style={{
            marginLeft: 20,
            fontSize: 18
          }}>History</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#d7d7d7" onPress={() => onLogout()}>
          <View style={{
            paddingVertical: 15,
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <MUIicons name="logout" size={25} />
          <Text style={{
            marginLeft: 20,
            fontSize: 18
          }}>Logout</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    </View>
  )
};

export default SettingsScreen;