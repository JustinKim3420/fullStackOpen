import React from 'react'
import {useDispatch} from 'react-redux'
import {updateFilter} from '../reducers/filterReducer'

const filterStyle = {
    margin:'0.25rem 0rem'
}

const Filter = ()=>{
    const dispatch = useDispatch()

    const handleChange = (event)=>{
        dispatch(updateFilter(event.target.value))
    }

    return(
        <div style={filterStyle}>
            <label htmlFor="filterInput">filter</label>
            <input name="filterInput" onChange={handleChange}></input>
        </div>
    )
}

export default Filter