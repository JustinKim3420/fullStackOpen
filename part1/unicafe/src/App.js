import React, { useState } from "react";

// Create buttons section
const Buttons = (props) => {
  // Create a button for each value received from parent
  const buttons = props.values.map((value, index) => {
    return (
      <Button
        key={index}
        name={value.name}
        handleClick={value.changeValue}
      />
    );
  });

  return <>{buttons}</>;
};

// Create individual button
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

// Create statistics section
const Statistics = (props) => {
  // Can't make more ambiguous as specfic names have specific values
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;

  // If good, bad, or neutral are >0, then show stats
  if (props.good > 0 || props.bad > 0 || props.neutral > 0)
    return (
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />

          <Statistic name="all" value={good + neutral + bad} />
          <Statistic name="average" value={(good - bad) / total} />
          <Statistic name="positive" value={(good / total)*100 + "%"} />
        </tbody>
      </table>
    );
    // If all values are 0, then ask for feedback
  return (
    <>
      <div>No feedback given</div>
    </>
  );
};

// Create individual statistic
const Statistic = ({name, value}) => {
  // Added pre tag to let the statistics look more open
  return (
    <tr>
      <td>{name}</td>
      <td> {value}</td>
    </tr>
  );
};

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // I would suggest having your setState functions in 
  // your app component and pass the functions in prop
  // to your button component. 
  // State should be local/encapsulated to the component
  // that it belongs to, which is why I don't think the 
  // button (child) component should be setting the state.
  // Although it works as you had it earlier, I just think
  // this would be better practice. 
  const setToGood = () => {
    setGood(good+1);
  }
  const setToNeutral = () => {
    setNeutral(neutral+1);
  }
  const setToBad = () => {
    setBad(bad+1);
  }

  // Store values in an array of objects to pass to child component
  const values = [
    { name: "good", value: good, changeValue: setToGood },
    { name: "neutral", value: neutral, changeValue: setToNeutral },
    { name: "bad", value: bad, changeValue: setToBad },
  ];

  return (
    <div>
      <h1>Give Feedback</h1>
      <Buttons values={values} />

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} /> 
    </div>
  );
};
export default App;
