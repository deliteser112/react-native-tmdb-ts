// MovieCard.tsx
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const HOME_CARD_HEIGHT = 250;
const HOME_CARD_WIDTH = width * 0.85;
const CARD_WIDTH = width * 0.45;

interface MovieCardProps {
  isHome: boolean;
  movie: {
    id: number;
    title?: string | undefined;
    name?: string | undefined;
    poster_path: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isHome }) => {
  const navigation = useNavigation();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const title = movie.title ? movie.title : movie.name;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { item: movie })}
      testID={`${movie.id}`}>
      <View style={isHome ? styles.homeCard : styles.card}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}>
          <View style={styles.overlay} />
          <Text style={styles.title}>{title}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    height: HOME_CARD_HEIGHT,
    width: HOME_CARD_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  card: {
    height: CARD_WIDTH * 1.5,
    width: CARD_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.3, // Adjust the opacity to control the gradient darkness
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for the text
    width: '100%',
  },
});

export default MovieCard;
