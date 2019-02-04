import React from "react";

function LoginForm(props) {
  return (
    <form className="sign-in">
      <div>
        <h1>WMFA!</h1>
        <h2>Sign-in/Login</h2>
      </div>
      <br />
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={props.handleInput}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        onChange={props.handleInput}
      />
    </form>
  );
}

export default LoginForm;
