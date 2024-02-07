import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { useAppState } from '../state/AppContext';
import { getPopularMovies } from '../api/TMDBService';

// components
import MovieCard from '../components/MovieCard';
import LoadingScreen from '../components/LoadingScreen';

const MovieListScreen: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      dispatch({ type: 'SET_POPULAR_MOVIES', payload: data });
      setLoading(false);
    };

    if (state.popularMovies.length === 0) {
      fetchMovies();
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.popularMovies}
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
    justifyContent: 'space-around', // This will space your columns nicely
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MovieListScreen;
