import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import { AppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import LoadingScreen from '../components/LoadingScreen';

const TVShowsListScreen: React.FC = () => {
  const { popularTVShows, loading, error, fetchPopularTVShows } =
    useContext(AppContext);

  useEffect(() => {
    if (popularTVShows.length === 0) {
      fetchPopularTVShows();
    }
  }, [fetchPopularTVShows, popularTVShows.length]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={popularTVShows}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TVShowsListScreen;
