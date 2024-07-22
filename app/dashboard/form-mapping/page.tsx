"use client";
import "./form-mapping.scss";
import { Header } from "./Header";
import SliderComponent from "../../../components/slider-component/slider-component";
import { Footer } from "./footer";
import { useEffect, useRef, useState } from "react";
import MappingAdapter from "../../../services/adapters/mapping-adapter";
import LoadingBar from 'react-top-loading-bar'
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import FormEditor from "./form-editor/form-editor";
function FormMapping() {
  const { userInfo } = useUserInfo();
  const [forms, setForms] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [progress, setProgress] = useState(0);
  const [needSync, setSyncRequired] = useState(false);
  const [questionSync,setQuestionSyncRequired] = useState(false)
  useEffect(() => {
    const getAllForms = async () => {
      try {
        if (userInfo) {
          setProgress(20)
          let res = await MappingAdapter.fetchForms(userInfo);
          console.log(res)
          if (res && res.length > 0) {
            setForms(res);
            setSyncRequired(false)
          } else if (res.length === 0) {
            setForms([])
            setSyncRequired(false)
          }else{
            console.log("User has no mapped form")
          }
          console.log(res);
          setProgress(100)
        } else {
          console.log("User info empty")
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllForms();
  }, [userInfo,needSync]);
  console.log(currentFile);
  console.log(forms)
  return !showEditor ? (
    <div style={{padding:'12px'}}>
      <LoadingBar color='#32579e' style={{height:"4px"}} progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Header setShowEditor={setShowEditor}/>
      <SliderComponent
        forms={forms}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        setShowEditor={setShowEditor}
        userInfo={userInfo}
        setSyncRequired={setSyncRequired}
        setQuestionSyncRequired={setQuestionSyncRequired}
        />
      {/* <Footer  /> */}
    </div>
  ) : (
    <FormEditor
    currentFile={currentFile}
    setCurrentFile={setCurrentFile}
    setShowEditor={setShowEditor}
    showBackIcon={true}
    questionSync={questionSync}
    setQuestionSyncRequired={setQuestionSyncRequired}
      role="form-mapping"
    />
  );
}
export default FormMapping;
