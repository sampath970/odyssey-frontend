import moment from "moment";

const getButtonText = (role) => {
  switch (role) {
    case "tenant":
      return "Save";
    case "property_manager":
      return "Add Property Manager";
    case "customer_support_agent":
      return "Add Customer Support Agent";
    default : "Save";
  }
};
const ContentID = {
  SUCCESS: "Completed!",
  UPLOADED: "Forms ready to action",
  SIGNED_DOCUMENTS: "Forms signed",
  REVIEWED_DOCUMENTS: "Forms approved",
  PROOFS_UPLOADED: "Uploaded Documents",
  ADD_TENANT: "Add New Tenant",
  VIEW_MORE: "Tenant Details",
  EDIT_TENANT: "Edit Tenant",
  UNIT_NO: "Documents",
  HEAD_OF_HOUSEHOLD: "Head of HouseHold",
};

function checkCompliance(certificationDate) {
  let certificationDateMoment = moment(certificationDate, "DD/MM/YYYY");
  let todaysDateMoment = moment().startOf('day'); 
  let processingStartDate = moment(todaysDateMoment).add(4, 'months').startOf('day');
  
  if (certificationDateMoment.isSameOrAfter(todaysDateMoment)) {
    if (certificationDateMoment.isSameOrBefore(processingStartDate)) {
      return "Processing";
    } else {
      return "Compliant";
    }
  } else {
    return "Non-Compliant";
  }
}
const getBoxColor=(date)=>{
  if(checkCompliance(date)==="Compliant"){
    return "linear-gradient(147deg, #97eba8 0%, #36c772 74%)"; 
  }else if(checkCompliance(date)==="Non-Compliant"){
    return "linear-gradient(147deg, #f7accf 0%, #ff1053 74%)"; 
  }else{
  return "linear-gradient(147deg, rgb(170, 216, 250) 0%, rgb(54, 168, 252) 74%)"; 
}
}
function formatDateToDDMMYYYY(dateStr) {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export {
    getButtonText,
    ContentID,
    formatDateToDDMMYYYY,
    getBoxColor,
    checkCompliance
}