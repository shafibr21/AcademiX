import React from "react";

const Login = () => {
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
