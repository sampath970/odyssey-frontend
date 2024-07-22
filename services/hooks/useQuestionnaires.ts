import React, { useContext } from "react";
import { QuestionnaireContext } from "../contexts/questionnaire-context";
export function useQuestionnaires() {
    const context = useContext(QuestionnaireContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}