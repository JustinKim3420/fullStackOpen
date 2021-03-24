import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  //Handle the change
  const handleChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    const newPerson={
      name:newName
    }
    if(persons.find((person)=>person.name===newName)){
      alert(`${newName} is already added to the phone book`)
    }else{
    setPersons(persons.concat(newPerson))}
    setNewName('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <div key={person.name}>{person.name}</div>;
      })}
    </div>
  );
};

export default App;
