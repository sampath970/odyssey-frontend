"use strict"
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./single-node.scss"
const handleStyle = { left: 10 };

function SingleNode(props) {
  const { isConnectable } = props;
  const [greenDotVisible,setGreenDotVisible] = useState(false)
  console.log(props)
  return (
    <div onMouseEnter={()=>setGreenDotVisible(true)} onMouseLeave={()=>setGreenDotVisible(false)} className={props.data.question_id === "root" ?"single-node single-node--active" :"single-node"}>
    <div className="single-node__label">{props.data.label}</div>
    {props?.data?.options && props.data.options.map((option, index) => (
      <div   style={{backgroundColor:"red"}}>
        {greenDotVisible && 
      <div className="single-node__button" onClick={()=>{
        props.data.onToggleRootQuestion(props.id)}}>🟢</div>
        }
      <Handle
        //@ts-ignore
        conne
        key={index}
        type="target"
        id={option.value}
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        //@ts-ignore
        conne
        key={index}
        type="source"
        id={option.value}
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      </div>
    ))}
  </div>
  );
}

export default SingleNode;
