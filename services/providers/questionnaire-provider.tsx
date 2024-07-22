import React, { useState, useEffect } from "react";
import axios from "axios";
import { QuestionnaireContext } from "../contexts/questionnaire-context";
import config from "../../config/application.config";
import { useUserInfo } from "../hooks/useUserInfo";

export function QuestionnaireContextProvider({ children }) {
  const [questionnaire, setQuestionniare] = useState([]);
  const [questionSyncRequired,setRefetchQuestions] = useState(false);
  const [flow, setQAFlow] = useState("");
  const [activeQA, setActive_QA_ID] = useState("");
  let { userInfo } = useUserInfo();
  const [questionnaire_list, setQuestionniareList] = useState([]);
  useEffect(() => {
    async function fetchAllQuestionnaires() {
      if (userInfo) {
        const { data } = await axios.get(config.svc + `all_questionnaire`, {
          params: {
            property_manager_id: userInfo?.sub,
          },
        });
        // console.log(data);
        setQuestionniareList(data);
        setRefetchQuestions(false);
      }
    }
    fetchAllQuestionnaires();
  }, [userInfo,questionSyncRequired]);
  return (
    <QuestionnaireContext.Provider
      value={{
        questionnaire_list,
        setQuestionniareList,
        questionnaire,
        setQuestionniare,
        activeQA,
        setActive_QA_ID,
        questionSyncRequired,
        setRefetchQuestions
      }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}
