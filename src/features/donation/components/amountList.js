import React, { useState } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import donationStyles from '../donationStyles';

const Categories = (props) => {
  const { data, selected, setSelected } = props;
  return(
  <View>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item,index)=>item.id}
      renderItem={({item, index}) => {
      let containerItem = {
        ...donationStyles.amountItem,
      }
      let textItem = {};
      if (index !== 0) {
        containerItem = {
          ...containerItem,
          ...donationStyles.categoryItemMargin
        }
      }
      if(selected === item.id) {
        containerItem = {
          ...containerItem,
          ...donationStyles.categorySelected,
        };
        textItem = {...donationStyles.categorySelectedText};
      } else {
        containerItem = {
          ...containerItem,
          ...donationStyles.categoryUnselected,
        }
        textItem = {...donationStyles.categoryUnselectedText}
      }
      return (
      <TouchableOpacity onPress={e => setSelected(item.id)} >
        <View
          style={containerItem}
        >
          <Text style={textItem}>{item.name}</Text>
        </View>
      </TouchableOpacity>)}}
    />
  </View>
)};

export default Categories;