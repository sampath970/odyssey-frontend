"use client"
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./multi-select-node.scss"
const handleStyle = { left: 10 };

function MultiSelectNode(props) {
  const { isConnectable } = props; 
  const [greenDotVisible,setGreenDotVisible] = useState(false)
  return (
    <div className={props.data.question_id==="root" ? "multi-select-node multi-select-node--active" : "multi-select-node"} onMouseLeave={()=>setGreenDotVisible(false)} onMouseEnter={()=>setGreenDotVisible(true)}>
    <div className="multi-select-node__label">{props.data.label}</div>
    {greenDotVisible && <div onClick={()=>props.data.onToggleRootQuestion(props.id)} className="multi-select-node__button">🟢</div>}
    <Handle
        //@ts-ignore
         conne
         key={props.id}
         type="target"
         id={props.id}
         position={Position.Top}
         style={{ left: 10 }}
         isConnectable={isConnectable}
        />
    {props?.data?.options && props.data.options.map((option, index) => (
      <Handle
        //@ts-ignore
        conne
        key={index}
        type="source"
        id={option.value}
        position={Position.Bottom}
        style={{ left: 10 + index * 20 }} //Adjust the position of dots
        isConnectable={isConnectable}
      />
    ))}
  </div>
  );
}

export default MultiSelectNode;
