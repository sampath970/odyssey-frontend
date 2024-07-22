import React, { useEffect, useState } from "react";
import FloatingMenu from "../floating-menu/floating-menu";
import "./step-progressbar.scss";

interface ProgressStepsProps {
  certificationStatus: string;
  tenantID: string;
  rental_id: string;
  selectedUnit: any; 
  setLabel: (label: string) => void;
  setButtonstatus: (status: boolean) => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const [startLabel, setStartLabel] = useState("Not started");
  const [progressWidth, setProgressWidth] = useState("0%");

  const { certificationStatus, tenantID, rental_id, selectedUnit,setLabel,setButtonstatus } = props;
  console.log(activeStep);
  const steps = [
    {
      label: "Start Certification Forms",
      step: 1,
      process: "started",
      info: "view more",
      onClick: (id) => {
        console.log(id)
        window.open(`/rental-form/${id}?q=${tenantID}`, "_blank");
      },
    },
    {
      label: "Confirm Details",
      step: 2,
      process: "Progress",
      info: "view more",
      onClick: (id) => {
        window.open(`/rental-form/document-verification`, "_blank");
      },
    },
    {
      label: "Upload Documents",
      step: 3,
      process: "Review",
      info: "view more",
      onClick: (id) => {
        window.open(
          `/rental-form/review-documents/${id}?q=${tenantID}`,
          "_blank"
        );
      },
    },
    {
      label: "Complete Certification",
      step: 4,
      process: "Completed",
      info: "view more",
      onClick: (id) => {
        window.open(`/rental-form/document-verification`, "_blank");
      },
    },
  ];

  useEffect(() => {
    const getActiveStep = (certification_status) => {
      if (certification_status === "started") {
        setStartLabel("Started");
        setProgressWidth("0%");
        setActiveStep(2);
      } else if (certification_status === "progress") {
        setProgressWidth("28%");
        setActiveStep(3);
      } else if (certification_status === "review") {
        setProgressWidth("53%");
        setActiveStep(4);
      } else if (certification_status === "completed") {
        setProgressWidth("77%");
        setActiveStep(5);
      } else {
        setProgressWidth("0%");
        setStartLabel("Not Started");
        setActiveStep(1);
      }
    };
    getActiveStep(certificationStatus);
  }, [certificationStatus]);

  const handleStepClick = (step, id, onClickFunction) => {
    if (onClickFunction) {
      onClickFunction(id);
    }
  };
  const getStatusColor = (activeStep) => {
    if (activeStep === 2 && certificationStatus === "started") {
      return "rgb(255 170 2)";
    } else if (activeStep === 3 && certificationStatus === "progress") {
      return "rgb(107 193 72)";
    } else if (activeStep === 4 && certificationStatus === "review") {
      return "rgb(107 193 72)";
    } else if (activeStep === 5 && certificationStatus === "completed") {
      return "rgb(107 193 72)";
    } else {
      return "rgb(255 170 2)";
    }
  };
  const getBorderColor = (step,label,onClick,id) => {
    if (step === 1 && certificationStatus === "started") {
      setLabel(label);
      return "red";
    }
    else if (step === 2 && certificationStatus === "progress") {
      setLabel(label);
      return "red";
    } else if (step === 3 && certificationStatus === "review") {
      setLabel(label);
      return "red";
    } else if (step === 4 && certificationStatus === "completed") {
      setLabel(label);
      return "red";
    } else if (activeStep > step) {
      return "rgb(107 193 72)";
    } else {
      return "rgb(255 170 2)";
    }
  };
  console.log(activeStep);
  const getUnitStatus = (step) => {
    if (selectedUnit?.value === null) {
      return true;
    } else if (step === 1 && certificationStatus === "started") {
      return false;
    } else if (step === 2 && certificationStatus === "progress") {
      return false;
    } else if (step === 3 && certificationStatus === "review") {
      return false;
    } else if (step === 4 && certificationStatus === "completed") {
      return false;
    } else if (activeStep >= step) {
      return true;
    } else {
      return true;
    }
  };
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "70px",
          position: "relative",
        }}
      >
        {steps.map(({ step, label, info, process, onClick }) => (
          <div className="floating-menu-step__progress" key={step}>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <FloatingMenu
                status={getUnitStatus(step)}
                menuTriggerComponent={
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: getBorderColor(step,label,onClick,rental_id),
                      border: `3px solid ${getBorderColor(step,label,onClick,rental_id)}`,
                      transition: "0.4s ease",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {activeStep - 1 > step ? (
                      <div
                        style={{
                          fontSize: "26px",
                          fontWeight: 600,
                          color: "white",
                          transform: "scaleX(-1) rotate(-46deg)",
                        }}
                      >
                        L
                      </div>
                    ) : (
                      <span style={{ fontSize: "19px", color: "white" }}>
                        {step}
                      </span>
                    )}
                  </div>
                }
              >
                <div className="floating-menu-step-wrapper">
                  <div className="floating-menu__item">{process || ""}</div>
                  <div className="floating-menu__line"></div>
                  <div
                    className="floating-menu__item"
                    onClick={() => handleStepClick(step, rental_id, onClick)}
                  >
                    {" "}
                    {info || ""}
                  </div>
                </div>
              </FloatingMenu>
              <span style={{ fontSize: "19px", color: "black", zIndex: "1" }}>
                {label}
              </span>
            </div>
          </div>
        ))}
        <div
          className="connecting-line"
          style={{
            height: "5px",
            width: "77%",
            backgroundColor: "rgb(255 170 2)",
            position: "absolute",
            top: "30%",
            transform: "translateY(-50%)",
            left: "10%",
          }}
        />
        <div
          className="connecting-line"
          style={{
            height: "5px",
            width: progressWidth,
            backgroundColor: getStatusColor(activeStep),
            position: "absolute",
            top: "30%",
            transform: "translateY(-50%)",
            left: "10%",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressSteps;
