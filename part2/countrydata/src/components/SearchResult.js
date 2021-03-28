import React from 'react';

const SearchResult = ({result, updateFilter}) =>{
    // If the button is clicked, search for the clicked country
    // Fills in the search bar with the country's name
    // This method does not work for countries where the name is in other country's names
    const handleClick = ()=>{
        updateFilter(result.name)
    }

    return(
        <div>{result.name} <button onClick={handleClick}>show</button></div>
    )
}

export default SearchResult;