import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { useAppState } from '../state/AppContext';
import { getPopularTVShows } from '../api/TMDBService';

// components
import MovieCard from '../components/MovieCard';
import LoadingScreen from '../components/LoadingScreen';

const TVShowsListScreen: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      const data = await getPopularTVShows();
      dispatch({ type: 'SET_POPULAR_TV_SHOWS', payload: data });
      setLoading(false);
    };

    if (state.popularTVShows.length === 0) {
      fetchTVShows();
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.popularTVShows}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} isHome={false} />}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TVShowsListScreen;
