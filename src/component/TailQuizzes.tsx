import * as React from 'react';
import {useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {IQuiz} from "../types/Quiz";

interface Props {
    quizzes: IQuiz[],
    currentQuiz: IQuiz,
    setQuiz: React.Dispatch<React.SetStateAction<IQuiz>>,
    setDoneQuizzes: React.Dispatch<React.SetStateAction<IQuiz[]>>,
}

const Item = styled(Button)(({theme}) => ({
    width: '100%',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export function TailQuizzes(props: Props) {
    const [selected, setSelected] = useState<number[]>([]);

    const generatePreviewTitle = useCallback((index: number, quiz: IQuiz): string => {
        return '꼬리질문' + index + ' ' + quiz.keywords.join(', ');
    }, []);

    const getVariantType = useCallback((quizId: number): 'text' | 'outlined' | 'contained' | undefined => {
        if (selected.includes(quizId)) {
            return 'contained';
        }

        return 'outlined';
    }, [selected]);

    const onClickTailQuiz = (quiz: IQuiz) => {
        console.log(`clicked Tail Quiz : `)
        console.log(quiz)
        setSelected(prev => [...prev, quiz.quizId]);
        props.setQuiz(() => quiz);
        props.setDoneQuizzes(prev => [...prev, props.currentQuiz]);
    }

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
                    variant={getVariantType(quiz.quizId)}
                    onClick={() => onClickTailQuiz(quiz)}
                >{generatePreviewTitle(index, quiz)}</Item>)
            }
        </Box>
    );
}
