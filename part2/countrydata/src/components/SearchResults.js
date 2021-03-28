import React from "react";
import SearchResult from "./SearchResult";
import SearchInfo from './SearchInfo'

const SearchResults = ({ results, updateFilter }) => {
  const searchTotal = results.length;
  const searchLimit = 10;

  // Checks the total results and displays the correct component
  // If too many results, ask for more specific filter
  // If only one result, show the country's info page
  // If there are multiple results, show the list
  return searchTotal > searchLimit ? (
    <div>Please enter a more specific filter</div>
  ) : (searchTotal===1? <SearchInfo result={results[0]}/>: (
    results.map((result) => {
      return <SearchResult key={result.name} result={result} updateFilter={updateFilter}/>;
    }))
  );
};

export default SearchResults;
