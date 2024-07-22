import React, { useState } from 'react';
import "./third-party-notification.scss";
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';
import Checkbox from '../../../components/checkbox/checkbox';

const ThirdPartyNotifcation = (props) => {
    const { thirdPartyLabel, setThirdPartyNotification } = props;

    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleThirdPartyCheckboxChange = (option) => {
        
        setSelectedOption(option === selectedOption ? null : option);
    };

    const handleThirdParty = () => {
        try {
            setThirdPartyNotification();
        } catch (ex) {
            console.error("Error at handleThirdParty:", ex);
        }
    };

    const handleSave = () => {
        
    };

    return (
        <div className="add-third-party">
            <Input
                type="text"
                label="How many days are Required between each verification delivery"
                value={thirdPartyLabel}
                name="fieldName"
                placeholder="Field Name"
                onChange={handleThirdParty}
            />

            <div className='third-party-secondary-form'>
                <label className='third-party-label'>Are Secondary forms allowed</label>
                <div className='third-party-checkbox'>
                    <Checkbox
                        label="Yes"
                        checked={selectedOption === "yes"}
                        onChange={() => handleThirdPartyCheckboxChange("yes")} />
                    <Checkbox
                        label="No"
                        checked={selectedOption === "no"}
                        onChange={() => handleThirdPartyCheckboxChange("no")} />
                </div>
            </div>
            <Input
                type="text"
                wrapperStyle={{ marginTop: 0 }}
                label="How many attempts are required before secondary forms are allowed"
                value={thirdPartyLabel}
                name="fieldName"
                placeholder="Field Name"
                onChange={handleThirdParty}
            />
            <div className='third-party-button'>
                <Button buttonClick={handleSave} btnText={"save"}></Button>
            </div>
        </div>
    );
};

export default ThirdPartyNotifcation;
