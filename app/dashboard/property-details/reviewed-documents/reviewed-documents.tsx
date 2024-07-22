import React, { useEffect, useState } from 'react'
import Form from "../../../../public/assets/icons/pdf.svg"
import Picture from "../../../../public/assets/icons/jpg.svg"
import Doc from "../../../../public/assets/icons/doc.svg";
import Folder from "../../../../public/assets/icons/blue-folder.svg";
import { FaDownload, FaEye } from "react-icons/fa";
import "./reviewed-documents.scss"
import Modal from '../../../../components/modal/modal';
import PropertyAdapter from '../../../../services/adapters/properties-adapter';
import { useUserInfo } from '../../../../services/hooks/useUserInfo';
import download from 'downloadjs';
import FormEditor from '../../form-mapping/form-editor/form-editor';
import { useRouter } from 'next/navigation';
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
const ReviewedDocuments = (props) => {
  console.log(props)
  const [fileNames, setFileNames] = useState([]);
  const [needSync,setSyncRequired] = useState(false);
  const [showPreview,setShowPreview] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentFile,setCurrentFile] = useState("");
  const { propertyInfo, tenantInfo,unitInfo,activeTenant } = props;
  const {userInfo} = useUserInfo();
  let propertyManagerId  = userInfo.sub;
  console.log(activeTenant)
  useEffect(() => {
    let fetchData = async () => {
      let data = await PropertyAdapter.getSignedForms(
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
  const router = useRouter();
  const navigateToForm = (form_id, tenant_id: string, rental_id: string) => {
    //tenant id is tenant id
    //formid is qaId
    //rentalId is rentaldId
    router.push(`/dashboard/property-details/property_manager_sign_form/${tenant_id}/?form_id=${form_id.fileName}`);
    // const url = `/property-forms/${tenant_id}Rental${rental_id}?search=${form_id?.fileName}`;
    // window.open(url, "_blank");
  };
  return (
    <div className="reviewed-documents">
     <div className='reviewed-documents__tenants-wrapper'>
  {/* {tenantInfo && tenantInfo.map(_tenant => (
    <div
      key={_tenant.id}
      style={{
        background: _tenant.id === activeTenantId ? "lightblue" : "rgb(243, 243, 243)",
        padding: "8px"
      }}
      onClick={() => {
        setSyncRequired(true);
        setActiveTenantId(_tenant.id);
      }}
    >
      {_tenant.first_name}
    </div>
  ))} */}
</div>
        
    <fieldset className="reviewed-documents__wrapper">
      <legend className="reviewed-documents__header">Approved Documents</legend>
      {fileNames.length !== 0 &&
        fileNames?.map((_file, index) => {
          const extension = getFileExtension(_file.fileName)?.toLowerCase();
          let icon;
          switch (extension) {
            case "pdf":
              icon = <Form className="reviewed-documents__form-icon" />;
              break;
            case "jpg":
            case "jpeg":
            case "png":
              icon = <Picture className="reviewed-documents__picture-icon" />;
              break;
            case "doc":
            case "odt":
            case "docx":
              icon = <Doc className="reviewed-documents__certificate-icon" />;
              break;
            default:
              icon = <Folder className="reviewed-documents__certificate-icon" />;
          }

          return (
            <div
              className={"reviewed-documents__proofs-wrapper"}
              key={_file.id}
              onMouseEnter={() => setHoveredCard(_file.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="reviewed-documents__icon">{icon}</div>
              <label className="reviewed-documents__label">
                {getFileName(_file.fileName)}
              </label>
              {hoveredCard === _file.id && (
                <div className="reviewed-documents__icons-wrapper">
                  <FaEye
                    onClick={() => navigateToForm(_file,activeTenant?.id,unitInfo.rental_id)}
                    className="reviewed-documents__icons"
                  />
                  <FaDownload
                    onClick={() => handleDownload(_file)}
                    className="reviewed-documents__icons"
                  />
                </div>
              )}
            </div>
          );
        })}
    </fieldset>
  </div>
  )
}

export default ReviewedDocuments
