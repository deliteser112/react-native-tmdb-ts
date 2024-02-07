import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getTrendingTVShows } from '../api/TMDBService';
// import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [trendingShows, setTrendingShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      const data = await getTrendingTVShows();
      setTrendingShows(data);
    };

    fetchTrendingShows();
  }, []);

  return (
    <View>
      <Text>Trending TV Shows</Text>
      <FlatList
        data={trendingShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Button title="Go to Movies" onPress={() => navigation.navigate('Movies')} />
      <Button title="Go to TV Shows" onPress={() => navigation.navigate('TVShows')} />
    </View>
  );
};

export default HomeScreen;