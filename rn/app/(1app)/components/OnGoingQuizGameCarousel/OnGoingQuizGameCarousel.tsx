import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import OnGoingQuizGame from '@/(1app)/components/OnGoingQuizGameCarousel/OnGoingGame/OnGoingGame';
import { IOnGoingQuizGameCarouselProps } from '@/(1app)/components/index.types';
import { OnGoingQuizGameCarouselStyles as styles } from '@/(1app)/components/OnGoingQuizGameCarousel/OnGoingGame.styles';

const OnGoingQuizGameCarousel = ({ data, emptyMessage }: IOnGoingQuizGameCarouselProps) => {
  if (data.length === 0) return <Text>{emptyMessage}</Text>;

  return (
    <View>
      <Swiper showsPagination paginationStyle={{ bottom: 0 }}>
        {data.map((item) => (
          <View style={styles.slide} key={item.id}>
            <OnGoingQuizGame
              data={{
                id: item.id,
                quizPackTitle: item.quizPackTitle,
                submittedQuizCount: item.submittedQuizCount,
                quizCount: item.quizCount,
                lastUpdatedAt: item.lastUpdatedAt,
              }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default OnGoingQuizGameCarousel;
