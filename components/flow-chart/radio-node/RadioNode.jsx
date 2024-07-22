import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./radio-node.scss"
const handleStyle = { left: 10 };

function RadioNode(props) {
  console.log(props);
  const { isConnectable } = props;
  const [greenDotVisible,setGreenDotVisible] = useState(false)
  return (
    <div className={props.data.question_id === "root" ?  "radio-node radio-node--active" : "radio-node"} onMouseLeave={()=>setGreenDotVisible(false)} onMouseEnter={()=>setGreenDotVisible(true)}>
    <div className="radio-node__label">{props.data.label}</div>
    {greenDotVisible && <div onClick={()=>props.data.onToggleRootQuestion(props.id)} className="radio-node__button">🟢</div>}
    <Handle
        //@ts-ignore
         conne
         key={props.id}
         type="target"
         id={props.id}
         position={Position.Top}
         style={{ left: 10 }} // Adjust the offset as needed
         isConnectable={isConnectable}
        />
    {props.data.options && props.data.options.map((option, index) => (
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

export default RadioNode;
