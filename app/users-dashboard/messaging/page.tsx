"use client";
import React, { useEffect, useState } from "react";
import "./messaging.scss";
import Input from "../../../components/input/input";
import Email from "../../../public/assets/icons/email-icon.svg";
import Send from "../../../public/assets/icons/send-icon.svg";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import { scrollToBottom } from "../../../utils/message-utils";

const Messaging = () => {
  const [message, setMessage] = useState("");
  const { activeProperty } = useAllProperties();
  const [propertyManagerID, setPropertyManagerID] = useState("");
  const [propertyManagerInfo, setPropertyManagerInfo] = useState<any>({});
  const [currentPropertyInfo, setCurrentPropertyInfo] = useState<any>({});
  const [currentUnitInfo, setCurrentUnitInfo] = useState<any>({});
  const [sendMessageError, setSendMessageError] = useState(false);
  const [messageListHeight,setMessageListHeight] = useState(800);
  const { userInfo } = useUserInfo();
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setSendMessageError(false);
  };
  useEffect(() => {
    if (userInfo) {
      getAllMessages(userInfo);
      getPropertyManagerID(userInfo?.id);
    } else {
      console.log("error fetching messages");
    }
  }, [userInfo]);
  useEffect(() => {
    const handleResize = () => {
      if (window) {
        let newHeight;
        if (window.innerWidth < 600) {
          newHeight = window.innerHeight - 200;
        } else {
          newHeight = window.innerHeight - 120;
        }
        setMessageListHeight(newHeight);
      } else {
        console.log("window is not defined");
      }
    };
  
    if (window) {
      setMessageListHeight(window.innerHeight < 600 ? window.innerHeight - 220 : window.innerHeight - 120);
      window.addEventListener("resize", handleResize);
    } else {
      console.log("window is not defined");
    }
  
    return () => {
      if (window) {
        window.removeEventListener("resize", handleResize);
      } else {
        console.log("window is not defined");
      }
    };
  }, []);
  
  useEffect(() => {
    async function fetchPropertyInfo(activeProperty) {
      console.log(activeProperty);
      if (activeProperty) {
        const propertyInfoResponse = await PropertyAdapter.getPropertyByID(
          activeProperty[0].property_id
        );
        if (propertyInfoResponse) {
          setCurrentPropertyInfo(propertyInfoResponse[0]);
          getCurrentUnitInfo(
            propertyInfoResponse[0].units,
            activeProperty[0].unit_id
          );
        }
      } else {
        console.log(" no active property found");
      }
    }
    fetchPropertyInfo(activeProperty);
  }, [activeProperty]);
  const getPropertyManagerID = async (tenantID) => {
    const tenantInfoResponse = await TenantAdapter.getTenantById(tenantID);
    if (tenantInfoResponse) {
      let propertyManagerID = tenantInfoResponse[0].property_manager_id;
      if (propertyManagerID) {
        setPropertyManagerID(propertyManagerID);
        let propertyManagerInfo = await TenantAdapter.getTenantById(
          propertyManagerID
        );
        console.log(propertyManagerInfo);
        setPropertyManagerInfo(propertyManagerInfo[0]);
      } else {
        console.log("No proprety manager found");
      }
    } else {
      console.log("Error fetching tenant info");
    }
  };
  const getCurrentUnitInfo = (_propertyUnits, _currentUnit) => {
    console.log(_propertyUnits);
    console.log(_currentUnit);
    let _currentUnitInfo = _propertyUnits.find(
      (_units) => _units.id === _currentUnit
    );
    if (_currentUnitInfo) {
      setCurrentUnitInfo(_currentUnitInfo);
    } else {
      setCurrentUnitInfo({});
    }
  };
  const [allMessages, setAllMessages] = useState([]);
  function getTime(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      const formattedTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return formattedTime;
    } else {
      console.log("no timestamp for this message");
      return "";
    }
  }
  const sendMessage = async (message) => {
    console.log(propertyManagerID);
    if (message && message.trim && message.trim() != "") {
      let role = "tenant";
      let messageDetails = {
        from: userInfo?.id,
        to: propertyManagerID,
        message: message,
      };
      const messageSendResponse = await TenantAdapter.sendMessage(
        userInfo,
        propertyManagerID,
        role,
        messageDetails
      );
      if (messageSendResponse) {
        setMessage("");
        getAllMessages(userInfo);
      }
    } else {
      setSendMessageError(true);
      console.log("error sending message");
    }
  };
  const getAllMessages = async (userInfo) => {
    let role = "tenant";
    const getAllMessagesResponse = await TenantAdapter.getAllMessages(
      userInfo,
      propertyManagerID,
      role
    );
    if (getAllMessagesResponse) {
      let messages = getAllMessagesResponse.map((_item) => _item.message);
      setAllMessages(messages);
    }
  };
  useEffect(()=>{
    scrollToBottom("messages-list");
  },[allMessages])
  const firstLetter =
    propertyManagerInfo &&
    Object.keys(propertyManagerInfo)?.length !== 0 &&
    propertyManagerInfo?.first_name
      ? propertyManagerInfo?.first_name[0]?.toUpperCase()
      : "P";
  const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          setMessage(message + "\n");
        } else {
          console.log("Do none");
        }
  };
  if (
    Object.keys(currentPropertyInfo).length === 0 &&
    Object.keys(propertyManagerInfo).length === 0
  )
    return null;
  return (
    <div style={{height:`${ messageListHeight + 40 }px`}}>
      <div className="messaging__input-field-wrapper">
        {/* <Input
          type="text"
          labelStyle={{ margin: 0 }}
          errored={sendMessageError}
          name="messaging"
          wrapperStyle={{
            margin: 0,
            borderRadius: "12px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          inputStyle={{
            margin: 0,
            borderRadius: "12px",
            width: "100%",
            outline: "lightgray",
          }}
          placeholder="Type your message..."
          onChange={handleMessageChange}
          value={message}
        /> */}
        <textarea
            value={message}
            onChange={(e) => handleMessageChange(e)}
            onKeyDown={handleKeyPress}
            rows={5}
            cols={50}
            className="messaging__textarea"
            onFocus={()=>setSendMessageError(false)}
            style={{border:sendMessageError ? "1px solid red" : ""}}
          />
        <div
          className="messaging__input-icon-wrapper"
          onClick={() => sendMessage(message)}
        >
          <Send height="16px" width="16px" />
        </div>
        {sendMessageError && (
          <div className="messaging__error-message">
            Message cannot be empty
          </div>
        )}
      </div>
      <div className="messaging__wrapper" >
        <div className="messaging" style={{height:`${messageListHeight}px`}}>
          <div className="messaging__header">
            <div className="messaging__header-title" >
              <div>
                {
                  //@ts-ignore
                  `${
                    propertyManagerInfo?.first_name === undefined
                      ? "Property"
                      : propertyManagerInfo.first_name
                  } ${
                    propertyManagerInfo.last_name === undefined
                      ? "Manager"
                      : propertyManagerInfo.last_name
                  }`
                }
              </div>
              {/* <div className="messaging__header-online">online</div> */}
            </div>
            <div className="messaging__icons-wrapper">
              {/* <div className="messaging__icon">
                <Phone height="18px" width="18px" />
              </div>
              <div className="messaging__icon">
                <Video height="20px" width="20px" />
              </div> */}
            </div>
          </div>
          <div className="messaging-list" id="messages-list">
            {allMessages.map((_message) => (
              <div
                className={
                  _message?.from !== userInfo?.id
                    ? "messaging-received-wrapper"
                    : "messaging-send-wrapper"
                }
              >
                {_message?.from === userInfo?.id && (
                  <div className="messaging-send-text-wrapper">
                    <div className={"messaging-send-text"}>
                      <div>{`${getTime(_message.time_stamp)}`}</div>
                      <div>You</div>
                    </div>
                    <div className="messaging-send"><pre className="messaging-pre-wrap">{_message.message}</pre></div>
                  </div>
                )}
                {_message?.from === propertyManagerID &&
                  _message?.to === userInfo?.id && (
                    <div className="messaging-received-message">
                      <div>
                        {/* <PropertyManagerPFP height="40px" width="40px" /> */}
                        <div className="messaging__avatar-wrapper">
                          <button className="messaging__avatar" id="avatar-btn">
                            <div className="messaging__avatar-image">
                              {firstLetter}
                            </div>
                          </button>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <div className={"messaging-received-text"}>
                          <div>{`${getTime(_message.time_stamp)}`}</div>
                          <div>{`${propertyManagerInfo?.first_name ? propertyManagerInfo?.first_name : "Property Manager"}`}</div>
                        </div>
                        <div className="messaging-received">
                          <pre className="messaging-pre-wrap">{_message.message}</pre>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="messaging__property-manager-info" style={{height:`${messageListHeight + 50}px`}}>
          <div className="messaging__property-manager-info-top">
            <div className="messaging__property-info-section">
              {currentPropertyInfo && currentPropertyInfo?.name && (
                <div className="messaging__property-info-section--sections">
                  <div className="messaging__property-info-section--sections-one">
                    Property Name
                  </div>
                  <div className="messaging__property-info-section--sections-two">
                    {" "}
                    {": "}
                    {currentPropertyInfo?.name}
                  </div>
                </div>
              )}
              {currentUnitInfo && currentUnitInfo?.unit_id && (
                <div className="messaging__property-info-section--sections">
                  <div className="messaging__property-info-section--sections-one">
                    Unit Number
                  </div>
                  <div className="messaging__property-info-section--sections-two">
                    {" "}
                    {": "}
                    {currentUnitInfo?.unit_id}
                  </div>
                </div>
              )}
              {propertyManagerInfo && propertyManagerInfo?.first_name && propertyManagerInfo?.last_name && (
                <div className="messaging__property-info-section--sections">
                  <div className="messaging__property-info-section--sections-one">
                    Property Manager
                  </div>
                  <div className="messaging__property-info-section--sections-two">
                    {" "}
                    {`: ${
                      propertyManagerInfo?.first_name === undefined
                        ? ""
                        : propertyManagerInfo.first_name
                    } ${
                      propertyManagerInfo.last_name === undefined
                        ? ""
                        : propertyManagerInfo.last_name
                    }`}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="messaging__line"></div>
          <div className="messaging__user-details">
            {propertyManagerInfo?.email ? (
              <div className="messaging__user-detail-wrapper">
                <div className="messaging__user-detail-icon-wrapper">
                  <Email height="20px" width="20px" />
                </div>
                <div>{propertyManagerInfo?.email}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
