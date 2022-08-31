import React from "react";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      Dashboard
      <div>
        <div>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
