import { createContext } from "react";

const defaultProps = {
    questionnaire_list: [],
    setQuestionniareList: (questionnaires: any[])=>{},
    questionnaire: [],
    setQuestionniare: (questionaire: any[])=>{},
    activeQA: "",
    setActive_QA_ID: (x)=>{},
    setRefetchQuestions:(any)=>{},
    questionSyncRequired: false
};
export const QuestionnaireContext = createContext(defaultProps);