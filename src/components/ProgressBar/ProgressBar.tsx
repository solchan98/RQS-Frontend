import React, {useMemo} from "react";
import {LinearProgress} from "@mui/material";

interface ProgressBarProps {
    currentProgress: number;
    totalCount: number;
}

export const ProgressBar = ({currentProgress, totalCount}: ProgressBarProps) => {

    const progress: number = useMemo(() => totalCount / currentProgress, [currentProgress, totalCount]);

    return (
        <div style={{flexGrow: 1}}>
            <LinearProgress color='info' variant='determinate' value={progress} style={{borderRadius: 6, height: 12}}/>
        </div>
    );
}