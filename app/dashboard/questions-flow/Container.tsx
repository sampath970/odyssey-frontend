"use client";

import React, { useState, useCallback, useEffect } from "react";
import { QuestionTile } from "../../../components/question-tile/question-tile";
import "./questions-flow.scss";
import update from "immutability-helper";
import type { FC } from "react";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import { assignRootSourceAndTargetToQuestions } from "../../../utils/question-utils";

const style = {
  // width: 400,
};

export interface Item {
  id: number;
  questionText: string;
  hasTarget:boolean;
}

export interface ContainerState {
  cards: Item[];
}

interface QuestionsFlowProps {
  questionnaire: any[];
  deleteQuestion: any;
  setSideBarStatus:()=> void;
  setButtonStatus:()=> void;
  setActiveQuestionID:any;
  activeQuestionID?:any;
}

const QuestionsFlow: FC = (props: QuestionsFlowProps) => {
  {
    // this is what you need
    useEffect(() => {
      setCards(assignRootSourceAndTargetToQuestions(props.questionnaire)) 
    }, [props.questionnaire,props.activeQuestionID]);
  
    const [cards, setCards] = useState(assignRootSourceAndTargetToQuestions(props.questionnaire));
    const [popup, setPopup] = useState(false);
    console.log(props.questionnaire)
    const deleteQuestion = (id) => {
      try {
        props.deleteQuestion(id);
      } catch (ex) {
        console.error("Error at deleteQuestion")
      }
    };

    const moveTile = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, [props.questionnaire,props.activeQuestionID]);

    const renderCard = useCallback(
      (
        card: {
          questionText: string;
          id: string;
          text: string;
          hasTarget:boolean,
          isActive:boolean,
          hasSource:boolean,
          hasRoot,
        },
        index: number
      ) => {
        return (
          <QuestionTile
            key={card.id}
            index={index}
            activeQuestionIndex={props.activeQuestionID}
            id={card.id}
            text={card.text}
            hasTarget = {card.hasTarget}
            hasSource = {card.hasSource}
            hasRoot = {card.hasRoot}
            moveTile={moveTile}
            setSideBarStatus={props.setSideBarStatus}
            setButtonStatus={props.setButtonStatus}
            onDelete={() => {
              const questionId = card?.id;
              props.deleteQuestion(questionId)
            }}
            onEdit={()=>{
              const questionId = card?.id;
              props.setActiveQuestionID(questionId)
            }
            }       
            />
        );
      },
      [props.activeQuestionID]
    );
    console.log(props.activeQuestionID)
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        {cards.length == 0 && (
          <div style={style}>
            <div>
            <Label
                type={LabelType.Header}
                text={"Click create to create your first question"}
                variant={LabelVariant.L3}
              />
              </div>
            <label></label>
          </div>
        )}
      </>
    );
  }
};
export default QuestionsFlow;