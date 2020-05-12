import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, ActivityIndicator, Button } from 'react-native';
import FA5icons from 'react-native-vector-icons/FontAwesome5';
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_USER_BY_ID, GET_HISTORY_BY_ID } from '../queries';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const HistoryScreen = (props) => {
  const client = useApolloClient();
  const [
    loadHistory, {
    loading,
    data,
    error,
    called,
    refetch,
    updateQuery,
    
  }] = useLazyQuery(GET_HISTORY_BY_ID,
    {
      fetchPolicy : 'network-only'
    });
  useEffect(()=>{
    getHistory();
  }, []);
  const getHistory = async() => {
    const id = await AsyncStorage.getItem('@id');
    loadHistory({
      variables: {id: id}
    });
  }
  if (loading && !data) {
    return (
      <View style={{marginTop: 40}}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  } else {
  return (
  <FlatList
    data={data?.transactions}
    refreshing={loading}
    onRefresh={getHistory}
    style={{flex: 1}}
    renderItem={({item}) =>{
      const date = new Date(item?.createdAt);
      const dateFormat = moment(date).format('MMMM DD YYYY');
      return(
      <TouchableHighlight underlayColor="#d7d7d7" onPress={() => props.navigation.push('History Detail',{trxId: item?.id})}>
        <View style={{
          paddingTop: 10,
          paddingBottom: 5,
          flexDirection: 'row',
          paddingHorizontal: 15,
          justifyContent: 'space-between'
        }}>
        {/* <FA5icons name="donate" size={40} color='purple' /> */}
        <View style={{
          }}>
          <Text style={{fontSize: 16}}>{item?.beneficiary?.firstName} {item?.beneficiary?.lastName}, {item?.beneficiary?.categories[0]?.name}</Text>
          <Text style={{fontSize: 12}}>#{item?.id}</Text>
          <Text style={{color: 'grey', fontSize: 12, marginTop: 20}}>{dateFormat}</Text>
        </View>
        <View style={{
        }}>
          <Text style={{color: 'grey', fontSize: 16}}>Rp {item?.total}</Text>
        </View>
        </View>
      </TouchableHighlight>)}
    }
    keyExtractor={item=> item.id}
  />
  )}
};

export default HistoryScreen;