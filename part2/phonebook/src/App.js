import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Array with names that contain the filter
  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  // onChange handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // onSubmit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let error = [];

    // Check to see if there is an input and check if the name is unique
    if (newName !== "") {
      if (persons.find((person) => person.name === newName)) {
        error.push(`\n${newName} is already added to the phone book`);
      }
    } else {
      error.push(`\nPlease enter a name`);
    }

    // Check to see if there is an input and check if the number is unique
    if (newNumber !== "") {
      if (persons.find((person) => person.number === newNumber)) {
        error.push(`\nphone number ${newNumber} is already being used`);
      }
    } else {
      error.push(`\nPlease enter a number`);
    }
    // If there are no errors, add the new object and reset state
    // else, provide the errors
    // Only resets state when there are no errors, think this is more user friendly
    if (error.length === 0) {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(error);
    }
    error = [];
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} changeHandler={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={handleSubmit}
        name={{value:newName, onChange:handleNameChange}}
        number={{value:newNumber, onChange:handleNumberChange}}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  );
};
export default App;
