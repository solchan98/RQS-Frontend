import {atom} from "recoil";
import {IQuiz} from "../types/Quiz";

const dummyQuizzes: IQuiz[] = [
    {
        quizPackId: 1,
        quizId: 1,
        parentId: null,
        content: 'DI / IoC에 대하여 설명해주세요.',
        tailQuizIds: [2],
        keywords: ['DI', 'IoC']
    }, {
        quizPackId: 1,
        quizId: 2,
        parentId: 1,
        content: 'DI와 DIP의 차이가 무엇인가요?',
        tailQuizIds: [],
        keywords: ['DI', 'IoC', '차이점']
    }, {
        quizPackId: 1,
        quizId: 3,
        parentId: null,
        content: 'Spring 그리고 Spring Boot 어떤 차이가 있나요?',
        tailQuizIds: [4, 5],
        keywords: ['Spring', 'StringBoot', '차이점', '자동화']
    }, {
        quizPackId: 1,
        quizId: 4,
        parentId: 3,
        content: 'Spring은 정확히 어떤 기능을 제공하나요?',
        tailQuizIds: [],
        keywords: ['상세 기능']
    }, {
        quizPackId: 1,
        quizId: 5,
        parentId: 3,
        content: 'DI / IoC 제외하고 Spring의 특징을 설명해주세요.',
        tailQuizIds: [],
        keywords: ['DI / IoC 제외']
    }, {
        quizPackId: 1,
        quizId: 6,
        parentId: null,
        content: '스프링은 어떤 DI 방식을 지원하나요?',
        tailQuizIds: [7, 9],
        keywords: ['주입 방식']
    }, {
        quizPackId: 1,
        quizId: 7,
        parentId: 6,
        content: '생성자 주입 방식이란 무엇인가요?',
        tailQuizIds: [8],
        keywords: ['생성자']
    }, {
        quizPackId: 1,
        quizId: 8,
        parentId: 7,
        content: '생성자 주입 방식을 권장하는 이유가 무엇인가요?',
        tailQuizIds: [],
        keywords: ['불변', '안전']
    }, {
        quizPackId: 1,
        quizId: 9,
        parentId: 6,
        content: '필드 주입 방식이 무엇인가요?',
        tailQuizIds: [10],
        keywords: ['필드', '가변']
    }, {
        quizPackId: 1,
        quizId: 10,
        parentId: 9,
        content: '필드 주입 방식을 권장하지 않는 이유가 무엇인가요?',
        tailQuizIds: [],
        keywords: ['필드주입', '가변']
    }
]

export const quizzesState = atom({
    key: 'quizzes',
    default: dummyQuizzes,
});
