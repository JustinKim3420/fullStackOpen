import React from 'react'
import {connect} from 'react-redux'
import {updateFilter} from '../reducers/filterReducer'

const filterStyle = {
    margin:'0.25rem 0rem'
}

const Filter = (props)=>{

    const handleChange = (event)=>{
        props.updateFilter(event.target.value)
    }

    return(
        <div style={filterStyle}>
            <label htmlFor="filterInput">filter</label>
            <input name="filterInput" onChange={handleChange}></input>
        </div>
    )
}

const mapDispatchToProps = {
    updateFilter
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter