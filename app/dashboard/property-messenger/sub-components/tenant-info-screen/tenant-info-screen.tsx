import React, { useEffect, useState } from "react";
import TenantPFP from "../../../../../public/assets/icons/tenant-pfp.svg";
import LocationIcon from "../../../../../public/assets/icons/location-circle.svg";
import Mobile from "../../../../../public/assets/icons/mobile-icon.svg";
import Email from "../../../../../public/assets/icons/email-icon.svg";
import TenantAdapter from "../../../../../services/adapters/tenants-adapter";
import FloatingMenu from "../../../../../components/floating-menu/floating-menu";

interface TenantInfo {
  first_name: string;
  last_name: string;
  relationship: { value: ""; label: "" };
  email: string;
  tel_number: string;
  city: string;
  county: string;
  country: string;
  role?:string;
}

interface TenantInfoScreenProps {
  currentTenant: string;
  unitInfoArray: any[]; // Assuming tenantId is a string
  messageListHeight:number;
}

const TenantInfoScreen = ({
  currentTenant,
  unitInfoArray = [],
  messageListHeight
}: TenantInfoScreenProps) => {
  console.log(unitInfoArray);
  const [tenantInfo, setTenantInfo] = useState<TenantInfo | null>(null);

  useEffect(() => {
    async function fetchTenantInfo(tenantId: string) {
      if (tenantId) {
        try {
          const tenantInfoResponse = await TenantAdapter.getTenantById(
            tenantId
          );
          console.log(tenantInfoResponse);
          setTenantInfo(tenantInfoResponse[0]);
        } catch (error) {
          console.error("Error getting tenant info:", error);
        }
      }
    }
    fetchTenantInfo(currentTenant);
  }, [currentTenant]);

  return (
    <div className="property-messenger__property-manager-info" style={{height:`${messageListHeight + 100}px`,background:"white"}}>
      {tenantInfo && (
        <>
          <div className="property-messenger__property-info-top-wrapper">
            {tenantInfo && <h2 style={{fontSize:"1.2rem"}}>{`${tenantInfo.first_name ? tenantInfo.first_name : ""} ${
                      tenantInfo.last_name ? tenantInfo.last_name : ""
                    }`}</h2>}
            <div className="property-messenger__property-info-section">
              {tenantInfo && (
                <div className="property-messenger__property-info-section--sections">
                  <div className="property-messenger__property-info-section--sections-one">
                    {tenantInfo?.role === "property_manager" ? `Property Manager Name` : `Tenant Name`}
                  </div>
                  <div className="property-messenger__property-info-section--sections-two">
                    {": "}
                    {`${tenantInfo.first_name ? tenantInfo.first_name : ""} ${
                      tenantInfo.last_name ? tenantInfo.last_name : ""
                    }`}
                  </div>
                </div>
              )}
              {tenantInfo && tenantInfo?.relationship && (
                <div className="property-messenger__property-info-section--sections">
                  <div className="property-messenger__property-info-section--sections-one">
                    Tenant Relation
                  </div>
                  <div className="property-messenger__property-info-section--sections-two">
                    {": "}
                    {tenantInfo?.relationship?.label
                      ? tenantInfo?.relationship?.label
                      : ""}
                  </div>
                </div>
              )}
              {tenantInfo && tenantInfo?.relationship && (
                <div className="property-messenger__property-info-section--sections">
                  <div className="property-messenger__property-info-section--sections-one">
                    Tenant Location
                  </div>
                  <div className="property-messenger__property-info-section--sections-two">
                    {": "}
                    {`${tenantInfo.city ? `${tenantInfo.city}` : ""}${
                tenantInfo.county ? `, ${tenantInfo.county}` : ""
              }${tenantInfo.country ? ` ,${tenantInfo.country}` : ""}`}
                  </div>
                </div>
              )}
              {tenantInfo && tenantInfo?.relationship && (
                <div className="property-messenger__property-info-section--sections">
                  <div className="property-messenger__property-info-section--sections-one">
                    Tenant Phone
                  </div>
                  <div className="property-messenger__property-info-section--sections-two">
                    {": "}
                    {tenantInfo.tel_number ? tenantInfo.tel_number : ""}
                  </div>
                </div>
              )}
              {tenantInfo && tenantInfo?.relationship && (
                <div className="property-messenger__property-info-section--sections">
                  <div className="property-messenger__property-info-section--sections-one">
                    Tenant Email
                  </div>
                  <div className="property-messenger__property-info-section--sections-two">
                    {": "}
                    {tenantInfo.email ? tenantInfo.email : ""}
                  </div>
                </div>
              )}
            </div>
            {tenantInfo?.role !== "property_manager" && tenantInfo?.role !== "ShadowManager" ? <fieldset className="property-messenger__fieldset">
            <legend className="property-messenger__legend">
            Units
          </legend>
            <div className="property-messenger__property-info-units">
              {unitInfoArray.map((_units, index) => (
                <FloatingMenu
                  floatDirection="right"
                  menuTriggerComponent={
                    <div
                      key={index}
                      className="property-messenger__property-info-unit-wrapper"
                    >
                      <div className="property-messenger__property-info-box"></div>
                      <div className="property-messenger__property-info-label">
                        {_units.unit_id}
                      </div>
                    </div>
                  }
                >
                  <div className="property-messenger__property-floating-modal">
                    <div className="property-messenger__property-floating-modal-section-wrapper">
                    <div className="property-messenger__property-float-child">Property Name</div>
                  <div className="property-messenger__property-float-child">
                    {": "}{_units?.property && _units?.property.name
                      ? _units?.property.name
                      : ""}
                  </div>
                    </div>
                  </div>
                </FloatingMenu>
              ))}
            </div>
          </fieldset> : null}
          </div>
          {/* <div className="property-messenger__contact-info-line"></div>
          <div className="property-messenger__contact-info">
            <div className="property-messenger__property-info-icons-wrapper">
              <div className="property-messenger__property-info-icon-wrapper">
                <LocationIcon height="20px" width="20px" />
              </div>
              <div>{`${tenantInfo.city ? `${tenantInfo.city}` : ""}${
                tenantInfo.county ? `, ${tenantInfo.county}` : ""
              }${tenantInfo.country ? ` ,${tenantInfo.country}` : ""}`}</div>
            </div>
            {tenantInfo.tel_number && (
              <div className="property-messenger__property-info-icons-wrapper">
                <div className="property-messenger__property-info-icon-wrapper">
                  <Mobile height="20px" width="20px" />
                </div>
                <div>{tenantInfo.tel_number ? tenantInfo.tel_number : ""}</div>
              </div>
            )}
            <div className="property-messenger__property-info-icons-wrapper">
              <div className="property-messenger__property-info-icon-wrapper">
                <Email height="20px" width="20px" />
              </div>
              <div>{tenantInfo.email ? tenantInfo.email : ""}</div>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default TenantInfoScreen;
