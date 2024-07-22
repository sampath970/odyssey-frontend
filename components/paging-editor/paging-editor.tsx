import React, { useState } from 'react';
import Button from '../button/button';
import SignatureInput from '../signature-input/signature-input';

interface PagingEditorProps {
  tenantInfo?: any;
  propertyInfo?: any;
  unitInfo?: any;
  fileName?: any;
  closePreview?: (arg: boolean) => void;
  onSet?: () => void;
}

const PagingEditor: React.FC<PagingEditorProps> = (props) => {
  const { tenantInfo, propertyInfo, unitInfo, fileName, closePreview, onSet } = props;
  const [showSignature, setShowSignature] = useState(false);

  const EditorStyles = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };

  return (
    <div style={{ border: "1px solid rgb(235, 235, 235)", flexDirection: "column", display: "flex" }}>
      <div style={{ gap: "12px", justifyContent: "flex-end", display: "flex", padding: "12px" }}>
        <Button
          btnText={"Add sign"}
          btnTheme="upload-page"
          buttonClick={() => setShowSignature(true)}
          additionalStyles={EditorStyles}
        />
        <Button
          btnText={"Add text"}
          btnTheme="upload-page"
          buttonClick={() => setShowSignature(true)}
          additionalStyles={EditorStyles}
        />
        <Button
          btnText={"Close"}
          btnTheme="upload-page"
          buttonClick={() => closePreview && closePreview(false)}
          additionalStyles={EditorStyles}
        />
      </div>
      <div className={`signature-overlay ${showSignature ? "show" : ""}`}>
        {showSignature && (
          <>
            <SignatureInput
              tenantInfo={[{ id: tenantInfo }]}
              unitInfo={unitInfo}
              propertyInfo={propertyInfo}
              signatureName={fileName}
              showCloseButton={true}
              closeSignature={() => setShowSignature(false)}
              onSet={onSet}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PagingEditor;
