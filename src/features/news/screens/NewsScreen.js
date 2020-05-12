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
        renderItem={({ item }) => {
          const date = new Date(item?.createdAt);
          const dateFormat = moment(date).fromNow();
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.push('News Detail',item)}>
            <Card style={{
              marginTop: 10,
              marginBottom: 5,
              marginHorizontal: 15
            }}>
              <Card.Cover source={{ uri: item?.imageUrl || 'https://picsum.photos/700' }} />
              <Card.Title title={item?.title} subtitle={item?.description} />
            </Card>
              {/* <View style={{
                paddingHorizontal: 10,
                marginTop: 10,
                marginBottom: 5,
                flexDirection: 'row',
                height: 100
              }}>
                <View style={{
                  flex: 1
                }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  numberOfLines={2} ellipsizeMode='tail' >{item?.title}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{color:'grey'}}>{item?.description}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{color:'grey'}}>{dateFormat}</Text>
                </View>
                <View style={{
                  flex: 1
                }}>
                  <Image
                    style={{ height: '100%', width: '100%', borderRadius: 4 }}
                    source={{ uri: item?.imageUrl || 'https://awsimages.detik.net.id/community/media/visual/2020/05/06/29efd4cb-e8dd-4a01-b6bd-4f559a08ae6c_169.jpeg?w=700&q=90' }} />
                </View>
              </View> */}
            </TouchableOpacity>)
        }
        }
        keyExtractor={item => item.id}
      />
    )
  }
};

export default NewsScreen