"use client";
import "./footer.scss";
// import { useRouter } from 'next/navigation';
import Link from 'next/link'

function Footer(props) {
  // const router = useRouter();
  const handleLinkedInNavigationClick = () => {
    try {
      console.log("Linkedin");
      window.open(
        "https://www.linkedin.com/company/orcsolution/",
        "_blank",
        "noreferrer"
      );
    } catch (ex) {
      console.error("Error at handleLinkedInNavigationClick")
    }
  };
  const handleinstagramNavigationClick = () => {
    try {
      window.open("instagram url/", "_blank", "noreferrer");
    } catch (ex) {
      console.error("Error at handleinstagramNavigationClick")
    }
  };
  const handleyoutubeNavigationClick = () => {
    try {
      window.open("youtube url/", "_blank", "noreferrer");
    } catch (ex) {
      console.error("Error at handleyoutubeNavigationClick")
    }
  };
  const handlefacebookNavigationClick = () => {
    try {
      window.open("facebook url/", "_blank", "noreferrer");
    } catch (ex) {
      console.error("Error at handlefacebookNavigationClick")
    }
  };

  return (
    <>
      <div className="footer__wrapper">
        <div className="footer-container" data-testid="footer">
          <div className="footer-container__item" style={{ gridArea: "item1" }}>
            
          </div>
          <div className="footer-container__item" style={{ gridArea: "item2", placeItems: "center" }}>
            <label>ECHO</label>
            <label>312 W. 2ND Street #3342</label>
            <label>Casper, WY 82601</label>
            <label></label>
            <label>info@echo-certs.com</label>
          </div>
          <div className="footer-container__item" style={{ gridArea: "item4" }}>
            <label>
              <Link data-testid="terms-conditions" className="terms three" href={`/terms-and-conditions`}>Terms and Conditions</Link>
            </label>
            <label>
              <Link className="terms three" href={`/privacy-policy`}>Privacy policy</Link>
            </label>
          </div>
          <div className="footer-container__item" style={{ gridArea: "item5" }}>
            Copyright &#169; 2024 E.C.H.O Solutions Inc | Powered by ECHO
          </div>
          <div className="footer-container__item" style={{ gridArea: "item6" }}>
            <div style={{ display: "flex" }}>
              <div
                data-testid="youtube-link"
                className="footer__social-icons"
                onClick={handleyoutubeNavigationClick}>
                <img src="../assets/images/youtube.png" alt="" />
              </div>
              <div
                data-testid="instagram-link"
                className="footer__social-icons"
                onClick={handleinstagramNavigationClick}>
                <img src="../assets/images/instagram.png" alt="" />
              </div>
              <div
                data-testid="facebook-link"
                className="footer__social-icons"
                onClick={handlefacebookNavigationClick}>
                <img src="../assets/images/facebook.png" alt="" />
              </div>
              <div
                data-testid="linkedin-link"
                className="footer__social-icons"
                onClick={handleLinkedInNavigationClick}>
                <img src="../assets/images/linkedin.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
