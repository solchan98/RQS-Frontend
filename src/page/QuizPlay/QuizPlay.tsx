import * as React from 'react';
import Box from '@mui/material/Box';
import {QuizContent} from "./component/QuizContent";
import {QuizPlayStepper} from "./component/QuizPlayStepper";
import {useRecoilValue} from "recoil";
import {quizzesState} from "../../recoli/Quiz";
import {TailQuizzes} from "./component/TailQuizzes";
import {getTailQuizzesByParentId} from "../../dummy/Quiz";
import {useQuizPlay} from "./hooks/useQuizPlay";

export function QuizPlay() {

    const quizzes = useRecoilValue(quizzesState);
    const {
        getCurrentQuiz,
        getCurrentStep,
        onClickNextQuiz,
        onClickBackQuiz,
        onClickTailQuiz,
        getCurrentQuizType,
        getBasicQuizSize,
        isSelectedTailsQuiz,
        isLastQuiz
    } = useQuizPlay({allQuizzes: quizzes});

    return (
        <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center' sx={{maxWidth: '100%'}}>
            <h1>Quiz Application</h1>
            <QuizContent description={getCurrentQuiz().content}/>
            <TailQuizzes quizzes={getTailQuizzesByParentId(getCurrentQuiz().quizId)} onClickTailQuiz={onClickTailQuiz}
                         isSelectedTailsQuiz={isSelectedTailsQuiz}/>
            <QuizPlayStepper basicQuizSize={getBasicQuizSize()} quizType={getCurrentQuizType()}
                             onClickBackQuiz={onClickBackQuiz} activeStep={getCurrentStep()}
                             onClickNextQuiz={onClickNextQuiz} isLastQuiz={isLastQuiz}/>
        </Box>
    );
}
