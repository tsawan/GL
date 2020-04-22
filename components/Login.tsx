import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>SmartGL Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="gMail" onClick={() => props.authenticate("gMail")}>
      Log In With GitHub
    </button>
    <button className="account" onClick={() => props.authenticate("Account")}>
      Log In With Twitter
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
