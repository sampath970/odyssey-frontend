function sortUnreadTenants(allTenants, unReadMessageUsers) {
  const unreadTenants = allTenants.filter(tenant => unReadMessageUsers.some(user => user.fromId === tenant.id));
  return unreadTenants.concat(allTenants.filter(tenant => !unReadMessageUsers.some(user => user.fromId === tenant.id)));
}

const getBackgroundColorForTenant = (currentTenant, _tenant, unReadMessageUsers) => {    
    if (_tenant.id === currentTenant) {
        return "#cfe5fb";
    } else if (unReadMessageUsers && unReadMessageUsers.includes(_tenant.id)) {
        return "rgb(249 249 249)";
    } else {
        return "rgb(249 249 249)";
    }
}

function countUnreadMessages(allMessages, tenantId) {
    let count = 0;
    
    allMessages?.forEach(item => {
      if (item.status === "unread" && item.message.from === tenantId) {
        count++;
      }
    });
    
    return count;
  }

  function scrollToBottom(id) {
    const scrollContainer = document.getElementById(id);
    scrollContainer?.scrollTo({
      top: scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }


export {sortUnreadTenants,getBackgroundColorForTenant,countUnreadMessages,scrollToBottom};
