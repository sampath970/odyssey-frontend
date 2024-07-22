"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Document, Page, pdfjs } from "react-pdf";
import { FaDownload, FaEye } from "react-icons/fa";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import download from "downloadjs";
import Button from "../../../../components/button/button";
import AddFile from "../../../../public/assets/icons/add-file.svg";
import Checked from "../../../../public/assets/icons/check.svg";
import Profile from "../../../../public/assets/icons/profile.svg";
import Remove from "../../../../public/assets/icons/remove.svg";
import Close from "../../../../public/assets/icons/close.svg";
import Doc from "../../../../public/assets/icons/doc.svg";
import Form from "../../../../public/assets/icons/pdf.svg";
import Picture from "../../../../public/assets/icons/jpg.svg";
import Folder from "../../../../public/assets/icons/blue-folder.svg";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./proofs-uploaded.scss";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import FloatingMenu from "../../../../components/floating-menu/floating-menu";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import PagingControl from "../../../../components/paging-control/paging-control";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import FormEditor from "../../form-mapping/form-editor/form-editor";
import Input from "../../../../components/input/input";
import LoadingBar from "react-top-loading-bar";
import Delete from "../../../../public/assets/icons/delete.svg"
import DocumentsAdapter from "../../../../services/adapters/documents_adapter";
import Label, { LabelType, LabelVariant } from "../../../../components/label/label";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ProofsUploaded = ({
  tenantInfo,
  unitInfo,
  propertyInfo,
  flow,
  extraProofStyles = {},
  extraFieldSetStyle = {},
  activeTenant = {}
}) => {
  if (propertyInfo == null || tenantInfo == null || unitInfo == null) {
    return null;
  }
  let activeTenants =
    flow === "tenant"
      ? null
      : tenantInfo?.map((tenant) => ({
        ...tenant,
        checked: false,
      }));
  const fileUploadRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [needSync, setSyncRequired] = useState(false);
  const [tenants, setTenants] = useState(activeTenants);
  const [addTenantSection, setAddTenantSection] = useState(false);
  const [pdfString, setPdfString] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentFile, setCurrentFile] = useState("");
  const [edittedFileName, setEdittedFileName] = useState("");
  const [currentFileExtension, setCurrentFileExtension] = useState("");
  const [progress, setProgress] = useState(0);
  const [showPopupModal, setShowPopupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { userInfo } = useUserInfo();
  const handleDownload = async (file) => {
    try {
      if (file) {
        let fileName = file?.fileId;
        let data = await PropertyAdapter.downloadDocuments(fileName);
        const fileExtension = getFileExtension(fileName);
        let downloadFileName = getFileName(fileName);
        download(data, downloadFileName, fileExtension);
      }
    } catch (error) {
      console.error("Error at handleDownload");
    }
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  let rentalID = unitInfo?.rental_id || unitInfo;
  let tenantID = flow == "tenant" ? tenantInfo : null;
  let propertyId = propertyInfo?.id || propertyInfo;
  let propertyManagerId = flow == "tenant" ? null : userInfo.sub;
  
  useEffect(() => {
    let fetchData = async () => {
      //@ts-ignore
      const tenantRentalResponse = await TenantAdapter.getRentalByTenantId(activeTenant.id);
      if(tenantRentalResponse || flow === "tenant"){
        let currentRentalIdForTenantAsPerUnit = tenantRentalResponse?.find(rental=>rental.unit_id === unitInfo?.id);
        let _rentalId = currentRentalIdForTenantAsPerUnit?.id;
      let allUploadedProofsResponse = await PropertyAdapter.getProofsListing(
        propertyManagerId,
        propertyId,
        flow == "tenant"  ? rentalID : _rentalId,
        tenantID
      );
      let tenantSignedDocumentsResponse = [];
      if (flow !== "tenant") {
        tenantSignedDocumentsResponse = await PropertyAdapter.getSignedForms(
          propertyManagerId,
          propertyId,
          flow == "tenant"  ? rentalID : _rentalId,
          tenantID
        );
      }
      let signedDocumentsResponse =
        await PropertyAdapter.getCompletelySignedForms(
          propertyManagerId,
          propertyId,
          flow == "tenant"  ? rentalID : _rentalId,
          tenantID
        );
      console.log(tenantSignedDocumentsResponse);
      if (allUploadedProofsResponse && signedDocumentsResponse) {
        let allForms = [];
        allForms = (
          Array.isArray(allUploadedProofsResponse)
            ? allUploadedProofsResponse
            : []
        )
          .concat(
            Array.isArray(tenantSignedDocumentsResponse)
              ? tenantSignedDocumentsResponse
              : []
          )
          .concat(
            Array.isArray(signedDocumentsResponse)
              ? signedDocumentsResponse
              : []
          );
          console.log(allForms)
        const formatedName = allForms?.map((fileName, index) => ({
          fileName,
          fileId: fileName?.name,
          id: (index + 1).toString(),
          checked: false,
        }));
        setFileNames(formatedName);
        setSyncRequired(false);
      }
      return allUploadedProofsResponse;
    }
    };
    fetchData();
  }, [needSync]);

  const getFileExtension = (fileName: any) => {
    return fileName?.split(".").pop();
  };
  const onAddFiles = async (event) => {
    setProgress(20);
    if (tenantInfo) {
      let rentalID = flow == "tenant" ? unitInfo : unitInfo?.rental_id;
      let tenantId = flow == "tenant" ? tenantInfo : checkedTenants[0]?.id;
      try {
        const newFile = event?.target?.files[0];
        const formData = new FormData();
        formData.append("myFile", newFile, newFile.name);
        let uploadedFile = {
          id: uuidv4(),
          file_name: newFile?.name,
          checked: false,
          formData,
        };
        setProgress(40);
        const data = await PropertyAdapter.addFiles(
          formData,
          propertyId,
          rentalID,
          tenantId
        );
        if (data) {
          setSyncRequired(true);
        }
        setProgress(100);
      } catch {
        console.log("error");
      }
    }
  };

  const checkedFiles = fileNames.filter((file) => file.checked);
  const getFileName = (fileName) => {
    const name = fileName.split("/").pop();
    return name;
  };
  const getFileNameWithoutExtension = (fileName) => {
    let name = fileName.split("/").pop();
    name = removeFileExtension(name);
    return name;
  };
  function removeFileExtension(filename) {
    let formattedFileName = getFileName(filename);
    const lastDotIndex = formattedFileName.lastIndexOf(".");
    let extension = "";
    if (lastDotIndex !== -1) {
      extension = formattedFileName.slice(lastDotIndex + 1);
      formattedFileName = formattedFileName.slice(0, lastDotIndex);
    }
    setCurrentFileExtension(extension);
    return formattedFileName;
  }
  const toggleChecked = (id) => {
    const newTenants = tenants.map((_tenant) => ({ ..._tenant }));
    newTenants.forEach((_tenant) => {
      if (_tenant.id !== id) {
        _tenant.checked = false;
      } else {
        _tenant.checked = !_tenant.checked;
      }
    });

    setTenants(newTenants);
  };
  const checkedTenants =
    tenants && tenants.filter((_tenant) => _tenant.checked);
  const handleUpload = () => {
    setAddTenantSection(true);
    if (checkedTenants && checkedTenants.length === 1) {
      fileUploadRef.current.click();
    } else {
      console.log("Select atleast one tenant to upload files");
    }
  };
  const handleView = async (file) => {
    setCurrentFile(file?.fileId);
    setShowPreview(true);
  };
  const handleFileNameEdit = (fileName, fileId) => {
    const updatedFileNames = fileNames.map((file) => {
      if (file.id === fileId) {
        return { ...file, editing: true };
      } else {
        return { ...file, editing: false };
      }
    });
    setFileNames(updatedFileNames);
    setEdittedFileName(fileName);
  };

  const handleSaveFileName = (fileId) => {
    const updatedFileNames = fileNames.map((file) => {
      if (file.id === fileId) {
        // Concatenate the edited filename with the file extension
        const editedFileNameWithExtension = `${edittedFileName}.${currentFileExtension}`;
        return {
          ...file,
          fileName: {
            ...file.fileName,
            name: editedFileNameWithExtension,
          },
          editing: false,
        }; // Update the file name with extension
      } else {
        return file;
      }
    });
    setFileNames(updatedFileNames);
  };
  const handleFileNameChange = (_text) => {
    setEdittedFileName(_text);
  };

  const [fileId, setFileId] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleDocumentDelete = async (fileId) => {
    const fileDeleteResponse = await DocumentsAdapter.deleteDocument(userInfo, fileId)
    if (fileDeleteResponse) {
      setSyncRequired(true)
      setShowPopupModal(false);
      setShowDeleteModal(true)
      setShowSuccessModal(true);
    }
    else {
      console.log("Error at HandleDelete");
    }
  };
  const handleDelete = (_file) => {
    setShowPopupModal(true);
    setShowDeleteModal(true)
    setFileId(_file.fileId)
  };
  const handleDeleteCancel = () => {
    setShowPopupModal(false);
    setShowSuccessModal(false);
  };
  return (
    <div className="proofs-uploaded" style={{ ...extraProofStyles }}>
      <fieldset
        className="proofs-uploaded__wrapper"
        style={{ ...extraFieldSetStyle }}
      >
        <legend className="proofs-uploaded__header">Documents Uploaded</legend>
        <LoadingBar
          color="#32579e"
          style={{ height: "6px" }}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        {fileNames.length !== 0 &&
          fileNames?.map((_file, index) => {
            let last_modified_time = new Date(_file.fileName.last_modified_date)
              ?.toISOString()
              .split("T")[1]
              .split(".")[0];
            let last_modified_date = new Date(_file.fileName.last_modified_date)
              ?.toISOString()
              .split("T")[0];
            const extension = getFileExtension(
              _file.fileName.name
            )?.toLowerCase();
            let icon;
            switch (extension) {
              case "pdf":
                icon = <Form className="proofs-uploaded__form-icon" />;
                break;
              case "jpg":
              case "jpeg":
              case "png":
                icon = <Picture className="proofs-uploaded__picture-icon" />;
                break;
              case "doc":
              case "odt":
              case "docx":
                icon = <Doc className="proofs-uploaded__certificate-icon" />;
                break;
              default:
                icon = <Folder className="proofs-uploaded__certificate-icon" />;
            }

            return (
              <div
                className={"proofs-uploaded__proofs-wrapper"}
                key={_file.id}
                onMouseEnter={() => setHoveredCard(_file.id)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                }}
              >
                <div className="proofs-uploaded__icon">{icon}</div>
                {_file.editing ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Enter file name"
                      name="file-edit"
                      value={edittedFileName}
                      onChange={handleFileNameChange}
                      wrapperStyle={{ border: "none" }}
                      inputStyle={{
                        outline: "none",
                        border: "1px solid lightgray",
                        width: "inherit",
                      }}
                    />
                    <Button
                      buttonClick={() => handleSaveFileName(_file.id)}
                      btnText={"Save"}
                    ></Button>{" "}
                    {/* Save button */}
                  </>
                ) : (
                  <div>
                    <div>
                      <label
                        className="proofs-uploaded__label"
                      // onClick={() => handleFileNameEdit(getFileNameWithoutExtension(_file.fileName), _file.id)}
                      >
                        {getFileName(_file.fileName.name)}
                      </label>
                    </div>
                    <div>
                      <label className="proofs-uploaded__text">
                        Time : {last_modified_time}
                      </label>
                    </div>
                    <div>
                      <label className="proofs-uploaded__text">
                        Date : {last_modified_date}
                      </label>
                    </div>
                  </div>
                )}
                {hoveredCard === _file.id && (
                  <div className="proofs-uploaded__icons-wrapper">
                    <FaEye
                      onClick={() => handleView(_file)}
                      className="proofs-uploaded__icons"
                    />
                    <FaDownload
                      onClick={() => handleDownload(_file)}
                      className="proofs-uploaded__icons"
                    />
                    <MdEdit
                      onClick={() =>
                        handleFileNameEdit(
                          getFileNameWithoutExtension(_file.fileName.name),
                          _file.id
                        )
                      }
                      className="proofs-uploaded__icons"
                    />
                    <MdDelete
                      //  onClick={() => handleDelete(_file.fileId)}
                      onClick={() => handleDelete(_file)}
                      className="proofs-uploaded__icons"
                    />
                  </div>
                )}
              </div>
            );
          })}
      </fieldset>
      {showPopupModal && (
        <Modal
          showCloseButton={false}
          isOpen={showPopupModal}
          size={ModalTypes.Xmedium}
          title={"Delete!"}
        >
          <div className="delete__popup-wrapper">
            <div>
              <Label
                type={LabelType.Header}
                //@ts-ignore
                text={"Are you sure that you want to delete this document?"}
                variant={LabelVariant.L2}
              />
            </div>
            <div className="confirm-button">
              <Button
                buttonClick={() => handleDocumentDelete(fileId)}
                testID="delete"
                btnText="Yes"
                btnType="rectangle"
                btnTheme="primary"
              />
              <Button
                buttonClick={handleDeleteCancel}
                testID="delete"
                btnText="No"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>)}
      {showSuccessModal && (
        <Modal
          showCloseButton={false}
          isOpen={showSuccessModal}
          size={ModalTypes.Xmedium}
        >
          <div className="popup-delete">
            <Label
              type={LabelType.Header}
              text={"Document Deleted Successfully !!"}
              variant={LabelVariant.L2}
            />

            <AnimatedCheck />
            <div className="popup_close">
              <Button
                buttonClick={handleDeleteCancel}
                testID="delete"
                btnText="Close"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>
      )}
      {flow !== "tenant" && (
        <div className="proofs-uploaded__file-upload">
          <input onChange={onAddFiles} type="file" ref={fileUploadRef} hidden />
          <div
            className="proofs-uploaded__proofs-upload-wrapper"
            onClick={() =>
              flow == "tenant" ? fileUploadRef.current.click() : handleUpload()
            }
          >
            <div>
              <AddFile
                className="proofs-uploaded__add-file-icon"
              />
            </div>
            <label className="proofs-uploaded__label">Upload</label>
          </div>
        </div>
      )}
      {flow == "property-manager" && addTenantSection && (
        <div>
          <div className="proofs-uploaded__tenants-icon-wrapper">
            {tenants &&
              tenants?.map((_tenants, index) => {
                return (
                  <div
                    className="proofs-uploaded__tenants-wrapper"
                    key={_tenants?.id}
                  >
                    <div className="proofs-uploaded__tenants-icon">
                      <FloatingMenu
                        floatDirection="right"
                        marginStyle={{ marginTop: "4px" }}
                        menuTriggerComponent={
                          <Profile
                            className="proofs-uploaded__profile-icon"
                            onClick={() => toggleChecked(_tenants.id)}
                          />
                        }
                      >
                        <div className="proofs-uploaded__tenant-name">{`${_tenants?.first_name}`}</div>
                      </FloatingMenu>
                      {_tenants?.checked === true ? (
                        <Checked
                          className="proofs-uploaded__checked-icon"
                          onClick={() => toggleChecked(_tenants.id)}
                        />
                      ) : (
                        <Remove
                          className="proofs-uploaded__remove-icon"
                          onClick={() => toggleChecked(_tenants.id)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            <div
              className="proofs-uploaded__tenants-close-icon"
              onClick={() => {
                setAddTenantSection(false);
                setTenants(activeTenants);
              }}
            >
              <Close className="proofs-uploaded__closed-icon" />
            </div>
          </div>
          {addTenantSection && checkedTenants && checkedTenants.length == 0 && (
            <div className="proofs-uploaded__select-tenant-wrapper">
              <label className="proofs-uploaded__select-tenant">{`Select atleast one tenant to upload`}</label>
            </div>
          )}
        </div>
      )}
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
        </>
      ) : null}
    </div>
  );
};

export default ProofsUploaded;
