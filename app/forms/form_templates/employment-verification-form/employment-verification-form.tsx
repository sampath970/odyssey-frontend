import React from 'react'
import "./employment-verification-form.scss"
import Button from '../../../../components/button/button';
import { useRef } from 'react';
import MultiPagePdfGenerator from '../../../../components/export-form/export-form';
const EmploymentVerificationForm = (props):any => {
  const pdfRef = useRef();
  const pdfRef1 = useRef();
  const pdfRef2 = useRef();
  const { FillFormData } = props;
  const handleDownloadClick=MultiPagePdfGenerator([pdfRef, pdfRef1,pdfRef2],"resident-notification-letter.pdf")
  return (
    <div id='employment-verification-form'><>
    <title />
    <div id="sidebar">
      <div id="outline"></div>
    </div>
    <div className="form-download-button">
    <Button btnText={"Download"} buttonClick={handleDownloadClick} testID="download-button"/>
    </div>
    <div id="page-container">
      <div id="pf1" className="pf w0 h0" data-page-no={1}>
        <div className="pc pc1 w0 h0">
          <img
            className="bi x0 y0 w1 h1 layout-image-one"
            alt=""
          />
          <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0">
            Employment Verification
          </div>
          <div className="t m0 x2 h3 y2 ff2 fs0 fc0 sc0 ls0 ws0">
            To:<span className="_ _0"> </span>
            <span className="ff3">
              (Name and Address of Employer)<span className="_ _1"> </span>
            </span>
            Date: 
          </div>
         
          <div className="t m0 x2 h4 y3 ff2 fs0 fc0 sc0 ls0 ws0">RE:</div>
          <div className="t m0 x3 h4 y4 ff2 fs0 fc0 sc0 ls0 ws0">Employee:</div>
          <div className="t m0 x3 h4 y5 ff2 fs0 fc0 sc0 ls0 ws0">
            Presently Employed: <span className="_ _2"> </span>Yes
          </div>
          <div className="t m0 x4 h4 y6 ff2 fs0 fc0 sc0 ls0 ws0">No</div>
          <div className="t m0 x3 h3 y7 ff2 fs0 fc0 sc0 ls0 ws0">
            Current Wages/Salary: <span className="_ _3"> </span>
            <span className="ff3">(check one)</span>
          </div>
          <div className="t m0 x2 h4 y8 ff2 fs0 fc0 sc0 ls0 ws0">
            hourly<span className="_ _4"> </span>weekly
            <span className="_ _5"> </span>bi-weekly
            <span className="_ _6"> </span>semi-monthly
            <span className="_ _7"> </span>monthly<span className="_ _6"> </span>
            other:
          </div>
          <div className="t m0 x3 h4 y9 ff2 fs0 fc0 sc0 ls0 ws0">
            Average # of Regular hours per week:
          </div>
          <div className="t m0 x5 h4 ya ff2 fs0 fc0 sc0 ls0 ws0">
            From:<span className="_ _8"> </span>To:
          </div>
          <div className="t m0 x3 h4 yb ff2 fs0 fc0 sc0 ls0 ws0">
            Overtime Rate (per hour)<span className="_ _9"> </span>Average # of OT
            Hours:
          </div>
          <div className="t m0 x3 h4 yc ff2 fs0 fc0 sc0 ls0 ws0">
            Shift Differential Rate:<span className="_ _a"> </span>Average # of SD
            Hours:<span className="_ _b"> </span>$
          </div>
          <div className="t m0 x6 h2 yd ff1 fs0 fc0 sc0 ls0 ws0">
            THIS SECTION TO BE COMPLETED BY EMPLOYER
          </div>
          <div className="t m0 x7 h2 ye ff1 fs0 fc0 sc0 ls0 ws0">
            THIS SECTION TO BE COMPLETED BY MANAGEMENT AND EXECUTED BY TENANT
          </div>
          <div className="t m0 x8 h4 yf ff2 fs0 fc0 sc0 ls0 ws0">Date</div>
          <div className="t m0 x9 h4 y10 ff2 fs0 fc0 sc0 ls0 ws0">
            SSN #<span className="_ _c"> </span>Unit #
          </div>
          <div className="t m0 x3 h4 y11 ff2 fs0 fc0 sc0 ls0 ws0">
            I hereby authorize the release of my employment information:
          </div>
          <div className="t m0 xa h4 y10 ff2 fs0 fc0 sc0 ls0 ws0">
            Applicant/Tenant Name
          </div>
          <div className="t m0 xb h4 yf ff2 fs0 fc0 sc0 ls0 ws0">
            Signature of Applicant/Tenant
          </div>
          <div className="t m0 xc h4 y4 ff2 fs0 fc0 sc0 ls0 ws0">Job Title:</div>
          <div className="t m0 xd h4 y5 ff2 fs0 fc0 sc0 ls0 ws0">
            Date First Employed:{" "}
          </div>
          <div className="t m0 xe h4 y6 ff2 fs0 fc0 sc0 ls0 ws0">
            Last Day Employed:{" "}
          </div>
          <div className="t m0 xf h3 y12 ff3 fs0 fc0 sc0 ls0 ws0">(per week)</div>
          <div className="t m0 x4 h4 y7 ff2 fs0 fc0 sc0 ls0 ws0">$</div>
          <div className="t m0 xf h3 y13 ff3 fs0 fc0 sc0 ls0 ws0">(per week)</div>
          <div className="t m0 x10 h4 y14 ff2 fs0 fc0 sc0 ls0 ws0">
            The individual named directly above is an applicant/tenantof a housing
            program that requires{" "}
          </div>
          <div className="t m0 x11 h4 y15 ff2 fs0 fc0 sc0 ls0 ws0">
            verification of income. The information provided will remain
            confidential to satisfaction of that{" "}
          </div>
          <div className="t m0 x12 h4 y16 ff2 fs0 fc0 sc0 ls0 ws0">
            stated purpose only. Your prompt response is crucial and greatly
            appreciated.
          </div>
          <div className="t m0 x3 h4 ya ff2 fs0 fc0 sc0 ls0 ws0">
            YTD <span className="_ _d"> </span>$
          </div>
          <div className="t m0 x13 h4 y17 ff2 fs0 fc0 sc0 ls0 ws0">
            Project Owner/Management Agent
          </div>
          <div className="t m0 x14 h2 y18 ff1 fs0 fc0 sc0 ls0 ws0">
            Return Form To:
          </div>
          <div className="t m0 x15 h5 y19 ff4 fs1 fc0 sc0 ls0 ws0">
            Page 1 of 2
          </div>
          <div className="t m0 x16 h5 y1a ff4 fs1 fc0 sc0 ls0 ws0">
            CA Tax Credit Allocation Committee
          </div>
          <div className="t m0 x17 h5 y1b ff4 fs1 fc0 sc0 ls0 ws0">
            Verification of Employment (April 2022)
          </div>
        </div>
        <div
          className="pi"
          data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
        />
      </div>
      <div id="pf2" className="pf w0 h0" data-page-no={2}>
        <div className="pc pc2 w0 h0">
          <img
            className="bi x0 y0 w1 h1 layout-image-two"
            alt=""
          />
          <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0">
            Employment Verification
          </div>
          <div className="t m0 x3 h3 ye ff2 fs0 fc0 sc0 ls0 ws0">
            Commissions, bonuses, tips, other additional pay:
            <span className="_ _9"> </span>
            <span className="ff3">(check one)</span>
          </div>
          <div className="t m0 x2 h4 y1c ff2 fs0 fc0 sc0 ls0 ws0">
            hourly<span className="_ _4"> </span>weekly
            <span className="_ _5"> </span>bi-weekly
            <span className="_ _6"> </span>semi-monthly
            <span className="_ _7"> </span>monthly<span className="_ _6"> </span>
            other
          </div>
          <div className="t m0 x3 h4 y1d ff2 fs0 fc0 sc0 ls0 ws0">
            List any anticipated change in the employees rate of pay within the
            next 12 months (raise):
          </div>
          <div className="t m0 x3 h4 y1e ff2 fs0 fc0 sc0 ls0 ws0">
            Amount: <span className="_ _e"> </span>Effective Date:
          </div>
          <div className="t m0 x3 h4 y1f ff2 fs0 fc0 sc0 ls0 ws0">
            If the employee's work is seasonal or sporadic, please indicate the
            layoff period(s):
          </div>
          <div className="t m0 x3 h4 y20 ff2 fs0 fc0 sc0 ls0 ws0">
            Additional Remarks:{" "}
          </div>
          <div className="t m0 x18 h6 y21 ff5 fs0 fc0 sc0 ls0 ws0">
            NOTE:<span className="_ _f"> </span>
            <span className="ff3">
              {" "}
              Section 1001 of Title 18 of the U.S. Code makes it a criminal
              offense to{" "}
            </span>
          </div>
          <div className="t m0 x19 h3 y22 ff3 fs0 fc0 sc0 ls0 ws0">
            make willful false statements or misrepresentations to any Department
            or Agency of{" "}
          </div>
          <div className="t m0 x1a h3 y23 ff3 fs0 fc0 sc0 ls0 ws0">
            the United States as to any matter within its jurisdiction.
          </div>
          <div className="t m0 x1b h4 y24 ff2 fs0 fc0 sc0 ls0 ws0">
            Employer [Company] Name and Address
          </div>
          <div className="t m0 x1c h4 y25 ff2 fs0 fc0 sc0 ls0 ws0">
            E-mail<span className="_ _10"> </span>Phone
            <span className="_ _11"> </span>Fax
          </div>
          <div className="t m0 x1d h4 y26 ff2 fs0 fc0 sc0 ls0 ws0">
            Employer's Signature<span className="_ _12"> </span>Employer's Printed
            Name<span className="_ _13"> </span>Date
          </div>
          <div className="t m0 x1e h4 ye ff2 fs0 fc0 sc0 ls0 ws0">$</div>
          <div className="t m0 x15 h5 y19 ff4 fs1 fc0 sc0 ls0 ws0">
            Page 2 of 2
          </div>
          <div className="t m0 x16 h5 y1a ff4 fs1 fc0 sc0 ls0 ws0">
            CA Tax Credit Allocation Committee
          </div>
          <div className="t m0 x17 h5 y1b ff4 fs1 fc0 sc0 ls0 ws0">
            Verification of Employment(April 2022)
          </div>
        </div>
        <div
          className="pi"
          data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
        />
      </div>
    </div>
  </>
  </div>
  )
}

export default EmploymentVerificationForm