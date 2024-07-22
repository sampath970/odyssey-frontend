const getButtonStatusText = (form) => {
  console.log(form)
  switch (form.file_status) {
    case "pending":
      return "Awaiting Manager"; //Forms has been sent to property manager
    case "review":
      if(form?.hasSigned){
        return "Sign";
      }else{
        return "View";
      }
    case "signed":
      return "Awaiting Manager";
    case "submitted":
      return "Completed";
    case "reject":
      return "Change";
    case "new":
    default:
      return "Start";
  }
};
const getButtonStatusTextforPM = (form) => {
  console.log(form)
  switch (form?.status) {
    case "pending":
      return "Review";
    case "signed":
      if(form?.hasSigned){
        return "Sign";
      }else{
        return "View";
      }
    default:
      return "No Actions";
  }
};


export { getButtonStatusText,getButtonStatusTextforPM };
