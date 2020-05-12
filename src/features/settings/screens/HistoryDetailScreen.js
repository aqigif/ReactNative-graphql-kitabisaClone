import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Button, ToastAndroid, Alert } from 'react-native';
import settingStyles from '../settingStyles';
import donationStyles from '../../donation/donationStyles';
import FAicons from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { GET_HISTORY_BY_TRX_ID } from '../queries';
import { useLazyQuery } from '@apollo/react-hooks';
import moment from 'moment';

const HistoryDetailScreen = (props) => {
  const { trxId } = props?.route?.params;
  const [
    loadHistory, {
    loading,
    data,
    error,
    called
  }] = useLazyQuery(GET_HISTORY_BY_TRX_ID,
    { variables: { id: trxId } }
  );
  useEffect(()=>{
    loadHistory();
  },
  []);
  const date = new Date(data?.transaction?.createdAt);
  const dateFormat = moment(date).format('MMMM DD YYYY');
  return (
    <View style={donationStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={donationStyles.containerItem}
      >
        <View style={{flex: 1, marginBottom: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}> 
          {/* <View style={settingStyles.userAvatar}> */}
            {/* <View style={{marginTop: 10, alignItems: 'center'}}>
              <FAicons name="user" size={100} color={'purple'}/>
              <Text style={{fontSize: 18, fontWeight: 'bold',}}>{data?.transaction?.beneficiary?.firstName} {data?.transaction?.beneficiary?.lastName}</Text>
              <Text style={{fontSize: 16}}>{data?.transaction?.beneficiary?.categories[0]?.name}</Text>
            </View> */}
          {/* </View> */}
        </View>
        <Text style={{fontWeight: 'bold'}}>Payment Proof</Text>
        <TouchableOpacity>
          <View style={{
            ...donationStyles.imagePickerZone,
            height: 400,
          }}>
            <Image
              style={{height: 380, width: 320, borderRadius: 4}}
              source={{
                uri: data?.transaction?.paymentProof || 'https://storage.googleapis.com/support-forums-api/attachment/thread-18716086-17280445969701291926.jpg',
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={donationStyles.donationWrapper}>
          <Text>Date</Text>
          <Text>{data?.transaction?.createdAt ? dateFormat : ''}</Text>
        </View>
        <View style={donationStyles.donationWrapper}>
          <Text>Transaction ID</Text>
          <Text>{data?.transaction?.id}</Text>
        </View>
        <View style={donationStyles.donationWrapper}>
          <Text>To</Text>
          <Text>{data?.transaction?.beneficiary?.firstName} {data?.transaction?.beneficiary?.lastName}, {data?.transaction?.beneficiary?.categories[0]?.name}</Text>
        </View>
      </ScrollView>
      <View>
        <View style={donationStyles.donationWrapper}>
          <Text>Amount</Text>
          <Text>Rp {data?.transaction?.amount}</Text>
        </View>
        <View style={donationStyles.donationWrapper}>
          <Text>Timeline</Text>
          <Text>{data?.transaction?.timeline} Months</Text>
        </View>
        <View style={donationStyles.totalWrapper}>
          <Text style={donationStyles.totalText}>Total</Text>
          <Text style={donationStyles.totalText}>Rp {data?.transaction?.total}</Text>
        </View>
      </View>
    </View>
  )
};

const dataAmount = [
  {
    id: 50000,
    name: '50.000'
  },
  {
    id: 100000,
    name: '100.000'
  },
  {
    id: 150000,
    name: '150.000'
  },
  {
    id: 200000,
    name: '200.000'
  },
  {
    id: 300000,
    name: '300.000'
  },
  {
    id: 500000,
    name: '500.000'
  },
  {
    id: 1000000,
    name: '1.000.000'
  }
];

const dataTimeline = [
  {
    id: 1,
    name: 'A Month'
  },
  {
    id: 2,
    name: '2 Month'
  },
  {
    id: 3,
    name: '3 Month'
  },
  {
    id: 6,
    name: '6 Month'
  },
  {
    id: 12,
    name: 'A Years'
  }
]


export default HistoryDetailScreen;