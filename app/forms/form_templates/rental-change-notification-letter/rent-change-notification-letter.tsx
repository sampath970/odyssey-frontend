import React, { useRef } from "react";
import "./rent-change-notification-letter.scss"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../../../../components/button/button";
import MultiPagePdfGenerator from "../../../../components/export-form/export-form";
const RentChangeNotificationLetter = (props:any) => {
    const { FillFormData } = props;
    const pdfRef = useRef();
    const pdfRef1 = useRef();
    const handleDownloadClick=MultiPagePdfGenerator([pdfRef, pdfRef1],"rent-change-notification-letter.pdf")
    return (

        <div id="rent-change-notification-letter">
  <title />
  <div id="sidebar">
    <div className="form-download-button">
    <Button btnText={"Download"} buttonClick={handleDownloadClick} testID="download-button"/>
    </div>
    <div id="outline"></div>
  </div>
  <div id="page-container">
    <div id="pf1" className="pf w0 h0" data-page-no={1} ref={pdfRef}>
      <div className="pc pc1 w0 h0">
        <img
          className="bi x0 y0 w1 h1 layout-image-one"
        />
        <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0">
          NOTICE OF C<span className="_ _0" />
          HANGE
          <span className="_ _0" /> IN TERMS OF
          <span className="_ _0" /> TENANCY{" "}
        </div>
        <div className="t m0 x2 h3 y2 ff1 fs1 fc0 sc0 ls0 ws0">
          (Rent Increase){" "}
        </div>
        <div className="t m0 x3 h4 y3 ff1 fs1 fc0 sc0 ls0 ws0">
          [California Civil Code section 827]<span className="ff2"> </span>
        </div>
        <div className="t m0 x4 h4 y4 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y5 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y6 ff2 fs1 fc0 sc0 ls0 ws0">
          Resident(s): <span className="_ _1" />
          {/* _______________ */}
          <span className="_ _2" />
          {FillFormData("resident_manager_name","1710px")}
          <span className="_ _2" />
          {/* _____________________ */}
          {/* <span className="_ _2" />{" "} */}
        </div>
        <div className="t m0 x6 h5 y7 ff2 fs2 fc0 sc0 ls0 ws0">
          (and all others in possession)
          <span className="_ _2" />{" "}
        </div>
        <div className="t m0 x5 h4 y8 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y9 ff2 fs1 fc0 sc0 ls0 ws0">
          Premises: <span className="_ _3"> </span>{FillFormData("address","1710px")}
          <span className="_ _2" />
         
          <span className="_ _2" />
         {" "}
        </div>
        <div className="t m0 x7 h5 ya ff2 fs2 fc0 sc0 ls0 ws0">
          (Address, Apt #, City, State,
          <span className="_ _2" /> Zip Code){" "}
        </div>
        <div className="t m0 x5 h5 yb ff2 fs2 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 yc ff2 fs1 fc0 sc0 ls0 ws0">
          TO RESIDENT(S){" "}
        </div>
        <div className="t m0 x5 h4 yd ff2 fs1 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _4"> </span> <span className="_ _4"> </span>PLEASE
          TAKE NOTICE{" "}
          <span className="fs3">
            that the terms of your month-to-month tenancy of the above{" "}
          </span>
        </div>
        <div className="t m0 x5 h6 ye ff2 fs3 fc0 sc0 ls0 ws0">
          described premises are changed in the following r
          <span className="_ _0" />
          espects, as indicated by the check mark on the lin
          <span className="_ _0" />
          e(s){" "}
        </div>
        <div className="t m0 x5 h6 yf ff2 fs3 fc0 sc0 ls0 ws0">
          before the applicable paragraph(s).
          <span className="_ _0" />{" "}
        </div>
        <div className="t m0 x5 h6 y10 ff2 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h6 y11 ff2 fs3 fc0 sc0 ls0 ws0">
        {FillFormData("rent_due_date","120px")}<span className="_ _5"> </span>
          <span className="ff1">Rent Increase of 10% or less- </span>
        </div>
        <div className="t m0 x5 h6 y12 ff1 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span>
          <span className="ff2">
            New Rental Amount: ${FillFormData("new_rental_amount","450px")}Effective Date:{FillFormData("effective_date","400px")}
            <span className="_ _0" />
           {" "}
          </span>
        </div>
        <div className="t m0 x5 h6 y13 ff2 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span>Rent Due Date:{" "}
          <span className="_ _7"> </span>{FillFormData("rent_due_date","300px")}day of each calendar month{" "}
        </div>
        <div className="t m0 x5 h6 y14 ff2 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span>{" "}
        </div>
        <div className="t m0 x5 h6 y15 ff2 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h6 y16 ff2 fs3 fc0 sc0 ls0 ws0">
           {FillFormData("rent_due_date","120px")}<span className="_ _5"> </span>
          <span className="ff1">Rent Increase over 10%- </span>
        </div>
        <div className="t m0 x5 h6 y17 ff1 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span>
          <span className="ff2">
            New Rental Amount: <span className="_ _8"> </span>
            ${FillFormData("new_rental_amount","450px")}Effective Date:{FillFormData("effective_date","400px")}{" "}
          </span>
        </div>
        <div className="t m0 x5 h6 y18 ff2 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span>Rent Due Date:{" "}
          <span className="_ _7"> </span>{FillFormData("rent_due_date","300px")}day of each calendar month{" "}
        </div>
        <div className="t m0 x5 h6 y19 ff2 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h6 y1a ff2 fs3 fc0 sc0 ls0 ws0">
         {FillFormData("rent_due_date","120px")} <span className="_ _5"> </span>
          <span className="ff1">
            Non-Rent related changes to the Terms of Tenan
            <span className="_ _0" />
            cy
            <span className="_ _0" />
          </span>{" "}
        </div>
        <div className="t m0 x5 h6 y1b ff2 fs3 fc0 sc0 ls0 ws0">
          PLEASE TAKE NOTICE th
          <span className="_ _0" />
          at, in accordance with Civil Code S<span className="_ _0" />
          ection 827, thirty (30) <span className="_ _2" />
          calendar days after{" "}
        </div>
        <div className="t m0 x5 h6 y1c ff2 fs3 fc0 sc0 ls0 ws0">
          service upon you of this Notice, or
          {FillFormData("tenancy_of_premises","950px")}, whicheve
          <span className="_ _0" />r is later,{" "}
        </div>
        <div className="t m0 x5 h6 y1d ff2 fs3 fc0 sc0 ls0 ws0">
          your tenancy of the premises will be c<span className="_ _0" />
          ha
          <span className="_ _2" />
          nged as foll
          <span className="_ _0" />
          ows:{" "}
        </div>
        <div className="t m0 x5 h6 y1e ff2 fs3 fc0 sc0 ls0 ws0">
{FillFormData("tenancy_of_premises","2050px")}{" "}
        </div>
        <div className="t m0 x5 h6 y1f ff2 fs3 fc0 sc0 ls0 ws0">
      {FillFormData("tenancy_of_premises","2050px")}{" "}
        </div>
        <div className="t m0 x5 h6 y20 ff2 fs3 fc0 sc0 ls0 ws0">
{FillFormData("tenancy_of_premises","2050px")}{" "}
        </div>
        <div className="t m0 x5 h6 y21 ff2 fs3 fc0 sc0 ls0 ws0">
{FillFormData("tenancy_of_premises","2050px")}{" "}
        </div>
        <div className="t m0 x5 h6 y22 ff2 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y23 ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y24 ff1 fs3 fc0 sc0 ls0 ws0">
          Except as herein provided, all
          <span className="_ _0" /> other te
          <span className="_ _2" />
          rms of your
          <span className="_ _0" /> tenancy shall remain in full force and
          effect.
          <span className="_ _0" />{" "}
        </div>
        <div className="t m0 x5 h7 y25 ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y26 ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y27 ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y28 ff1 fs3 fc0 sc0 ls0 ws0">
          DATE:{FillFormData("day","300px")} <span className="_ _9"> </span>{" "}
          <span className="_ _6"> </span>
         {FillFormData("tenancy_of_premises","1000px")}{" "}
        </div>
        <div className="t m0 x5 h7 y29 ff1 fs3 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _6"> </span> <span className="_ _6"> </span>{" "}
          <span className="_ _6"> </span> <span className="_ _6"> </span>{" "}
          <span className="_ _6"> </span> <span className="_ _6"> </span>Agent
          for Owner/Land
          <span className="_ _0" />
          lord{" "}
        </div>
        <div className="t m0 x5 h7 y2a ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y2b ff1 fs3 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x4 h2 y2c ff1 fs0 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h7 y2d ff1 fs3 fc0 sc0 ls0 ws0">
          Apartment Name: ONE UPTOWN NEWP
          <span className="_ _0" />
          ORT{" "}
        </div>
        <div className="t m0 x5 h7 y2e ff1 fs3 fc0 sc0 ls0 ws0">
          Address: 4201 JAMBOREE
          <span className="_ _0" /> #100, NEWPORT BEACH, CA 92660{" "}
        </div>
        <div className="t m0 x5 h7 y2f ff1 fs3 fc0 sc0 ls0 ws0">
          Telephone #: 949.386.8233{" "}
        </div>
      </div>
      <div
        className="pi"
        data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
      />
    </div>
    <div id="pf2" className="pf w0 h0" data-page-no={2} ref={pdfRef1}>
      <div className="pc pc2 w0 h0">
        <img
          className="bi x0 y0 w1 h1 layout-image-two"
          alt=""
        />
        <div className="t m0 x4 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x4 h2 y30 ff1 fs0 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x8 h2 y31 ff1 fs0 fc0 sc0 ls0 ws0">
          DECLARATI
          <span className="_ _0" />
          ON OF SER
          <span className="_ _0" />
          VICE OF
          <span className="_ _0" /> <span className="_ _2" />N
          <span className="_ _0" />
          OTICE TO RESID
          <span className="_ _0" />
          ENT(S){" "}
        </div>
        <div className="t m0 x9 h3 y32 ff1 fs1 fc0 sc0 ls0 ws0">
          [California Civil Code Section 827]{" "}
        </div>
        <div className="t m0 x4 h3 y33 ff1 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h3 y34 ff1 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y35 ff2 fs1 fc0 sc0 ls0 ws0">
          I, {FillFormData("tenancy_of_premises","500px")}
          <span className="_ _2" />
        declare that at the time of service o<span className="_ _2" />
          f the papers herein referred{" "}
        </div>
        <div className="t m0 x5 h4 y36 ff2 fs1 fc0 sc0 ls0 ws0">
          to, I was at least (18) eighteen years of age,{" "}
          <span className="_ _2" />
          and that I served the follow
          <span className="_ _2" />
          ing checked notice:
        </div>
        <div className="t m0 x5 h4 y37 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 xa h3 y38 ff1 fs1 fc0 sc0 ls0 ws0">
          NOTICE OF CHANGE IN TERMS OF TENANC
          <span className="_ _2" />Y (Rent Increase){" "}
        </div>
        <div className="t m0 x4 h3 y39 ff1 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y3a ff2 fs1 fc0 sc0 ls0 ws0">
          On the {FillFormData("rent_due_date","400px")}day o<span className="_ _2" />f{FillFormData("rent_due_date","400px")},
          {FillFormData("rent_due_date","400px")}
          <span className="_ _2" />
          in one of the manners{" "}
        </div>
        <div className="t m0 x5 h4 y3b ff2 fs1 fc0 sc0 ls0 ws0">
          checked and set forth below:{" "}
        </div>
        <div className="t m0 x5 h4 y3c ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 xb h4 y3d ff2 fs1 fc0 sc0 ls0 ws0">
          (1) PERSONAL SERVICE
          <span className="_ _2" />{" "}
        </div>
        <div className="t m0 x5 h4 y3e ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y3f ff2 fs1 fc0 sc0 ls0 ws0">
         {FillFormData("rent_due_date","120px")}<span className="_ _a" /> <span className="_ _4"> </span>By
          Delivering a copy <span className="_ _2" />
          of the Notice PERSONALLY to:
          <span className="_ _2" />{" "}
        </div>
        <div className="t m0 x5 h4 y40 ff2 fs1 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _4"> </span> <span className="_ _4"> </span>
          {FillFormData("tenancy_of_premises","1750px")}
          <span className="_ _2" />
        
          <span className="_ _2" />
         {" "}
        </div>
        <div className="t m0 x5 h4 y41 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y42 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 xc h4 y43 ff2 fs1 fc0 sc0 ls0 ws0">
          (2) SERVICE BY MAIL{" "}
        </div>
        <div className="t m0 x5 h4 y44 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y45 ff2 fs1 fc0 sc0 ls0 ws0">
          (To be used in the event that Personal <span className="_ _2" />
          service cannot be completed and ad
          <span className="_ _2" />
          ds an additional{" "}
        </div>
        <div className="t m0 x5 h4 y46 ff2 fs1 fc0 sc0 ls0 ws0">
          (5) five days to the effective date of the re
          <span className="_ _2" />
          nt increase){" "}
        </div>
        <div className="t m0 x5 h4 y47 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y48 ff2 fs1 fc0 sc0 ls0 ws0">
         {FillFormData("rent_due_date","150px")}<span className="_ _b"> </span>By MAILING by firs
          <span className="_ _2" />t class mail, a copy to each said resident(s)
          by depositing{" "}
        </div>
        <div className="t m0 xd h4 y49 ff2 fs1 fc0 sc0 ls0 ws0">
          said copy in the United States Ma
          <span className="_ _2" />
          il in a sealed envelope with postage fully{" "}
        </div>
        <div className="t m0 xd h4 y4a ff2 fs1 fc0 sc0 ls0 ws0">
          prepaid, addressed to {FillFormData("city","1200px")}
          <span className="_ _2" />
         
          <span className="_ _2" />
        at{" "}
        </div>
        <div className="t m0 xd h4 y4b ff2 fs1 fc0 sc0 ls0 ws0">
          their place of residence:{" "}
        </div>
        <div className="t m0 x5 h4 y4c ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y4d ff2 fs1 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _c"> </span>(Street Address) {FillFormData("city","1330px")}
          <span className="_ _2" />
         
          <span className="_ _2" />
          {" "}
        </div>
        <div className="t m0 x5 h4 y4e ff2 fs1 fc0 sc0 ls0 ws0">
          {" "}
          <span className="_ _c"> </span>Apt. No. {FillFormData("city","250px")}City
          <span className="_ _2" />
          {FillFormData("city","300px")} State <span className="_ _2" />
          {FillFormData("city","300px")}  Zip{FillFormData("city","300px")} {" "}
        </div>
        <div className="t m0 x5 h4 y4f ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y50 ff2 fs1 fc0 sc0 ls0 ws0">
          I declare under penalty or perjury that the forego
          <span className="_ _2" />
          ing is true and correct to the best of my{" "}
        </div>
        <div className="t m0 x5 h4 y51 ff2 fs1 fc0 sc0 ls0 ws0">
          knowledge and if called as a witness to testify thereto, I could do{" "}
          <span className="_ _2" />
          so competently{" "}
        </div>
        <div className="t m0 x5 h4 y52 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y53 ff2 fs1 fc0 sc0 ls0 ws0">
          Executed this{FillFormData("day","350px")} 
          <span className="_ _2" />
          
          <span className="_ _0" /> day <span className="_ _2" />
          of {FillFormData("rent_due_date","320px")} , <span className="_ _2" />
          {FillFormData("city","300px")} at{FillFormData("city","300px")}
          <span className="_ _2" />
         CA{" "}
        </div>
        <div className="t m0 x5 h4 y54 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y55 ff2 fs1 fc0 sc0 ls0 ws0"> </div>
        <div className="t m0 x5 h4 y56 ff2 fs1 fc0 sc0 ls0 ws0">
        {FillFormData("tenancy_of_premises","700px")}
          <span className="_ _2" />
           <span className="_ _8"> </span>{" "}
          <span className="_ _d"> </span>{FillFormData("tenancy_of_premises","700px")}
          <span className="_ _2" />
          {" "}
        </div>
        <div className="t m0 x5 h4 y57 ff2 fs1 fc0 sc0 ls0 ws0">
          Print Name <span className="_ _e"> </span>{" "}
          <span className="_ _4"> </span> <span className="_ _4"> </span>{" "}
          <span className="_ _4"> </span> <span className="_ _4"> </span>{" "}
          <span className="_ _d"> </span>Si
          <span className="_ _0" />
          gnature
          <span className="_ _2" />{" "}
        </div>
      </div>
      <div
        className="pi"
        data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
      />
    </div>
  </div>
</div>

    );
};

export default RentChangeNotificationLetter;
