import React from 'react'
import PagingEditor from '../paging-editor/paging-editor';
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import PagingControl from '../paging-control/paging-control';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
interface FormViewProps {
    tenantInfo?: any;
    unitInfo?: any;
    propertyInfo?: any;
    pdfString?: string;
    pageNumber?: any;
    setPageNumber?: (pageNumber: number) => void;
    numPages?: any;
    onDocumentLoadSuccess?: (any) => void;
    fileData?: any;
    closePreview?: (show: boolean) => void;
    setFileData?: (data: any) => void;
    setNumPages?: (data: any) => void;
    position?: any;
    setPosition?: (position: any) => void;
    fileName?:any
  }
  
  const FormView = (props:FormViewProps) => {
    const {
      tenantInfo,
      unitInfo,
      propertyInfo,
      pdfString,
      pageNumber,
      setPageNumber,
      numPages,
      onDocumentLoadSuccess,
      fileData,
      closePreview,
      setFileData,
      position,
      setPosition,
      fileName
    } = props;
    console.log(props)
  return (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid rgb(228,228,228)", padding: "12px", margin: "12px" }}>
    <PagingEditor
      closePreview={closePreview}
      tenantInfo={tenantInfo}
      unitInfo={unitInfo}
      propertyInfo={propertyInfo}
      fileName={fileName}
    />
    <Document
      file={`data:application/pdf;base64,${pdfString}`}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page
        key={`page_${pageNumber}`}
        pageNumber={pageNumber + 1}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onLoadSuccess={(data)=>{
          setFileData(data)
        }}
      />
    </Document>
    <PagingControl
      tenantInfo={tenantInfo}
      unitInfo={unitInfo}
      propertyInfo={propertyInfo}
      pageNum={pageNumber}
      setPageNum={setPageNumber}
      totalPages={numPages}
      fileName={fileName}
    />
  </div>
  )
}

export default FormView