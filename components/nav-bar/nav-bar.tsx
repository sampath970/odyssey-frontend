import React from "react";
import Button from "../button/button";
import { useRouter } from "next/navigation";
import AppConfig from "../../config/application.config";
import "./nav-bar.scss";


const Navbar: React.FC = () => {
  const { push } = useRouter();

  const handleLoginButtonClick = () => {
    // Redirect to the login page.
    push(AppConfig.cognito.urls.odyssey_login_path);
  };

  return (
    <div className="header-menu-login">
      <Button
        btnText="Login"
        buttonClick={handleLoginButtonClick}
        btnTheme="primary"
        btnType="rounded"
        testID="login-button"
      />
    </div>
  );
};

export default Navbar;
