import React, { useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useLazyQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { GET_ARTICLES } from '../queries';
import authData from '../../../utils/authData';

const NewsScreen = (props) => {
  const [
    loadNews, {
      loading,
      data,
      error,
      called,
      refetch
    }] = useLazyQuery(GET_ARTICLES,{
      fetchPolicy : 'network-only'
    });
    
  useEffect(() => {
    loadNews();
  },
    []);

  if (loading && !data) {
    return (
      <View style={{ marginTop: 40 }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  } else {
    return (
      <FlatList
        data={data?.articles}
        refreshing={loading}
        onRefresh={loadNews}
        style={{ flex: 1 }}
        renderItem={({ item, index }) => {
          const date = new Date(item?.createdAt);
          const dateFormat = moment(date).fromNow();
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.push('News Detail',{
              id: item?.id,
              indexImage: index
            })}>
            <Card 
              elevation={10}
              style={{
                marginTop: 10,
                marginBottom: 5,
                marginHorizontal: 15
              }}>
              <Card.Cover source={{ uri: item?.imageUrl || `https://picsum.photos/${index}00` }} />
              <Card.Title title={item?.title} subtitle={item?.description} />
            </Card>
            </TouchableOpacity>)
        }
        }
        keyExtractor={item => item.id}
      />
    )
  }
};

export default NewsScreen