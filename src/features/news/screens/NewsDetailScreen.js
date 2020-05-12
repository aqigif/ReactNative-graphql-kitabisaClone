import React, {useMemo} from 'react';
import {View, StyleSheet, Text, Image, RefreshControl} from 'react-native';
import moment from 'moment';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ARTICLE } from '../queries';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const NewsDetailScreen = (props) => {
  const { id, indexImage } = props?.route?.params;
  const [
    loadNews, {
      loading,
      data,
      error,
      called,
      refetch
    }] = useLazyQuery(GET_ARTICLE,{
      fetchPolicy : 'network-only',
      variables: {id:id}
    });
  useMemo(() => {
    const { navigation } = props;
    loadNews()
    navigation.setOptions({
      
    })
  },[]);
  const date = new Date(data?.article?.createdAt);
  const dateFormat = moment(date).format('MMMM DD YYYY');
  if (loading) {
    return(
      <View style={{marginTop: 70}}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  } else {
  return(
  <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={loadNews} />
    }
  >
    <View>
      <Text style={{marginHorizontal: 15, marginTop: 15,marginBottom: 0, fontSize: 24, fontWeight: 'bold', alignSelf:'stretch'}}>{data?.article?.title}</Text>
      <Text style={{ fontSize:12, color: 'grey', marginBottom: 10, marginHorizontal: 15}}>{dateFormat}</Text>
      <View style={{marginHorizontal: 15, marginVertical: 0}}>
        <Image
          style={{ height: 300, width: '100%', borderRadius: 4 }}
          source={{ uri: data?.article?.imageUrl || `https://picsum.photos/${indexImage}00` }}
        />
      </View>
      <Text style={{marginHorizontal: 15, marginTop: 10, alignSelf:'stretch'}}>{data?.article?.description}</Text>
    </View>
  </ScrollView>
)}};

export default NewsDetailScreen;