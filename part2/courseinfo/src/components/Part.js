import React from 'react'

const Part = ({part}) =>{
    return(
    <p>{part.name} <span>{part.exercises}</span></p>
    )
}

export default Part;