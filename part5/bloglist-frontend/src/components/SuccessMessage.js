import React, { useEffect } from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ state, changeState, message }) => {
  useEffect(() => {
    if (state!==undefined) {
      const timer = setTimeout(() => changeState(), 3000);
      return (()=>clearTimeout(timer));
    }
  });

  return <div className="successMessage">{message}</div>;
};

export default SuccessMessage;
