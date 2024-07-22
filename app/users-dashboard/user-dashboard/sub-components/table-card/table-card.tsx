import React from "react";
import "./table-card.scss";
import { getButtonStatusText } from "../../../../../utils/user-dashboard-utils";
import Button from "../../../../../components/button/button";
import Pending from "../../../../../public/assets/icons/pending.svg";
import Review from "../../../../../public/assets/icons/review.svg";
import Signed from "../../../../../public/assets/icons/signed.svg";
import Completed from "../../../../../public/assets/icons/signed.svg";
import NotStarted from "../../../../../public/assets/icons/not-started.svg";
import Rejected from "../../../../../public/assets/icons/red-cross.svg";
import Modal from "../../../../../components/modal/modal";
const TableCard = (props) => {
  const { formInfo, handleNavigateToRentalForm, rentalID, userInfo } = props;
  console.log(formInfo);
  const getFileIconByStatus = (status) => {
    switch (status) {
      case "pending":
        return <Pending />;
      case "review":
        return <Review />;
      case "signed":
        return <Signed />;
      case "submitted":
        return <Completed />;
      case "reject":
        return <Rejected />;
      case "new":
      default:
        return <NotStarted style={{ marginLeft: "4px" }} />;
    }
  };
  return (
    <div className="table-card">
      <div className="table-card__section">
        <div className="table-card__form-name--header">{"Form Name"}</div>
        <div className="table-card__form-name">{formInfo?.file_name || ""}</div>
      </div>
      <div className="table-card__section">
        <div className="table-card__action--header">Actions</div>
        <div className="table-card__action">
          <Button
            btnText={getButtonStatusText(formInfo)}
            btnType="rounded"
            buttonClick={() =>
              handleNavigateToRentalForm(
                formInfo?.file_status,
                rentalID,
                userInfo?.id,
                formInfo?.file_id
              )
            }
            buttonStatus={
              formInfo.file_status !== "new" &&
              formInfo.file_status !== "reject" &&
              formInfo.file_status !== "review" && 
              formInfo.file_status !== "submitted"
            }
            btnTheme={
              formInfo?.file_status === "signed" ||
              formInfo?.file_status === "submitted"
                ? "users-page-signed"
                : "questionnaire-primary"
            }
            additionalStyles={{ padding: 0 }}
          />
        </div>
      </div>
      <div className="table-card__section">
        <div className="table-card__status--header">Status</div>
        <div className="table-card__status">
          {getFileIconByStatus(formInfo.file_status)}
          {formInfo.file_status === "reject"
            ? "Changes requested"
            : formInfo.file_status}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
