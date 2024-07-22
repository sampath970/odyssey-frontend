import React, { FC, useContext, useState } from 'react';
import "./intro-tenant-steps.scss";
import { useUserInfo } from "../../services/hooks/useUserInfo";
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';
import GuideModal from '../guide-modal/guide-modal';
import Modal, { ModalTypes } from '../modal/modal';

interface IntroTenantStepsProps {
  onCallback: () => void;
}

const IntroTenantSteps: FC<IntroTenantStepsProps> = (props) => {
  const tourOptions: any = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      }
    },
    useModalOverlay: true
  };

  const Intro: FC<{ onCallback: () => void }> = ({ onCallback }) => {
    const startTour = () => {
      tour.start();
      onCallback();
    };

    const ignoreTour = () => {
      setShowGuideModal(false);
      onCallback();
    };

    const { userInfo } = useUserInfo();
    const tour = useContext(ShepherdTourContext);
    const [showGuideModal, setShowGuideModal] = useState(true);

    return (
      <Modal isOpen={showGuideModal} showCloseButton={false} size={ModalTypes.Xmedium}>
        <GuideModal userInfo={userInfo} guideModalYes={startTour} guideModalLater={ignoreTour} />
      </Modal>
    );
  };

    const steps = [
        {
          id: 'intro',
          canClickTarget:false,
          attachTo: { element: '#sidebar-home', on: 'right' },
          beforeShowPromise: function () {
            return new Promise(function (resolve) {
              setTimeout(function () {
                window.scrollTo(0, 0);
                resolve("");
              }, 0);
            });
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-danger',
              text: 'Next',
              type: 'next'
            }
          ],
          classes: 'custom-class-name-1 custom-class-name-2',
          highlightClass: 'highlight',
          scrollTo: false,
          cancelIcon: {
            enabled: true,
          },
          title: 'Home',
          text: ["Welcome to your home dashboard! Here, you'll find quick links and information to help you navigate through various sections."],
          when: {
            show: () => {
              console.log('show step');
            },
            hide: () => {
              console.log('hide step');
            }
          }
        },
        {
          id: 'intro-6',
          canClickTarget:false,
          attachTo: { element: '#sidebar-notifications', on: 'right' },
          beforeShowPromise: function () {
            return new Promise(function (resolve) {
              setTimeout(function () {
                window.scrollTo(0, 0);
                resolve("");
              }, 0);
            });
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-danger',
              text: 'Next',
              type: 'next'
            }
          ],
          classes: 'custom-class-name-1 custom-class-name-2',
          highlightClass: 'highlight',
          scrollTo: false,
          cancelIcon: {
            enabled: true,
          },
          title: 'Notifications',
          text: ["Keep track of important updates in the 'Notifications' section. Stay informed about events, announcements, and more."],
          when: {
            show: () => {
              console.log('show step');
            },
            hide: () => {
              console.log('hide step');
            }
          }
        },
        {
          id: 'intro-8',
          canClickTarget:false,
          attachTo: { element: '#unit-no', on: 'right' },
          beforeShowPromise: function () {
            return new Promise(function (resolve) {
              setTimeout(function () {
                window.scrollTo(0, 0);
                resolve("");
              }, 0);
            });
          },
          buttons: [
            {
              classes: 'shepherd-button-secondary',
              text: 'Exit',
              type: 'cancel'
            },
            {
              classes: 'shepherd-button-primary',
              text: 'Back',
              type: 'back'
            },
            {
              classes: 'shepherd-button-danger',
              text: 'Next',
              type: 'next'
            }
          ],
          classes: 'custom-class-name-1 custom-class-name-2',
          highlightClass: 'highlight',
          scrollTo: false,
          cancelIcon: {
            enabled: true,
          },
          title: 'Unit No',
          text: ["Navigate to 'My Units' to access details about your residential units. Find information on each unit you own or lease."],
          when: {
            show: () => {
              console.log('show step');
            },
            hide: () => {
              console.log('hide step');
            }
          }
        },
      ];
      const additionalButtonStyles = {
        paddingTop: "0rem",
        paddingRight: "0rem",
        paddingBottom: "0rem",
        paddingLeft: "0rem",
    }
            
    return (
      <div>
        {/* @ts-ignore */}
        <ShepherdTour steps={steps} tourOptions={tourOptions}>
          <Intro onCallback={props.onCallback}/>
        </ShepherdTour>
      </div>
    );
}

export default IntroTenantSteps