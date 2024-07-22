// This is the Home page
"use client";
import { useRef } from "react";
import Button from "../../../../components/button/button";
import MultiPagePdfGenerator from "../../../../components/export-form/export-form";
import "./resident-notification-letter.scss"
const ResidentNotificationLetter = (props): any => {
  const pdfRef = useRef();
  const pdfRef1 = useRef();
  const pdfRef2 = useRef();
  const { FillFormData } = props;
  const handleDownloadClick=MultiPagePdfGenerator([pdfRef, pdfRef1,pdfRef2],"resident-notification-letter.pdf")
  return (
    <div id="resident-notification-letter">
      <title />
      <div id="sidebar">
        <div id="outline"></div>
      </div>
      <div className="form-download-button">
    <Button btnText={"Download"} buttonClick={handleDownloadClick} testID="download-button"/>
    </div>
      <div id="page-container">
        <div id="pf1" className="pf w0 h0" data-page-no={1} ref={pdfRef}>
          <div className="pc pc1 w0 h0">
            <img className="bi x0 y0 w1 h1 layout_image_1" />
            <div className="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0">
              RES
              <span className="_ _0" />
              ID
              <span className="_ _0" />
              EN
              <span className="_ _0" />T NO
              <span className="_ _0" />
              TIF
              <span className="_ _0" />I<span className="_ _0" />
              CATI
              <span className="_ _0" />O<span className="_ _0" />N LE
              <span className="_ _0" />
              TTER
              <span className="_ _0" />
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y2 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y3 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y4 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y5 ff2 fs0 fc0 sc0 ls2 ws2">
              As{" "}
              <span className="ls3 ws3">
                a Resident of{" "}
                <span className="underline">
                  {FillFormData("property_name", "735px")}
                </span>{" "}
                (
              </span>
            </div>
            <div className="t m0 x3 h3 y6 ff3 fs1 fc0 sc0 ls4 ws4">
              name of p<span className="_ _1" />
              roperty
              <span className="_ _1" />
              <span className="ff2 fs0 ls3 ws5">
                ), a development f<span className="_ _0" />
                unded{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y7 ff2 fs0 fc0 sc0 ls3 ws3">
              under the Low Income Housing Tax C<span className="_ _1" />
              redit program, you have certain ri
              <span className="_ _1" />
              ghts st
              <span className="_ _0" />
              ated in y<span className="_ _1" />
              our lease{" "}
            </div>
            <div className="t m0 x2 h3 y8 ff2 fs0 fc0 sc0 ls3 ws3">
              and the Lease Rider attached. <span className="_ _1" /> Your
              landlord must follow
              <span className="_ _1" /> the federal and state rules for the{" "}
            </div>
            <div className="t m0 x2 h3 y9 ff2 fs0 fc0 sc0 ls3 ws3">
              Housing Tax Credit Program. One o<span className="_ _1" />f the
              important protections provided by federal law
              <span className="_ _1" /> is that{" "}
            </div>
            <div className="t m0 x2 h3 ya ff2 fs0 fc0 sc0 ls3 ws3">
              you cannot be evi
              <span className="_ _1" />
              cted from your home without a good reason, o
              <span className="_ _1" />r “good cause”.{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 yb ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 yc ff2 fs0 fc0 sc0 ls3 ws3">
              Your landlord may not ev
              <span className="_ _1" />
              ict you without good cause. Good cause i<span className="_ _1" />s
              generally serious or{" "}
            </div>
            <div className="t m0 x2 h3 yd ff2 fs0 fc0 sc0 ls3 ws3">
              repeated violations of the terms o<span className="_ _1" />f your
              <span className="ls1 ws1"> </span>lease. The landlord must state
              <span className="_ _1" /> the good cause in any{" "}
            </div>
            <div className="t m0 x2 h3 ye ff2 fs0 fc0 sc0 ls3 ws3">
              notice seeking to terminate your tenancy.{" "}
              <span className="_ _1" /> If you contest the eviction, the la
              <span className="_ _1" />
              ndlord must then file{" "}
            </div>
            <div className="t m0 x2 h3 yf ff2 fs0 fc0 sc0 ls3 ws3">
              a court action and prove <span className="_ _1" />
              the good cause to a jud
              <span className="_ _1" />
              ge. <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y10 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y11 ff2 fs0 fc0 sc0 ls3 ws3">
              Attached are a Notice and “Lease
              <span className="_ _1" /> Rider” that outline the protections you
              c
              <span className="_ _1" />
              an enforce. The{" "}
            </div>
            <div className="t m0 x2 h3 y12 ff2 fs0 fc0 sc0 ls3 ws3">
              attached Lease Rider should already be si
              <span className="_ _1" />
              gned by your landlord. You and
              <span className="_ _1" /> all members of your{" "}
            </div>
            <div className="t m0 x2 h3 y13 ff2 fs0 fc0 sc0 ls3 ws3">
              household aged 18 or older <span className="_ _1" />
              <span className="_ _1" />
              der and return it to your landlord by
              <span className="_ _1" />{" "}
            </div>
            <div className="t m0 x2 h3 y14 ff2 fs0 fc0 sc0 ls3 ws6">
              <span className="underline">
                {FillFormData("lease_rider_end_date", "280px")}
              </span>{" "}
              (
            </div>
            <div className="t m0 x4 h3 y15 ff3 fs1 fc0 sc0 ls4 ws7">
              date
              <span className="ff2 fs0 ls5 ws8">
                ). <span className="ls1 ws1"> </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y16 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y17 ff2 fs0 fc0 sc0 ls3 ws6">
              The<span className="ls1 ws1"> </span>
              <span className="ws3">
                Lease Rider only needs to be <span className="_ _1" />
                signed at initial move<span className="ls1 ws1">-</span>in. If
                at any ti
                <span className="_ _1" />
                me additional adult{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y18 ff2 fs0 fc0 sc0 ls3 ws3">
              household members enter the unit or a <span className="_ _1" />
              child turns 18, they should sign the ex
              <span className="_ _1" />
              isting form with the{" "}
            </div>
            <div className="t m0 x2 h3 y19 ff2 fs0 fc0 sc0 ls3 ws3">
              current date<span className="ls1 ws1">. </span>You may view
              <span className="_ _1" /> the current Lease Rider Form at the{" "}
              <span className="_ _1" />
              following web site: <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y1a ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y1b ff2 fs0 fc1 sc0 ls3 ws6">
              http://www.treasurer.
              <span className="_ _0" />
              ca.gov
              <span className="_ _1" />
              /ctc
              <span className="_ _0" />
              ac/compliance/leaserider
            </div>
            <div className="t m0 x5 h3 y1c ff2 fs0 fc1 sc0 ls6 ws1">
              .{" "}
              <span className="fc0 ls3 ws3">
                If you do no
                <span className="_ _1" />t have Internet access,{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y1d ff2 fs0 fc0 sc0 ls3 ws3">
              you may call (916) 654<span className="ls1 ws1">-</span>
              <span className="ws5">
                6340 and request a copy of t<span className="_ _0" />
                he current form. <span className="fc1 ls1 ws1"> </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y1e ff2 fs0 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y1f ff2 fs0 fc0 sc0 ls3 ws3">
              If you have any
              <span className="_ _1" /> questions concerning this matter, please
              contact your Resident Manager<span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y20 ff2 fs0 fc0 sc0 ls3 ws3">
              {FillFormData("household_name")}, or your landlord at{" "}
              <span className="_ _1" />
              {FillFormData("signing_date")}{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y21 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y22 ff2 fs0 fc0 sc0 ls3 ws6">
              Sincerely, <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y23 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y24 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y25 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h4 y26 ff4 fs0 fc0 sc0 ls7 ws9">
              {FillFormData("household_name", "700px")}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _2"> </span>
              </span>

              {FillFormData("property_name", "620px")}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _3"> </span>
                <span className="ls7">
                  {FillFormData("signing_date","300px")}
                  <span className="_ _1" />{" "}
                  <span className="ls1 wsa">
                    {" "}
                    <span className="ws1"></span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y27 ff2 fs0 fc0 sc0 ls3 ws3">
              Property Representative Name(print){" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _4"> </span> <span className="_ _5"> </span>
              </span>
              (Property Name
              <span className="ls5 ws8">
                ){" "}
                <span className="ls1 ws1">
                  {" "}
                  <span className="_ _6"> </span>{" "}
                  <span className="_ _5"> </span>
                  <span className="wsb">
                    {" "}
                    <span className="_ _1" />{" "}
                    <span className="ls0 wsc">
                      Dat
                      <span className="_ _0" />e{" "}
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x6 h5 y28 ff2 fs2 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y29 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y2a ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y2b ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y2c ff2 fs0 fc0 sc0 ls8 wsd">
              Encl: <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y2d ff2 fs0 fc0 sc0 ls1 wsb">
              {" "}
              <span className="ls3 ws3">
                (1) Lease Rider <span className="_ _1" />
                <span className="ls1 ws1"> </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y2e ff2 fs0 fc0 sc0 ls1 wsb">
              {" "}
              <span className="ls3 ws3">(2) Notice </span>
              <span className="ws1">
                -{" "}
                <span className="ls3 ws3">
                  Good
                  <span className="_ _1" /> Cause Eviction Protection
                </span>
              </span>
            </div>
            <div className="t m0 x7 h6 y2f ff2 fs3 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h7 y30 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y31 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y32 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y33 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y34 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y35 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y36 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y37 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h7 y38 ff5 fs3 fc1 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h4 y39 ff4 fs0 fc0 sc0 ls1 ws1"> </div>
          </div>
          <div
            className="pi"
            data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
          />
        </div>
        <div id="pf2" className="pf w0 h0" data-page-no={2} ref={pdfRef1}>
          <div className="pc pc2 w0 h0">
            <img className="bi x0 y0 w1 h1 layout_image_2" />
            <div className="t m0 x8 h2 y1 ff1 fs0 fc0 sc0 ls8 wsd">
              LOW INCOM
              <span className="_ _0" />E HOUSING TAX CREDIT LE
              <span className="_ _0" />
              ASE RIDER<span className="ff2 ls1 ws1"> </span>
            </div>
            <div className="t m0 x9 h2 y3a ff1 fs0 fc0 sc0 ls3 ws3">
              (to be attached to resident lease)
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h4 y3b ff4 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y3c ff2 fs0 fc0 sc0 ls3 ws3">
              Property Name:{FillFormData("property_name", "700px")}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _7"> </span>{" "}
                <span className="ls8 wsd">Unit #: </span>
              </span>
              <span className="ws6">
                {FillFormData("unit_number", "200px")}
                <span className="ls0 wsc">
                  {" "}
                  <span className="ls1 ws1"> </span>
                </span>
              </span>
            </div>
            <div
              className="t m0 x2 h3 y3d ff2 fs0 fc0 sc0 ls3 ws3"
              style={{ marginTop: "100px" }}>
              Household Name:{" "}
              <span className="ws6">
                <span className="underline">
                  {FillFormData("household_name", "500px")}
                </span>
                <span className="ls1 ws1"> </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y3e ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y3f ff2 fs0 fc0 sc0 ls3 ws3">
              Dear Resident or Applicant: <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y40 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y41 ff2 fs0 fc0 sc0 ls3 ws3">
              The owner(s) of this property rents residential units under
              <span className="_ _1" /> the federal Low
              <span className="ls1 ws1">-</span>
              <span className="ws5">Income Housing Tax </span>
            </div>
            <div className="t m0 x2 h3 y42 ff2 fs0 fc0 sc0 ls3 ws3">
              Credit Program (the “program”) administered by{" "}
              <span className="_ _1" />
              the California Tax Credit <span className="_ _1" />
              Allocation Committee{" "}
            </div>
            <div className="t m0 x2 h3 y43 ff2 fs0 fc0 sc0 ls3 ws3">
              (TCAC). Under the program, the ow
              <span className="_ _1" />
              ner has agreed to rent some or
              <span className="_ _1" /> all of the units in the{" "}
            </div>
            <div className="t m0 x2 h3 y44 ff2 fs0 fc0 sc0 ls3 ws3">
              property to low<span className="ls1 ws1">-</span>income households
              and restrict the ren
              <span className="_ _1" />
              ts for those units. Another protection{" "}
            </div>
            <div className="t m0 x2 h3 y45 ff2 fs0 fc0 sc0 ls3 ws3">
              provided by federal law
              <span className="_ _1" /> is t<span className="_ _0" />
              hat Low Income
              <span className="_ _1" /> Tenants may not be ev
              <span className="_ _1" />
              icted wit
              <span className="ws5">
                hout g<span className="_ _0" />
                ood cause.{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y46 ff2 fs0 fc0 sc0 ls3 ws3">
              The following Lease Rider is an
              <span className="_ _1" /> important part of ensuring y
              <span className="_ _1" />
              our rights to good cause for ev
              <span className="_ _1" />
              iction. <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y47 ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h3 y48 ff2 fs0 fc0 sc0 ls3 ws3">
              The Lease or Rental A<span className="_ _1" />
              greement dated {FillFormData("lease_rider_end_date", "200px")} is
              hereby amended by
              <span className="_ _1" /> adding the{" "}
            </div>
            <div className="t m0 x2 h3 y49 ff2 fs0 fc0 sc0 ls3 ws3">
              following provision: <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y4a ff2 fs0 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h2 y4b ff1 fs0 fc0 sc0 ls3 ws3">
              Lease Rider: Good Ca
              <span className="_ _1" />
              use for Eviction <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y4c ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y4d ff2 fs0 fc0 sc0 ls3 ws3">
              Owner may not terminate the tenancy <span className="_ _1" />
              the Lease or rental agreement <span className="_ _1" />
              of a Low Income Tenant{" "}
            </div>
            <div className="t m0 x2 h3 y4e ff2 fs0 fc0 sc0 ls3 ws3">
              except for good cause, i<span className="_ _1" />
              ncluding a serious or repeated violation o
              <span className="_ _1" />f the material terms and{" "}
            </div>
            <div className="t m0 x2 h3 y4f ff2 fs0 fc0 sc0 ls3 ws3">
              conditions of the Lease, or a v<span className="_ _1" />
              iolation of applicable Federal, State, or local law
              <span className="_ _1" />. T<span className="_ _0" />o terminate
              the{" "}
            </div>
            <div className="t m0 x2 h3 y50 ff2 fs0 fc0 sc0 ls3 ws3">
              tenancy the Lease, Ow
              <span className="_ _1" />
              ner
              <span className="_ _0" /> must provide w<span className="_ _1" />
              ritten notice to the tenant of the grounds w
              <span className="_ _1" />
              ith{" "}
            </div>
            <div className="t m0 x2 h3 y51 ff2 fs0 fc0 sc0 ls3 ws3">
              sufficient specificity to enable the tenant to p
              <span className="_ _1" />
              repare a defense. The notice <span className="_ _1" />
              must be served at{" "}
            </div>
            <div className="t m0 x2 h3 y52 ff2 fs0 fc0 sc0 ls3 ws3">
              least three days before the termination o<span className="_ _1" />
              f tenancy, and must comply with all requirements of{" "}
            </div>
            <div className="t m0 x2 h3 y53 ff2 fs0 fc0 sc0 ls3 ws3">
              California law and other applicable programs.{" "}
              <span className="_ _1" />
              Tenant has the right to enfo
              <span className="_ _1" />
              rce this requirement{" "}
            </div>
            <div className="t m0 x2 h3 y54 ff2 fs0 fc0 sc0 ls3 ws3">
              in state court, including presenting a de
              <span className="_ _1" />
              fense to any eviction action brought by Ow
              <span className="_ _1" />
              ner. <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y55 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y56 ff2 fs0 fc0 sc0 ls0 ws0">
              To t<span className="_ _0" />h<span className="_ _0" />e{" "}
              <span className="ls3 ws3">
                extent that any terms c<span className="_ _1" />
                ontained in the Lease or ren
                <span className="_ _1" />
                tal agreement, or any other{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y57 ff2 fs0 fc0 sc0 ls3 ws3">
              agreement between the ow
              <span className="_ _1" />
              ner and the tenant, contradict the terms of this R
              <span className="_ _1" />
              ider, the provisions{" "}
            </div>
            <div className="t m0 x2 h2 y58 ff2 fs0 fc0 sc0 ls3 ws5">
              of this <span className="_ _0" />
              Rider shall control.
              <span className="ff1 ls1 ws1">
                {" "}
                <span className="ff2"> </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y59 ff1 fs0 fc0 sc0 ls1 ws1">
              {" "}
              <span className="ff2"> </span>
            </div>
            <div className="t m0 x2 h2 y5a ff1 fs0 fc0 sc0 ls3 ws3">
              By signing below, I indicate my
              <span className="_ _1" /> consent to this Lease Rider:{" "}
              <span className="_ _1" />
              <span className="ff4 ls1 ws1"></span>
            </div>
            <div className="t m0 x2 h4 y5b ff4 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h4 y5c ff4 fs0 fc0 sc0 ls7 ws9">
            <span className="underline">
                  {FillFormData("property_name" ,"750px")}
                </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              {" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _2"> </span>
              </span>
              <span className="underline">
              {FillFormData("household_name" ,"530px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
               <span className="_ _1" />
            
              <span className="ls1 ws1">
                {" "}
                <span className="_ _3"> </span>
                <span className="ls7">
                <span className="underline">
              {FillFormData("signing_date" ,"300px")}
              </span>
                  <span className="_ _1" />{" "}
                  <span className="ls1 wsa">
                    {" "}
                    <span className="ws1"></span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y5d ff1 fs0 fc0 sc0 ls3 ws5">
              Property Representative Nam
              <span className="_ _0" />e (print){" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _8"> </span> <span className="_ _5"> </span>
              </span>
              (signature){" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_"> </span> <span className="_ _5"> </span>{" "}
                <span className="_ _5"> </span>
                <span className="wsb">
                  {" "}
                  <span className="ls0 wsc">Date </span>
                </span>
              </span>
            </div>
            <div className="t m0 x6 h8 y5e ff1 fs2 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 x2 h5 y5f ff2 fs2 fc0 sc0 ls1 ws1"> </div>
            <div className="t m0 xa h4 y60 ff4 fs0 fc0 sc0 ls7 ws9">
              **********
              <span className="_ _1" />
              ******
              <span className="_ _1" />
              ******
              <span className="_ _1" />
              **********
              <span className="_ _1" />
              ********
              <span className="_ _1" />
              ********
              <span className="_ _1" />
              ******
              <span className="_ _1" />
              ********
              <span className="_ _1" />
              ********
              <span className="_ _1" />
              *********
              <span className="_ _1" />
              ******
              <span className="_ _1" />
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h2 y61 ff1 fs0 fc0 sc0 ls9 wse">
              B<span className="_ _0" />y s<span className="_ _0" />
              <span className="ls3 ws3">
                igning below, I indicate my
                <span className="_ _1" /> consent to this Lease Rider. I/we have
                been g<span className="_ _1" />
                iven a copy
                <span className="_ _1" />{" "}
              </span>
            </div>
            <div className="t m0 x2 h2 y62 ff1 fs0 fc0 sc0 ls3 ws3">
              of this Lease Rider. <span className="ff2 ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h4 y63 ff4 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h4 y64 ff4 fs0 fc0 sc0 ls7 ws9">
            <span className="underline">
              {FillFormData("property_name" ,"750px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              {" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _2"> </span>
              </span>
              <span className="underline">
              {FillFormData("household_name" ,"530px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _3"> </span>
                <span className="ls7">
                <span className="underline">
              {FillFormData("signing_date" ,"300px")}
              </span>
                  <span className="_ _1" />{" "}
                  <span className="ls1 wsa">
                    {" "}
                    <span className="ws1"></span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y65 ff1 fs0 fc0 sc0 ls3 ws3">
              Resident or Applicant Name (print) <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _9"> </span> <span className="_ _5"> </span>
                <span className="ls3 ws5">(signature) </span>{" "}
                <span className="_"> </span> <span className="_ _5"> </span>{" "}
                <span className="_ _5"> </span>
                <span className="wsb">
                  {" "}
                  <span className="ls0 wsc">Date </span>
                </span>
                <span className="ff2"> </span>
              </span>
            </div>
            <div className="t m0 x2 h4 y66 ff4 fs0 fc0 sc0 ls1 ws1">
              {" "}
              <span className="ls7 ws9">
              <span className="underline">
              {FillFormData("property_name" ,"750px")}
              </span>
                <span className="_ _1" />
                <span className="_ _1" />
                <span className="_ _1" />
                <span className="_ _1" />
                {" "}
                <span className="ls1 ws1">
                  {" "}
                  <span className="_ _a"> </span>
                </span>
                <span className="underline">
              {FillFormData("household_name" ,"530px")}
              </span>
                <span className="_ _1" />
                <span className="_ _1" />
                <span className="_ _1" />
                <span className="ls1 ws1">
                  {" "}
                  <span className="_ _3"> </span>
                  <span className="ls7">
                  <span className="underline">
              {FillFormData("signing_date" ,"300px")}
              </span>
                    <span className="_ _1" />{" "}
                    <span className="ls1 wsa">
                      {" "}
                      <span className="ws1"></span>
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y67 ff1 fs0 fc0 sc0 ls3 ws3">
              Resident or Applicant Name (print) <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _9"> </span> <span className="_ _5"> </span>
                <span className="ls3 ws5">(signature) </span>{" "}
                <span className="_"> </span> <span className="_ _5"> </span>{" "}
                <span className="_ _5"> </span>
                <span className="wsb">
                  {" "}
                  <span className="ls0 wsc">Date </span>
                </span>
                <span className="ff2"> </span>
              </span>
            </div>
            <div className="t m0 x2 h4 y68 ff4 fs0 fc0 sc0 ls7 ws9">
            <span className="underline">
              {FillFormData("property_name" ,"750px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />{" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _2"> </span>
              </span>
              <span className="underline">
              {FillFormData("household_name" ,"530px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _3"> </span>
                <span className="ls7">
                <span className="underline">
              {FillFormData("signing_date" ,"300px")}
              </span>
                  <span className="_ _1" />{" "}
                  <span className="ls1 wsa">
                    {" "}
                    <span className="ws1"></span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y69 ff1 fs0 fc0 sc0 ls3 ws5">
              Resident or <span className="_ _0" />A<span className="_ _1" />
              pplicant
              <span className="_ _0" /> Name{" "}
              <span className="ls0 ws0">
                (<span className="_ _0" />
                pri
                <span className="_ _0" />
                nt
                <span className="_ _0" />){" "}
                <span className="ls1 ws1">
                  {" "}
                  <span className="_ _9"> </span>{" "}
                  <span className="_ _5"> </span>
                </span>
              </span>
              (signature){" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_"> </span> <span className="_ _5"> </span>{" "}
                <span className="_ _5"> </span>
                <span className="wsb">
                  {" "}
                  <span className="_ _1" />{" "}
                  <span className="ls0 wsc">
                    Da
                    <span className="_ _0" />
                    te{" "}
                  </span>
                  <span className="ff2 ws1"> </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h4 y6a ff4 fs0 fc0 sc0 ls7 ws9">
            <span className="underline">
              {FillFormData("property_name" ,"750px")}
              </span>
              <span className="_ _1" />
             <span className="_ _1" />
              <span className="_ _1" />
            <span className="_ _1" />{" "}
              <span className="ls1 ws1">
                {" "}
                <span className="_ _2"> </span>
              </span>
              <span className="underline">
              {FillFormData("household_name" ,"530px")}
              </span>
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _3"> </span>
                <span className="ls7">
                <span className="underline">
              {FillFormData("signing_date" ,"300px")}
              </span>
                  <span className="_ _1" />{" "}
                  <span className="ls1 wsa">
                    {" "}
                    <span className="ws1"></span>
                  </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h2 y6b ff1 fs0 fc0 sc0 ls3 ws3">
              Resident or Applicant Name (print) <span className="_ _1" />
              <span className="ls1 ws1">
                {" "}
                <span className="_ _9"> </span> <span className="_ _5"> </span>
                <span className="ls3 ws5">(signature) </span>{" "}
                <span className="_"> </span> <span className="_ _5"> </span>{" "}
                <span className="_ _5"> </span>
                <span className="wsb">
                  {" "}
                  <span className="ls0 wsc">Date </span>
                </span>
                <span className="ff2"> </span>
              </span>
            </div>
            <div className="t m0 x2 h4 y6c ff4 fs0 fc0 sc0 ls1 ws1"> </div>
          </div>
          <div
            className="pi"
            data-data='{"ctm":[1.500000,0.000000,0.000000,1.500000,0.000000,0.000000]}'
          />
        </div>
        <div id="pf3" className="pf w0 h0" data-page-no={3} ref={pdfRef2}>
          <div className="pc pc3 w0 h0">
            <img className="bi x0 y0 w1 h1 layout_image_3" />
            <div className="t m0 xb h9 y6d ff1 fs4 fc0 sc0 lsa wsf">
              NOTICE{" "}
              <span className="ls1 ws1">
                – <span className="_ _0" />
                <span className="lsb">
                  GOOD CA
                  <span className="_ _1" />
                  USE EVICTION PROT
                  <span className="_ _1" />
                  ECTION<span className="ls1"> </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y6e ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y6f ff1 fs0 fc0 sc0 ls3 ws3">
              A<span className="_ _1" />s a resi
              <span className="_ _0" />
              dent in a “Housing Tax C<span className="_ _1" />
              redit Program” rental unit, y<span className="_ _1" />
              ou have a right to continue{" "}
            </div>
            <div className="t m0 x2 h2 y70 ff1 fs0 fc0 sc0 ls3 ws3">
              living in your rental unit unless y<span className="_ _1" />
              ou do something that gives y<span className="_ _1" />
              our landl
              <span className="_ _0" />
              ord “good cause”{" "}
            </div>
            <div className="t m0 x2 h2 y71 ff1 fs0 fc0 sc0 ls3 ws3">
              to evict y<span className="_ _1" />
              ou. This notice provides basic information about your rights.{" "}
              <span className="_ _1" />
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h2 y72 ff1 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y73 ff1 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y74 ff1 fs0 fc0 sc0 ls3 ws3">
              Why are y<span className="_ _1" />
              ou being notified of your right against eviction{" "}
              <span className="_ _1" />
              without “good cause”? <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h6 y75 ff2 fs3 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y76 ff2 fs0 fc0 sc0 ls3 ws5">
              The federal law that
              <span className="_ _0" /> created the <span className="_ _0" />
              Housing Credit Program requires t<span className="_ _0" />
              his protection. T<span className="_ _0" />
              he California{" "}
            </div>
            <div className="t m0 x2 h3 y77 ff2 fs0 fc0 sc0 ls3 ws3">
              Tax Credit Allocation Committee requires y
              <span className="_ _1" />
              our landlord to notify you and <span className="_ _1" />
              amend your lease.
            </div>
            <div className="t m0 x2 h3 y78 ff2 fs0 fc0 sc0 ls3 ws3">
              You and your landlord must also
              <span className="_ _1" /> sign the “Lease Rider” to ma
              <span className="_ _1" />
              ke thi
              <span className="ws5">
                s <span className="_ _0" />
                important resident{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y79 ff2 fs0 fc0 sc0 ls3 ws3">
              protection part of your lease. <span className="_ _1" />
              This “Lease Rider” has already been signed by
              <span className="_ _1" /> your landlord and{" "}
            </div>
            <div className="t m0 x2 h3 y7a ff2 fs0 fc0 sc0 ls3 ws3">
              should be attached to this notice <span className="_ _1" />
              for your signature. <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h6 y7b ff2 fs3 fc0 sc0 ls1 ws10">
              {" "}
              <span className="ws1"> </span>
            </div>
            <div className="t m0 x2 h2 y7c ff1 fs0 fc0 sc0 ls3 ws3">
              What is “good cause” for y<span className="_ _1" />
              our landlord to evict or to terminate y<span className="_ _1" />
              our tenancy? <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y7d ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y7e ff2 fs0 fc0 sc0 ls3 ws3">
              There is no specific list of <span className="_ _1" />
              “good causes” to evict residents. Rather, this{" "}
              <span className="_ _1" />
              matter has been left to{" "}
            </div>
            <div className="t m0 x2 h3 y7f ff2 fs0 fc0 sc0 ls3 ws3">
              the courts to decide and <span className="_ _1" />
              define. However, your landlord w<span className="_ _1" />
              ould have “good cause” if you commit{" "}
            </div>
            <div className="t m0 x2 h3 y80 ff2 fs0 fc0 sc0 ls3 ws3">
              a serious or repeated violation o<span className="_ _1" />f the
              significant terms of<span className="ls1 ws1"> </span>your lease.
              Some ex
              <span className="_ _1" />
              amples of what{" "}
            </div>
            <div className="t m0 x2 h3 y81 ff2 fs0 fc0 sc0 ls3 ws3">
              might be considered good cause a<span className="_ _1" />
              re failure to pay rent on time, <span className="_ _1" />
              failure to cooperate with legal{" "}
            </div>
            <div className="t m0 x2 h3 y82 ff2 fs0 fc0 sc0 ls3 ws3">
              recertification requirements, and engaging in illegal
              <span className="_ _1" /> activity on the premises.{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y83 ff2 fs0 fc0 sc0 ls1 ws11">
              {" "}
              <span className="ws1"> </span>
            </div>
            <div className="t m0 x2 h2 y84 ff1 fs0 fc0 sc0 ls3 ws3">
              What if your lease does not
              <span className="_ _1" /> yet include protection against being
              evicted <span className="_ _1" />
              without “good{" "}
            </div>
            <div className="t m0 x2 h2 y85 ff1 fs0 fc0 sc0 ls3 ws6">
              cause”? <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y86 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y87 ff2 fs0 fc0 sc0 ls3 ws3">
              Even if your lease does <span className="_ _1" />
              not state this protection,{" "}
            </div>
            <div className="t m0 xc h3 y88 ff2 fs0 fc0 sc0 ls3 ws3">
              you have the right NOT t<span className="_ _1" />o be evicted
              without{" "}
            </div>
            <div className="t m0 x2 h3 y89 ff2 fs0 fc0 sc0 ls3 ws3">
              “good cause.” To strengthen this protection, you{" "}
              <span className="_ _1" />
              should immediately sign and return the “Lease{" "}
            </div>
            <div className="t m0 x2 h3 y8a ff2 fs0 fc0 sc0 ls8 wsb">
              Rider.
              <span className="_ _0" />
              <span className="lsc ws5">
                ” <span className="ls1 ws1"> </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y8b ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y8c ff1 fs0 fc0 sc0 ls3 ws3">
              What procedures must the landlord follo
              <span className="_ _1" />w to evict me? <span className="_ _1" />
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y8d ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y8e ff2 fs0 fc0 sc0 ls3 ws3">
              Before you can be evicted, y<span className="_ _1" />
              our landlord must give you a <span className="_ _1" />
              <span className="ff1">
                writ
                <span className="_ _0" />
                ten notice
                <span className="ff2 ls1 ws1">
                  {" "}
                  <span className="ls3 ws5">of the reasons </span>–{" "}
                  <span className="ls3 ws6">the </span>
                </span>
              </span>
            </div>
            <div className="t m0 x2 h3 y8f ff2 fs0 fc0 sc0 ls3 ws3">
              “good cause” <span className="ls1 ws1">– </span>that is specific
              enou
              <span className="_ _1" />
              gh for you to present a de
              <span className="_ _1" />
              fense if you wish. You do no
              <span className="_ _1" />t{" "}
            </div>
            <div className="t m0 x2 h3 y90 ff2 fs0 fc0 sc0 ls3 ws3">
              have to move out after th
              <span className="_ _1" />e notice if you believe there is no{" "}
              <span className="_ _1" />
              good cause. <span className="_ _1" />
              Whether you agree or{" "}
            </div>
            <div className="t m0 x2 h3 y91 ff2 fs0 fc0 sc0 ls3 ws3">
              disagree with the notice, y<span className="_ _1" />
              ou should never ignore it. If you choose <span className="_ _1" />
              to stay and contest the{" "}
            </div>
            <div className="t m0 x2 h3 y92 ff2 fs0 fc0 sc0 ls3 ws3">
              eviction, the landlord must file and serve y
              <span className="_ _1" />
              ou with a court action, called a
              <span className="ws5">
                n “unlaw
                <span className="_ _1" />
                ful <span className="_ _0" />
                detainer”.{" "}
              </span>
            </div>
            <div className="t m0 x2 h3 y93 ff2 fs0 fc0 sc0 ls3 ws3">
              This court action must be based on
              <span className="_ _1" /> the same good cause{" "}
              <span className="_ _1" />
              stated in the notice. You hav
              <span className="_ _1" />e the{" "}
            </div>
            <div className="t m0 x2 h3 y94 ff2 fs0 fc0 sc0 ls3 ws3">
              right to show why
              <span className="_ _1" /> there is not good cause at a he
              <span className="_ _1" />
              aring in court. <span className="_ _1" />
              The judge will then decide{" "}
            </div>
            <div className="t m0 x2 h3 y95 ff2 fs0 fc0 sc0 ls3 ws3">
              whether the landlord has show
              <span className="_ _1" />n good cause. You
              <span className="ls1 ws1"> </span>only have to leav
              <span className="_ _1" />e the premises if the court{" "}
            </div>
            <div className="t m0 x2 h3 y96 ff2 fs0 fc0 sc0 ls3 ws3">
              orders you to do so. <span className="_ _1" />{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y97 ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 ha y98 ff6 fs0 fc0 sc0 ls3 ws3">
              IMPORTANT! If you re
              <span className="_ _1" />
              ceive an eviction notice or court papers, you
              <span className="_ _1" /> should contact an{" "}
            </div>
            <div className="t m0 x2 ha y99 ff6 fs0 fc0 sc0 ls3 ws3">
              attorney immediately for legal advice.{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y9a ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h2 y9b ff1 fs0 fc0 sc0 ls3 ws3">
              Who should you contact if y<span className="_ _1" />
              ou have more questions? <span className="_ _1" />
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h3 y9c ff2 fs0 fc0 sc0 ls1 ws1"></div>
            <div className="t m0 x2 h3 y9d ff2 fs0 fc0 sc0 ls3 ws3">
              Please contact your resident mana
              <span className="_ _1" />
              ger, local legal services office, local housing rights{" "}
            </div>
            <div className="t m0 x2 h3 y9e ff2 fs0 fc0 sc0 ls3 ws3">
              organization, or a private attorney.{" "}
              <span className="ls1 ws1"> </span>
            </div>
            <div className="t m0 x2 h4 y9f ff4 fs0 fc0 sc0 ls1 ws1"> </div>
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

export default ResidentNotificationLetter;
