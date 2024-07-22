"use client";

import React from "react";
import Card from "../../../components/card/card";
import "./view-listings.scss";
import Townhouse from "../../../public/assets/images/townhouse.svg";
import { useAllProperties } from "../../../services/hooks/useAllProperties";

const ViewPropertyListings = () => {
  let { allProperties } = useAllProperties();
  const navigateToPropertyDetails = () => {
    try {
    } catch (ex) {
      console.error("Error at navigateToPropertyDetails")
    }

  }
  return (
    <>
      <div className="view-listings">
        <div className="view-listings__header-wrapper">
          <div className="view-listings__header-text">
            <label>All Properties</label>
          </div>
        </div>
        <div className="view-listings__section-one">
          {allProperties.map((_data) => (
            <Card
              cardTitle={_data.name}
              cardAddress={_data.address}
              cardUnit={_data.units}
              cardClick={navigateToPropertyDetails}
              cardType="property"
              cardImgSrc=""
              cardDefault={<Townhouse />}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewPropertyListings;
