import React from "react";
import "./banner.scss";
import Label, { LabelType, LabelVariant } from "../label/label";
import Logo from "../logo";
import Topbar from "../../app/home/top-bar/top-bar";
const bannerStyle = {
  color: "#224a96",
  lineHeight: "5rem",
  margin: "0",
  //  textShadow: "5px 5px 10px black",
}
const descriptionStyle = {
  paddingLeft: "0",
  lineHeight: "1.5rem",
  color: "black"
}

const footerViewStyle = {
  height: "200px",
  backgroundSize: "400px 200px",
  backgroundImage: 'url(/assets/images/home_connected.png)',
}
const Banner: React.FC = () => {
  return (
    <>
      <div data-testid="banner" className="banner">
        <div
          data-testid="banner-one"
          className="banner__section banner__section--one"
        >
          <Label
            type={LabelType.Hero}
            text={"Welcome to ECHO, the pioneering solution in housing eligibility."}
            variant={LabelVariant.L1}
            overrideTextStyles={bannerStyle}
            dataTestId="banner-herotext-one"
          />

          <Label
            text={`As the first company to exclusively utilize patented technology for full automation, we offer a revolutionary service for vested housing owners, property management companies, and government agencies.\nEcho streamlines and simplifies the eligibility determination process, setting a new standard in efficiency and accuracy.`}
            type={LabelType.Body}
            variant={LabelVariant.L2}
            overrideTextStyles={descriptionStyle}
            dataTestId="banner-description"
          />
        </div>
 
        <div
          data-testid="banner-two"
          className="banner__section banner__section--two"
        >
          {/* <img
            className="image"
            src="../assets/images/banner-image.jpg"
            alt="loading"
          /> */}
          <Logo />
          <Topbar />
        </div>
      </div>
      <div style={footerViewStyle}>

      </div>
    </>
  );
};

export default Banner;
