import React, { useState } from "react";
import Checkbox from "../../../components/checkbox/checkbox";
import Modal from "../../../components/modal/modal";
import "./notification-setting.scss"
import Button from "../../../components/button/button";


const NotificationSettingsTab = ({ onClose }) => {
    const [notificationOptions, setNotificationOptions] = useState({
        days120: false,
        days90: false,
        days60: false,
        days30: false,
        custom: false,
    });

    const handleCheckboxChange = (option) => {
        setNotificationOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };


    const handleSave = () => {
        onClose();
    };

    return (
        <div>
        <div className="notification-settings-tab">
            <div>
                <Checkbox
                    label="120 Days"
                    checked={notificationOptions.days120}
                    onChange={() => handleCheckboxChange("days120")}
                />
                <Checkbox
                    label="90 Days"
                    checked={notificationOptions.days90}
                    onChange={() => handleCheckboxChange("days90")}
                />
                <Checkbox
                    label="60 Days"
                    checked={notificationOptions.days60}
                    onChange={() => handleCheckboxChange("days60")}
                />
                <Checkbox
                    label="30 Days"
                    checked={notificationOptions.days30}
                    onChange={() => handleCheckboxChange("days30")}
                />
                <Checkbox
                    label="Customize"
                    checked={notificationOptions.custom}
                    onChange={() => handleCheckboxChange("custom")}
                />
            </div>
            <div className="checkbox-save-button">
            <Button buttonClick={handleSave} btnText={"Save"}></Button>
            </div>
        </div>
       
        </div>
    );
};

export default NotificationSettingsTab;
