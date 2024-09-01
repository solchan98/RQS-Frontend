import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";

interface Props {
    description: string,
}

export const QuizContent = (props: Props) => {
    return (
        <Box>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
            </Paper>
            <Box sx={{height: 255, maxWidth: 400, width: '100%', p: 2}}>
                {props.description}
            </Box>
        </Box>
    )
}
