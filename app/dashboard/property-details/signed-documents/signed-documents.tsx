import React, { useEffect, useState } from 'react'
import Form from "../../../../public/assets/icons/pdf.svg"
import Picture from "../../../../public/assets/icons/jpg.svg"
import Doc from "../../../../public/assets/icons/doc.svg";
import Folder from "../../../../public/assets/icons/blue-folder.svg";
import { FaDownload, FaEye } from "react-icons/fa";
import "./signed-documents.scss"
import Modal from '../../../../components/modal/modal';
import PropertyAdapter from '../../../../services/adapters/properties-adapter';
import { useUserInfo } from '../../../../services/hooks/useUserInfo';
import download from 'downloadjs';
import FormEditor from '../../form-mapping/form-editor/form-editor';
const getFileExtension = (fileName: any) => {
  return fileName?.split(".").pop();
};
const getFileName = (name) =>{
  if(name){
    let formattedName = name.split("/")[4] || name;
    return formattedName;
  }else{
    return name
  }
}
const SignedDocuments = (props) => {
  console.log(props);
  const {activeTenant} = props; //activeTenant
  console.log(activeTenant)
  if(!activeTenant) return null; //TODO: show a message saying no documents
  const [fileNames, setFileNames] = useState([]);
  const [needSync,setSyncRequired] = useState(false);
  const [showPreview,setShowPreview] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentFile,setCurrentFile] = useState("")
  const { propertyInfo, tenantInfo,unitInfo } = props;
  const {userInfo} = useUserInfo();
  let propertyManagerId  = userInfo.sub;
  useEffect(() => {
    let fetchData = async () => {
      let data = await PropertyAdapter.getCompletelySignedForms(
        propertyManagerId,
        propertyInfo?.id,
        unitInfo.rental_id,
        activeTenant?.id
      );
      if (data) {
        console.log(data)
        const formatedName = data?.map((fileName, index) => ({
          fileName,
          id: (index + 1).toString(), // Assuming you want ids as string values
          checked: false,
        }));
        console.log(formatedName)
        setFileNames(formatedName);
        setSyncRequired(false);
      }
      return data;
    };
    fetchData();
  }, [needSync]);
  const handleDownload = async (file) => {
    try {
      if (file) {
        let fileName = file?.fileName;
        let data = await PropertyAdapter.downloadDocuments(fileName);
        const fileExtension = getFileExtension(fileName);
        let downloadFileName = getFileName(fileName);
        download(data, downloadFileName, fileExtension);
      }
    } catch (error) {
      console.error("Error at handleDownload");
    }
  };
  const handleView = async (file) => {
    console.log(file);
    setCurrentFile(file?.fileName);
    setShowPreview(true);
  };
  return (
    <div className="signed-documents">
      <div className='signed-documents__tenants-wrapper'>
  {/* {tenantInfo && tenantInfo.map(_tenant => (
    <div
      key={_tenant.id}
      style={{
        background: _tenant.id === activeTenantId ? "lightblue" : "rgb(243, 243, 243)",
        padding: "8px"
      }}
      onClick={() => {
        setActiveTenantId(_tenant.id);
        setSyncRequired(true);
      }}
    >
      {_tenant.first_name}
    </div>
  ))} */}
</div>
    <fieldset className="signed-documents__wrapper">
      <legend className="signed-documents__header">Management Only</legend>
      {fileNames.length !== 0 &&
        fileNames?.map((_file, index) => {
          const extension = getFileExtension(_file.fileName)?.toLowerCase();
          let icon;
          switch (extension) {
            case "pdf":
              icon = <Form className="signed-documents__form-icon" />;
              break;
            case "jpg":
            case "jpeg":
            case "png":
              icon = <Picture className="signed-documents__picture-icon" />;
              break;
            case "doc":
            case "odt":
            case "docx":
              icon = <Doc className="signed-documents__certificate-icon" />;
              break;
            default:
              icon = <Folder className="signed-documents__certificate-icon" />;
          }

          return (
            <div
              className={"signed-documents__proofs-wrapper"}
              key={_file.id}
              onMouseEnter={() => setHoveredCard(_file.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="signed-documents__icon">{icon}</div>
              <label className="signed-documents__label">
                {getFileName(_file.fileName)}
              </label>
              {hoveredCard === _file.id && (
                <div className="signed-documents__icons-wrapper">
                  <FaEye
                    onClick={() => handleView(_file)}
                    className="signed-documents__icons"
                  />
                  <FaDownload
                    onClick={() => handleDownload(_file)}
                    className="signed-documents__icons"
                  />
                </div>
              )}
            </div>
          );
        })}
    </fieldset>
    {currentFile !== "" ? (
      <>
        <Modal
          title={"Preview"}
          isOpen={showPreview}
          setOn={() => setShowPreview(false)}
          showCloseButton={true}
        >
          <FormEditor
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            role="tenant"
          />
        </Modal>
        <div></div>
      </>
    ) : null}
  </div>
  )
}

export default SignedDocuments
