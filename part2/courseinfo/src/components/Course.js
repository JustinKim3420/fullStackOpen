import React from "react";
import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        //Get the total number of exercises per course
        const total = course.parts.reduce((sum, current) => {
          //Shortcut. We don't need an additional variable to contain only
          //the number of exercises per part
          return { exercises: sum.exercises + current.exercises };
        });
        return (
          <div key={course.id}>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <div>
              <b>total of {total.exercises} exercises</b>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Course;
