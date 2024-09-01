import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {IQuiz} from "../types/Quiz";

interface Props {
    basicQuizSize: number,
    quizType: 'basic' | 'tail'
    activeStep: number,
    onClickBackQuiz: () => void,
    onClickNextQuiz: () => void
}

export const QuizPlayStepper = (props: Props) => {

    const theme = useTheme();

    if (props.quizType === 'tail') {
        return (
            <Box width='100%' padding='8px' position='absolute' bottom='0' left='0' right='0'>
                <Button style={{paddingLeft: '5px'}} size="small" onClick={props.onClickBackQuiz}>
                    <KeyboardArrowLeft/>
                    Back
                </Button>
            </Box>
        )
    }

    return (
        <Box width='100%' position='absolute' bottom='0' left='0' right='0'>
            <MobileStepper
                variant="progress"
                steps={props.basicQuizSize}
                position="static"
                activeStep={props.activeStep}
                sx={{flexGrow: 1}}
                nextButton={
                    <Button size="small" onClick={props.onClickNextQuiz}
                            disabled={props.activeStep === props.basicQuizSize - 1}>
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft/>
                        ) : (
                            <KeyboardArrowRight/>
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={props.onClickBackQuiz} disabled={props.activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight/>
                        ) : (
                            <KeyboardArrowLeft/>
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    )
}
