import React from 'react';
import { Text, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import donationStyles from '../donationStyles';
import FAicons from 'react-native-vector-icons/FontAwesome';

const Beneficiaries = (props) => {
  const { loading, data, beneficiary, setBeneficiary, refreshing, onRefresh} = props;
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
      renderItem={({item}) => (
        <TouchableOpacity
          style={donationStyles.beneficiariesItem}
          onPress={()=>setBeneficiary(item.id)}
        >
          <FAicons name="user" size={100} color={beneficiary === item.id ? 'purple' : 'grey'}/>
          <Text>{`${item?.firstName} ${item?.lastName}`}</Text>
          <Text>{item?.categories[0]?.name}</Text>
        </TouchableOpacity>)}
      />
    )
  }
};

export default Beneficiaries;