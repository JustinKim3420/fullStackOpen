import React from 'react';
import Person from './Person'

const Persons = ({personsToShow}) => {
    return(
        personsToShow.map((person) => {
            return (
                <Person key={person.name} person={person}/>
            );
          })
    )
}

export default Persons;