import React from "react";

function Header(props) {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
}

function Part(props) {
  return(
  <>
    <p>
      {props.label} {props.content}
    </p>
  </>
  );
}

function Content(props) {
  //Inefficient and messy. Would use a foreach here
  return (
    <>
      <Part label={props.course.parts[0].name} content={props.course.parts[0].exercises} />
      <Part label={props.course.parts[1].name} content={props.course.parts[1].exercises} />
      <Part label={props.course.parts[2].name} content={props.course.parts[2].exercises} />
    </>
  );
}

function Total(props) {
  let total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
}

const App = () => {

  const course={
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  );
};

export default App;
