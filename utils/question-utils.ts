import { v4 as uuidv4 } from "uuid";

function addQuestionToQuestionnaire(all_questions, newQuestion, prevQuesAnswer, prevQuesInfo) {
  if (prevQuesInfo?.value) { newQuestion.source = prevQuesInfo?.value; }

  // Check if a question with the same ID already exists
   let index = all_questions.findIndex(
    (question) => question.id === newQuestion.id
  );

  if (index === -1) {
    // If we haven't found an existing question by unique id, check if the same question code already exists in the questionnaire.
    // We don't want duplicate question codes in the same questionnaire.
    index = all_questions.findIndex(
      (question) => question.code === newQuestion.code
    )
    
  }
  let updatedQuestions = [];
  if (index !== -1) {
    // We have an existing question with the same ID or question code

    // We need to preserve the existing question id if we came via Create --> chose a duplicate question code.
    if (!newQuestion.id) {
      newQuestion.id = all_questions[index].id;
    }

    updatedQuestions = [
      ...all_questions.slice(0, index),
      newQuestion,
      ...all_questions.slice(index + 1),
    ];

  } else {
    if (!newQuestion.id) {
      newQuestion.id = uuidv4();
    }
    // If there is no question with a similar ID, add the new question to the state
    updatedQuestions = [...all_questions, newQuestion];
  
  }

  // Wire up the previous answer to the new question
  updatedQuestions = updateQuestionTarget(
    updatedQuestions,
    newQuestion,
    prevQuesAnswer,
    prevQuesInfo?.value
  );
  
  // Update the question connection information
  updatedQuestions = assignRootSourceAndTargetToQuestions(updatedQuestions);

  return updatedQuestions;
}

function updateQuestionTarget(
  updatedQuestions,
  newQuestion,
  prevQuesAnswer,
  prevQuestionId
) {
  if ( prevQuestionId == "") {
    // No previous question, so no need to update the target.
    return updatedQuestions;
  }
  let prevAnswers = Array.isArray(prevQuesAnswer)
    ? prevQuesAnswer.map((_ques) => _ques.label)
    : [prevQuesAnswer?.label || ""];

  return setTargetOnPreviousQuestion(
    updatedQuestions,
    prevAnswers,
    prevQuestionId,
    newQuestion.id
  );
}

function setTargetOnPreviousQuestion(
  updatedQuestions,
  prevQuesAnswer,
  previousQuestionId,
  newQuestionId
) {
  
  let previousQuestion = updatedQuestions.find(
    (_questions) => _questions.id === previousQuestionId
  );
  const filterAllQuestionExceptPreviousQuestion = updatedQuestions.filter(
    (_questions) => _questions.id !== previousQuestionId
  );
  console.log(filterAllQuestionExceptPreviousQuestion);
  const newTargetValue = newQuestionId;

  if ( previousQuestion.options.length > 1 ) {
    previousQuestion.options.forEach((option) => {
      // Check if the value of the option is included in the array of previous answers
      if (prevQuesAnswer.includes(option.value)) {
        // Create the link to the new question.
        option.target = newTargetValue;
      }
    });
  } else if ( previousQuestion.options.length === 1  ){
    // If there is only one option create the link
    previousQuestion.options[0].target = newTargetValue;
  }

  let _updatedQuestions = [
    ...filterAllQuestionExceptPreviousQuestion,
    ...[previousQuestion],
  ];
 return _updatedQuestions;
}

const getErrorMsg = (type) => {
  console.log(type);
  switch (type) {
    case "multi-select":
      return "List item cannot be empty";
    case "radio":
      return "Radio item cannot be empty";
    case "file":
      return "File name is not valid";
  }
};
const getHelperText = (type) => {
  console.log(type);
  switch (type) {
    case "multi-select":
      return "Enter list items";
    case "radio":
      return "Enter radio items";
    case "file":
      return "Enter file";
  }
};

const getCurrentQuestionType = (answerTypeOptions, type) => {
  const desiredOption = type ? answerTypeOptions.find(
    (option) => option.value.toUpperCase() === type.toUpperCase()
  ) : null;
  console.log(desiredOption);
  return desiredOption;
};
const getCurrentQuestionCode = (codes, currentCode) => {
  const desiredOption = codes.find((option) => option.value?.toUpperCase() === currentCode?.toUpperCase());
  console.log(desiredOption);
  return desiredOption;
};
const getInputArrayData = (currentQuestion) => {
  if (
    currentQuestion.answer_type === "radio" ||
    currentQuestion.answer_type === "multi-select" ||
    currentQuestion.answer_type === "file"
  ) {
    let options = currentQuestion.options.map((_options) => _options.value);
    console.log(options);
    return options;
  } else {
    return [];
  }
};
const getAnswerType = (type) => {
  switch (type) {
    case "multi-select":
      return "array";
    case "radio":
      return "boolean";
    case "file":
      return "file";
    case "text_long":
      return "textarea";
    case "text_short":
      return "text";
    case "number":
      return "number";
    case "date":
      return "date";
    case "currency":
      return "currency";
  }
};
function removeTagsAndnbsp(input) {
  console.log(input)
    // Remove HTML tags
    var stripped = input.replace(/<[^>]+>/g, '');
    
    // Remove "&nbsp;" entities
    stripped = stripped.replace(/&nbsp;/g, ' ');

    return stripped;
}
const assignRootSourceAndTargetToQuestions = (questions) => {
  return questions.map(question => {
      let hasTarget = false;
      let hasSource = false;
      let hasRoot = false;
      if (question.options) {
          if (question.answerType === "file") {
              hasTarget = question.options.some(option => option.target !== null);
          } else {
              hasTarget = question.options.every(option => option.target !== null);
          }
      }
      if(question.source){
        hasSource = true;
      }
      if(question?.question_id === "root"){
        hasRoot = true;
      }
      return {
          ...question,
          hasTarget: hasTarget,
          hasSource:hasSource,
          hasRoot:hasRoot
      };
  });
};
const evaluateQuestions = (questions) => {
  let rootCount = 0;
  let targetCount = 0;
  let sourceCount = 0;

  questions.forEach(question => {
      if (question.hasRoot) {
          rootCount++;
      }
      if (!question.hasTarget) {
          targetCount++;
      }
      if (!question.hasSource) {
          sourceCount++;
      }
  });
  return rootCount === 1 && sourceCount === 1;
};
export {
  addQuestionToQuestionnaire,
  getErrorMsg,
  getHelperText,
  getCurrentQuestionType,
  getInputArrayData,
  getCurrentQuestionCode,
  getAnswerType,
  removeTagsAndnbsp,
  assignRootSourceAndTargetToQuestions,
  evaluateQuestions
};