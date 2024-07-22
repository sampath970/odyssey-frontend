import React, { useState } from "react";
import TenantPFP from "../../../../../public/assets/icons/tenant-pfp.svg";
import Search from "../../../../../public/assets/icons/search.svg";
import { countUnreadMessages, getBackgroundColorForTenant, sortUnreadTenants } from "../../../../../utils/message-utils";
import "./messaging-list.scss"
import NotificationsAdapter from "../../../../../services/adapters/notifications-adapter";
import { useNotifications } from "../../../../../services/hooks/useNotifications";
import { handleClearNotification } from "../../../../../utils/notification-utils";

const MessagingList = (props) => {
  const {
    allTenants,
    setCurrentTenant,
    currentTenant,
    fetchTenantInfo,
    getCurrentMessages,
    userInfo,
    fetchRentalByTenant,
    messageListHeight,
    unReadChatMessageUsers,
    allMessages,
    setSyncRequired = () =>{},
    makeReadMessagesOnFetch=()=>{}
  } = props;
  console.log(allTenants)
  let sortedTenants = sortUnreadTenants(allTenants, unReadChatMessageUsers);
  let { notifications, fetchNewNotifications } = useNotifications();
  const [filteredTenants, setFilteredTenant] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchText) => {
    const searchQuery = searchText.toLowerCase();
    const searchResults = [];
    for (const tenant of allTenants) {
      const { first_name, last_name, email } = tenant;
      const fullName = `${first_name} ${last_name} ${email}`.toLowerCase();
      if (
        first_name?.toLowerCase() === searchQuery ||
        last_name?.toLowerCase() === searchQuery ||
        email?.toLowerCase() === searchQuery ||
        fullName.includes(searchQuery)
      ) {
        searchResults.push(tenant);
      }
    }
    setFilteredTenant(searchResults);
    setSearchTerm(searchText);
  };
  
  
  

  let tenantsToMap;
  if (searchTerm !== "") {
    tenantsToMap = filteredTenants;
  } else if (sortedTenants) {
    tenantsToMap = sortedTenants;
  } else {
    tenantsToMap = allTenants;
  }
  if (!allTenants) return null;
  return (
    <div
      className="property-messenger__list"
      style={{ maxHeight: `${messageListHeight + 100}px` }}
    >
      <div className="property-messenger__section">
        <input
          type="text"
          name=""
          placeholder="Search..."
          className="property-messenger__input"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
        />
        <Search className="property-messenger__search" />
      </div>
      <div className="property-messenger__list-header">Messages List</div>
      <div className="property-messenger__list-header-line"></div>
      {searchTerm !== "" && filteredTenants.length === 0 && (
        <div className="property-messenger__no-tenants-label">
          {" "}
          No Users found!{" "}
        </div>
      )}
      {tenantsToMap &&
        Array.isArray(tenantsToMap) &&
        tenantsToMap.length !== 0 &&
        tenantsToMap.map((_tenant,index) => (
          <div
            key={index}
            className="property-messenger__list-name-wrapper"
            style={{ backgroundColor: getBackgroundColorForTenant(currentTenant, _tenant, unReadChatMessageUsers) }}
            onClick={() => {
              setCurrentTenant(_tenant.id);
              fetchTenantInfo(_tenant.id);
              getCurrentMessages(_tenant.id, userInfo);
              fetchRentalByTenant(_tenant.id);
              makeReadMessagesOnFetch(_tenant.id, unReadChatMessageUsers)
            }}
          >
            <div className="property-messenger__user-name-wrapper">
              <div className="property-messenger__avatar-wrapper">
                <button
                  className="property-messenger__avatar"
                  id="avatar-btn"
                  style={{
                    background:
                      currentTenant === _tenant?.id
                        ? "lightblue"
                        : "rgb(249 249 249)",
                  }}>
                  <div className="property-messenger__avatar-image property-messenger__avatar-image--pfp">
                    {(_tenant?.role === "ShadowManager" || _tenant?.role === "property_manager") ? _tenant.first_name?.[0]?.toUpperCase() :
                    _tenant?.unit_id?.[0]?.unit_id ? _tenant?.unit_id?.[0]?.unit_id : ""}
                  </div>
                </button>
              </div>
            </div>
            <div className="messaging-list__list-user-name">
              <div>{`${_tenant.first_name ? _tenant.first_name : ""} ${_tenant.last_name ? _tenant.last_name : ""
                }`}</div>
              {countUnreadMessages(allMessages, _tenant.id) > 0 ? <div className="messaging-list__list-count">{countUnreadMessages(allMessages, _tenant.id)}</div> : null}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessagingList;
