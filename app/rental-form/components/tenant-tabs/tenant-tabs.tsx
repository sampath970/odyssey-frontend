import React, { useState } from "react";
import "./tenant-tabs.scss";
import Income from "../../../../public/assets/icons/replace-allowance.svg";
import Assets from "../../../../public/assets/icons/assets.svg";
import Allowance from "../../../../public/assets/icons/income.svg";
import Student from "../../../../public/assets/icons/student.svg";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import { useRouter } from "next/navigation";
import { useAllProperties } from "../../../../services/hooks/useAllProperties";
const defAdditionalLabelStyles = {
  color: "gray",
  cursor: "pointer",
};
const activeAdditionalLabelStyles = {
  color: "#2f549b",
  cursor: "pointer",
};
const TenantTabs = (props) => {
  const {activeItem,setActiveItem} = props  
  const { activeTenant, activeRental } = useAllProperties();
  const { push } = useRouter();
  const navigateToHome = (index) => {
    try {
      push("/home");
      setActiveItem(0);
    } catch (ex) {
      console.error("Error at navigateToHome");
    }
  };
  const navigateToMyApplication = (index) => {
    try {
    //   push(`/rental-form/${activeRental}?q=${activeTenant}`);
      setActiveItem(0);
    } catch (ex) {
      console.error("Error at navigateToMyProperty");
    }
  };

  // const navigateToReviewDocuments = (index) => {
  //   try {
  //   //   push(`/rental-form/review-documents/${activeRental}?q=${activeTenant}`);
  //     setActiveItem(1);
  //   } catch (ex) {
  //     console.error("Error at navigateToMyProperty");
  //   }
  // };

  // const navigateToDocumentsVerification = (index) => {
  //   try {
  //   //   push("/rental-form/document-verification");
  //     setActiveItem(2);
  //   } catch (ex) {
  //     console.error("Error at navigateToMyTenants");
  //   }
  // };
  // const navigateToUploadSignature = (index) => {
  //   try {
  //   //   push("/rental-form/upload-signature");
  //     setActiveItem(3);
  //   } catch (ex) {
  //     console.error("Error at navigateToQuestionsFlow");
  //   }
  // };
  return (
    <div className="tenant-tabs">
      <div className="tenant-tabs__tabs-wrapper">
        <div
        onClick={()=>navigateToMyApplication(0)}
          className={
            activeItem === 0
              ? "tenant-tabs__icons-wrapper tenant-tabs__icons-wrapper--active"
              : "tenant-tabs__icons-wrapper"
          }
        >
          <Income />
        </div>
        <Label
          type={LabelType.Header}
          text={"Application form"}
          variant={LabelVariant.L4}
          onLabelClick={()=>navigateToMyApplication(0)}
          overrideTextStyles={activeItem === 0 ? activeAdditionalLabelStyles : defAdditionalLabelStyles}
        />
      </div>
      {/* <div className="tenant-tabs__tabs-wrapper">
        <div
        onClick={()=>navigateToReviewDocuments(1)}
          className={
            activeItem === 1
              ? "tenant-tabs__icons-wrapper tenant-tabs__icons-wrapper--active"
              : "tenant-tabs__icons-wrapper"
          }
        >
          <Assets />
        </div>
        <Label
        onLabelClick={()=>navigateToReviewDocuments(1)}
          type={LabelType.Header}
          text={"Review documents"}
          variant={LabelVariant.L4}
          overrideTextStyles={activeItem === 1 ? activeAdditionalLabelStyles : defAdditionalLabelStyles}
        />
      </div>
      <div className="tenant-tabs__tabs-wrapper">
        <div
        onClick={()=>navigateToDocumentsVerification(2)}
          className={
            activeItem === 2
              ? "tenant-tabs__icons-wrapper tenant-tabs__icons-wrapper--active"
              : "tenant-tabs__icons-wrapper"
          }
        >
          <Allowance />
        </div>
        <Label
        onLabelClick={()=>navigateToDocumentsVerification(2)}
          type={LabelType.Header}
          text={"Upload documents"}
          variant={LabelVariant.L4}
          overrideTextStyles={activeItem === 2 ? activeAdditionalLabelStyles : defAdditionalLabelStyles}
        />
      </div> */}
      {/* <div className="tenant-tabs__tabs-wrapper">
        <div
        onClick={()=>navigateToUploadSignature(3)}
          className={
            activeItem === 3
              ? "tenant-tabs__icons-wrapper tenant-tabs__icons-wrapper--active"
              : "tenant-tabs__icons-wrapper"
          }
        >
          <Student />
        </div>
        <Label
        onLabelClick={()=>navigateToUploadSignature(3)}
          type={LabelType.Header}
          text={"Upload signature"}
          variant={LabelVariant.L4}
          overrideTextStyles={activeItem === 3 ? activeAdditionalLabelStyles : defAdditionalLabelStyles}
        />
      </div> */}
    </div>
  );
};

export default TenantTabs;
