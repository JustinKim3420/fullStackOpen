import React, { useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ state, changeState, message }) => {
  useEffect(() => {
    if (state!==undefined) {
      const timer = setTimeout(() => changeState(), 3000);
      return () => clearTimeout(timer);
    }
  });

  return <div className="errorMessage">{message}</div>;
};

export default ErrorMessage;
