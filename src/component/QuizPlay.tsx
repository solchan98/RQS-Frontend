import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {QuizContent} from "./QuizContent";
import {QuizPlayStepper} from "./QuizPlayStepper";
import {IQuiz} from "../types/Quiz";
import {useRecoilValue} from "recoil";
import {quizzesState} from "../recoli/Quiz";
import {TailQuizzes} from "./TailQuizzes";
import {getTailQuizzesByParentId} from "../dummy/Quiz";

const quizPack = {
    quizPackId: 1,
    title: 'Spring Core (Basic)',
    totalQuizSize: 3,
    quizIds: [1, 3, 6]
}

export function QuizPlay() {
    const quizType = useCallback((quiz: IQuiz): 'basic' | 'tail' => {
        if (typeof quiz.parentId === 'number') {
            return 'tail';
        }

        return 'basic';
    }, []);

    const quizzes = useRecoilValue(quizzesState);
    const [doneQuizzes, setDoneQuizzes] = useState<IQuiz[]>([]);
    const [remainQuizzes, setRemainQuizzes] = useState<IQuiz[]>(quizzes.filter(quiz => quizType(quiz) === 'basic'));
    const [quiz, setQuiz] = useState(remainQuizzes[0]);

    const getCurrentStep = useCallback(() => {
        if (quizType(remainQuizzes[0]) === 'tail') {
            return 0;
        }
        return  quizzes.filter(value => quizType(value) === 'basic')
            .findIndex(value => value === remainQuizzes[0]) ?? 0;
    }, [remainQuizzes, quizType, quizzes]);

    const onClickBackQuiz = useCallback(() => {
        if (doneQuizzes.length === 0) {
            return;
        }
        setDoneQuizzes(prev => {
            const prevQuiz = prev.pop();
            if (prevQuiz !== undefined) {
                if (quizType(quiz) !== 'tail') {
                    setRemainQuizzes(prev => [prevQuiz, ...prev]);
                }
                setQuiz(() => prevQuiz);
                return doneQuizzes.filter(quiz => quiz !== prevQuiz);
            }

            return doneQuizzes;
        })
    }, [quizType, quiz, doneQuizzes]);

    const onClickNextQuiz = useCallback(() => {
        setRemainQuizzes(prev => {
            const currentQuiz = prev[0];
            if (currentQuiz !== undefined) {
                const newRemainQuizzes = remainQuizzes.filter(value => value !== quiz);
                setDoneQuizzes(prev => [...prev, quiz]);

                const nextQuiz = newRemainQuizzes[0];
                if (nextQuiz !== undefined) {
                    setQuiz(prev => nextQuiz);
                }
                return newRemainQuizzes;
            }

            return remainQuizzes;
        })
    }, [quiz, remainQuizzes]);

    return (
        <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center' sx={{maxWidth: '100%'}}>
            <h1>Quiz Application</h1>
            <QuizContent description={quiz.content}/>
            <TailQuizzes currentQuiz={quiz} quizzes={getTailQuizzesByParentId(quiz.quizId)} setQuiz={setQuiz} setDoneQuizzes={setDoneQuizzes}/>
            <QuizPlayStepper basicQuizSize={quizzes.filter(value => quizType(value) === 'basic').length}
                             quizType={quizType(quiz)}
                             onClickBackQuiz={onClickBackQuiz}
                             activeStep={getCurrentStep()} onClickNextQuiz={onClickNextQuiz}/>
        </Box>
    );
}
