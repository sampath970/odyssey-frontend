"use client";
import React, { useEffect, useState } from "react";
import TableView from "../../../../components/table/table";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import AddSpecialInstruction from "../../../../components/add-special-instruction/add-special-instruction";

const MoveInCertification = (props) => {
  const [showAddRule, setShowAddRule] = useState(false);
  const [specialRules, setSpecialRules] = useState([]);
  const { setShowSpecialInstructions, createSpecialInfo, activeProperty } =
    props;
  console.log(activeProperty);

  const handleViewClick = (x) => {};
  const handleAddRule = () => {
    setShowAddRule(true);
  };
  useEffect(() => {
    if (activeProperty) {
      let specialInfo =
        activeProperty &&
        activeProperty?.special_instructions &&
        activeProperty?.special_instructions.map((specialInfo) => ({
          form_name: specialInfo.form_name.label,
          form_field: specialInfo.form_field.label,
          field_operator: specialInfo.field_operator.label,
          field_expected_value: specialInfo.field_expected_value,
          rule_action: specialInfo.form_field_intent.label,
        }));
        setSpecialRules(specialInfo || []);
    }
  }, [activeProperty]);
  console.log(specialRules)
  const handleCloseAddRule = () => {
    setShowAddRule(false);
  };
  const handleSetUploadPopup = () => {};

  const renderFloatingMenu = (x) => {
    return <div></div>;
  };
  const onCreateSpecialInfo = (specialInfo) => {
    createSpecialInfo(specialInfo);
  };


  return (
    <div>
      <TableView
        showAddNewButton={true}
        showAddBulkUpload={false}
        showBackIcon={true}
        handleBackClick={() => setShowSpecialInstructions(true)}
        onViewDetails={handleViewClick}
        floatingMenu={renderFloatingMenu}
        showFloatingViewMenu={false}
        secondaryButtonClick={handleSetUploadPopup}
        showViewDetails={() => true}
        addNew={handleAddRule}
        tableName="Special Instructions"
        tableHeader={[
          { text: "Form Name", key: "form_name", type: "number" },
          { text: "Field Name", key: "form_field", type: "string" },
          { text: "Field Operation", key: "field_operator", type: "number" },
          { text: "Field Value", key: "field_expected_value", type: "number" },
          { text: "Rule Action", key: "field_action", type: "number" },
        ]}
        tableData={specialRules}
      />{" "}
      <Modal
        isOpen={showAddRule}
        title="Add Special Instruction"
        setOn={handleCloseAddRule}
        size={ModalTypes.Large}>
        <AddSpecialInstruction
          onClose={handleCloseAddRule}
          onCreateSpecialInfo={onCreateSpecialInfo}
        />
      </Modal>
    </div>
  );
};

export default MoveInCertification;
