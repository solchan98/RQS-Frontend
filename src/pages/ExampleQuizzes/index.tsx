import cs from '../Quiz/quiz.module.scss';
import { QuizIntro } from 'components/QuizIntro';

export const ExampleQuizzes = () => {
  return (
    <div className={cs.container}>
      <div className={cs.title}>Quiz Box 서비스 체험해보기</div>
      <div>
        <ul>
          <li>스페이스에 존재하는 모든 문제가 중복없이 랜덤으로 출제됩니다.</li>
          <li>창을 닫아도 이어서 퀴즈를 진행할 수 있습니다.(테스트는 미해당)</li>
        </ul>
      </div>
      <main>
        <QuizIntro />
      </main>
    </div>
  );
};
