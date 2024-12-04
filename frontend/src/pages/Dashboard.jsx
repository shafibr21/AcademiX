import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome, {user?.name || "User"}!</h1>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
