import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getPopularTVShows } from '../api/TMDBService';

const TVShowsListScreen: React.FC = () => {
  const [tvShows, setTVShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      const data = await getPopularTVShows();
      setTVShows(data);
      setLoading(false);
    };

    fetchTVShows();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            {/* You can add more TV show details here */}
          </View>
        )}
      />
    </View>
  );
};

export default TVShowsListScreen;