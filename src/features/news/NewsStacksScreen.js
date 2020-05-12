import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';

const NewsStack = createStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="News Detail" component={NewsDetailScreen} />
    </NewsStack.Navigator>
  );
}

export default NewsStackScreen;