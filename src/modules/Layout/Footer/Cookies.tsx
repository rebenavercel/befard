"use client";

import CookieConsent from "react-cookie-consent";

const Cookies = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Submit"
      cookieName="myAwesomeCookieName2"
      style={{ background: "black" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
    >
      Content cookies
    </CookieConsent>
  );
};

export default Cookies;
