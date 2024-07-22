import "@testing-library/jest-dom";

import { addQuestionToQuestionnaire } from "./question-utils";

describe("Question operations on Questionnaires", () => {

let full_student_question =  {
    "source": "fbc3a3d3-a4ac-4345-8509-515c7d2e195a",
    "code": "FL_STUDENT",
    "label": "FULL STUDENT",
    "description": "EXAMPLE: K-12, COLLEGE, TRADE SCHOOL, ETC.)",
    "text": "I AM A FULL-TIME STUDENT:",
    "options": [
        {
            "value": "YES",
            "answerType": "boolean",
            "target": null
        },
        {
            "value": "NO",
            "answerType": "boolean",
            "target": "b3b89fb2-d01f-4550-b669-4f5ef6405fa0"
        }
    ],
    "answer_type": "radio",
    "id": "9383a1bd-ef97-4b6e-82eb-2346704f6eeb",
    "position": {
        "x": 237.79999999999995,
        "y": 207
    },
    "question_id": ""
};

let part_student_question =     {
    "text": "<p>I AM A PART-TIME STUDENT: sss</p>",
    "answer_type": "radio",
    "code": "PT_STUDENT",
    "id": "fbc3a3d3-a4ac-4345-8509-515c7d2e195a",
    "description": "<p>Please select the best option that applies to you.</p>",
    "options": [
        {
            "value": "Yes",
            "answerType": "boolean",
            "target": null
        },
        {
            "value": "No",
            "answerType": "boolean",
            "target": "9383a1bd-ef97-4b6e-82eb-2346704f6eeb"
        }
    ],
    "position": {
        "x": -60,
        "y": 81
    },
    "source": "b3b89fb2-d01f-4550-b669-4f5ef6405fa0",
    "question_id": ""
}

let employed_question =     {
    "text": "<p>I HAVE A JOB/HAVE BEEN OFFEREDdddd EMPLOYMENT AND RECEIVE/WILL RECEIVE WAGES, SALARY, OVERTIME PAY, COMMISSIONS, FEES, TIPS, BONUSES, AND/OR OTHER COMPENSATION:</p>",
    "answer_type": "radio",
    "code": "EM_PLOYED",
    "id": "5772e036-3dae-466a-a45b-4a1bc793f312",
    "description": "<p>ARE YOU CURRENTLY WORKING WHERE YOU RECEIVE WAGES?</p>",
    "options": [
        {
            "value": "Yes",
            "answerType": "boolean",
            "target": null
        },
        {
            "value": "No",
            "answerType": "boolean",
            "target": null
        }
    ],
    "source": "b3b89fb2-d01f-4550-b669-4f5ef6405fa0"
}

let self_employed_question =     {
    "source": "9383a1bd-ef97-4b6e-82eb-2346704f6eeb",
    "code": "SELF_EMPLOYED_BASIC",
    "label": "Self Employed Basic",
    "description": "<p>Earn income via consulting, freelance, etc.?</p>",
    "text": "<p>Are you self employed?</p>",
    "options": [
        {
            "value": "Yes",
            "answerType": "boolean",
            "target": "8849042c-f52d-45df-ba02-63e1867e9eb4"
        },
        {
            "value": "No",
            "answerType": "boolean",
            "target": "5772e036-3dae-466a-a45b-4a1bc793f312"
        }
    ],
    "answer_type": "radio",
    "id": "b3b89fb2-d01f-4550-b669-4f5ef6405fa0",
    "question_id": "root",
    "position": {
        "x": -37,
        "y": -24
    }
}

let all_questions = [
    full_student_question,
    part_student_question,
    employed_question,
    self_employed_question,
]

let newQuestion : any = {
    "text": "<p>New question blah blah</p>",
    "answer_type": "radio",
    "code": "NEW_QUESTION",
    // Note: no "id" field for new question.
    "description": "<p>Please select the best option that applies to you.</p>",
    "options": [
        {
            "value": "Yes",
            "answerType": "boolean",
            "target": null
        },
        {
            "value": "No",
            "answerType": "boolean",
            "target": null
        }
    ],
    "position": {
        "x": 120,
        "y": 109
    },
    "source": self_employed_question.id,
    "question_id": ""
}

let new_self_employed_question : any =     {
    "source": "9383a1bd-ef97-4b6e-82eb-2346704f6eeb",
    "code": "SELF_EMPLOYED_BASIC",
    "label": "Self Employed Basic",
    "description": "<p>Earn income via consulting, freelance, etc.?</p>",
    "text": "<p>Are you self employed?</p>",
    "options": [
        {
            "value": "Yes",
            "answerType": "boolean",
            "target": "8849042c-f52d-45df-ba02-63e1867e9eb4"
        },
        {
            "value": "No",
            "answerType": "boolean",
            "target": "5772e036-3dae-466a-a45b-4a1bc793f312"
        }
    ],
    "answer_type": "radio",
    // Note: no "id" field as this is a new question.
    "question_id": "root",
    "position": {
        "x": -37,
        "y": -24
    }
}

let prevQuesAnswer = {
    "label": "No",
    "value": "No"
}

let prevQuesInfo = {
    "value": "5772e036-3dae-466a-a45b-4a1bc793f312",
    "label": "I HAVE A JOB/HAVE BEEN OFFEREDdddd EMPLOYMENT AND RECEIVE/WILL RECEIVE WAGES, SALARY, OVERTIME PAY, COMMISSIONS, FEES, TIPS, BONUSES, AND/OR OTHER COMPENSATION:"
}

it("add a new question with a new question code and a previous question and answer value", () => {
    let originalQuestion = all_questions.find(question => question.id === prevQuesInfo.value);
    let originalOption = originalQuestion.options.find(option => option.value === prevQuesAnswer.value);
    // Before: confirm that the target is NOT set to the new question.
    expect(originalOption.target).not.toBe(newQuestion.id);

    let updatedQuestions = addQuestionToQuestionnaire(all_questions, newQuestion, prevQuesAnswer, prevQuesInfo);
    let updatedQuestion = updatedQuestions.find(question => question.id === prevQuesInfo.value);
    let updatedOption = updatedQuestion.options.find(option => option.value === prevQuesAnswer.value);
    // After: confirm that the target IS set to the new question.
    expect(updatedOption.target).toBeDefined();
    expect(updatedOption.target).toBe(newQuestion.id);
    let updatedNewQuestion = updatedQuestions.find(question => question.id === newQuestion.id);
    expect(updatedNewQuestion.source).toBe(prevQuesInfo.value);
});

it("remove a target to a question answer value", () => {
    
});

it("add a duplicate question code but edit existing question instead", () => {
    let new_duplicate_question = new_self_employed_question;
    // Confirm the original source question and text
    expect(full_student_question.id).toBe(new_duplicate_question.source);
    expect(new_self_employed_question.text).not.toBe("Are you self employed? no <p>");
    new_self_employed_question.text = "Are you self employed? no <p>";
    let updatedQuestions = addQuestionToQuestionnaire(all_questions, new_self_employed_question, prevQuesAnswer, prevQuesInfo);  
    let updatedModifiedQuestion = updatedQuestions.find(question => question.id === new_self_employed_question.id);
    // Confirm that the id value is the same as the original question in the questionnaire
    expect(updatedModifiedQuestion.id).toBe(self_employed_question.id);
    expect(updatedModifiedQuestion.text).toBe("Are you self employed? no <p>");
    
    // Confirm the source question after the question was edited
    let previousQuestion = updatedQuestions.find(question => question.id === prevQuesInfo.value);
    expect(updatedModifiedQuestion.source).toBe(previousQuestion.id);
    let updatedOption = previousQuestion.options.find(option => option.value === prevQuesAnswer.value);
    expect(updatedOption.target).toBe(self_employed_question.id);
});

it("edit a question while preserving target and source", () => {
    let modifiedQuestion = self_employed_question;
    // Confirm the original source question and text
    expect(full_student_question.id).toBe(modifiedQuestion.source);
    expect(modifiedQuestion.text).not.toBe("Are you self employed? no <p>");
    modifiedQuestion.text = "Are you self employed? no <p>";
    let updatedQuestions = addQuestionToQuestionnaire(all_questions, modifiedQuestion, prevQuesAnswer, prevQuesInfo);  
    let updatedModifiedQuestion = updatedQuestions.find(question => question.id === modifiedQuestion.id);
    expect(updatedModifiedQuestion.text).toBe("Are you self employed? no <p>");
    
    // Confirm the source question after the question was edited
    let previousQuestion = updatedQuestions.find(question => question.id === prevQuesInfo.value);
    expect(updatedModifiedQuestion.source).toBe(previousQuestion.id);
    let updatedOption = previousQuestion.options.find(option => option.value === prevQuesAnswer.value);
    expect(updatedOption.target).toBe(self_employed_question.id);
})

});