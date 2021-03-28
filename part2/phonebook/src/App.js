import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);


  // Use effect to get data form the server and set to variables
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  // onClick handler
  const handleClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      // Tell server to delete the user
      personService
        .deleteName(person.id)
        .catch(error=>{
          setMessages([`'${person.name}' was already removed from server`])
        });
      // Update the state to show that the user has been deleted
      const newPersonsList = persons.filter((persons) => {
        return persons.name !== person.name;
      });
      setPersons(newPersonsList);
      setMessages([`Deleted ${person.name}`])
      setTimeout(()=>setMessages([]),5000)
    }
  };

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
    let errors = [];

    // Check to see if there is an input and check if the name is unique
    if (newName === "") {
      errors.push(`\nPlease enter a name`);
    }

    // Check to see if there is an input and check if the number is unique
    if (newNumber !== "") {
      if (persons.find((person) => person.number === newNumber)) {
        errors.push(`\nphone number ${newNumber} is already being used`);
      }
    } else {
      errors.push(`\nPlease enter a number`);
    }
    // If there are no errors, add the new object and reset state
    // else, provide the errors
    // Only resets state when there are no errors, think this is more user friendly
    if (errors.length === 0) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      // If the name is already taken, offer to update the number
      if (persons.find((person) => person.name === newName)) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          // Returns the object that matches the criteria
          const person = persons.find((person) => person.name === newName);
          personService.update(person.id, newPerson).then((returnedPerson) => {
            setPersons(
              persons.map((item) =>
                item.id !== person.id ? item : returnedPerson
              )
            );
          });
         setMessages([`Updated ${person.name}'s number`])
        }
      } else {
        // Add the new user to the state so another get request is not needed.
        personService.create(newPerson).then((person) => {
          setPersons([...persons, person]);
        });
        setMessages([`Added ${newPerson.name}`])
        setNewName("");
        setNewNumber("");
      }
    } else {
      setErrors(errors);
    }
    setTimeout(()=>{
      setErrors([])
      setMessages([])
    },5000)
    errors = [];
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messages={messages} errors={errors}/>
      <Filter value={filter} changeHandler={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={handleSubmit}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onClick={handleClick} />
    </div>
  );
};
export default App;
