import React from "react";

const Notification = ({ messages, errors}) => {
  console.log(messages, errors)

  if (messages === [] && errors===[]) {
    return null;
  }

  return (
    <ul className={((messages.length>0)? 'notification':'') + ((errors.length>0)? 'alert':'') }>
      {messages.map((message) => {
        return <li key={message}>{message}</li>;
      })}
      {errors.map((message) => {
        return <li key={message}>{message}</li>;
      })}
    </ul>
  );
};

export default Notification;
