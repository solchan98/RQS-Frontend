export interface IQuiz {
    quizPackId: number,
    quizId: number,
    parentId: number | null | undefined,
    content: string,
    tailQuizIds: number[],
    keywords: string[]
}
