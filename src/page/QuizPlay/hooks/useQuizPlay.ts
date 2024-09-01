/**
 * QuizPlay 관련 상태 처리를 통합하여 관리
 * View 부분은 useQuizPlay를 활용하여 데이터 사용 및 관리 하는 구조
 */
import {IQuiz} from "../../../types/Quiz";
import {useState} from "react";
import {RecoilLoadable} from "recoil";

interface props {
    allQuizzes: IQuiz[]
}

const quizType = (quiz: IQuiz): 'basic' | 'tail' => {
    if (typeof quiz.parentId === 'number') {
        return 'tail';
    }

    return 'basic';
};

export const useQuizPlay = ({allQuizzes}: props) => {

    const [doneQuizzes, setDoneQuizzes] = useState<IQuiz[]>([]);
    const [remainQuizzes, setRemainQuizzes] = useState<IQuiz[]>(
        allQuizzes.filter(value => quizType(value) === 'basic')
    );
    const [currentQuiz, setCurrentQuiz] = useState(remainQuizzes[0]);

    const [selectedTailQuizzes, setSelectedTailQuizzes] = useState<number[]>([]);

    const getCurrentQuiz = (): IQuiz => {
        return currentQuiz;
    }

    const getCurrentQuizType = (): 'tail' | 'basic' => {
        return quizType(getCurrentQuiz());
    }

    const getBasicQuizSize = (): number => {
        return allQuizzes.filter(value => quizType(value) === 'basic').length;
    }

    const getCurrentStep = (): number => {
        if (quizType(remainQuizzes[0]) === 'tail') {
            return 0;
        }
        return allQuizzes.filter(value => quizType(value) === 'basic')
            .findIndex(value => value === remainQuizzes[0]) ?? 0;
    }

    const isLastQuiz = (): boolean => {
        return remainQuizzes.length === 1;
    }

    const onClickNextQuiz = (exitHandler: () => void): void => {
        if (isLastQuiz()) {
            exitHandler();
            return;
        }
        setRemainQuizzes(prev => {
            const currentQuiz = prev[0];
            if (currentQuiz !== undefined) {
                const newRemainQuizzes = remainQuizzes.filter(value => value !== currentQuiz);
                setDoneQuizzes(prev => [...prev, currentQuiz]);

                const nextQuiz = newRemainQuizzes[0];
                if (nextQuiz !== undefined) {
                    setCurrentQuiz(prev => nextQuiz);
                }
                return newRemainQuizzes;
            }

            return remainQuizzes;
        })
    }

    const onClickBackQuiz = (): void => {
        if (doneQuizzes.length === 0) {
            return;
        }
        setDoneQuizzes(prev => {
            const prevQuiz = prev.pop();
            if (prevQuiz !== undefined) {
                if (quizType(currentQuiz) !== 'tail') {
                    setRemainQuizzes(prev => [prevQuiz, ...prev]);
                }
                setCurrentQuiz(() => prevQuiz);
                return doneQuizzes.filter(quiz => quiz !== prevQuiz);
            }

            return doneQuizzes;
        })
    }

    const onClickTailQuiz = (quiz: IQuiz): void => {
        setSelectedTailQuizzes(prev => [...prev, quiz.quizId]);
        setDoneQuizzes(prev => [...prev, currentQuiz]);
        setCurrentQuiz(() => quiz);
    }

    const isSelectedTailsQuiz = (quiz: IQuiz): boolean => {
        return selectedTailQuizzes.includes(quiz.quizId);
    }

    return {
        getCurrentQuiz,
        getCurrentStep,
        onClickNextQuiz,
        onClickBackQuiz,
        onClickTailQuiz,
        getCurrentQuizType,
        getBasicQuizSize,
        isSelectedTailsQuiz,
        isLastQuiz
    };

}
