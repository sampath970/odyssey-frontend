import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Delete from "../../public/assets/icons/garbage.svg";
import Edit from "../../public/assets/icons/edit.svg";
import "./question-tile.scss";
import { ItemTypes } from "../../app/dashboard/questions-flow/ItemTypes";

export interface QuestionTileProps {
  id: string;
  text: string;
  index: number;
  onDelete: (id: string) => void;
  onEdit?: () => void;
  moveTile: (dragIndex: number, hoverIndex: number) => void;
  setSideBarStatus?: any;
  setButtonStatus?: any;
  setActiveQuestionIndex?: any;
  activeQuestionIndex?: any;
  hasTarget?: boolean;
  hasSource?: boolean;
  hasRoot?: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const QuestionTile: FC<QuestionTileProps> = ({
  id,
  text,
  index,
  hasTarget,
  hasSource,
  hasRoot = false,
  moveTile,
  onDelete,
  setSideBarStatus,
  setActiveQuestionIndex,
  activeQuestionIndex,
  setButtonStatus,
  onEdit,
}) => {
  console.log(activeQuestionIndex);
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTile(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  console.log(index);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleSideBarStatus = () => {
    setButtonStatus(false);
    onEdit();
    setSideBarStatus(true);
    // setActiveQuestionIndex(index)
  };
  console.log(hasTarget);
  console.log(index);
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  function getBackGroundColorForQuestion(
    hasTarget,
    hasSource,
    hasRoot,
    activeQuestionIndex,
    currentCardId
  ) {
    if (activeQuestionIndex === currentCardId) {
      return "lightblue"; // Active card
    } else if (hasSource && !hasTarget) {
      return "lightyellow"; // Card with hasSource but without hasTarget
    } else if (hasSource && hasTarget) {
      return "white"; // Card with both hasSource and hasTarget
    } else if (hasRoot) {
      return "#d1e7dd"; // Card with hasRoot
    } else if (!hasSource) {
      return "rgb(255,203,204)"; // Card without hasSource
    } else {
      return "yellow"; // Default color
    }
  }

  function getBorderdColorForQuestion(
    hasTarget,
    hasSource,
    hasRoot,
    activeQuestionIndex,
    currentCardId
  ) {
    if (activeQuestionIndex === currentCardId) {
      return "1px solid dodgerblue"; // Active card
    } else if (hasSource && !hasTarget) {
      return "1px solid yellow"; // Card with hasSource but without hasTarget
    } else if (hasSource && hasTarget) {
      return "1px solid white"; // Card with both hasSource and hasTarget
    } else if (hasRoot) {
      return "1px solid #0a3622"; // Card with hasRoot
    } else if (!hasSource) {
      return "1px solid #FF474C"; // Card without hasSource
    } else {
      return "1px solid yellow"; // Default color
    }
  }
  return (
    <>
      <div
        ref={ref}
        className="question-tile"
        style={{
          opacity,
          background: getBackGroundColorForQuestion(
            hasTarget,
            hasSource,
            hasRoot,
            activeQuestionIndex,
            id
          ),
          border: getBorderdColorForQuestion(
            hasTarget,
            hasSource,
            hasRoot,
            activeQuestionIndex,
            id
          ),
        }}
        data-handler-id={handlerId}
      >
        <div className="question-index">{index + 1}</div>
        <div
          className="questions-tile-text"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <div className="question-tile__icons-wrapper">
          <div className="questions-tile-delete-icon-wrapper">
            <div className="questions-tile-delete-icon">
              <Delete onClick={onDelete} />
            </div>
          </div>
          <div className="questions-tile-edit-icon-wrapper">
            <div className="questions-tile-edit-icon">
              <Edit onClick={() => handleSideBarStatus()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};