import "./signature-input.scss";
import React, { useState, useEffect, ChangeEvent } from "react";
import SignaturePad from "signature_pad";
import { FaSave, FaEraser, FaDownload, FaCloudUploadAlt } from "react-icons/fa";
import Close from "../../public/assets/icons/close.svg"
import Button from "../button/button";
import PropertyAdapter from "../../services/adapters/properties-adapter";
import DraggableSignature from "../draggable-signature/draggable-signature";

interface SignatureInputProps {
  tenantInfo?: any;
  unitInfo?: any;
  propertyInfo?: any;
  signatureName?: any;
  showCloseButton?: boolean;
  closeSignature?: () => void;
  onSet?:()=>void
}

export default function SignatureInput(
  props: SignatureInputProps
): JSX.Element {
  const {
    tenantInfo,
    unitInfo,
    propertyInfo,
    signatureName,
    showCloseButton,
    closeSignature,
    onSet
  } = props;
  console.log(signatureName)
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);
  const [savedSignature, setSavedSignature] = useState<string>("");
  const [isSignatureSaved, setIsSignatureSaved] = useState<boolean>(false);

  const readyPad = () => {
    const wrapper = document.getElementById("signature-pad");
    const canvas = wrapper?.querySelector("canvas") as HTMLCanvasElement;

    if (canvas) {
      const tempSignaturePad = new SignaturePad(canvas, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(tempSignaturePad);
    }
  };

  const handleSave = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      console.log(signaturePad)
      setSavedSignature(signaturePad.toDataURL());
      setIsSignatureSaved(true);
    }
  };
  const handleClear = () => {
    if (signaturePad) {
      signaturePad.clear();
    }
    setSavedSignature("");
    setIsSignatureSaved(false);
  };

  const handleConfirm = () => {
    if (savedSignature) {
      const downloadLink = document.createElement("a");
      downloadLink.href = savedSignature;
      downloadLink.download =
        signatureName !== undefined
          ? `${signatureName}_signature.png`
          : "signature.png";
      downloadLink.click();
    }
  };

  const handleUpload = () => {
    onUpload();
  };

  const onUpload = async () => {
    try {
      const rentalID = unitInfo?.rental_id || unitInfo;
      const tenantID = tenantInfo[0]["id"] || tenantInfo;
      const propertyId = propertyInfo?.id || propertyInfo;
      const canvas = document.querySelector(
        ".signature-canvas"
      ) as HTMLCanvasElement;
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append(
            "myFile",
            blob,
            signatureName !== undefined
              ? `${signatureName}_signature.png`
              : "signature.png"
          );

          const data = await PropertyAdapter.addFiles(
            formData,
            propertyId,
            rentalID,
            tenantID
          );

          if (data) {
            console.log(data);
            handleClear();
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    readyPad();
  }, []);

  return (
    <div className="signature-input">
      <div className="signature-input__header">
        <h5>Upload your Signature</h5>
        {showCloseButton && (
          <div onClick={closeSignature} style={{backgroundColor:"dodgerblue",height:"12px",width:"12px",padding:"4px",borderRadius:"50%",cursor:"pointer"}}><Close height="12px" width="12px" /></div>
        )}
      </div>
      <div id="signature-pad">
        <canvas className="signature-canvas" width="560" height="320"></canvas>
        <div>
          <Button
            testID="signature-button"
            btnTheme="upload-page"
            btnType="outline"
            btnText={
              <div className="signature-input__button-content">
                <FaSave /> Save
              </div>
            }
            buttonClick={() => handleSave()}
          />
          <Button
            testID="signature-button"
            btnTheme="upload-page"
            btnType="outline"
            btnText={
              <div className="signature-input__button-content">
                <FaEraser /> Clear
              </div>
            }
            buttonClick={() => handleClear()}
          />
          {isSignatureSaved && (
            <>
              <Button
                testID="download-button"
                btnTheme="upload-page"
                btnText={
                  <div className="signature-input__button-content">
                    <FaDownload /> Download
                  </div>
                }
                buttonClick={() => handleConfirm()}
              />
              <Button
                testID="download-button"
                btnTheme="upload-page"
                btnText={
                  <div className="signature-input__button-content">
                    <FaCloudUploadAlt /> Upload
                  </div>
                }
                buttonClick={handleUpload}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
