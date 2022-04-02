import React from "react";
import { useLocation } from "react-router-dom";

const AccountName = () => {
  const location = useLocation();
  console.log(location);
  return <div>accoutname</div>;
};

export default AccountName;
