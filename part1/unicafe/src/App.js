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
const Statistics = ({values}) => {
  // Can't make more ambiguous as specfic names have specific values
  // We can use array destructuring here instead of having to 
  // assign the props to each variable. 
  const[good, neutral, bad] = values
  const total = good.value + neutral.value + bad.value


  // If good, bad, or neutral are >0, then show stats
  if (good.value > 0 || bad.value > 0 || neutral.value > 0)
    return (
      <table>
        <tbody>
          <Statistic name="good" value={good.value} />
          <Statistic name="neutral" value={neutral.value} />
          <Statistic name="bad" value={bad.value} />

          <Statistic name="all" value={good.value + neutral.value + bad.value} />
          <Statistic name="average" value={(good.value - bad.value) / total} />
          <Statistic name="positive" value={(good.value / total)*100 + "%"} />
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
      <Statistics values={values} /> 
    </div>
  );
};
export default App;
