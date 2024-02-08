import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AppContext } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import LoadingScreen from '../components/LoadingScreen';

const HomeScreen = () => {
  const { trendingTVShows, loading, error, fetchTrendingTVShows } =
    useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTrendingTVShows();
  }, []);

  const filteredTVShows = trendingTVShows.filter(tvShow =>
    tvShow.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
      <Text style={styles.headerTitle}>Trending TV Shows</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Trending TV Shows"
          placeholderTextColor="#000"
        />
      </View>
      <FlatList
        data={filteredTVShows}
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
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
