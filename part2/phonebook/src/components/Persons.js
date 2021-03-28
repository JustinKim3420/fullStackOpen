import React from 'react';
import Person from './Person'

const Persons = ({personsToShow, onClick}) => {
    return(
        personsToShow.map((person) => {
            return (
                <Person key={person.name} person={person} onClick={onClick}/>
            );
          })
    )
}

export default Persons;