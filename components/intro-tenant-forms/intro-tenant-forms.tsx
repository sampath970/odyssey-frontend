import React, { FC, useContext, useState } from "react";
import "./intro-tenant-forms.scss";
import { useUserInfo } from "../../services/hooks/useUserInfo";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import GuideModal from "../guide-modal/guide-modal";
import Modal, { ModalTypes } from "../modal/modal";
import GuideModalForm from "../guide-modal-form/guide-modal-form";

interface IntroTenantFormProps {
  onCallback: () => void;
}

const IntroTenantForms: FC<IntroTenantFormProps> = (props) => {
  const tourOptions: any = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
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
      <Modal
        isOpen={showGuideModal}
        showCloseButton={false}
        size={ModalTypes.Xmedium}
      >
        <GuideModalForm
          userInfo={userInfo}
          guideModalYes={startTour}
          guideModalLater={ignoreTour}
        />
      </Modal>
    );
  };

  const steps = [
    {
      id: "intro",
      canClickTarget:false,
      attachTo: { element: "#previous", on: "bottom"},
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
          classes: "shepherd-form-button-primary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-form-button-danger",
          text: "Next",
          type: "next",
        },
      ],
      classes: "custom-class-name-1 popup-container",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Previous Page",
      text: ["You have the capability to effortlessly navigate back to previous screens to confirm the entered data and screens once more."],
      when: {
        show: () => {
          console.log("show step");
        },
        hide: () => {
          console.log("hide step");
        },
      },
    },

    // {
    //   id: 'intro-1',
    //   attachTo: { element: '#sidebar-units', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 0);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'My Units',
    //   text: ["Explore the 'My Units' section to view and manage your Units."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    // {
    //   id: 'intro-2',
    //   attachTo: { element: '#sidebar-my-waitlist', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 500);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'My Units',
    //   text: ["Navigate to 'My Units' to access details about your residential units. Find information on each unit you own or lease."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    // {
    //   id: 'intro-3',
    //   attachTo: { element: '#sidebar-actions', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 500);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'My Actions',
    //   text: ["In 'My Actions,' you'll find links and resources related to tasks you need to take. Stay on top of your to-do list."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    // {
    //   id: 'intro-4',
    //   attachTo: { element: '#sidebar-meetings', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 500);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'Meetings',
    //   text: ["Access the 'Meetings' section to view details about upcoming meetings. Stay informed and plan your schedule accordingly."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    // {
    //   id: 'intro-5',
    //   attachTo: { element: '#sidebar-chatbot', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 500);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'Chatbot',
    //   text: ["Interact with our helpful 'Chatbot' for any assistance or information you may need. It's here to make your experience smoother."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    {
      id: "intro-6",
      canClickTarget:false,
      attachTo: { element: "#next", on: "bottom" },
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
          classes: "shepherd-form-button-primary",
          text: "Back",
          type: "back",
        },
        {
          classes: "shepherd-form-button-danger",
          text: "Next",
          type: "next",
        },
      ],
      classes: "popup-container",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Next",
      text: ["After confirming that all details are accurate, you may proceed to authorize or sign the form by clicking this button."],
      when: {
        show: () => {
          console.log("show step");
        },
        hide: () => {
          console.log("hide step");
        },
      },
    },
    // {
    //   id: 'intro-7',
    //   attachTo: { element: '#sidebar-quick-tour', on: 'right' },
    //   beforeShowPromise: function () {
    //     return new Promise(function (resolve) {
    //       setTimeout(function () {
    //         window.scrollTo(0, 0);
    //         resolve("");
    //       }, 500);
    //     });
    //   },
    //   buttons: [
    //     {
    //       classes: 'shepherd-button-secondary',
    //       text: 'Exit',
    //       type: 'cancel'
    //     },
    //     {
    //       classes: 'shepherd-button-primary',
    //       text: 'Back',
    //       type: 'back'
    //     },
    //     {
    //       classes: 'shepherd-button-danger',
    //       text: 'Next',
    //       type: 'next'
    //     }
    //   ],
    //   classes: 'custom-class-name-1 custom-class-name-2',
    //   highlightClass: 'highlight',
    //   scrollTo: false,
    //   cancelIcon: {
    //     enabled: true,
    //   },
    //   title: 'Quick Tour',
    //   text: ["Take a quick tour of the platform by accessing 'Quick Tour.' It provides insights and tips to enhance your user experience."],
    //   when: {
    //     show: () => {
    //       console.log('show step');
    //     },
    //     hide: () => {
    //       console.log('hide step');
    //     }
    //   }
    // },
    {
      id: "intro-8",
      canClickTarget:false,
      attachTo: { element: "#add_signature", on: "bottom" },
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
          classes: "shepherd-form-button-danger",
          text: "Ok",
          type: "next",
        },
      ],
      classes: "popup-container",
      highlightClass: "highlight",
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: "Approve",
      text: ["After confirming that all details are accurate, you may proceed to authorize or sign the form by clicking this button."],
      when: {
        show: () => {
          console.log("show step");
        },
        hide: () => {
          console.log("hide step");
        },
      },
    },
    // ...
  ];
  const additionalButtonStyles = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };

  return (
    <div>
      {/* @ts-ignore */}
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        <Intro onCallback={props.onCallback} />
      </ShepherdTour>
    </div>
  );
};

export default IntroTenantForms;
