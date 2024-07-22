"use client";
import React from "react";
import "./my-waitlist.scss";
import Profile from "../../../public/assets/icons/profile.svg";
import Button from "../../../components/button/button";

interface MyWaitlistProps {}

const MyWaitlist: React.FC<MyWaitlistProps> = () => {
  const waitlistButton = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };

  return (
    <div className="my-waitlist">
      <div className="my-waitlist__section-one">
        <h2>My Waitlist</h2>
      </div>
      <div className="my-waitlist__section-two">
        <div className="my-waitlist__cards-wrapper">
          <div className="my-waitlist__card">
            <div className="my-waitlist__card-image-wrapper">
              {" "}
              <img
                className="my-waitlist__card-image"
                src="/assets/images/door.png"
                alt="door"
              />
            </div>
            <div className="my-waitlist__card-section-one">
              <div className="my-waitlist__card-title">
                Property Name : ABC HOUSING
              </div>
              <div className="my-waitlist__card-detail">
                Unit Number : A400
              </div>
              <div className="my-waitlist__card-footer">
                <Profile className="my-waitlist__card-profile-icon" />
                <span>Households x 4</span>
              </div>
            </div>
            <div className="my-waitlist__card-section-two">
              <div>Status : Completed</div>
              <Button
                btnText="More"
                buttonClick={() => {}}
                btnTheme="upload-page"
                additionalStyles={waitlistButton}
              />
            </div>
          </div>
          <div className="my-waitlist__card">
            <div className="my-waitlist__card-image-wrapper">
              {" "}
              <img
                className="my-waitlist__card-image"
                src="/assets/images/door.png"
                alt="door"
              />
            </div>
            <div className="my-waitlist__card-section-one">
              <div className="my-waitlist__card-title">
                Property Name : ABC HOUSING
              </div>
              <div className="my-waitlist__card-detail">
                Unit Number : A400
              </div>
              <div className="my-waitlist__card-footer">
                <Profile className="my-waitlist__card-profile-icon" />
                <span>Households x 4</span>
              </div>
            </div>
            <div className="my-waitlist__card-section-two">
              <div>Status : Completed</div>
              <Button
                btnText="More"
                buttonClick={() => {}}
                btnTheme="upload-page"
                additionalStyles={waitlistButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWaitlist;
