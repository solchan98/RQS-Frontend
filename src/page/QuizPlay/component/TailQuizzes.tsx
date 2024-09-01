import * as React from 'react';
import {useCallback} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {IQuiz} from "../../../types/Quiz";

interface Props {
    quizzes: IQuiz[],
    isSelectedTailsQuiz: (quiz: IQuiz) => boolean,
    onClickTailQuiz: (quiz: IQuiz) => void,
}

const Item = styled(Button)(({theme}) => ({
    width: '100%',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export function TailQuizzes(props: Props) {

    const generatePreviewTitle = useCallback((index: number, quiz: IQuiz): string => {
        return '꼬리질문' + index + ' ' + quiz.keywords.join(', ');
    }, []);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '8px',
            '& > *': {
                m: 1,
            },
        }}>
            {props.quizzes.map((quiz, index) =>
                <Item
                    variant={props.isSelectedTailsQuiz(quiz) ? 'contained' : 'outlined'}
                    onClick={() => props.onClickTailQuiz(quiz)}
                >{generatePreviewTitle(index, quiz)}</Item>)
            }
        </Box>
    );
}
