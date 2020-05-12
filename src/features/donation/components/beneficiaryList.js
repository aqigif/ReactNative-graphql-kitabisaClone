import React from 'react';
import { Text, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import donationStyles from '../donationStyles';
import FAicons from 'react-native-vector-icons/FontAwesome';

const Beneficiaries = (props) => {
  const { loading, data, beneficiary, onChooseBeneficiary, refreshing, onRefresh} = props;
  if (loading && !data) {
    return (
      <View style={donationStyles.containerLoading}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  } else {
  return(
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={item=>item.id}
      style={{marginTop: 10}}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{...donationStyles.beneficiariesItem, backgroundColor: '#d7d7d7', borderRadius: 10, margin: 5}}
          onPress={()=>onChooseBeneficiary(item.id)}
        >
          <FAicons name="user" size={100} color={'purple'}/>
          <Text style={{color: beneficiary === item.id ? '#fff' :'black', fontWeight: 'bold'}}>{`${item?.firstName} ${item?.lastName}`}</Text>
          <Text style={{color: beneficiary === item.id ? '#fff' :'black'}}>{item?.categories[0]?.name}</Text>
        </TouchableOpacity>)}
      />
    )
  }
};

export default Beneficiaries;