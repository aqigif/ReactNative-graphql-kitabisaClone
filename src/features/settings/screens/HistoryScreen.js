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
  const delimiterNumber = (value) => {
    const number = value.toString()
    if (number) {
      let splitNumber = number.split('.');
      let valueNumber = splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      valueNumber = `${valueNumber}${splitNumber[1] ? ','+splitNumber[1] : ''}`;
      return valueNumber;
    }
    return value;
  }
  if (loading && !data) {
    return (
      <View style={{marginTop: 40}}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  } else {
  return (
  <View>
  <View style={{paddingHorizontal: 20, paddingVertical: 2, backgroundColor: '#d7d7d7', justifyContent:'space-between', flexDirection: 'row'}}>
    <Text style={{ fontSize: 12, color: 'grey'}}>{moment().format('MMMM YYYY')}</Text>
    <Text style={{ fontSize: 12, color: 'grey'}}>{data?.transactionsConnection?.total} Donasi</Text>
  </View>
  <FlatList
    data={data?.transactionsConnection?.data}
    refreshing={loading}
    onRefresh={getHistory}
    renderItem={({item}) =>{
      const date = new Date(item?.createdAt);
      const dateFormat = moment(date).fromNow();
      return(
      <TouchableHighlight underlayColor="#d7d7d7" onPress={() => props.navigation.push('History Detail',{trxId: item?.id})}>
        <View style={{
          paddingTop: 15,
          paddingBottom: 10,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={{width: 65,height:65, backgroundColor: 'purple',padding: 10, borderRadius: 10, alignItems: 'center'}}>
          <FA5icons name="donate" size={40} color='white' />
        </View>
        <View style={{
          flex: 1,
          paddingHorizontal: 10
        }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item?.beneficiary?.firstName} {item?.beneficiary?.lastName}, {item?.beneficiary?.categories[0]?.name}</Text>
          <Text style={{color: 'grey', fontSize: 12, marginTop: 10}}>{dateFormat} • Rp {delimiterNumber(item?.total)}</Text>
        </View>
        <View style={{
        }}>
          <View style={{backgroundColor: '#00AA13', padding: 5, paddingHorizontal: 10, borderRadius: 20}}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#fff'}}>Success</Text>
          </View>
        </View>
        </View>
      </TouchableHighlight>)}
    }
    keyExtractor={item=> item.id}
  />
  </View>
  )}
};

export default HistoryScreen;