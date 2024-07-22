import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
  MiniMap
} from "reactflow";
import "reactflow/dist/style.css";
import radioNode from "./radio-node/RadioNode";
import MultiSelectNode from "./multi-select-node/MultiSelectNode";
import SingleNode from "./single-node/SingleNode";
import { removeTagsAndnbsp } from "../../utils/question-utils";
function Flow(props) {
  const rfStyle = {
    backgroundColor: "rgb(255 255 255)",
  };

  const nodeTypes = useMemo(
    () => ({
      radio: radioNode,
      array: MultiSelectNode,
      single: SingleNode,
    }),
    []
  );

  const getType = (nodeType) => {
    if (nodeType === "radio") {
      return "radio";
    } else if (nodeType === "multi-select") {
      return "array";
    } else {
      return "single";
    }
  };

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [allQues, setAllQues] = useState(props.all_questions);
  useEffect(() => {
    if (allQues) {
      let initialNodes = allQues?.map((_nodes, index) => {
        const savedPosition = {
          x: _nodes.position && _nodes.position.x ? _nodes.position.x : (index/10) * 200,
          y: _nodes.position && _nodes.position.y ? _nodes.position.y : (index%10) * 200,
        };
        const question_id = _nodes.question_id ? _nodes.question_id : "";
        return {
          id: _nodes.id,
          data: {
            label: removeTagsAndnbsp(_nodes.text),
            options: _nodes.options || [],
            onToggleRootQuestion: onToggleRootQuestion,
            question_id: _nodes.question_id,
          },
          type: getType(_nodes.answer_type),
          position: savedPosition,
          question_id: question_id,
          width: 150,
          height: 34,
        };
      });
      const hasRootQuestion = allQues.some(
        (question) => question.question_id === "root"
      );
      if (!hasRootQuestion && initialNodes.length > 0) {
        initialNodes[0].question_id = "root";
        allQues[0].question_id = "root";
      }
      let initialEdges = [];
      allQues.forEach((question, index) => {
        question?.options?.forEach((option) => {
          if (option.target) {
            initialEdges.push({
              id: `${question.id}-${option.value}-${option.target}`,
              source: question.id,
              sourceHandle: option.value,
              target: option.target,
              label: option.value,
              type: option.answerType === "array" ? "bezier" : "step"
            });
          }
        });
      });
      console.log(initialEdges);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [allQues]);
  console.log(props.all_questions);
  console.log(allQues);
  const onNodesChange = useCallback(
    (changes) => {
      if (!allQues) return;
      const updatedQuestions = allQues.map((question) => {
        const changedNode = changes.find((change) => change.id === question.id);
        if (changedNode?.position) {
          question.position = changedNode.position;
          console.log(question.position);
        }
        return question;
      });
      props.setAllQuestions(updatedQuestions);
      console.log(updatedQuestions)
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [allQues, setNodes]
  );
  console.log(allQues)

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  console.log(edges);
  useEffect(() => {
    const updatedQuestions = props?.all_questions?.map((question) => {
      const connectedEdgesSource = edges.filter(
        (edge) => edge.source === question.id
      );
      const updatedOptions = question?.options?.map((option) => {
        const connectedEdge = connectedEdgesSource.find(
          (edge) => edge.sourceHandle === option.value
        );
        return {
          ...option,
          target: connectedEdge ? connectedEdge.target : null,
        };
      });

      const connectedEdgeTarget = edges.find(
        (edge) => edge.target === question.id
      );
      const updatedQuestion = {
        ...question,
        options: updatedOptions,
        source: connectedEdgeTarget ? connectedEdgeTarget.source : null,
      };
      return updatedQuestion;
    });
    props.setAllQuestions(updatedQuestions);

  }, [edges]);
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const onToggleRootQuestion = (questionId) => {
    console.log(questionId);
    if (props.all_questions) {
      const updatedQuestions = props.all_questions.map((question) => {
        if (question.id === questionId) {
          question.question_id = question.question_id === "root" ? "" : "root";
        } else {
          question.question_id = "";
        }
        return question;
      });
      setAllQues(updatedQuestions);
      props.setAllQuestions(updatedQuestions);
    } else {
      console.log("No questions found");
    }
  };
  console.log(props.all_questions);
  return (
    <div style={{ height: "inherit" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
       // fitView
        style={rfStyle}
        panOnScroll
        zoomOnScroll={false}
        panOnScrollSpeed={0.3}
      >
        <Controls style={{ top: 0, bottom: "unset" }} />
        <Background />
        <MiniMap 
        style={{top:0,bottom:"unset"}} 
        nodeStrokeWidth={3} 
        pannable 
        nodeStrokeColor={"blue"}
        nodeColor={"skyblue"}
        zoomable/>
      </ReactFlow>
    </div>
  );
}

export default Flow;
