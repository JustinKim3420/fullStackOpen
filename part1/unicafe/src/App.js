import React, { useState } from "react";

const Buttons = (props) => {
  const buttons = props.values.map((value) => {
    return (
      <Button
        key={value.key}
        name={value.key}
        handleClick={() => value.changeValue(value.value + 1)}
      />
    );
  });

  return <>{buttons}</>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;

  if (props.good > 0 || props.bad > 0 || props.neutral > 0)
    return (
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />

          <Statistic name="all" value={good + neutral + bad} />
          <Statistic name="average" value={(good - bad) / total} />
          <Statistic name="positive" value={good / total + "%"} />
        </tbody>
      </table>
    );
  return (
    <>
      <div>No feedback given</div>
    </>
  );
};

const Statistic = (props) => {
  //Added pre tag to let the statistics look more open
  return (
    <tr>
      <td>{props.name}</td>
      <td> {props.value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const values = [
    { key: "good", value: good, changeValue: setGood },
    { key: "neutral", value: neutral, changeValue: setNeutral },
    { key: "bad", value: bad, changeValue: setBad },
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
