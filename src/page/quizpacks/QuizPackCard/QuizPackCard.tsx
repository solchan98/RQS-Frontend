import { ITag } from '../../../types/common/tag';
import {
  QuizPackBottomContainer,
  QuizPackCardContainer,
  QuizPackCardCount,
  QuizPackCardCountContainer,
  QuizPackCardTag,
  QuizPackCardTags,
  QuizPackCardTitle,
} from './QuizPackCard.styles';
import { FaUsers } from 'react-icons/fa';
import { SiQuizlet } from 'react-icons/si';
import { Icon } from '../../../components/Icon/Icon';

interface IQuizPackCardProps {
  title: string;
  memberCount: number;
  quizCount: number;
  tags: ITag[];
  createdAt: string;
}

export const QuizPackCard = ({ title, memberCount, quizCount, tags, createdAt }: IQuizPackCardProps) => {
  return (
    <QuizPackCardContainer>
      <QuizPackCardTitle>{title}</QuizPackCardTitle>
      <QuizPackCardTags>
        {tags.map((tag) => (
          <QuizPackCardTag key={tag.id}>#{tag.name}</QuizPackCardTag>
        ))}
      </QuizPackCardTags>
      <QuizPackCardCountContainer>
        <QuizPackCardCount>
          <Icon icon={FaUsers} size={20} />
          {memberCount}
        </QuizPackCardCount>
        <QuizPackCardCount>
          <Icon icon={SiQuizlet} size={18} />
          {quizCount}
        </QuizPackCardCount>
      </QuizPackCardCountContainer>
      <QuizPackBottomContainer>
        <div>{new Date(createdAt).toISOString().split('T')[0]}</div>
      </QuizPackBottomContainer>
    </QuizPackCardContainer>
  );
};
