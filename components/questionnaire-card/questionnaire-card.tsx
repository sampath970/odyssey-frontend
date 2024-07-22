import React, { MouseEventHandler, useState } from "react";
import QuestionsFlow from "../../app/dashboard/questions-flow/page";
import "./questionnaire-card.scss";
import Share from "../../public/assets/icons/link.svg";
import Pencil from "../../public/assets/icons/pencil.svg";
import Delete from "../../public/assets/icons/delete.svg";
import Clone from "../../public/assets/icons/clone.svg";
import Linked from "../../public/assets/icons/linked.svg";
import Warning from "../../public/assets/icons/warning.svg";
import { wrap } from "module";
import { useRouter } from "next/navigation";
import FloatingMenu from "../floating-menu/floating-menu";
import Label, { LabelType, LabelVariant } from "../../components/label/label";

interface QuestionnaireCardProps {
  id?: string;
  title?: string;
  name?: string;
  formName?: string;
  onEdit?: (event: any, id: string) => void;
  onDelete?: (event: any) => void;
  onClone?: (event: any) => void;
  onMapForm?: (event: any) => void;
  onCardClick?: (event: any) => void;
  validationForSourceRootAndTarget?:boolean;
}

const QuestionnaireCard = ({
  id,
  title,
  name,
  formName,
  onEdit,
  onClone,
  onDelete,
  onMapForm,
  onCardClick,
  validationForSourceRootAndTarget
}: QuestionnaireCardProps) => {
  const { push } = useRouter();

  // const navigateToQuestionsFlow = () => {

  //   push("/dashboard/questions-flow/");
  // };
  const pdfStyle = {
    textTransform: "capitalize",
  };
  return (
    <div>
      <div
        className="questionnaire-card"
        onClick={onCardClick}
        data-testid="card"
      >
        <div className="questionnaire-card__sets">
          <div
            data-testid="questionnaire_title"
            className="questionnaire-card__title"
          >
            <Label
            dataTestId="title"
              type={LabelType.Header}           
              text={formName}
              variant={LabelVariant.L4}
            />
          </div>

          <div
            className="questionnaire-card__heart-icon"
            onClick={(e) => {
              e.stopPropagation();
              console.log("linked");
            }}
          >
            
          </div>
        </div>
        {formName && (
          <div className="questionnaire-card__form-name-section">
            <Label
              type={LabelType.Header}
              text={title}
              variant={LabelVariant.L2}
              overrideTextStyles={pdfStyle}
            />
          </div>
        )}
        <div
          className="questionnaire-card__name"
          data-testid="questionnaire_name"
        >
          <Label
          dataTestId="name"
            type={LabelType.Header}
            text={name}
            variant={LabelVariant.L2}
          />
          {formName && !validationForSourceRootAndTarget && (
                 <FloatingMenu menuTriggerComponent={
                  <div>
                    <Warning style={{cursor:"pointer"}}/>
                  </div>
                }>
                  <div style={{padding:12,width:200}}>You have some unfinished business</div>
                </FloatingMenu>
            )}
        </div>
        <div
          className="questionnaire-card__footer-icons"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="floating-menu-assign__questionnaire">
            <FloatingMenu
              floatDirection="right"
              menuTriggerComponent={
                <div
                  className="questionnaire-card__icon questionnaire-card__footer-icons-email"
                  onClick={onMapForm}
                >
                  <Share
                    height={"20px"}
                    width={"20px"}
                    className="questionnaire-card__assign-icon"
                  />
                </div>
              }
            >
              <div className="floating-menu-assign">
                <Label
                  type={LabelType.Header}
                  text={"Assign Questionnaire"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={pdfStyle}
                />
              </div>
            </FloatingMenu>
          </div>
          <div className="floating-menu-assign__questionnaire">
            <FloatingMenu
              floatDirection="right"
              menuTriggerComponent={
                <div
                  className="questionnaire-card__icon questionnaire-card__footer-icons-send"
                  onClick={(e) => onEdit(e, id)}
                  data-testid="onEdit"
                >
                  <Pencil height={"20px"} width={"20px"} />
                </div>
              }
            >
              <div className="floating-menu-assign">
                <Label
                  type={LabelType.Header}
                  text={"Edit Questionnaire"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={pdfStyle}
                />
              </div>
            </FloatingMenu>
          </div>
          <div className="floating-menu-assign__questionnaire">
            <FloatingMenu
              floatDirection="right"
              menuTriggerComponent={
                <div
                  className="questionnaire-card__icon questionnaire-card__footer-icons-delete"
                  onClick={onDelete}
                >
                  <Delete
                    height={"20px"}
                    width={"20px"}
                    data-testid="onDelete"
                  />
                </div>
              }
            >
              <div className="floating-menu-assign">
                <Label
                  type={LabelType.Header}
                  text={"Delete Questionnaire"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={pdfStyle}
                />
              </div>
            </FloatingMenu>
          </div>
          <div className="floating-menu-assign__questionnaire">
            <FloatingMenu
              floatDirection="right"
              menuTriggerComponent={
                <div
                  className="questionnaire-card__icon questionnaire-card__footer-icons-clone"
                  onClick={onClone}
                  data-testid="onClone"
                >
                  <Clone height={"20px"} width={"20px"} />
                </div>
              }
            >
              <div className="floating-menu-assign">
                <Label
                  type={LabelType.Header}
                  text={"Clone Questionnaire"}
                  variant={LabelVariant.L2}
                  overrideTextStyles={pdfStyle}
                />
              </div>
            </FloatingMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCard;