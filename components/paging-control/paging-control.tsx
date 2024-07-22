import React, { useState } from "react";
import "./paging-control.scss";
import Button from "../button/button";
import IntroTenantForms from "../intro-tenant-forms/intro-tenant-forms";
import Cookies from "js-cookie";

interface PagingControlProps {
  totalPages?: number;
  pageNum?: number;
  setPageNum?: (pageNum: number) => void;
  tenantInfo?: string;
  unitInfo?: string;
  propertyInfo?: string;
  fileName?: any;
  prevButtonId?:string,
  nextButtonId?:string,

}

const PagingControl: React.FC<PagingControlProps> = ({
  totalPages,
  pageNum,
  setPageNum,
  tenantInfo,
  unitInfo,
  propertyInfo,
  fileName,
  prevButtonId,
  nextButtonId,

}) => {
  
  return (
    <div className="container">
      <div className="inlineFlex">
        <Button
         id={prevButtonId}
          btnText={"<"}
          buttonClick={() =>
            setPageNum && setPageNum(pageNum ? pageNum - 1 : 0)
          }
          buttonStatus={pageNum === undefined || pageNum - 1 === -1}
        />
        <div className="pageInfo">
          Page: {pageNum !== undefined ? pageNum + 1 : "?"}/
          {totalPages !== undefined ? totalPages : "?"}
        </div>
        <Button
          id={nextButtonId}
          btnText={">"}
          buttonClick={() =>
            setPageNum && setPageNum(pageNum !== undefined ? pageNum + 1 : 0)
          }
          buttonStatus={
            pageNum !== undefined &&
            pageNum + 1 > (totalPages !== undefined ? totalPages - 1 : 0)
          }
        />
      </div>
    </div>
  );
};

export default PagingControl;
