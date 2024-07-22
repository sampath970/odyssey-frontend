"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./table.scss";
import Button from "../button/button";
import Eye from "../../public/assets/icons/eye.svg";
import Back from "../../public/assets/icons/back.svg";
import FloatingMenu from "../floating-menu/floating-menu";
import SvgIcon from "../svg-icon/svg-icon";
import Label, { LabelType, LabelVariant } from "../../components/label/label";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface TableHeaderProps {
  text: string;
  key: string;
  type: string;
}

interface TableProps {
  tableHeader: TableHeaderProps[];
  tableData: any[];
  tableName?: string;
  showViewDetails?:any;
  addNew?: () => void;
  showAddNewButton?: boolean;
  showAddBulkUpload?: boolean;
  secondaryButtonClick?: () => void;
  onViewDetails?: (data: any) => void;
  showFloatingViewMenu?: boolean;
  floatingMenu?: (index: number) => ReactNode;
  showSerialNumber?: boolean;
  showAllListingButton?: boolean;
  showBackIcon?: boolean;
  tableListButtonText?: string;
  handleListingView?: () => void;
  viewDetailsIcon?: any;
  viewDetailsText?: any;
  dataTestId?: string;
  handleBackClick?: () => void;
  isLoading?:boolean;
}

const TableView = (props: TableProps) => {
  const {
    tableHeader,
    tableData,
    onViewDetails,
    tableName,
    addNew,
    showAddNewButton,
    showAddBulkUpload,
    secondaryButtonClick, 
    showViewDetails = () => {},
    showFloatingViewMenu,
    floatingMenu,
    handleListingView,
    showAllListingButton = false,
    tableListButtonText,
    showSerialNumber = true,
    viewDetailsText,
    viewDetailsIcon,
    dataTestId,
    handleBackClick,
    showBackIcon,
    isLoading=false,
  } = props;
  const headerWithViewOption = [
    ...tableHeader,
    {
      text: viewDetailsText ? viewDetailsText : "View Icon",
      key: "view",
      type: "none",
    },
  ];
  const headerWithOutViewOption = [...tableHeader];
  const handleTableAdd = () => {
    try {
      addNew();
    } catch (ex) {
      console.error("Error at handleTableAdd");
    }
  };
  const handleTableFilter = () => {
    try {
      props.secondaryButtonClick();
    } catch (ex) {
      console.error("Error at handleTableFilter");
    }
  };

  const [_tableData, setTableData] = useState([...tableData]);

  const [_tableHeader, setTableHeader] = showViewDetails
    ? useState(headerWithViewOption)
    : useState(headerWithOutViewOption);

  useEffect(() => {
    setTableData(tableData);
  }, [tableData, tableHeader]);

  const onHeaderClick = (e) => {
    try {
      let sort_key = e.currentTarget.dataset.sortKey;
      let field_type = e.currentTarget.dataset.fieldType;

      let data = [..._tableData].sort((a, b) => {
        if (field_type == "string" || field_type == "number") {
          if (a[sort_key] < b[sort_key]) {
            return -1;
          }
          if (a[sort_key] > b[sort_key]) {
            return 1;
          }
        }
        if (field_type == "date") {
          if (
            new Date(a[sort_key]).getTime() < new Date(b[sort_key]).getTime()
          ) {
            return -1;
          }
          if (
            new Date(a[sort_key]).getTime() > new Date(b[sort_key]).getTime()
          ) {
            return 1;
          }
        }
        return 0;
      });
      setTableData(data);
    } catch (ex) {
      console.error("Error at onHeaderClick");
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-header-wrapper">
        {showBackIcon && (
          <div onClick={handleBackClick} className="table-back-icon">
            <Back />
          </div>
        )}
        {isLoading ? <Skeleton height={20} width={100} borderRadius={0}/> : tableName ? <div className="table-name">{tableName}</div> : null}
        <div style={{ flex: 1 }}>
          {isLoading ? <Skeleton height={20} width={100} borderRadius={0} style={{marginLeft:"12px",padding:"10px"}}/> : 
          showAddNewButton && (
            <Button
              btnText="Add New"
              btnTheme="secondary"
              btnType="rectangle"
              buttonClick={handleTableAdd}
              testID="table-add"
            />
          )}
        </div>
        <div>
          {isLoading ? <Skeleton height={20} width={100} borderRadius={0} style={{marginLeft:"12px",padding:"10px"}}/> : 
          showAddBulkUpload && (
            <Button
              btnText="Bulk Upload"
              btnTheme="primary"
              btnType="rectangle"
              buttonClick={handleTableFilter}
              testID="table-add"
              additionalStyles={{padding:0}}
            />
          )}
        </div>
      </div>
      <Table className="table-view" data-testid={dataTestId}>
        <Thead>
          <Tr className="table-view__row">
            {showSerialNumber && <Th className="table-view__header">
            <Label
                  type={LabelType.Header}
                  text={"No"}
                  variant={LabelVariant.L2}
                />
              </Th>}

            {!isLoading && _tableHeader.map((_headers) => (
              <Th
                className="table-view__header"
                key={_headers["key"]}
                data-sort-key={_headers["key"]}
                data-field-type={_headers["type"]}
                data-field-s_no={_headers["no"]}
                onClick={onHeaderClick}
              >
                <Label
                  type={LabelType.Header}
                  text={`${_headers["text"]}`}
                  variant={LabelVariant.L2}
                />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {_tableData &&
            _tableData.length > 0 &&
            _tableData.map(function (_profile, index) {
              let _cells = [];
              if (showSerialNumber) {
                _cells.push(
                  <Td key={index} className="table-data">
                    {index + 1}
                  </Td>
                );
              }
              Object.values(_profile).map((_key) => {
                //@ts-ignore
                if (_key?.type != "private") {
                  _cells.push(
                    <Td key={index} className="table-data">
                      {" "}
                      <Label
                        type={LabelType.SubHeader}
                        text={_key}
                        variant={LabelVariant.L3}
                      />
                    </Td>
                  );
                }
              });
              {showViewDetails(_profile)
                  ? _cells.push(
                      <Td className="table-data" key={index}>
                        {
                          <div>
                            {showFloatingViewMenu ? (
                              <FloatingMenu
                                floatDirection="left"
                                menuTriggerComponent={
                                  <div
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={onViewDetails}
                                  >
                                    {viewDetailsIcon ? (
                                      <SvgIcon
                                        height={20}
                                        width={20}
                                        Icon={viewDetailsIcon}
                                      />
                                    ) : (
                                      <SvgIcon
                                        height={16}
                                        width={16}
                                        Icon={Eye}
                                      />
                                    )}
                                  </div>
                                }
                              >
                                {floatingMenu(index)}
                              </FloatingMenu>
                            ) : (
                              <div className="table-view-icon-wrapper">
                                <div
                                  onClick={() => onViewDetails(_profile)}
                                  className="table-view-icon"
                                >
                                  {viewDetailsIcon ? (
                                    <SvgIcon
                                      height={20}
                                      width={20}
                                      Icon={viewDetailsIcon}
                                    />
                                  ) : (
                                    <SvgIcon
                                      height={16}
                                      width={16}
                                      Icon={Eye}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        }
                      </Td>
                    )
                  : null;
              }

              return (
                <Tr key={index} className="table-view__row">
                  {_cells}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      {showAllListingButton == true && (
        <div className="table-view__all-listing-button">
          <Button
            btnText={tableListButtonText}
            btnTheme="primary"
            btnType="rectangle"
            testID="listing-button"
            buttonClick={handleListingView}
          />
        </div>
      )}
    </div>
  );
};

export default TableView;
