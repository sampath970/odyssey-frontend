import React from 'react';
import "./guide-modal.scss";
import Button from '../button/button';
import Profile from "../../public/assets/icons/user-rep-icon.svg";

interface GuideModalProps {
    userInfo: any; 
    guideModalYes: () => void;
    guideModalLater: () => void;
}

const GuideModal: React.FC<GuideModalProps> = (props) => {
    const { userInfo, guideModalYes, guideModalLater } = props;

    const additionalButtonStyles = {
        paddingTop: "0rem",
        paddingRight: "0rem",
        paddingBottom: "0rem",
        paddingLeft: "0rem",
    };

    const handleGuideYesClick = () => {
        guideModalLater();
        guideModalYes();
    };

    return (
        <div className='guide-modal'>
            <div className='guide-modal__icon-wrapper'><Profile className="guide-modal__icon" /></div>
            <h4 className='guide-modal__user-info'>Hi there,</h4>
            <div>Thank you! for signing up with Echos Remote Certificate Solution</div>
            <div>Would you like to view a tour of our website?</div>
            <div className='guide-modal__buttons'>
                <Button btnText={"Yes"} btnTheme="questionnaire" btnType="rounded" additionalStyles={additionalButtonStyles} buttonClick={handleGuideYesClick} />
                <Button btnText={"I'll do it later"} btnTheme="questionnaire-card" btnType="rounded" additionalStyles={additionalButtonStyles} buttonClick={guideModalLater} />
            </div>
        </div>
    );
}

export default GuideModal;
