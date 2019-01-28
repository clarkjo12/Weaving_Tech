import React from "react";
import "./style.css";

function LoginForm(props) {
  return (
    <form className="sign-in">
      <div>
        <h2>Sign-in/Login</h2>
      </div>
      <br />
      <input
        onChange={props.handleInputChange}
        className="form-control"
        placeholder="Username"
        id="username"
      />
      <input
        onChange={props.handleInputChange}
        type="text"
        className="form-control"
        placeholder="Password"
        id="password"
      />

      {/* <div className="form-group">
    <label htmlFor="breed">Breed Name:</label>
    
    <datalist id="breeds">
      {props.breeds.map(breed => (
        <option value={breed} key={breed} />
      ))}
    </datalist>
    <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
      Search
    </button>
  </div> */}
    </form>
  );
}

export default LoginForm;
