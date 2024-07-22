"use client";
import "./admin.scss";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import TableView from "../../../components/table/table";
import { useAllTenants } from "../../../services/hooks/useAllTenants";
import Modal from "../../../components/modal/modal";
import AddPropertyManager from "../add-property-manager/page";
import { useEffect, useState } from "react";
import AddCompany from "../add-company/add-company";
import AddCustomerAgent from "../add-customer-agent/add-customer-agent";
import AddShadowUser from "../add-shadow-user/add-shadow-user";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import CreateCustomFields from "../../../public/assets/icons/create-custom-field.svg"
import Delete from "../../../public/assets/icons/garbage.svg";
import AnimatedCheck from "../../../components/animated-check/animated-check";
import Button from "../../../components/button/button";
import UserAdapter from "../../../services/adapters/user-adapter";

const Admin = () => {
  const { push } = useRouter();
  const [showPropertyManagerAdd, setShowPropertyManagerAdd] = useState(false);
  const [showCompanyAdd, setShowCompanyAdd] = useState(false);
  const [showCustomerAgentAdd, setShowCustomerAgentAdd] = useState(false);
  const [showShadowUserPopup, setShowShadowUserPopup] = useState(false);
  const [shadowUserAdded, setShadowUserAdded] = useState(false);
  const [propertyManagers, setPropertyManagers] = useState([]);
  const [needSync,setSyncRequired] = useState(false);
  const [showGenerateFieldSuccessPopup,setShowGenerateFieldSuccessPopup] = useState(false)
  const navigateToCompanyInfo = () => {
    try {
      push("/dashboard/company-info");
    } catch (ex) {
      console.error("Error at navigateToCompanyInfo ");
    }
  };
  const { userInfo } = useUserInfo();
  useEffect(() => {
    if (userInfo) {
      fetchPropertyManagers(userInfo);
      setSyncRequired(false);
    } else {
      console.log("no userinfo found");
    }
  }, [userInfo,needSync]);
  const fetchPropertyManagers = async (userInfo) => {
    console.log(userInfo);
    const propertyManagersFetchResponse =
      await TenantAdapter.getAllPropertyManagers(userInfo);
    console.log(propertyManagersFetchResponse);
    setPropertyManagers(propertyManagersFetchResponse?.data);
  };
  const userButtonStyle = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };
  const adminStyle = {
    color: "white",
    margin: "0",
  };
  const { allTenants } = useAllTenants();
  let allPropertyManagersFilter = [];
  if (Array.isArray(propertyManagers) && propertyManagers.length !== 0) {
    propertyManagers.forEach((x) => {
      allPropertyManagersFilter.push({
        // resident_id: x.resident_id,
        // unit_no: x.unit_number,
        first_name: x.first_name,
        last_name: x.last_name,
        // tel_number: x.tel_number,
        email: x.email,
        company_id: x.company_id,
        id: { id: x.id, type: "private" },
      });
    });
  }
  console.log(propertyManagers);
  console.log(allPropertyManagersFilter);
  const handlePropertyManagerAdd = () => {
    setShowPropertyManagerAdd(true);
  };
  const handleCustomerAgentAdd = () => {
    setShowCustomerAgentAdd(true);
  };
  const handleCompanyAdd = () => {
    setShowCompanyAdd(true);
  };
  const handleShadowUserAdd = () => {
    setShowShadowUserPopup(true);
  };
  const navigateToShadowUser = () => {
    try {
      push("/dashboard/shadow-user");
    } catch (ex) {
      console.error("Error at navigateToShadowUser ");
    }
  };
  const generateCustomFields = async() =>{
    const generateCustomFieldsResponse = await PropertyAdapter.generateCustomFields(userInfo)
    if(generateCustomFieldsResponse){
      console.log("Fields generated successfully")
      setShowGenerateFieldSuccessPopup(true);
    }else{
      console.log("Error in generateCustomFields")
    }
  }
  const handleDeletePropertyManager = async(detailsOfPM) =>{
    const deletePropertyManagerResponse = await UserAdapter.deletePropertyManager(userInfo.id,detailsOfPM.id.id);
    if(deletePropertyManagerResponse){
      setSyncRequired(true);
    }else{
      console.log("Error at handleDeletePropertyManager")
    }
  }
  const renderDeleteIcon = (detailsOfPM) =>{
    if (detailsOfPM.id.id === userInfo.id) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="admin">
      <div className="admin__section admin__section-one">
        <div className="admin__header">
          <h1 className="admin__header-text">
            <Label
              type={LabelType.Header}
              text={`Welcome, ${userInfo?.email}`}
              variant={LabelVariant.L4}
              overrideTextStyles={adminStyle}
            />
          </h1>
          <div className="admin__header-label">
            <Label
              type={LabelType.Link}
              text={"Admin"}
              variant={LabelVariant.L1}
              overrideTextStyles={adminStyle}
            />
          </div>
        </div>
        <div className="admin__header-image">
          <div className="admin__image-container">
            <div className="admin__image-wrapper">
              <img
                src="/assets/icons/admin-info.png"
                className="admin__cards-info-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="admin__section admin__section-two">
        <div className="admin__cards-wrapper">
          <div className="admin__cards" onClick={navigateToCompanyInfo}>
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/company-info.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Company Info"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
          <div className="admin__cards" onClick={handlePropertyManagerAdd}>
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/property-manager.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Add Property Manager"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
          <div className="admin__cards" onClick={handleCustomerAgentAdd}>
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/property-manager.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Add Customer Support Agent"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
          <div className="admin__cards" onClick={handleCompanyAdd}>
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/property-manager.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Add Company"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div
            className="admin__cards admin__cards--shadow-user"
            onClick={handleShadowUserAdd}
          >
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/property-manager.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Add Shadow User"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
          <div
            className="admin__cards admin__cards--shadow-user"
            onClick={navigateToShadowUser}
          >
            <div className="admin__cards-icon">
              <img
                src="/assets/icons/property-manager.png"
                className="admin__cards-icon-image"
              />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Assign Shadow User"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
          <div
            className="admin__cards admin__cards--shadow-user"
            onClick={()=>generateCustomFields()}
          >
            <div className="admin__cards-icon">
              <CreateCustomFields />
            </div>
            <div className="admin__cards-details">
              <label className="admin__cards-contents">
                <Label
                  type={LabelType.Header}
                  text={"Migrate Custom Fields"}
                  variant={LabelVariant.L4}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showPropertyManagerAdd}
        title={"Add Property Manager"}
        showCloseButton={true}
        setOn={() => setShowPropertyManagerAdd(false)}
        showBackButton={true}
        navigateBack={() => setShowPropertyManagerAdd(false)}
      >
        <AddPropertyManager
          setShowPropertyManagerAdd={setShowPropertyManagerAdd}
        />
      </Modal>
      <Modal
        isOpen={showCompanyAdd}
        title={"Add Company"}
        showCloseButton={true}
        setOn={() => setShowCompanyAdd(false)}
        showBackButton={true}
        navigateBack={() => setShowCompanyAdd(false)}
      >
        <AddCompany setShowCompanyAdd={setShowCompanyAdd} />
      </Modal>
      <Modal
        isOpen={showCustomerAgentAdd}
        title={"Add Customer Support Agent"}
        showCloseButton={true}
        setOn={() => setShowCustomerAgentAdd(false)}
        showBackButton={true}
        navigateBack={() => setShowCustomerAgentAdd(false)}
      >
        <AddCustomerAgent setShowCustomerAgentAdd={setShowCustomerAgentAdd} />
      </Modal>
      <Modal
        isOpen={showShadowUserPopup}
        title={shadowUserAdded ? "Success!!" : "Add Shadow User"}
        showCloseButton={!shadowUserAdded}
        setOn={() => setShowShadowUserPopup(false)}
        showBackButton={!shadowUserAdded}
        navigateBack={() => setShowShadowUserPopup(false)}
      >
        <AddShadowUser
          setShowShadowUserPopup={setShowShadowUserPopup}
          setShadowUserAdded={setShadowUserAdded}
          shadowUserAdded={shadowUserAdded}
        />
      </Modal>
      <Modal
        isOpen={showGenerateFieldSuccessPopup}
        title={"Success!!"}
        showCloseButton={false}
        setOn={() => setShowGenerateFieldSuccessPopup(false)}
        navigateBack={() => setShowGenerateFieldSuccessPopup(false)}
      >
        <div className="add-shadow-user__success">
      <div className="add-shadow-user__success-header">Fields has been generated successfully</div>
      <AnimatedCheck />
      <div>
        <Button
          btnText={"Close"}
          btnType="rounded"
          btnTheme="primary"
          buttonClick={() => {
            setShowGenerateFieldSuccessPopup(false);
          }}
          buttonStatus={false}
          additionalStyles={{ padding: 0 }}
        />
      </div>
    </div>
      </Modal>
      <TableView
        showAddNewButton={false}
        showAddBulkUpload={false}
        onViewDetails={handleDeletePropertyManager} 
        viewDetailsIcon={Delete}
        //@ts-ignore
        showViewDetails={(detailsOfPM) => renderDeleteIcon(detailsOfPM)} 
        viewDetailsText={"Delete"}
        showSerialNumber={false}
        addNew={() => {}}
        secondaryButtonClick={() => {}}
        tableName="Admins"
        dataTestId="admin-table"
        tableHeader={[
          // { text: "Resident ID Number", key: "resident_id", type: "string" },
          // { text: "Unit Number", key: "unit_no", type: "string" },
          { text: "Admin First Name", key: "first_name", type: "string" },
          //  { text: "Resident Middle Nam", key: "mobile", type: "number" },
          { text: "Admin Last Name", key: "last_name", type: "string" },
          //{ text: "Relationship", key: "relationship", type: "string" },
          // { text: "Race", key: "action", type: "none" },
          // { text: "Ethnicity", key: "profile", type: "image" },
          // { text: "Address", key: "name", type: "string" },
          // { text: "City", key: "email", type: "string" },
          // { text: "State", key: "mobile", type: "number" },
          // { text: "Status", key: "status", type: "string" },
          // { text: "Postal Code", key: "renewal_date", type: "date" },
          // { text: "County", key: "action", type: "none" },
          // { text: "Nation/Country", key: "profile", type: "image" },
          // { text: "Disabled Status", key: "name", type: "string" },
          // { text: "Student Status", key: "email", type: "string" },
          //{ text: "Date of Birth", key: "mobile", type: "number" },
          // { text: "Telephone Number", key: "tel_number", type: "tel" },
          { text: "Email Address", key: "email", type: "email" },
          { text: "Company ID", key: "company_id", type: "string" },
          // { text: "Identification Number", key: "action", type: "none" },
          // { text: "Identification State", key: "status", type: "string" },
          // { text: "Social Security Number", key: "status", type: "string" },
          // { text: "Social Security Exception", key: "status", type: "string" },
          // { text: "Household Size", key: "status", type: "string" },
        ]}
        tableData={allPropertyManagersFilter}
      />
    </div>
  );
};

export default Admin;
