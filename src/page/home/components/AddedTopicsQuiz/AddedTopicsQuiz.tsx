import { Title } from '../../../../components/Title/Title';
import { Label } from '../../../../components/Label/Label';
import { Tag } from '../../../../components/Tag/Tag';
import React from 'react';
import { Icon } from '../../../../components/Icon/Icon';
import { FaArrowRight } from 'react-icons/fa';
import { AddedTopicsQuizContent, AddedTopicsQuizTags } from './AddedTopicsQuiz.styles';
import { ITag } from '../../../../types/common/tag';

const dummyAddedTopicsQuiz: {
  tags: ITag[];
} = {
  tags: [{ name: '모니터링' }, { name: 'Backend' }, { name: 'CI/CD' }, { name: 'ELK' }],
};
export const AddedTopicsQuiz = () => {
  return (
    <>
      <AddedTopicsQuizContent>
        <Title title='관심주제 퀴즈가 추가되었어요!' size={14} />
        <Label title='새로 추가된 퀴즈를 확인해보세요.' size={12} />
        <AddedTopicsQuizTags>
          {dummyAddedTopicsQuiz.tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} size={12} />
          ))}
        </AddedTopicsQuizTags>
      </AddedTopicsQuizContent>
      <Icon icon={FaArrowRight} size={14} color='#878787' />
    </>
  );
};
