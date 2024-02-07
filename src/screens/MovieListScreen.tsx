import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {getPopularMovies} from '../api/TMDBService';

const MovieListScreen: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            {/* You can add more movie details here */}
          </View>
        )}
      />
    </View>
  );
};

export default MovieListScreen;
