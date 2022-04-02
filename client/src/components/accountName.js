import React from "react";
import { useLocation } from "react-router-dom";

const AccountName = () => {
  const location = useLocation();
  return <div>{location.state[0]}</div>;
};

export default AccountName;
