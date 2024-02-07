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
import LinearGradient from 'react-native-linear-gradient';

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
      // style={styles.card}
      onPress={() => navigation.navigate('Detail', { item: movie })}>
      <View style={isHome ? styles.homeCard : styles.card}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}>
            <Text style={styles.title}>{title}</Text>
          </LinearGradient>
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
  gradient: {
    width: '100%',
    height: '30%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MovieCard;
