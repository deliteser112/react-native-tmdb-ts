import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useAppState } from '../state/AppContext';
import { getTrendingTVShows } from '../api/TMDBService';

// components
import MovieCard from '../components/MovieCard';
import LoadingScreen from '../components/LoadingScreen';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      const data = await getTrendingTVShows();
      dispatch({ type: 'SET_TRENDING_TV_SHOWS', payload: data });
      setLoading(false);
    };

    if (state.trendingTVShows.length === 0) {
      fetchTrendingShows();
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Trending TV Shows</Text>
      <FlatList
        data={state.trendingTVShows}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} isHome />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
