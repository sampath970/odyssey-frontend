"use client";
import React, { useState } from "react";
import AddTenant from "../tenant-section/add-tenant/add-tenant";
import "./add-company.scss";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

const AddCompany = (props) => {
  const {setShowCompanyAdd} = props;
  const [companyName,setCompanyName] = useState("")
  const [companyId,setCompanyId] = useState("")
  const [companyInfo,setCompanyInfo] = useState("")
  const handleCompanyNameChange = (_companyName) =>{
    setCompanyName(_companyName)
  }
  const handleCompanyIdChange = (_companyId) =>{
    setCompanyId(_companyId)
  }
  const handleCompanyInfoChange = (_companyInfo) =>{
    setCompanyInfo(_companyInfo)
  }
  return (
    <div className="add-company">
      <div>

      <Input name="company_name" label={"Company Name"} value={companyName} type="text" placeholder="Enter Company Name" onChange={handleCompanyNameChange}/>
      <Input name="company_id" label={"Company ID"} value={companyId} type="text" placeholder="Enter Company Id" onChange={handleCompanyIdChange}/>
      <Input name ="company_info" label={"Company Info"} value = {companyInfo} type="text" placeholder="Enter Company Information" onChange= {handleCompanyInfoChange} />
      </div>
      <div>
        <Button btnText={"Add Company"} buttonClick={()=>{}} btnTheme="primary" btnType="outline" additionalStyles={{padding:0}} />
      </div>
    </div>
  );
};

export default AddCompany;
