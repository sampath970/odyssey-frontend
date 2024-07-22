"use client";
import React, { useEffect, useState } from "react";
import "./property-messenger.scss";
import Input from "../../../components/input/input";
import TenantPFP from "../../../public/assets/icons/tenant-pfp.svg";
import Send from "../../../public/assets/icons/send-icon.svg";
import moment from "moment";
import { useAllTenants } from "../../../services/hooks/useAllTenants";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import {useNotifications} from "../../../services/hooks/useNotifications"
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import MessagingList from "./sub-components/messaging-list/messaging-list";
import TenantInfoScreen from "./sub-components/tenant-info-screen/tenant-info-screen";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import LoadingBar from 'react-top-loading-bar'
import { handleClearNotification } from "../../../utils/notification-utils";
import { scrollToBottom } from "../../../utils/message-utils";


const PropertyMessenger = () => {
  const [message, setMessage] = useState("");
  const { userInfo } = useUserInfo();
  console.log(userInfo);
  const handleMessageChange = (event) => {
    setSendMessageError(false);
    setMessage(event?.target?.value);
  };
  const { allTenants } = useAllTenants();
  const [allMessages, setAllMessages] = useState([]);
  const [allCurrentMessages, setAllCurrentMessages] = useState([]);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [currentTenantInfo, setCurrentTenantInfo] = useState(null);
  const [sendMessageError, setSendMessageError] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [messageListHeight,setMessageListHeight] = useState(600);
  const [shadowUsers,setShadowUsers] = useState([])
  const [propertyManagers,setPropertyManagers] = useState([]);
  const [needSync,setSyncRequired] = useState(false)
  const [progress, setProgress] = useState(0);
  const {unReadChatMessageUsers,fetchNewNotifications} = useNotifications();
  console.log(unReadChatMessageUsers);
  console.log(currentTenant);
  //Eg timestamp = 1709808482764;
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
  const [allTenantsWithUnits, setAllTenantsWithUnits] = useState([]);

  useEffect(() => {
    if (allTenants && allTenants.length > 0) {
      fetchTenantsWithUnits(allTenants);
    }
  }, [allTenants]);
  console.log(allTenants)
  const fetchTenantsWithUnits = async (tenants) => {
    try {
      const tenantsWithUnits = await Promise.all(
        tenants.map(async (tenant) => {
          const unitId = await fetchRentalByTenant(tenant.id);
          return { ...tenant, unit_id: unitId };
        })
      );
      setAllTenantsWithUnits(tenantsWithUnits);
    } catch (error) {
      console.error("Error fetching tenants with units:", error);
    }
  };
  console.log(allTenantsWithUnits);

  useEffect(() => {
    if (userInfo && userInfo?.role === "ShadowManager") {
      getAllMessages(userInfo);
      fetchPropertyManagers(userInfo);
      setSyncRequired(false);
    } else if (userInfo) {
      getAllMessages(userInfo);
      setSyncRequired(false);
    }else{
      console.log("error getting messages")
    }
  }, [userInfo,needSync]);
  const fetchPropertyManagers = async (userInfo) => {
    // console.log(userInfo);
    const users = userInfo.permissions.options?.users;
    const propertyManagersFetchResponses = [];

    for (const userId of users) {
        const propertyManagerFetchResponse = await TenantAdapter.getTenantById(userId);
        propertyManagersFetchResponses.push(propertyManagerFetchResponse);
    }
    const flattenedPropertyManagers = [].concat(...propertyManagersFetchResponses);
    setPropertyManagers(flattenedPropertyManagers);
};
  const fetchShadowUsers = async(userInfo) =>{
    const fetchShadowUsersResponse = await TenantAdapter.getAllShadowUsers(userInfo);
    console.log(fetchShadowUsersResponse)
    if(fetchShadowUsersResponse){
      setShadowUsers(fetchShadowUsersResponse?.data)
    }else{
      console.log("Shadow users not fetched")
    }

  }
  const makeReadMessagesOnFetch = (currentTenant, _unReadChatMessageUsers) =>{
    console.log(currentTenant);
    console.log(_unReadChatMessageUsers);
    if(_unReadChatMessageUsers.length !== 0){
      if(handleClearNotification(currentTenant, _unReadChatMessageUsers)){
        fetchNewNotifications(true);
         setSyncRequired(true);
      }else{
        console.log("Do none")
      }
    }else{
      console.log("Unread chat message users is empty")
    }
  }
  useEffect(() => {
    console.log(unReadChatMessageUsers)
    //if we set the current Tenant id to context even after refresh we can show the details of selected tenant even after refresh
    let conditionToSetTenant = unReadChatMessageUsers && unReadChatMessageUsers.length > 0 && unReadChatMessageUsers[0].fromId ? unReadChatMessageUsers[0]?.fromId : allTenants[0]?.id
    if (allTenants && userInfo) {
      setCurrentTenant(conditionToSetTenant);
      fetchTenantInfo(conditionToSetTenant);
      getFetchDetails(conditionToSetTenant);
      fetchShadowUsers(userInfo);
    } else {
      console.log("no tenants or userInfo or messages found");
    }
  }, [userInfo]);
  useEffect(() => {
    if (currentTenant && userInfo && allMessages && allMessages.length !== 0) {
      getCurrentMessages(currentTenant, userInfo);
    } else {
      console.log("Error getting current messages");
    }
  }, [currentTenant, userInfo, allMessages]);
  console.log(currentTenant);
  const sendMessage = async (message) => {
    console.log(message);
    if (message.trim() !== "") {
      let role = userInfo?.role === "ShadowManager" ? "ShadowManager" : "property-manager";
      let messageDetails = {
        from: userInfo?.id,
        to: currentTenant,
        message: message,
      };
      const messageSendResponse = await TenantAdapter.sendMessage(
        userInfo,
        currentTenant,
        role,
        messageDetails
      );
      if (messageSendResponse) {
        setMessage("");
        getAllMessages(userInfo);
      } else {
        console.log("error sending message");
      }
    } else {
      setSendMessageError(true);
      console.log("message empty error");
    }
  };
  const getAllMessages = async (userInfo) => {
    let role = "property-manager";
    const getAllMessagesResponse = await TenantAdapter.getAllMessages(
      userInfo,
      currentTenant,
      role
    );
    if (getAllMessagesResponse) {
      console.log(getAllMessagesResponse);
      setAllMessages(getAllMessagesResponse);
    };
  }

  useEffect(()=>{
    scrollToBottom("property-messages-list");
  },[allCurrentMessages])
  async function fetchTenantInfo(tenantId: string) {
    if (tenantId) {
      try {
        const tenantInfoResponse = await TenantAdapter.getTenantById(tenantId);
        console.log("tenantInfoResponse",tenantInfoResponse);
        setCurrentTenantInfo(tenantInfoResponse[0]);
      } catch (error) {
        console.error("Error getting tenant info:", error);
      }
    }
  }
  const getCurrentMessages = (_tenantID, userInfo) => {
    console.log(_tenantID);
    console.log(userInfo);
    console.log(allMessages);
    if (_tenantID && userInfo && allMessages && allMessages.length !== 0) {
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.message?.from === userInfo.id && message.message?.to === _tenantID) ||
          (message.message?.from === _tenantID && message.message?.to === userInfo.id)
      );
      setAllCurrentMessages(filteredMessages);
      setProgress(70);
      setProgress(100);
      return filteredMessages;
    }
    return [];
  };
  console.log(currentTenantInfo);
  console.log(allMessages);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setMessage(message + "\n");
    } else {
      console.log("Do none");
    }
  };
  console.log("allMessages", allMessages);
  const firstLetter =
    currentTenantInfo && Object.keys(currentTenantInfo).length !== 0
      ? currentTenantInfo?.first_name[0]?.toUpperCase()
      : "";
  const getFetchDetails = async (_tenantId) => {
    try {
      //let shouldShowIntro = Cookies.get("intro_seen");
      // if (!shouldShowIntro) {
      //   setIntro(true);
      // }
      // We don't have a user ID, so we can't fetch any data.
      if (!_tenantId) {
        return null;
      }
      const data = await TenantAdapter.getRentalByTenantId(_tenantId);
      const uniquePropertyIds = new Set();
      const propertyPromises = data.map(async (item) => {
        const propertyId = item.property_id;
        try {
          if (!uniquePropertyIds.has(propertyId)) {
            uniquePropertyIds.add(propertyId);
            const property = await PropertyAdapter.getPropertyByID(propertyId);
            return property;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching property:", error);
          return null;
        }
      });
      const properties = await Promise.all(
        propertyPromises
          .filter((property) => property !== null)
          .flatMap((propertyArray) => propertyArray)
      );
      console.log(properties);
      const uniqueProperties = properties
        ?.filter((property) => property !== null)
        .flatMap((propertyArray) => propertyArray);
      if (data && uniqueProperties) {
        const resultArray = data.reduce((result, item1) => {
          const propertyMatch = uniqueProperties.find((property) => {
            const matchingUnit =
              property?.units &&
              property.units.find((unit) => unit.id === item1.unit_id);
            return matchingUnit;
          });
          if (propertyMatch) {
            const matchingUnit = propertyMatch.units.find(
              (unit) => unit.id === item1.unit_id
            );
            const resultItem = {
              ...matchingUnit,
              rental_id: item1.id,
              status: item1.certification_status || "",
              property: propertyMatch,
            };
            result.push(resultItem);
          }
          // countForms(data);
          return result;
        }, []);
        setUnitList(resultArray);
        // makeReadMessagesOnFetch(unReadChatMessageUsers ? unReadChatMessageUsers?.[0].fromId : "",unReadChatMessageUsers)
        setProgress(100);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchRentalByTenant = async (_tenantID) => {
    try {
      //let shouldShowIntro = Cookies.get("intro_seen");
      // if (!shouldShowIntro) {
      //   setIntro(true);
      // }
      // We don't have a user ID, so we can't fetch any data.
      if (!_tenantID) {
        return null;
      }
      const data = await TenantAdapter.getRentalByTenantId(_tenantID);
      const uniquePropertyIds = new Set();
      const propertyPromises = data.map(async (item) => {
        const propertyId = item.property_id;
        try {
          if (!uniquePropertyIds.has(propertyId)) {
            uniquePropertyIds.add(propertyId);
            const property = await PropertyAdapter.getPropertyByID(propertyId);
            return property;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching property:", error);
          return null;
        }
      });
      const properties = await Promise.all(
        propertyPromises
          .filter((property) => property !== null)
          .flatMap((propertyArray) => propertyArray)
      );
      console.log(properties);
      const uniqueProperties = properties
        ?.filter((property) => property !== null)
        .flatMap((propertyArray) => propertyArray);
      if (data && uniqueProperties) {
        const resultArray = data.reduce((result, item1) => {
          const propertyMatch = uniqueProperties.find((property) => {
            const matchingUnit =
              property?.units &&
              property.units.find((unit) => unit.id === item1.unit_id);
            return matchingUnit;
          });
          if (propertyMatch) {
            const matchingUnit = propertyMatch.units.find(
              (unit) => unit.id === item1.unit_id
            );
            const resultItem = {
              ...matchingUnit,
              rental_id: item1.id,
              status: item1.certification_status || "",
              property: propertyMatch,
            };
            result.push(resultItem);
          }
          // countForms(data);
          return result;
        }, []);
        return resultArray;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (window) {
      setMessageListHeight(window.innerHeight - 180);
    }
    const handleResize = () => {
      if (window) {
        setMessageListHeight(window.innerHeight - 180);
      } else {
        console.log("window is not defined");
      }
    };
    if (window) {
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
  if(!allCurrentMessages && !allMessages && !currentTenant) return null;
  return (
    <div className="property-messenger__wrapper">
      <LoadingBar color='#32579e' style={{ height: "3px" }} progress={progress} onLoaderFinished={() => setProgress(0)} />

      <MessagingList
        userInfo={userInfo}
        allTenants={userInfo?.role === "ShadowManager" ? propertyManagers : [...allTenantsWithUnits,...shadowUsers]}
        setCurrentTenant={setCurrentTenant}
        currentTenant={currentTenant}
        fetchTenantInfo={fetchTenantInfo}
        getCurrentMessages={getCurrentMessages}
        fetchRentalByTenant={getFetchDetails}
        messageListHeight={messageListHeight}
        unReadChatMessageUsers={unReadChatMessageUsers}
        allMessages={allMessages}
        setSyncRequired = {setSyncRequired}
        makeReadMessagesOnFetch={makeReadMessagesOnFetch}
      />
      <div className="property-messenger">
        <div className="property-messenger-list" id="property-messages-list" style={{height:`${messageListHeight}px`}}>
          {allCurrentMessages &&
            allCurrentMessages.map((_message,messageIndex) => (
              <div
              key={messageIndex}
                className={
                  _message.message?.from !== userInfo?.id
                    ? "property-messenger-received-wrapper"
                    : "property-messenger-send-wrapper"
                }
              >
                {_message.message?.from === userInfo?.id &&
                  _message.message?.to === currentTenant && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div className={"property-messenger-send-text"}>
                        <div>{`${getTime(_message.message.time_stamp)}`}</div>
                        <div>You</div>
                      </div>
                      <div className="property-messenger-send">
                        <pre className="property-messenger__pre-wrap">{_message.message.message}</pre>
                      </div>
                    </div>
                  )}
                {_message.message?.from === currentTenant &&
                  _message.message?.to === userInfo?.id && (
                    <div className="property-messenger-received-message">
                      <div>
                        {/* <TenantPFP height="40px" width="40px"/> */}
                        <div className="property-messenger__avatar-wrapper">
                          <button
                            className="property-messenger__avatar"
                            id="avatar-btn"
                          >
                            <div className="property-messenger__avatar-image">
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
                        <div className={"property-messenger-received-text"}>
                          <div>{`${getTime(_message.message.time_stamp)}`}</div>
                          <div>
                            {currentTenantInfo && currentTenantInfo?.first_name
                              ? currentTenantInfo?.first_name
                              : ""}
                          </div>
                        </div>
                        <div className="property-messenger-received">
                          <pre className="property-messenger__pre-wrap">{_message.message.message}</pre>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
        </div>
        <div className="property-messenger__input-container">
          {/* <Input
            type="text"
            labelStyle={{ margin: 0 }}
            errored={sendMessageError}
            name="property-messenger"
            onKeyDown={handleKeyPress}
            wrapperStyle={{
              margin: 0,
              borderRadius: "12px",
              padding: "12px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            inputStyle={{
              margin: 0,
              borderRadius: "12px",
              minWidth: "400px",
              outline: "lightgray",
            }}
            placeholder="Type your message..."
            onChange={handleMessageChange}
            value={message}
          /> */}
          <textarea
            value={message}
            onChange={(e)=>handleMessageChange(e)}
            onKeyDown={handleKeyPress}
            rows={5}
            cols={50}
            style={{border:sendMessageError ? "1px solid red" : ""}}
            className="property-messenger__textarea"
            onFocus={()=>setSendMessageError(false)}
          />
          <div
            className="property-messenger__input-icon"
            onClick={() => sendMessage(message)}
          >
            <Send height="16px" width="16px" />
          </div>
          {sendMessageError && (
            <div className="property-messenger__error-message">
              Message cannot be empty
            </div>
          )}
        </div>
      </div>
      <TenantInfoScreen
        unitInfoArray={unitList}
        currentTenant={currentTenant}
        messageListHeight={messageListHeight}
      />
    </div>
  );
};

export default PropertyMessenger;
