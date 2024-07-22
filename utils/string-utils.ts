const getFileName = (name) =>{
    if(name){
      let formattedName = name.split("/")[1] || name;
      return formattedName;
    }else{
      return name
    }
  }
  const formatPhoneNumber = (value: any): any => {
    if (!value) return value;
  
    // Remove non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, "");
  
    const phoneNumberLength = phoneNumber.length;
  
    if (phoneNumberLength < 4) return phoneNumber;
    
    if (phoneNumberLength < 7) {
        // Format for length 4 to 6: (XXX) XXX
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
  
    // Format for length 7 to 10: (XXX) XXX-XXXX
    const formattedNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  
    // Truncate additional characters beyond (XXX) XXX-XXXX
    console.log(formattedNumber)
    return formattedNumber.slice(0, 17);
  };
  export {getFileName,formatPhoneNumber};